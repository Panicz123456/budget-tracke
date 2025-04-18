import { PiggyBankIcon } from "lucide-react"
import Link from "next/link"


export const Logo = () => {
  return (
    <Link href="/" className="flex items-center gap-2">
      <PiggyBankIcon className="stroke size-11 stroke-amber-500 stroke-[1.5]" />
      <p className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-3xl font-bold leading-tight tracking-tighter text-transparent">
        BudgetTracker
      </p>
    </Link>
  )
}

export const MobileLogo = () => {
  return (
    <Link href="/" className="flex items-center gap-2">
      <p className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-3xl font-bold leading-tight tracking-tighter text-transparent">
        BudgetTracker
      </p>
    </Link>
  )
}