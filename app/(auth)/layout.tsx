import { Logo } from "@/components/Logo"

export default function Layout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <div className="relative flex flex-col h-screen w-full justify-center items-center">
      <Logo />
      <div className="mt-12">
        {children}
      </div>
    </div>
  )
}