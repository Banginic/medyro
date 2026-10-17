"use client";
import { signInWithGoogle } from "@/app/actions/authActions";
import { auth } from "@/lib/auth";
import {signIn } from "next-auth/react";

function PublicSignIn() {

  
  return (
    <section className="grid place-items-center h-[70dvh] z-50 ">
      <div className="border border-pink-200 p-8 rounded w-[95%] max-w-sm bg-purple-950">
        <h1 className="text-xl font-semibold lg:text-2xl text-pink-400">
          Sign in
        </h1>
        <p className="text-gray-200">Sign in using any of the methods below.</p>

        <form action="" className="mt-8 mb-4">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="example@email.com"
            className="border w-full py-2 px-4 rounded mt-1"
          />
          <button className="mt-4 bg-linear-to-br from-pink-400 to-pink-600 w-full rounded py-2 cursor-pointer hover:bg-pink-500">
            Sign in
          </button>
        </form>
        <div className="flex items-center gap-2">
          <hr className="border border-pink-200 w-1/2" />
          <span>Or</span>
          <hr className="border w-1/2 border-pink-200" />
        </div>

        <form action={signInWithGoogle}>
          <button
            type="submit"
            onClick={() => signIn("google")}
            className="border border-pink-200 py-2 px-4 rounded mt-4 w-full hover:border-pink-400 hover:text-pink-400 cursor-pointer"
          >
            Sign in with Google
          </button>
        </form>
      </div>
    </section>
  );
}

export default PublicSignIn;
