import { Subscription, Payment } from "@prisma/client";


interface DashboardCatBreakdownProps {
  data:
  | (Subscription & {
    payments: Payment[];
  })[]
}

// This is exchange rates supported in this app
export const exchangeRates: Record<string, number> = {
  EUR: 4.7,
  USD: 4.5,
  PLN: 1
}

export default function DashboardCatBreakdown({ data }: DashboardCatBreakdownProps) {

  function sumPricesByCategory(data: Subscription[]) {
    return data.reduce((acc: Record<string, number>, item) => {
      let price = item.currency in exchangeRates ? item.price * exchangeRates[item.currency] : item.price;

      //Add the price to the correct category
      if (item.category in acc) {
        acc[item.category] += price
      } else {
        acc[item.category] = price
      }

      return acc;
    }, {})
  }

  const result = Object.entries(sumPricesByCategory(data)).map(
    ([name, price]) => ({
      name, price,
    })
  )

  function findCheapestAndMostExpensive(
    data: {
      name: string,
      price: number
    }[]
  ) {
    const result = data.reduce(
      (acc, cur) => {
        if (cur.price > acc.mostExpensive.price) {
          acc.mostExpensive = cur
        }
        else if (cur.price < acc.cheapest.price) {
          acc.cheapest = cur
        }
        return acc
      }, { mostExpensive: data[0], cheapest: data[0] }
    )
    return result
  }

  const { mostExpensive, cheapest } = findCheapestAndMostExpensive(result)

  return (
    <div className="row-span-2 flex-col hidden rounded-xl bg-zinc-50 p-6 xl:flex">
      <h2 className="text-xl text-center font-semibold ">Category breakdown</h2>
      <div className="mt-2 w-full grow relative">
        <div className="absolute bottom-0 left-0 top-0 right-0 -mx-6 h-full">
          <table className="min-w-full">
            <thead>
              <tr>
                <th className="border-b border-zinc-300 bg-zinc-50 px-6 py-2 text-left font-light text-sm text-zinc-400">Category</th>
                <th className="border-b border-zinc-300 bg-zinc-50 px-6 py-2 text-right font-light text-sm text-zinc-400">Price</th>
              </tr>
            </thead>
            <tbody>
              {result.map(categoryData => {
                return <tr key={categoryData.name}>
                  <td className="whitespace-nowrap px-6 py-3 text-sm">
                    <p>{categoryData.name}</p></td>
                  <td className="whitespace-nowrap px-6 py-3 text-right font-semibold">
                    {categoryData.price.toFixed(2)} <span className="ml-1 uppercase text-[8px]">pln</span></td>
                </tr>
              })}
            </tbody>
          </table>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <div>
          <h3 className="text-lg font-semibold mb-2">Most expensive category</h3>
          <div className="flex items-center justify-between">
            <h4 className="text-sm">{mostExpensive.name}</h4>
            <p className="font-semibold text-zinc-950">{mostExpensive.price.toFixed(2)} <span className="ml-1 uppercase text-[8px]">pln</span></p>
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">Cheapest category</h3>
          <div className="flex items-center justify-between">
            <h4 className="text-sm">{cheapest.name}</h4>
            <p className="font-semibold text-zinc-950">{cheapest.price.toFixed(2)} <span className="ml-1 uppercase text-[8px]">pln</span></p>
          </div>
        </div>
      </div>
    </div>
  )
}
