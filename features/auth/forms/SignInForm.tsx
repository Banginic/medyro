"use client";
import { useState } from "react";
import Link from "next/link";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Mail, Lock, X } from "lucide-react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoadingBTN } from "@/components/index";
import { SignInSchema, SignInSchemaType } from "../schemas/signInSchema";

const SignInForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setLoading] = useState(false);

  const adminUrl = process.env.NEXT_PUBLIC_ADMIN_URL!;
  const { update } = useSession();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SignInSchemaType>({
    resolver: zodResolver(SignInSchema),
  });

  const onSubmit = async (data: SignInSchemaType) => {
    setError("");
    setLoading(true);

    try {
      const result = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (!result || result.error) {
        setError("Invalid email or password.");
        return;
      }

      // Refresh the session after successful authentication
      const session = await update();

      const role = session?.user?.role;

      switch (role) {
        case "admin":
          router.replace(adminUrl);
          break;

        case "profile":
          router.replace("/pharmacy");
          break;

        case "user":
          router.replace("/");
          break;

        default:
          setError("Unable to determine your account role.");
          break;
      }

      reset();
    } catch {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=" min-h-screen relative grid place-items-center">
      <Button
        className="absolute top-6 right-6"
        variant={"ghost"}
        type="button"
        disabled={isLoading}
        asChild
      >
        <Link href={"/"}>
          <X />
        </Link>
      </Button>
      <Card className=" p-4 lg:p-6 w-[98%] max-w-110 absolute">
        <CardHeader>
          <CardTitle className="">Sign in</CardTitle>
          <CardDescription className="text-muted-foreground">
            Sign in to your account to manage your account.
          </CardDescription>
        </CardHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-muted-foreground">
              Email
            </Label>
            <div className="relative ">
              <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                {...register("email", { required: true })}
                placeholder="username or email"
                className="pl-10 text-foreground"
              />
            </div>
            {errors.email && (
              <p className="text-pink-400 m-1 text-sm">
                {errors.email.message}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="password" className="text-muted-foreground">
              Password
            </Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="password"
                {...register("password", { required: true })}
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="pl-10 pr-10 text-foreground"
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0 shadow-0 shadow-xs h-full px-3 hover:bg-transparent"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <Eye className="h-4 w-4 text-muted-foreground" />
                )}
              </Button>
            </div>
            {errors.password && (
              <p className="text-pink-400 m-1 text-sm">
                {errors.password.message}
              </p>
            )}
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <input
                id="remember"
                type="checkbox"
                className="h-4 w-4 rounded border-border text-primary focus:ring-primary focus:ring-offset-0"
              />
              <Label
                htmlFor="remember"
                className="text-sm text-muted-foreground"
              >
                Remember me
              </Label>
            </div>
            <Link
              href="/admin/forgot-password"
              className="text-sm text-primary hover:text-primary-glow transition-colors"
            >
              Forgot password?
            </Link>
          </div>

          <Button type="submit" disabled={isLoading} className="mt-8">
            {isLoading ? <LoadingBTN message="Logging in" /> : "Sign In"}
          </Button>

          <p className="text-pink-400 text-center ">{error}</p>
        </form>
      </Card>
    </div>
  );
};

export default SignInForm;
