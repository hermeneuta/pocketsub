import { SUBSCRIPTION_CURRENCY } from "@prisma/client"

interface SingleStatsComponentProps {
  sum: number | string,
  subTitle: string
  currency?: SUBSCRIPTION_CURRENCY,
}

export default function SingleStatsComponent({ sum, currency = SUBSCRIPTION_CURRENCY.PLN, subTitle }: SingleStatsComponentProps) {
  return (
    <div>
      <h2 className="text-xl font-semibold leading-5 tracking-wide">
        {sum}
        <span className="ml-1 text-[8px] uppercase">
          {currency}</span></h2>
      <p className="text-xs text-zinc-500">
        {subTitle}</p>
    </div>
  )
}
