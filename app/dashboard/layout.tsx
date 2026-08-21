'use client'
import Link from 'next/link'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex">
      <aside className="w-56 bg-eglise-700 text-white p-5 flex flex-col gap-3">
        <h2 className="font-bold text-lg mb-4">Gestion Églises</h2>
        <Link href="/dashboard">Vue d'ensemble</Link>
        <Link href="/dashboard/membres">Membres</Link>
      </aside>
      <div className="flex-1 p-6">{children}</div>
    </div>
  )
}
