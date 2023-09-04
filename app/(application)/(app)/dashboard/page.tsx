import AppContentHeader from "@/components/AppContentHeader"
import { auth } from "@clerk/nextjs"
import DashboardMainStats from "@/components/DashboardMainStats"
import DashboardCatBreakdown from "@/components/DashboardCatBreakdown"
import DashboardDataTable from "@/components/DashboardDataTable"
import { getSubscriptions } from "../../actions"


//
//Komponent jest asynchroniczny ponieważ jest po stronie serwera
//
export default async function DashboardPage() {

  const { userId } = auth();
  const data = await getSubscriptions(userId!,
    { key: 'next_payment_date', value: 'desc' });

  if (!data) return null;
  return (
    <section className="h-full p-8">
      {/*top headers with buttons*/}
      <AppContentHeader title="Dashboard" />
      {/*content*/}
      <main className="mx-auto grid 
        h-full max-w-7xl grid-cols-3 grid-rows-[80px,_1fr] gap-6 py-6">

        {/*stats*/}
        <DashboardMainStats subscriptions={data} />

        {/*data table*/}
        <DashboardDataTable initialData={data} />

        {/*group stats*/}
        <DashboardCatBreakdown data={data} />
      </main>
    </section>
  )
}














