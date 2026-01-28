# 🏠 Kasa - Frontend

Kasa est une plateforme de location de logements entre particuliers, construite avec Next.js 16 et React 19. Cette application moderne offre une expérience utilisateur fluide pour explorer, réserver et gérer des propriétés.

## 📋 Table des Matières

- [Fonctionnalités](#-fonctionnalités)
- [Technologies](#️-technologies)
- [Prérequis](#-prérequis)
- [Installation](#-installation)
- [Configuration](#️-configuration)
- [Lancement](#-lancement)
- [Scripts Disponibles](#-scripts-disponibles)
- [Structure du Projet](#-structure-du-projet)
- [Backend](#-backend)
- [Tests](#-tests)
- [Déploiement](#-déploiement)

## ✨ Fonctionnalités

### 🔐 Authentification & Profils
- Inscription et connexion sécurisées
- Gestion de profil utilisateur
- Authentification basée sur JWT
- Réinitialisation de mot de passe

### 🏘️ Gestion des Propriétés
- Liste des propriétés disponibles avec filtres
- Pages détaillées des propriétés avec galerie d'images
- Ajout de propriétés pour les hôtes (avec tous les champs obligatoires)
- Modification et suppression de propriétés

### 💬 Messagerie
- Système de messagerie en temps réel entre utilisateurs
- Liste des conversations avec indicateurs de messages non lus
- Interface de chat intuitive et responsive

### ⭐ Système de Notation
- Notation des propriétés (1-5 étoiles)
- Affichage des moyennes et nombres d'avis
- Commentaires sur les propriétés

### ❤️ Favoris
- Ajout/retrait de propriétés en favoris
- Liste personnalisée des favoris

## 🛠️ Technologies

- **Framework**: [Next.js 16.1.4](https://nextjs.org/) (App Router)
- **UI Library**: [React 19.2.3](https://react.dev/)
- **Language**: [TypeScript 5](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS 3.4](https://tailwindcss.com/)
- **Testing**: [Jest 30](https://jestjs.io/) + [React Testing Library](https://testing-library.com/)
- **Code Quality**: ESLint + Prettier
- **Optimisation**: Next.js Image, Font Optimization

## 📦 Prérequis

- **Node.js**: v18.17 ou supérieur
- **npm**: v9 ou supérieur (ou yarn/pnpm)
- **Backend**: Le backend Kasa doit être lancé ([voir ici](#-backend))

## 🚀 Installation

1. **Cloner le dépôt**
```bash
git clone <votre-repo-url>
cd kasa/frontend
```

2. **Installer les dépendances**
```bash
npm install
```

## ⚙️ Configuration

1. **Créer le fichier d'environnement**

Créez un fichier `.env.local` à la racine du projet frontend :

```env
NEXT_PUBLIC_API_URL=http://localhost:4000
```

2. **Variables d'environnement**

| Variable | Description | Valeur par défaut |
|----------|-------------|-------------------|
| `NEXT_PUBLIC_API_URL` | URL de l'API backend | `http://localhost:4000` |

## 🎬 Lancement

### Mode Développement

```bash
npm run dev
```

L'application sera disponible sur [http://localhost:3000](http://localhost:3000)

### Mode Production

```bash
# Build de production
npm run build

# Lancer le serveur de production
npm start
```

## 📜 Scripts Disponibles

| Script | Description |
|--------|-------------|
| `npm run dev` | Lance le serveur de développement |
| `npm run build` | Crée un build de production optimisé |
| `npm start` | Lance le serveur en mode production |
| `npm run lint` | Vérifie le code avec ESLint |
| `npm run format` | Formate le code avec Prettier |
| `npm test` | Lance les tests Jest |

## 📁 Structure du Projet

```
frontend/
├── app/                    # Next.js App Router
│   ├── (auth)/            # Routes d'authentification
│   ├── host/              # Pages hôte
│   ├── messages/          # Messagerie
│   ├── profile/           # Profil utilisateur
│   ├── property/          # Pages propriétés
│   ├── layout.tsx         # Layout principal
│   └── page.tsx           # Page d'accueil
├── components/            # Composants React réutilisables
│   ├── auth/             # Composants d'authentification
│   ├── home/             # Composants page d'accueil
│   ├── host/             # Composants hôte
│   ├── messages/         # Composants messagerie
│   ├── profile/          # Composants profil
│   └── property/         # Composants propriétés
├── context/              # Contexts React (AuthContext)
├── hooks/                # Custom hooks React
├── lib/                  # Utilitaires et API client
├── public/               # Assets statiques
├── types/                # Définitions TypeScript
└── __tests__/            # Tests unitaires
```

## 🔗 Backend

Le backend de Kasa est un projet séparé disponible ici :

**👉 [Kasa Backend Repository](https://github.com/Jsampedro98/kasa-backend)**

Assurez-vous que le backend est lancé avant de démarrer le frontend.

## 🧪 Tests

Le projet utilise Jest et React Testing Library pour les tests.

```bash
# Lancer tous les tests
npm test

# Lancer les tests en mode watch
npm test -- --watch

# Lancer les tests avec couverture
npm test -- --coverage
```

## 🚢 Déploiement

### Vercel (Recommandé)

Le moyen le plus simple de déployer l'application est d'utiliser [Vercel](https://vercel.com):

1. Push votre code sur GitHub
2. Importez votre projet sur [Vercel](https://vercel.com/new)
3. Configurez la variable d'environnement `NEXT_PUBLIC_API_URL`
4. Déployez !

### Autres Plateformes

L'application peut également être déployée sur :
- Netlify
- AWS Amplify
- Railway
- Render

Consultez la [documentation Next.js](https://nextjs.org/docs/app/building-your-application/deploying) pour plus de détails.

## 🎨 Charte Graphique

- **Couleur principale**: Rouge Kasa (`#FF6060`)
- **Police**: Inter (Google Fonts)
- **Design**: Clean, moderne, responsive

## 📄 Licence

Ce projet est à usage éducatif uniquement.

## 👥 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à ouvrir une issue ou une pull request.

---

**Développé avec ❤️ pour Kasa**
