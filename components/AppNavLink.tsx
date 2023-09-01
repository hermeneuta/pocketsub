'use client'
import { usePathname } from "next/navigation";
import Link, { LinkProps } from "next/link";
import { UrlObject } from "url";
import clsx from "clsx";

interface AppNavLinkProps extends LinkProps<unknown> {
  iconName: string;
  text: string;
}


export default function AppNavLink(props: AppNavLinkProps) {
  const pathName = usePathname() //dodanie hooka 

  const isActive =
    pathName === props.href ||
    pathName === (props.href as UrlObject).pathname
  return <Link className={clsx("flex w-full items-center gap-2 px-8 py-4", isActive && 'border-r-4 border-zinc-400 bg-zinc-950 text-zinc-50')} href={props.href}>
    <i className={`ri-${props.iconName}-${isActive ? 'fill' : 'line'}`} />
    <p className="font-semibold">{props.text}</p></Link>
}
