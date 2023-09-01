'use client';

import { UserButton, useUser } from "@clerk/nextjs"
import Link from "next/link"

export default function HomePageButtons() {
  const { isSignedIn } = useUser();

  return (
    <div className="flex items-center gap-4">
      {isSignedIn ? (
        <>
          <Link href={'/dashboard'}>Dashboard</Link>
          <UserButton afterSignOutUrl="/" />
        </>
      ) : (
        <div>
          <Link href={'/sign-in'}>SignIn</Link>
          <Link href={'/sign-up'}>SignUp</Link>
        </div>
      )
      }
    </div >
  )
}
