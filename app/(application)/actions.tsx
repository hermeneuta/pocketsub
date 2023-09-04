'use server'
import { prisma } from "@/lib/db";
import { PAYMENT_STATUS, SUBSCRIPTION_BILLING_PERIOD, SUBSCRIPTION_CURRENCY } from "@prisma/client";
import { auth } from "@clerk/nextjs/server";

interface addSubscriptionProps {
  name: string,
  category: string,
  avatar_url: string,
  nextPayment: string,
  price: number,
  billing_period: string,
  currency: SUBSCRIPTION_CURRENCY,
  userId: string,
}

export async function addSubscription(props: addSubscriptionProps) {
  const { name, userId, category, avatar_url, nextPayment, price, billing_period, currency } = props
  await prisma.subscription.create({
    data: {
      name,
      avatar_url,
      category,
      next_payment_date: new Date(nextPayment),
      price,
      start_date: new Date(),
      billing_period: billing_period as SUBSCRIPTION_BILLING_PERIOD,
      currency,
      ownerId: userId,
      payments: {
        create: {
          amount: price,
          due_date: new Date(nextPayment),
          status: PAYMENT_STATUS.NOT_PAID
        }
      }
    }
  })
}

export async function getSubscriptions(userId: string, orderBy: { key: string; value: string }) {

  try {
    const res = prisma.subscription.findMany({
      where: { ownerId: userId },
      include: { payments: true },
      orderBy: { [`${orderBy.key}`]: orderBy.value },
    })
    return res;
  } catch (error) {
    throw new Error("Failed to fetch data")
  }
}

