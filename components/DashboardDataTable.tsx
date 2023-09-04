'use client'
import Image from "next/image"
import format from "date-fns/format"
import { Subscription, Payment } from "@prisma/client"
import { useAuth } from "@clerk/nextjs";
import { useQuery } from "@tanstack/react-query";
import { getSubscriptions } from "@/app/(application)/actions";

interface DashboardDataTableProps {
  initialData:
  | (Subscription & {
    payments: Payment[];
  })[]
}

export default function DashboardDataTable({ initialData }: DashboardDataTableProps
) {

  const { userId } = useAuth();
  const { data, isLoading } = useQuery({
    initialData: initialData,
    queryFn: () => getSubscriptions(userId!, { key: 'next_payment_date', value: 'asc' }),
    queryKey: ['dashboardData']
  })

  return (
    <div className="flex flex-col col-span-3 row-start-2 row-end-3 rounded-xl bg-zinc-50 p-6 xl:col-span-2">
      <h2 className="text-lg font-semibold">Upcoming payements</h2>
      <div className="relative mt-2 grow">
        <div className="absolute bottom-0 left-0 right-0 top-0 -mx-6 h-full overflow-x-auto overflow-y-auto">
          <table className="min-w-full">
            <thead>
              <tr>
                <th className="sticky top-0 border-b border-zinc-300 bg-zinc-50 bg-opacity-75 py-2 pl-6 pr-3 text-left text-sm text-zinc-400 backdrop-blur backdrop-filter font-light"> Name </th>
                <th className="sticky lg:table-cell hidden top-0 border-b border-zinc-300 bg-zinc-50 bg-opacity-75 py-2 text-left text-sm text-zinc-400 backdrop-blur backdrop-filter font-light"> Category </th>
                <th className="sticky hidden xl:table-cell top-0 border-b border-zinc-300 bg-zinc-50 bg-opacity-75 py-2 text-left text-sm text-zinc-400 backdrop-blur backdrop-filter font-light"> Billing period </th>
                <th className="sticky hidden xl:table-cell top-0 border-b border-zinc-300 bg-zinc-50 bg-opacity-75 py-2 text-left text-sm text-zinc-400 backdrop-blur backdrop-filter font-light"> Next peyment </th>
                <th className="sticky top-0 border-b border-zinc-300 bg-zinc-50 bg-opacity-75 py-2 pr-6 text-right text-sm text-zinc-400 backdrop-blur backdrop-filter font-light"> Cost </th>
              </tr>
            </thead>
            <tbody>
              {data && data.map(subscription => {
                return <tr key={subscription.id}>
                  <td className="whitespace-nowrap py-4 pl-6 text-sm">

                    <div className="flex items-center justify-start gap-2">
                      <Image
                        src={subscription.avatar_url}
                        alt={`{${subscription.name}} logo`}
                        className="rounded-full"
                        width={16}
                        height={16}
                      />

                      {subscription.name}
                    </div>
                  </td>
                  <td className="hidden lg:table-cell text-sm">{subscription.category}</td>
                  <td className="hidden xl:table-cell lowercase text-sm">{subscription.billing_period}</td>
                  <td className="hidden xl:table-cell text-sm">{format(subscription.next_payment_date, 'MMM dd, yyyy')}</td>
                  <td className="whitespace-nowrap py-4 pr-6 text-sm font-medium">

                    <div className="flex justify-end gap-2">
                      <p>{subscription.price}</p>
                      <p>{subscription.currency}</p>
                    </div>

                  </td>
                </tr>
              })}
            </tbody>

          </table>
        </div>

      </div>
    </div>


  )
}
