'use client'
export const dynamic = 'force-dynamic'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function Dashboard() {
  const [nomEglise, setNomEglise] = useState('')
  const [nbMembres, setNbMembres] = useState(0)

  useEffect(() => {
    async function charger() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return
      const { data: profil } = await supabase.from('profils').select('eglise_id').eq('id', user.id).single()
      if (!profil) return
      const { data: eglise } = await supabase.from('eglises').select('nom').eq('id', profil.eglise_id).single()
      if (eglise) setNomEglise(eglise.nom)
      const { count } = await supabase.from('membres').select('*', { count: 'exact', head: true }).eq('eglise_id', profil.eglise_id)
      setNbMembres(count || 0)
    }
    charger()
  }, [])

  return (
    <div>
      <h1 className="text-2xl font-bold text-eglise-700 mb-1">{nomEglise || 'Votre église'}</h1>
      <p className="text-gray-500 mb-6">Vue d'ensemble</p>
      <div className="bg-white rounded-xl shadow p-5 w-48">
        <p className="text-sm text-gray-500">Membres inscrits</p>
        <p className="text-3xl font-bold text-eglise-700">{nbMembres}</p>
      </div>
    </div>
  )
}
