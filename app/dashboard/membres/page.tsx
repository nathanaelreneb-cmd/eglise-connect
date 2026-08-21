'use client'
export const dynamic = 'force-dynamic'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

type Membre = { id: string; nom: string; prenom: string | null; telephone: string | null; statut: string }

export default function Membres() {
  const [membres, setMembres] = useState<Membre[]>([])
  const [egliseId, setEgliseId] = useState<string | null>(null)
  const [nom, setNom] = useState('')
  const [prenom, setPrenom] = useState('')
  const [telephone, setTelephone] = useState('')

  async function charger() {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return
    const { data: profil } = await supabase.from('profils').select('eglise_id').eq('id', user.id).single()
    if (!profil) return
    setEgliseId(profil.eglise_id)
    const { data } = await supabase.from('membres').select('*').eq('eglise_id', profil.eglise_id).order('created_at', { ascending: false })
    setMembres(data || [])
  }

  useEffect(() => { charger() }, [])

  async function ajouterMembre(e: React.FormEvent) {
    e.preventDefault()
    if (!egliseId || !nom) return
    await supabase.from('membres').insert({ eglise_id: egliseId, nom, prenom, telephone })
    setNom(''); setPrenom(''); setTelephone('')
    charger()
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-eglise-700 mb-4">Membres</h1>
      <form onSubmit={ajouterMembre} className="bg-white rounded-xl shadow p-4 mb-6 flex flex-wrap gap-2">
        <input className="border rounded p-2 flex-1 min-w-[120px]" placeholder="Nom" value={nom} onChange={(e) => setNom(e.target.value)} required />
        <input className="border rounded p-2 flex-1 min-w-[120px]" placeholder="Prénom" value={prenom} onChange={(e) => setPrenom(e.target.value)} />
        <input className="border rounded p-2 flex-1 min-w-[120px]" placeholder="Téléphone" value={telephone} onChange={(e) => setTelephone(e.target.value)} />
        <button className="bg-eglise-600 text-white px-4 rounded-lg font-medium">Ajouter</button>
      </form>
      <div className="bg-white rounded-xl shadow divide-y">
        {membres.map((m) => (
          <div key={m.id} className="p-3 flex justify-between">
            <span>{m.nom} {m.prenom}</span>
            <span className="text-gray-500 text-sm">{m.telephone} · {m.statut}</span>
          </div>
        ))}
        {membres.length === 0 && <p className="p-4 text-gray-400 text-sm">Aucun membre pour l'instant.</p>}
      </div>
    </div>
  )
}
