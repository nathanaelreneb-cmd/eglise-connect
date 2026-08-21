# Gestion Églises

Application multi-tenant de gestion pour églises (Next.js 14 + Supabase).
Chaque église a son propre compte, isolé via Row Level Security (RLS).

## Avant de déployer — étape Supabase obligatoire

Le schéma `eglise` est déjà créé dans le projet Supabase (tables : eglises,
profils, familles, membres, presences, dons, evenements, communications),
mais il n'est pas encore exposé à l'API. Sans cette étape, l'app ne pourra
pas lire/écrire dans la base.

1. Va sur https://supabase.com/dashboard
2. Ouvre ton projet
3. Project Settings → API → Data API → Exposed schemas
4. Ajoute `eglise` à la liste (en plus de `public`)
5. Sauvegarde

## Déployer avec Vercel CLI

```bash
npm install -g vercel
cd gestion-eglises
npm install
vercel --prod
```

Suis les instructions à l'écran (connexion à ton compte Vercel, choix du
projet). Aucune variable d'environnement à configurer : la clé Supabase
anon (publique par nature) est déjà intégrée dans `lib/supabase.ts`.

## Déployer via GitHub

1. Crée un nouveau repo sur GitHub
2. Depuis ce dossier :
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/TON-USER/TON-REPO.git
   git push -u origin main
   ```
3. Va sur https://vercel.com/new, importe le repo, clique Deploy.

## Lancer en local

```bash
npm install
npm run dev
```

Ouvre http://localhost:3000

## Ce que fait le MVP actuel

- `/` — page d'accueil
- `/signup` — créer une église + compte admin
- `/login` — connexion
- `/dashboard` — vue d'ensemble (nombre de membres)
- `/dashboard/membres` — liste + ajout de membres

## Prochaines étapes suggérées

- Présences aux cultes
- Dîmes / offrandes avec reçus (+ intégration Orange Money / MTN MoMo)
- Communication groupée (WhatsApp/SMS)
- Invitation de collaborateurs (staff) par l'admin
- Gestion des familles/cellules
