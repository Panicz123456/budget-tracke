'use client'

import { getBalanceStatsResponseType } from "@/app/api/stats/balance/route"
import { SkeletonWrapper } from "@/components/SkeletonWrapper"
import { Card } from "@/components/ui/card"
import { DateToUTCDate, GetFormatterFromCurrency } from "@/lib/helpers"
import { UserSettings } from "@prisma/client"
import { useQuery } from "@tanstack/react-query"
import { TrendingDown, TrendingUp, Wallet } from "lucide-react"
import { useCallback, useMemo } from "react"
import CountUp from 'react-countup'

interface Props {
  userSettings: UserSettings,
  from: Date,
  to: Date
}

export const StatsCard = ({ from, to, userSettings, }: Props) => {

  const StatsQuery = useQuery<getBalanceStatsResponseType>({
    queryKey: ["overview", "stats", from, to],
    queryFn: () =>
      fetch(
        `/api/stats/balance?from=${DateToUTCDate(from)}&to=${DateToUTCDate(to)}`
      ).then((res) => res.json())
  });

  const formatter = useMemo(() => {
    return GetFormatterFromCurrency(userSettings.currency)
  }, [userSettings.currency])

  const income = StatsQuery.data?.income || 0
  const expense = StatsQuery.data?.expense || 0

  const balance = income - expense

  return (
    <div className="relative flex w-full flex-wrap gap-2 md:flex-nowrap">
      <SkeletonWrapper isLoading={StatsQuery.isFetching}>
        <StatCard
          formatter={formatter}
          value={income}
          title="income"
          icon={
            <TrendingUp className="size-12 items-center rounded-lg p-2 text-emerald-500 bg-emerald-400/10" />
          }
        />
      </SkeletonWrapper>

      <SkeletonWrapper isLoading={StatsQuery.isFetching}>
        <StatCard
          formatter={formatter}
          value={expense}
          title="expense"
          icon={
            <TrendingDown className="size-12 items-center rounded-lg p-2 text-red-500 bg-red-400/10" />
          }
        />
      </SkeletonWrapper>

      <SkeletonWrapper isLoading={StatsQuery.isFetching}>
        <StatCard
          formatter={formatter}
          value={balance}
          title="balance"
          icon={
            <Wallet className="size-12 items-center rounded-lg p-2 text-violet-500 bg-violet-400/10" />
          }
        />
      </SkeletonWrapper>
    </div>
  )
}

function StatCard({ formatter, value, title, icon }: {
  formatter: Intl.NumberFormat;
  icon: React.ReactNode,
  title: string,
  value: number
}) {

  const formatFn = useCallback((value: number) => {
    return formatter.format(value)
  }, [formatter])
  return (
    <Card className="flex h-24 w-full items-center gap-2 p-4">
      {icon}
      <div className="flx flex-col items-center gap-0">
        <p className="text-muted-foreground">{title}</p>
        <CountUp
          preserveValue
          redraw={false}
          end={value}
          decimals={2}
          formattingFn={formatFn}
          className="text-2xl"
        />
      </div>
    </Card>
  )
}