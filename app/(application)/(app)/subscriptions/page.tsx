import AppContentHeader from "@/components/AppContentHeader"
import { exchangeRates } from "@/components/DashboardCatBreakdown";
import SingleStatsComponent from "@/components/SingleStatsComponent";
import { Subscription, Payment, SUBSCRIPTION_BILLING_PERIOD, PAYMENT_STATUS } from "@prisma/client"
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import format from "date-fns/format";
import { getSubscriptions } from "../../actions";

function getStats(
  data: (Subscription & { payments: Payment[] })[]
) {

  let activeSubs = 0;
  let mostExpensive = 0;
  let cheapest = Infinity;
  let totalMonthlyCost = 0;
  let totalYearlyCost = 0;

  data.forEach(subscription => {
    activeSubs++;

    const costInPln = subscription.price * exchangeRates[subscription.currency]

    if (costInPln > mostExpensive) {
      mostExpensive = costInPln
    }

    if (costInPln < cheapest) {
      cheapest = costInPln
    }

    switch (subscription.billing_period) {
      case SUBSCRIPTION_BILLING_PERIOD.MONTHLY:
        totalMonthlyCost += costInPln;
        totalYearlyCost += costInPln * 12;
        break;
      case SUBSCRIPTION_BILLING_PERIOD.QUARTERLY:
        totalMonthlyCost += costInPln / 3;
        totalYearlyCost += costInPln * 4;
        break;
      case SUBSCRIPTION_BILLING_PERIOD.YEARLY:
        totalMonthlyCost += costInPln / 12;
        totalYearlyCost += costInPln;
        break;
      default:
        break;
    }
  })
  const avgCostPerSub = totalMonthlyCost / activeSubs;
  return {
    totalActiveSubs: activeSubs,
    mostExpensive: mostExpensive.toFixed(2),
    cheapest: cheapest.toFixed(2),
    averageCostPerSub: avgCostPerSub.toFixed(2),
    totalMonthlyCost: totalMonthlyCost.toFixed(2),
    totalYearlyCost: totalYearlyCost.toFixed(2)
  }
}

export default async function SubscriptionPage() {

  const { userId } = auth();
  const data = await getSubscriptions(userId!, { key: 'next_payment_date', value: 'desc' });
  if (!data) return null;

  const stats = getStats(data);

  return (
    <section className="h-full p-8">
      {/*top headers with buttons*/}
      <AppContentHeader title="Subscriptions" />
      {/*content*/}
      <main className="mx-auto grid h-full max-w-7xl grid-cols-1 grid-rows-[80px,_1fr] gap-6 py-6">

        <div className="rounded-xl bg-zinc-50 p-6">
          <div className="flex h-full justify-between items-center gap-6">
            <div className="flex h-full items-center">
              <SingleStatsComponent
                sum={stats.totalActiveSubs}
                subTitle="Total active"
              />
            </div>
            <div className="flex h-full items-center gap-4">
              <SingleStatsComponent
                sum={stats.mostExpensive}
                subTitle="Most expensive"
              />
              <SingleStatsComponent
                sum={stats.cheapest}
                subTitle="Cheapest"
              />
              <SingleStatsComponent
                sum={stats.averageCostPerSub}
                subTitle="Avg cost"
              />
              <SingleStatsComponent
                sum={stats.totalMonthlyCost}
                subTitle="Total monthly"
              />
              <SingleStatsComponent
                sum={stats.totalYearlyCost}
                subTitle="Total yearly"
              />
            </div>
          </div>

        </div>
        <div className="flex flex-col rounded-xl bg-zinc-50 p-6">

          <h2 className="text-lg font-semibold">
            Subscriptions
          </h2>
          <div className="relative mt-2 grow">
            <div className="absolute bottom-0 top-0 left-0 right-0 overflow-x-auto overflow-y-auto -mx-6">
              <table className="min-w-full">
                <thead>
                  <tr>
                    <th className="sticky top-0 z-10 border-b 
                    border-zinc-300 bg-zinc-50 bg-opacity-75 
                    py-2 pl-6 text-left text-sm font-light text-zinc-500 
                    backdrop-filter backdrop-blur">Name</th>
                    <th className="hidden lg:table-cell sticky top-0 z-10 border-b 
                    border-zinc-300 bg-zinc-50 bg-opacity-75 py-2 text-left text-sm 
                    font-light text-zinc-500 backdrop-filter backdrop-blur">Category</th>
                    <th className="hidden xl:table-cell sticky top-0 z-10 border-b border-zinc-300 bg-zinc-50 bg-opacity-75 py-2 text-left text-sm font-light text-zinc-500 backdrop-filter backdrop-blur">Billing period</th>
                    <th className="hidden xl:table-cell sticky top-0 z-10 border-b border-zinc-300 bg-zinc-50 bg-opacity-75 py-2 text-left text-sm font-light text-zinc-500 backdrop-filter backdrop-blur">Next payment</th>
                    <th className="sticky top-0 z-10 border-b border-zinc-300 bg-zinc-50 bg-opacity-75 py-2 text-left text-sm font-light text-zinc-500 backdrop-filter backdrop-blur">Payment status</th>
                    <th className="sticky top-0 z-10 border-b border-zinc-300 bg-zinc-50 bg-opacity-75 py-2 pr-6 text-right text-sm font-light text-zinc-500 backdrop-filter backdrop-blur">Cost</th>
                    <th className="sticky top-0 z-10 border-b border-zinc-300 bg-zinc-50 bg-opacity-75 py-2 text-left text-sm font-light text-zinc-500 backdrop-filter backdrop-blur">
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data.map(subscription => {
                    return <tr key={subscription.id}>
                      <td className="whitespace-nowrap py-4 pl-6 text-sm">
                        <div className="flex items-center justify-start gap-2">
                          <Image
                            src={subscription.avatar_url}
                            alt={`${subscription.name} logo`}
                            className="rounded-full"
                            width={16}
                            height={16}
                          />
                          {subscription.name}
                        </div>
                      </td>

                      <td className="hidden lg:table-cell whitespace-nowrap py-4 text-sm">{subscription.category}</td>
                      <td className="hidden xl:table-cell whitespace-nowrap py-4 text-sm lowercase">{subscription.billing_period}</td>
                      <td className="hidden xl:table-cell whitespace-nowrap py-4 text-sm">{format(subscription.next_payment_date, "MMM dd, yyyy")}</td>
                      <td className="whitespace-nowrap py-4 text-sm">{subscription.payments[0].status === PAYMENT_STATUS.PAID ? (
                        <div className="flex items-center gap-2">
                          <i className="ri-checkbox-circle-fill text-green-600"></i>
                          <p>paid</p>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <i className="ri-indeterminate-circle-fill text-red-600"></i>
                          <p>not paid</p>
                        </div>
                      )}
                      </td>
                      <td className="whitespace-nowrap py-4 pr-6 text-sm">
                        <div className="flex items-center gap-2 justify-end">
                          <p>{subscription.price}</p>
                          <p>{subscription.currency}</p>
                        </div>
                      </td>
                      <td>
                        <button className="flex items-center rounded-md bg-zinc-200 text-zinc-700 px-2">
                          <i className="ri-pencil-line mr-1 text-lg"></i>
                          <p>Edit<span className="sr-only">{subscription.name}</span></p>
                        </button>
                      </td>
                    </tr>
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>

      </main>

    </section >
  )
}








