import Link from "next/link";
import heroImg from "../../public/img/hero_mock.webp"
import Image from "next/image";

export default function HomePage() {

  return (
    <>
      <section className="mx-auto max-w-7xl">
        <h2 className="mx-auto mb-6 mt-10 max-w-2xl text-center text-5xl font-bold">Easiest way to manage your payments</h2>
        <h3 className="text-xl max-w-3xl text-center font-medium text-zinc-700">Keep all your payments organized and easily
          accessible with PocketSub's simple and convenient system,
          designed to help you stay on top of your finances.
        </h3>
        <Link
          className="mx-auto mt-4 flex max-w-[240px] items-start justify-center rounded-lg bg-zinc-900 px-12 py-3 font-semibold tracking-wide text-zinc-100"
          href="/sign-up/">Get pocketSub</Link>
        <Image
          src={heroImg} alt="Hero image" className="mx-auto mt-10 px-4" />
      </section>
      <section className="mx-auto max-w-7xl">
        <p className="mt-20 text-center text-xs font-bold uppercase tracking-[2.4px] text-zinc-500">What is PocketSub?</p>
        <h2 className="mx-auto mb-6 mt-4 text-center max-w-2xl text-3xl font-bold">
          PocketSub redefines the way you manage your payments.
        </h2>
        <h3 className="mx-auto max-w-2xl text-center text-zinc-700">
          Instead of relaying of manual methods
          such as spreadsheets or individual subscription
          accoutns, PocketSub provides a streamlined and user-friendly
          platform that enables users to easily track and manage
          all their recurring payments and subscriptions in one place.
        </h3>
      </section>
    </>
  )
}
