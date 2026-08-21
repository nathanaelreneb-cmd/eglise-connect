import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
      <h1 className="text-3xl font-bold text-eglise-700 mb-3">Gestion Églises</h1>
      <p className="text-gray-600 max-w-md mb-8">
        Plateforme multi-églises : membres, présences, dons et communication —
        chaque église dispose de son propre espace.
      </p>
      <div className="flex gap-4">
        <Link href="/signup" className="bg-eglise-600 text-white px-5 py-2 rounded-lg font-medium">
          Créer mon église
        </Link>
        <Link href="/login" className="border border-eglise-600 text-eglise-700 px-5 py-2 rounded-lg font-medium">
          Se connecter
        </Link>
      </div>
    </main>
  )
}
