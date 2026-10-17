"use client";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Mail, Lock, User,  } from "lucide-react";
import { LoadingBTN } from "@/components/index";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignUpSchema, SignUpSchemaType } from "../schemas/signUpSchema";
import { useMutate } from "@/hooks/useMutate";
import { UserTypes } from "../types";
import { createUser } from "../actions/createUser";
import { useRouter } from "next/navigation";

function SignUpForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter()

  function handleSubmitSuccess() {
    reset();
    router.push('/auth/sign-in')
  }

  const { mutate, isPending } = useMutate<UserTypes, SignUpSchemaType>({
    mutationFn: createUser,
    queriesToInvalidate: [["User"]],
    handleSubmitSuccess,
  });

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<SignUpSchemaType>({
    resolver: zodResolver(SignUpSchema),
  });

  const onSubmit = async (data: SignUpSchemaType) => {
    mutate(data);
  };

  return (
    <Card className="p-4 lg:p-8 w-[98%] max-w-lg mx-auto relative">
      <CardHeader>
        <CardTitle>Sign up form</CardTitle>
        <CardDescription className="text-muted-foreground">
          Add new user using the form below.
        </CardDescription>
      </CardHeader>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 text-foreground"
      >
        <div className="grid  gap-4">
          <div className="space-y-2 ">
            <Label htmlFor="name" className="text-muted-foreground">
              Full Name
            </Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="name"
                type="text"
                placeholder="John Smith"
                className="pl-8"
                {...register("name", { required: true })}
              />
            </div>
            {errors.name && (
              <p className="text-sm text-pink-400 m-1">{errors.name.message}</p>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="email" className="text-muted-foreground">
            Email Address
          </Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="email"
              type="email"
              placeholder="example@email.com"
              {...register("email", { required: true })}
              className="pl-10"
            />
          </div>
          {errors.email && (
            <p className="text-sm text-pink-400 m-1">{errors.email.message}</p>
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
              type={showPassword ? "text" : "password"}
              placeholder="Create a strong password"
              {...register("password", { required: true })}
              className="pl-10 pr-10"
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-0 top-0 shadow-0 h-full px-3 hover:bg-transparent"
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
            <p className="text-sm text-pink-400 m-1">
              {errors.password.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirmPassword" className="text-muted-foreground">
            Confirm Password
          </Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm your password"
              {...register("confirmPassword", { required: true })}
              className="pl-10 pr-10"
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-0 shadow-0 top-0 h-full px-3 hover:bg-transparent"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? (
                <EyeOff className="h-4 w-4 text-muted-foreground" />
              ) : (
                <Eye className="h-4 w-4 text-muted-foreground" />
              )}
            </Button>
          </div>
          {errors.confirmPassword && (
            <p className="text-sm text-pink-400 m-1">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        <div className="flex items-center space-x-2 text-x">
          <input
            id="terms"
            type="checkbox"
            className="h-4 w-4 rounded border-border text-primary focus:ring-primary focus:ring-offset-0"
            required
          />
          <Label htmlFor="terms" className="text-xs text-muted-foreground">
            I agree to the{" "}
            <Link
              href="/footer/terms"
              className="text-primary hover:text-accent transition-colors text-xs"
            >
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link
              href="/footer/privacy"
              className="text-primary hover:text-accent transition-colors "
            >
              Privacy Policy
            </Link>
          </Label>
        </div>

        <Button disabled={isPending} type="submit" className="w-full mt-4 ">
          {" "}
          {isPending ? <LoadingBTN message="Creating..." /> : "Create Account"}
        </Button>
      </form>
    </Card>
  );
}

export default SignUpForm;
