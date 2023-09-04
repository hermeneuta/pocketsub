import SingleStatsComponent from "./SingleStatsComponent"
import format from "date-fns/format"
import { SUBSCRIPTION_CURRENCY, Subscription, Payment, PAYMENT_STATUS } from "@prisma/client"

function summarizePrices(
  subscriptions:
    | (Subscription &
    { payments: Payment[] })[]
) {
  let totalEuro = 0;
  let totalUsd = 0;
  let totalPln = 0;

  for (let i = 0; i < subscriptions.length; i++) {
    if (subscriptions[i].currency === SUBSCRIPTION_CURRENCY.EUR) {
      totalEuro += subscriptions[i].price;
    }
    if (subscriptions[i].currency === SUBSCRIPTION_CURRENCY.USD) {
      totalUsd += subscriptions[i].price;
    }
    else if (subscriptions[i].currency === SUBSCRIPTION_CURRENCY.PLN) {
      totalPln += subscriptions[i].price;
    }
  }
  return {
    totalEur: parseFloat(totalEuro.toFixed(2)),
    totalUsd: parseFloat(totalUsd.toFixed(2)),
    totalPln: parseFloat(totalPln.toFixed(2)),
  }
}


function summarizePaymentAmounts(
  subscriptions:
    | (Subscription &
    { payments: Payment[] })[]
) {
  let totalEuroPaid = 0;
  let totalUsdPaid = 0;
  let totalPlnPaid = 0;
  let totalEuroNotPaid = 0;
  let totalUsdNotPaid = 0;
  let totalPlnNotPaid = 0;

  for (let i = 0; i < subscriptions.length; i++) {
    for (let j = 0; j < subscriptions[i].payments.length; j++) {
      let amount = subscriptions[i].payments[j].amount
      if (subscriptions[i].payments[j].status === PAYMENT_STATUS.PAID) {
        if (subscriptions[i].currency === SUBSCRIPTION_CURRENCY.EUR) {
          totalEuroPaid += amount
        } else if (subscriptions[i].currency === SUBSCRIPTION_CURRENCY.USD) {
          totalUsdPaid += amount
        } else if (subscriptions[i].currency === SUBSCRIPTION_CURRENCY.PLN) {
          totalPlnPaid += amount
        }
      }
      else {
        if (subscriptions[i].currency === SUBSCRIPTION_CURRENCY.EUR) {
          totalEuroNotPaid += amount
        } else if (subscriptions[i].currency === SUBSCRIPTION_CURRENCY.USD) {
          totalUsdNotPaid += amount
        } else if (subscriptions[i].currency === SUBSCRIPTION_CURRENCY.PLN) {
          totalPlnNotPaid += amount
        }
      }
    }
  }


  totalEuroPaid = parseFloat(totalEuroPaid.toFixed(2));
  totalUsdPaid = parseFloat(totalUsdPaid.toFixed(2));
  totalPlnPaid = parseFloat(totalPlnPaid.toFixed(2));
  totalEuroNotPaid = parseFloat(totalEuroNotPaid.toFixed(2));
  totalUsdNotPaid = parseFloat(totalUsdNotPaid.toFixed(2));
  totalPlnNotPaid = parseFloat(totalPlnNotPaid.toFixed(2));

  return {
    totalEuroPaid,
    totalUsdPaid,
    totalPlnPaid,
    totalEuroNotPaid,
    totalUsdNotPaid,
    totalPlnNotPaid,
  }
}


export default function DashboardMainStats(
  { subscriptions,
  }: {
    subscriptions:
    | (Subscription &
    {
      payments: Payment[]
    })[]
    | undefined;
  }) {
  if (!subscriptions) { return <div>...</div> }
  const subscriptionsSum = summarizePrices(subscriptions);
  const paymentAmounts = summarizePaymentAmounts(subscriptions);
  const eur_pln = 4.7
  const usd_pln = 4.5

  const paidSum = paymentAmounts.totalEuroPaid * eur_pln + paymentAmounts.totalUsdPaid * usd_pln + paymentAmounts.totalPlnPaid;
  const stillToPaySum = paymentAmounts.totalEuroNotPaid * eur_pln + paymentAmounts.totalUsdNotPaid * usd_pln + paymentAmounts.totalPlnNotPaid;
  const monthSumInPln = subscriptionsSum.totalEur * eur_pln + subscriptionsSum.totalUsd * usd_pln + subscriptionsSum.totalPln;

  return (
    <div className="col-span-3 row-start-1 row-end-2 rounded-xl bg-zinc-50 xl:col-span-2" >
      <div className="mx-6 flex h-full items-center justify-between gap-6">
        <div>
          <h1 className="text-xl font-semibold leading-5 tracking-wide">{format(new Date(), 'LLLL')}</h1>
          <p className="text-xs text-zinc-500 ">{format(new Date(), 'yyyy')}</p>
        </div>
        <div className="flex gap-6 items-center">
          <SingleStatsComponent sum={paidSum.toFixed(2)} subTitle="Already Paid" />
          <SingleStatsComponent sum={stillToPaySum.toFixed(2)} subTitle="Still to pay" />
          <SingleStatsComponent sum={monthSumInPln.toFixed(2)} subTitle="This month sum" />
        </div>
      </div>
    </div>
  )
}
