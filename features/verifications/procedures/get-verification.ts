import { createProcedure } from "@/server/procedure";
import { z } from "zod";
import { verifications, pharmacies } from "@/drizzle/schema";
import { and, eq,  } from "drizzle-orm";

const OTP_EXPIRATION_MINUTES = 10;
//................................................................................................
export const getVerification = createProcedure({
  schema: z.object({
    pharmacyId: z.string().uuid(),
  }),
  protectClient: true,

  handler: async ({ context, input }) => {

    console.log("pharmacyId=:==========", input.pharmacyId)
    const userId = context.session?.user.id;
    if (!userId) {
      throw new Error("Unauthorized");
    }

    // 1. Confirm that this pharmacy belongs to the authenticated user.
    const [pharmacy] = await context.db
      .select({
        id: pharmacies.id,
        verificationStatus: pharmacies.verificationStatus,
      })
      .from(pharmacies)
      .where(
        and(eq(pharmacies.id, input.pharmacyId), eq(pharmacies.userId, userId)),
      )
      .limit(1);

    if (!pharmacy) {
      throw new Error("Pharmacy not found or access denied");
    }

    // 2. If the pharmacy has already been verified by an admin,
    // there is no need to restart OTP verification.
    if (pharmacy.verificationStatus === "verified") {
      return [
        {
          id: pharmacy.id,
          verificationStatus: pharmacy.verificationStatus,
        },
      ];
    }

    // 3. Find the current verification record.
    const [verification] = await context.db
      .select()
      .from(verifications)
      .where(
        and(
          eq(verifications.pharmacyId, input.pharmacyId),
          eq(verifications.userId, userId),
        ),
      )
      .limit(1);

    // 4. No verification record: start the verification process.
    if (!verification) {
      return [
        {
          id: pharmacy.id,
          verificationStatus: pharmacy.verificationStatus,
        },
      ];
    }

    // 5. OTP already confirmed: send the user to the pending page.
    if (verification.otpConfirmation !== null) {
      return [
        {
          isEmailVerified: true as const,
          verificationStatus: pharmacy.verificationStatus,
        },
      ];
    }

    // 6. Check whether the OTP has expired.
    const expirationTime =
      verification.createdAt.getTime() + OTP_EXPIRATION_MINUTES * 60 * 1000;

    const isExpired = Date.now() >= expirationTime;

    if (isExpired) {
      // Remove the expired verification and reset the pharmacy status.
      await context.db.transaction(async (tx) => {
        await tx
          .delete(verifications)
          .where(eq(verifications.id, verification.id));

        await tx
          .update(pharmacies)
          .set({
            verificationStatus: "not-verified",
          })
          .where(
            and(
              eq(pharmacies.id, input.pharmacyId),
              eq(pharmacies.userId, userId),
            ),
          );
      });

      return [
        {
          pharmacyId: pharmacy.id,
          verificationStatus: "not-verified" as const,
        },
      ];
    }

    // 7. OTP exists, has not been confirmed, and has not expired.
    return [{
      existOtp: true as const,
      verificationStatus: pharmacy.verificationStatus,
      expiresAt: new Date(expirationTime).toISOString(),
    }];
  },
});
