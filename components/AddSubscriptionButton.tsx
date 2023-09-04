"use client"
import { SUBSCRIPTION_BILLING_PERIOD, SUBSCRIPTION_CURRENCY } from "@prisma/client";
import * as Dialog from "@radix-ui/react-dialog"
import { useState } from "react"
import format from "date-fns/format";
import { parse } from "path";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addSubscription } from "@/app/(application)/actions";
import { useUser } from "@clerk/nextjs";
import { ClerkLoading } from "@clerk/nextjs";



export default function AddSubscriptionButton() {

  const { user } = useUser();
  const [name, setName] = useState("");
  const [category, setCategory] = useState<string>("Entertainment");
  const [avatar, setAvatar] = useState<string>("https://dsc.cloud/88160a/Google-Avatar.png");
  const [cost, setCost] = useState<number>(0);
  const [billingPeriod, setBillingPeriod] = useState<string>(SUBSCRIPTION_BILLING_PERIOD.MONTHLY)
  const [nextPayment, setNextPayment] = useState<string>()
  const [currency, setCurrency] = useState<SUBSCRIPTION_CURRENCY>(
    SUBSCRIPTION_CURRENCY.EUR
  )

  const [isOpen, setIsOpen] = useState<boolean>(false)

  const client = useQueryClient()
  const mutation = useMutation({
    mutationFn: addSubscription,
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ['dashboardData'] })
    }
  })

  if (!user) return <ClerkLoading />

  return (
    <div>
      <p className="mb-2 text-center text-zinc-500">Add new subscription?</p>
      <Dialog.Root open={isOpen} onOpenChange={(open) => setIsOpen(open)}>
        <Dialog.Trigger>
          <button className="flex items-center bg-zinc-900 py-3 pl-4 pr-6 text-zinc-50 rounded-lg">
            <i className="ri-add-line text-2xl" />
            New subscription</button>
        </Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-10 bg-zinc-950 
              bg-opacity-80 data-[state=open]:animate-overlayShow"></Dialog.Overlay>
          <Dialog.Content className="fixed top-[50%] z-10 max-h-[85vh] 
              w-[480px] translate-x-[50%] translate-y-[-50%] rounded-3xl 
              bg-zinc-50 p-6 
              shadow-[0_2.8px_2.2px_rgba(0,_0,_0,_0.034),_0_6.7px_5.3px_rgba(0,_0,_0,_0.048),_0_12.5px_10px_rgba(0,_0,_0,_0.06),_0_22.3px_17.9px_rgba(0,_0,_0,_0.072),_0_41.8px_33.4px_rgba(0,_0,_0,_0.086),_0_100px_80px_rgba(0,_0,_0,_0.12)]">
            <Dialog.Title className="text-2xl font-medium">Add new subscription</Dialog.Title>
            <Dialog.Description className="mb-4 mt-5 font-medium">General information</Dialog.Description>
            <form action="">
              <div className="flex items-center gap-4">
                <div className="w-1/2">
                  <label
                    className="text-sm text-zinc-600 flex 
                  items-center gap-[2px] font-light"
                    htmlFor="name">
                    Name
                    <i className="ri-star-fill pb-2 text-[6px] text-red-700" />
                  </label>
                  <input
                    className="block w-full rounded-md border-0 
                  bg-zinc-200 p-2 text-sm text-zinc-800 outline-none 
                  ring-1 ring-inset ring-zinc-300 placeholder:text-zinc-400 fucus:ring-2 
                  focus:ring-inset focus:ring-zinc-950"
                    placeholder="Subscription name"
                    type="text"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    id="name" name="name" />
                </div>

                <div className="w-1/2">
                  <label
                    className="text-sm text-zinc-600 flex 
                  items-center gap-[2px] font-light"
                    htmlFor="category">Category
                    <i className="ri-star-fill pb-2 text-[6px] text-red-700" />
                  </label>
                  <div className="relative">
                    <select
                      className="block appearance-none w-full rounded-md border-0 
                  bg-zinc-200 p-2 text-sm text-zinc-800 outline-none 
                  ring-1 ring-inset ring-zinc-300 placeholder:text-zinc-400 fucus:ring-2 
                  focus:ring-inset focus:ring-zinc-950"
                      id="category"
                      value={category}
                      onChange={e => setCategory(e.target.value)}
                      name="category" >
                      <option selected value="Entertainment">Entertainment</option>
                      <option value="Insurance">Insurance</option>
                    </select>
                    <i className="absolute inset-y-0 right-0 flex items-center pr-2 text-zinc-400 ri-arrow-down-s-line"></i>
                  </div>
                </div>
              </div>

              <label
                className="pb-2 text-sm text-zinc-600 flex 
                  items-center gap-[2px] font-light"
                htmlFor="avat_url">Avatar URL</label>
              <div className="relative">
                <input
                  className="block w-full rounded-md border-0 
                  bg-zinc-200 p-2 text-sm text-zinc-800 outline-none 
                  ring-1 ring-inset ring-zinc-300 pl-20 pb-2 
                    placeholder:text-zinc-400 fucus:ring-2 
                  focus:ring-inset focus:ring-zinc-950"
                  placeholder="google.com"
                  type="text" id="avatar_url"
                  value={avatar}
                  onChange={e => setAvatar(e.target.value)}
                  name="avatar_url" />
                <div className="flex items-center absolute inset-y-0 
                    left-0 bg-zinc-400 p-2 rounded-md rounded-r-none">
                  https://
                </div>
              </div>
              <p className="pt-1 text-[10px] font-light text-zinc-700">Giving information about webpage you will help us generate proper avatar for your sevice.</p>

              <Dialog.Description className="mb-4 mt-5 font-medium">Expense information</Dialog.Description>

              <label
                className="pb-2 text-sm text-zinc-600 flex 
                  items-center gap-[2px] font-light"
                htmlFor="cost">Cost

                <i className="ri-star-fill pb-2 text-[6px] text-red-700" />
              </label>
              <div className="relative w-1/2">
                <input
                  className="block w-full rounded-md border-0 
                  bg-zinc-200 p-2 text-sm text-zinc-800 outline-none 
                  ring-1 ring-inset ring-zinc-300 placeholder:text-zinc-400 fucus:ring-2 
                  focus:ring-inset focus:ring-zinc-950"
                  type="number" min="0.01"
                  step="0.01"
                  placeholder="00.00"

                  value={cost}
                  onChange={e => {
                    const value = e.target.value

                    const floatVal = parseFloat(value)
                    if (!isNaN(floatVal)) {
                      setCost(floatVal)
                    }
                  }}
                  id="cost" name="cost" />
                <select
                  className="block appearance-none items-center rounded-l-none 
                    rounded-md border-0 bg-zinc-400 p-2 text-sm outline-none 
                  ring-1 ring-inset ring-zinc-300 placeholder:text-zinc-400 fucus:ring-2 
                  focus:ring-inset focus:ring-zinc-950 absolute inset-y-0 right-0 "
                  name="currency"
                  value={currency}
                  onChange={e => setCurrency(e.target.value as SUBSCRIPTION_CURRENCY)}
                  id="currency">
                  <option value="EUR">EUR</option>
                  <option value="USD">USD</option>
                  <option value="PLN">PLN</option>
                </select>
              </div>
              <Dialog.Description className="mb-4 mt-5 font-medium">Billing Information</Dialog.Description>
              <div className="flex items-center gap-4">
                <div className="w-1/2">
                  <label
                    className="pb-1 text-sm text-zinc-600 flex 
                  items-center gap-[2px] font-light"
                    htmlFor="billing_period">Billing period</label>
                  <div className="relative">
                    <select
                      className="block w-full appearance-none rounded-md border-0 
                  bg-zinc-200 p-2 text-sm text-zinc-800 outline-none 
                  ring-1 ring-inset ring-zinc-300 placeholder:text-zinc-400 fucus:ring-2 
                  focus:ring-inset focus:ring-zinc-950"
                      id="billing_period"

                      value={billingPeriod}
                      onChange={e => setBillingPeriod(e.target.value)}
                      name="billing_period" >
                      <option selected value={SUBSCRIPTION_BILLING_PERIOD.MONTHLY}>Monthly</option>
                      <option value={SUBSCRIPTION_BILLING_PERIOD.QUARTERLY}>Quartarly</option>
                      <option value={SUBSCRIPTION_BILLING_PERIOD.YEARLY}>Yearly</option>
                    </select>
                    <i className="absolute inset-y-0 right-0 flex items-center pr-2 text-zinc-400 ri-arrow-down-s-line"></i>
                  </div>
                </div>
                <div className="w-1/2">
                  <label
                    className="pb-1 text-sm text-zinc-600 flex 
                  items-center gap-[2px] font-light"
                    htmlFor="next_payement">Next payment</label>
                  <input
                    className="block w-full rounded-md border-0 
                  bg-zinc-200 p-2 text-sm text-zinc-800 outline-none 
                  ring-1 ring-inset ring-zinc-300 placeholder:text-zinc-400 fucus:ring-2 
                  focus:ring-inset focus:ring-zinc-950"
                    value={nextPayment}
                    min={format(new Date(), 'yyyy-MM-dd')}
                    onChange={e => setNextPayment(e.target.value)}
                    type="date"

                  />
                </div>
              </div>
              <div className="flex flex-col justify-center gap-4 mt-10">
                <Dialog.Close asChild>
                  <button className="flex w-full text-zinc-800 items-center 
                    justify-center font-medium leading-none p-4 mt-4 
                    rounded-lg border-[1px] border-zinc-500">
                    Cancel
                  </button>
                </Dialog.Close>
                <button className="flex w-full font-medium items-center 
                  justify-center text-zinc-100 bg-zinc-900 p-4 
                  rounded-lg border-[1px] leading-none"
                  onClick={
                    (e) => {
                      e.preventDefault();
                      if (!nextPayment) return;
                      mutation.mutate({
                        name,
                        category,
                        avatar_url: avatar,
                        billing_period: billingPeriod,
                        nextPayment,
                        currency,
                        price: cost,
                        userId: user.id,
                      })
                      setIsOpen(false)
                    }
                  }>
                  Add new subscription
                </button>
              </div>

            </form>
            <Dialog.Close asChild>
              <button className="absolute right-[16px] top-[24px] inline-flex items-center justify-center rounded-full px-2 shadow-zinc-950 focus:shadow-[0_0_0_2px] focus:outline-none" aria-label="Close">
                <i className="ri-close-line text-2xl text-zinc-950"></i>
              </button>
            </Dialog.Close>

          </Dialog.Content>

        </Dialog.Portal>
      </Dialog.Root>
    </div>
  )
}
