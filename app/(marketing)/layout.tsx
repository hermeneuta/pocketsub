import Link from "next/link";
import logo from "../../public/img/logo.png";
import Image from "next/image";
import HomePageButtons from "@/components/HomePageButtons"

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <div>
      <header className="mx-auto flex max-w-7xl items-center p-6">
        <Link className="flex items-center gap-2" href={"/"} >
          <Image src={logo} alt="Pocketsub logo" height={34} />
          <h1 className="text-xl font-bold">Pocketsub</h1></Link>
        <nav className="w-full">
          <ul className="flex items-center justify-center gap-4">
            <li>
              <Link className="flex w-full text-zinc-800 whitespace-nowrap 
              items-center text-sm 
                    justify-center font-medium leading-none p-4 mt-4 
                    rounded-lg border-[1px] border-zinc-500" href={"/blog"}>Blog</Link>
            </li>
          </ul>
        </nav>
        <HomePageButtons />
      </header>
      {children}
    </div >
  )
}
