# Aziry

Aziry is a web application built with Next.js, TypeScript, and Tailwind CSS. It features user authentication, a landing page, and integration with the Solana blockchain.

## 🚀 Features

- 🔐 User authentication with NextAuth.js (Google Sign-In)
- 🌍 Landing page with key features and trading volume display
- 🔗 Solana blockchain integration for transactions
- 🎨 Modern UI with reusable components
- 🛠 Built using Next.js, TypeScript, Tailwind CSS, and Prisma

## 📁 Project Structure

```
.env
.env.sample
.eslintrc.json
.gitignore
.next/
app/
components/
db/
hooks/
lib/
next-env.d.ts
next.config.mjs
package.json
postcss.config.js
prisma/
tailwind.config.ts
tsconfig.json
```

### Key Directories

- **app/** - Main application code, including API routes and pages.
- **components/** - Reusable UI components.
- **db/** - Database-related code.
- **hooks/** - Custom React hooks.
- **lib/** - Utility functions and configurations.
- **prisma/** - Prisma schema and migrations.

## 📦 Getting Started

### Prerequisites

- Node.js
- npm or yarn

### Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/yourusername/aziry.git
   cd aziry
   ```

2. Install dependencies:

   ```sh
   npm install
   # or
   yarn install
   ```

3. Set up environment variables:
   ```sh
   cp .env.sample .env
   ```
   Fill in the required values in the `.env` file.

### Running the Development Server

```sh
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production

```sh
npm run build
npm start
# or
yarn build
yarn start
```

## 🔑 Authentication

Authentication is handled using NextAuth.js, allowing users to sign in with Google.

## 🔗 Solana Integration

The application integrates with the Solana blockchain to perform transactions. The relevant code can be found in `route.ts`.

## 🎨 UI Components

Reusable UI components are located in the `components/` directory. Some key components include:

- `PrimaryButton`
- `Hero`
- `Features`
- `TradingVolume`
- `Footer`

## 🎨 Styling

Styling is done using Tailwind CSS. Configuration can be found in `tailwind.config.ts`.

## 🤝 Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request.

## 📜 License

This project is licensed under the MIT License.
