import Link from "next/link";
import logo from "../../../public/img/logo.png";
import Image from "next/image";
import AppNavLink from "@/components/AppNavLink";
import AppUserButton from "@/components/AppUserButton";
import { Inter } from "next/font/google"

const inter = Inter({
  subsets: ['latin'],
  display: 'swap'
})

export default function ApplicationLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <div className={`flex h-full ${inter.className}`}>
      <aside className="flex w-64 flex-col justify-between">
        <div>
          <Link className="flex items-center justify-start gap-2 p-8" href={"/"} >
            <Image src={logo} alt="Pocketsub logo" height={34} />
            <h1 className="text-lg font-semibold">pocketsub</h1></Link>
          <nav className="flex flex-col">
            <AppNavLink text="Dashboard" href={"/dashboard"} iconName="dashboard" />
            <AppNavLink text="Subscription" href={"/subscriptions"} iconName="file-text" />
          </nav>
        </div>
        <AppUserButton />
      </aside>
      <main className="h-screen grow overflow-hidden bg-zinc-200">{children}</main>
    </div>
  )
}
