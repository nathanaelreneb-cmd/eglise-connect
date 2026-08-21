'use client'
export const dynamic = 'force-dynamic'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default function Signup() {
  const router = useRouter()
  const [nomEglise, setNomEglise] = useState('')
  const [ville, setVille] = useState('')
  const [nomAdmin, setNomAdmin] = useState('')
  const [email, setEmail] = useState('')
  const [motDePasse, setMotDePasse] = useState('')
  const [erreur, setErreur] = useState('')
  const [chargement, setChargement] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setErreur('')
    setChargement(true)
    try {
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password: motDePasse,
      })
      if (authError) throw authError
      const userId = authData.user?.id
      if (!userId) throw new Error("Compte créé — vérifiez votre email pour confirmer, puis connectez-vous.")

      const { data: eglise, error: egliseError } = await supabase
        .from('eglises')
        .insert({ nom: nomEglise, ville })
        .select()
        .single()
      if (egliseError) throw egliseError

      const { error: profilError } = await supabase.from('profils').insert({
        id: userId,
        eglise_id: eglise.id,
        nom_complet: nomAdmin,
        role: 'admin',
      })
      if (profilError) throw profilError

      router.push('/dashboard')
    } catch (err: any) {
      setErreur(err.message || 'Une erreur est survenue')
    } finally {
      setChargement(false)
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-6">
      <form onSubmit={handleSubmit} className="w-full max-w-sm bg-white p-6 rounded-xl shadow">
        <h1 className="text-xl font-bold text-eglise-700 mb-4">Créer mon église</h1>
        {erreur && <p className="text-red-600 text-sm mb-3">{erreur}</p>}
        <input className="w-full border rounded p-2 mb-3" placeholder="Nom de l'église" value={nomEglise} onChange={(e) => setNomEglise(e.target.value)} required />
        <input className="w-full border rounded p-2 mb-3" placeholder="Ville" value={ville} onChange={(e) => setVille(e.target.value)} />
        <input className="w-full border rounded p-2 mb-3" placeholder="Votre nom complet" value={nomAdmin} onChange={(e) => setNomAdmin(e.target.value)} required />
        <input className="w-full border rounded p-2 mb-3" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input className="w-full border rounded p-2 mb-4" type="password" placeholder="Mot de passe" value={motDePasse} onChange={(e) => setMotDePasse(e.target.value)} required minLength={6} />
        <button disabled={chargement} className="w-full bg-eglise-600 text-white py-2 rounded-lg font-medium">
          {chargement ? 'Création...' : "Créer mon église"}
        </button>
      </form>
    </main>
  )
}
