import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { users } from "@/drizzle/schema";
import bcrypt from "bcryptjs";
import { db } from "@/drizzle/index";
import { eq } from "drizzle-orm";
import { SignInSchema } from "@/features/auth/schemas/signInSchema";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    // ── Google OAuth (customers only) ──────────────────────────────────────
    Google({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
    }),

    // ── Credentials (admin dashboard + customer email/password) ───────────
    Credentials({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "Enter your email",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Enter your password",
        },
      },
      async authorize(credentials) {
        try {
          const { email, password } =
            await SignInSchema.parseAsync(credentials);

          if (!email || !password)
            throw new Error("Email and password are required");

          const user = await db
            .select()
            .from(users)
            .where(eq(users.email, email))
            .limit(1);

          if (user.length === 0) throw new Error("No user found");

          const isValid = await bcrypt.compare(
            credentials.password as string,
            user[0].password,
          );
          if (!isValid) throw new Error("Invalid password");

          return {
            id: user[0].id,
            email: user[0].email,
            name: user[0].name ?? null,
            role: user[0].role, // "admin" | "customer"
          };
        } catch (ex: unknown) {
          console.error("Authorize error:", ex);
          return null;
        }
      },
    }),
  ],

  pages: {
    signIn: "/auth/sign-in", // admin login page — unchanged
  },

  session: { strategy: "jwt" },

  callbacks: {
    // ── Runs after Google OAuth sign-in ──────────────────────────────────
    // Auto-creates a customer row if this is a first-time Google user.
    async signIn({ user, account }) {
      return true;
    },

    // ── Attach role + id to JWT ──────────────────────────────────────────
    async jwt({ token, user, account }) {
      // Credentials sign-in: user object is returned by authorize()
      if (user) {
        token.id = user.id;
        token.role = (user as any).role ?? "user";
       
      }

      // Google sign-in: fetch the role from the DB row we just upserted
      if (account?.provider === "google" && user?.email) {
        const dbUser = await db
          .select({
            id: users.id,
            role: users.role,
          })
          .from(users)
          .where(eq(users.email, user.email))
          .limit(1);

        if (dbUser.length > 0) {
          token.id = dbUser[0].id;
          token.role = dbUser[0].role;
        }
      }

      return token;
    },

    // ── Expose role + id on the session object ───────────────────────────
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
      }
      return session;
    },
  },
});
