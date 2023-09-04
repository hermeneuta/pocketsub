'use client'
import { ClerkLoading, useUser, SignOutButton } from "@clerk/nextjs";
import Image from "next/image"
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { useRouter } from "next/navigation"
import AddSubscriptionButton from "./AddSubscriptionButton";


export default function AppUserButton() {

  const { user } = useUser(); //hook dostarczony przez clerka
  const router = useRouter()

  if (!user) {
    return <ClerkLoading />
  }
  return (
    <div className="flex w-full items-center justify-center flex-col gap-4 divide-y-[1px] divide-zinc-300">
      <AddSubscriptionButton />
      <div className="flex items-center px-4 w-full py-4">
        <Image
          src={user.profileImageUrl}
          alt={`${user.username} avatar`}
          width={40}
          height={40}
          className="rounded-full"
        />
        <p className="ml-2 grow text-sm font-semibold">{user.username}</p>
        <button>
          <DropdownMenu.Root>
            <DropdownMenu.Trigger>
              <i className="ri-more-2-fill" />
            </DropdownMenu.Trigger>
            <DropdownMenu.Portal>
            </DropdownMenu.Portal>
            <DropdownMenu.Content className="min-w-[220px] rounded-md bg-zinc-50 p-2 shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform] data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade data-[side=right]:animate-slideLeftAndFade data-[side=top]:animate-slideDownAndFade">
              <DropdownMenu.Item>
                <SignOutButton signOutCallback={() => router.push("/")} />
              </DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Root>
        </button>
      </div>
    </div >
  )
}
