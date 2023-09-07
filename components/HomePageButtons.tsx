"use client";

import { UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import { Route } from "next";

export default function HomePageButtons() {
  const { isSignedIn } = useUser();

  return (
    <div className="flex items-center gap-4">
      {isSignedIn ? (
        <>
          <Link href={"/dashboard"}>Dashboard</Link>
          <UserButton afterSignOutUrl="/" />
        </>
      ) : (
        <div className="flex gap-2">
          <Link
            className="flex w-full text-zinc-800 items-center 
                    justify-center text-sm whitespace-nowrap font-medium leading-none p-4 mt-4 
                    rounded-lg border-[1px] border-zinc-500"
            href={"/sign-in" as Route}
          >
            Sign In
          </Link>
          <Link
            className="flex w-full text-zinc-50 bg-zinc-800 whitespace-nowrap items-center text-sm 
                    justify-center font-medium leading-none p-4 mt-4 
                    rounded-lg border-[1px] border-zinc-500"
            href={"/sign-up" as Route}
          >
            Sign Up
          </Link>
        </div>
      )}
    </div>
  );
}
