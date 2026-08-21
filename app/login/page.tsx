'use client'
export const dynamic = 'force-dynamic'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default function Login() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [motDePasse, setMotDePasse] = useState('')
  const [erreur, setErreur] = useState('')
  const [chargement, setChargement] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setErreur('')
    setChargement(true)
    const { error } = await supabase.auth.signInWithPassword({ email, password: motDePasse })
    setChargement(false)
    if (error) {
      setErreur(error.message)
      return
    }
    router.push('/dashboard')
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-6">
      <form onSubmit={handleSubmit} className="w-full max-w-sm bg-white p-6 rounded-xl shadow">
        <h1 className="text-xl font-bold text-eglise-700 mb-4">Connexion</h1>
        {erreur && <p className="text-red-600 text-sm mb-3">{erreur}</p>}
        <input className="w-full border rounded p-2 mb-3" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input className="w-full border rounded p-2 mb-4" type="password" placeholder="Mot de passe" value={motDePasse} onChange={(e) => setMotDePasse(e.target.value)} required />
        <button disabled={chargement} className="w-full bg-eglise-600 text-white py-2 rounded-lg font-medium">
          {chargement ? 'Connexion...' : 'Se connecter'}
        </button>
      </form>
    </main>
  )
}
