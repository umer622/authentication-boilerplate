# Next.js Authentication Boilerplate

![Next.js](https://img.shields.io/badge/Next.js-v14.2.8-blue)
![Prisma](https://img.shields.io/badge/Prisma-%40db.ObjectId-green)
![NextAuth](https://img.shields.io/badge/NextAuth-v4.0-orange)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-v14.4-blue)
![Vercel](https://img.shields.io/badge/Deploy-Vercel-lightgrey)

This is a **Next.js Authentication Boilerplate** designed to provide a simple yet powerful starting point for building web applications with secure authentication. This setup includes **NextAuth.js** for authentication, **Prisma** for database access (PostgreSQL), **server actions** for better request handling, and deployment on **Vercel**.

## Key Technologies

- **Next.js** (v14.2.8): A React framework for building server-side rendered and static web applications.
- **NextAuth.js** (v4.0): Easy-to-integrate authentication solution for Next.js apps, supporting various authentication providers.
- **Prisma ORM**: A powerful ORM to interact with PostgreSQL databases, supporting migrations, schema management, and data queries.
- **PostgreSQL** (v14.4): A reliable and powerful relational database system.
- **Vercel**: A cloud platform for hosting Next.js applications with built-in optimizations.

---

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Authentication](#authentication)
- [Database Setup](#database-setup)
- [Server Actions](#server-actions)
- [Environment Variables](#environment-variables)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

---

## Features

- **Secure Authentication** with customizable NextAuth.js support for providers like GitHub, Google, etc.
- **Prisma ORM** integration for seamless interaction with PostgreSQL databases.
- **Server-side rendering** optimized for fast page loads and SEO.
- **Server Actions** to handle API logic on the server with Next.js API routes.
- **Ready for Production** deployment on **Vercel**, with easy integration.

---

## Prerequisites

To run this project, ensure you have the following installed:

- **Node.js** (v14 or later): [Download Node.js](https://nodejs.org/en/)
- **PostgreSQL** (v14 or later): [Install PostgreSQL](https://www.postgresql.org/)
- **Prisma CLI**: `npm install -g prisma`

---

## Getting Started

Follow these steps to set up the project locally.

### 1. Clone the Repository

```bash
git clone https://github.com/umer622/authentication-boilerplate.git
cd authentication-boilerplate
```

### 2. Install Dependencies

Install the required dependencies for the project:

```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env` file in the root directory and add the following:

```bash
DATABASE_URL=postgresql://<username>:<password>@localhost:5432/<database_name>
NEXTAUTH_SECRET=your-secret-key
NEXTAUTH_URL=http://localhost:3000
```

Replace the placeholders with your PostgreSQL credentials and secret keys.

### 4. Set Up Prisma

Run Prisma to generate the client and create your database schema:

```bash
npx prisma generate
npx prisma migrate dev --name init
```

This will initialize your database schema based on the `prisma/schema.prisma` file.

### 5. Run the Development Server

Start the Next.js development server:

```bash
npm run dev
```

The app will run at [http://localhost:3000](http://localhost:3000).

---

## Project Structure

Here’s an overview of the file structure used in this boilerplate:

```bash
├── prisma/
│   ├── migrations/       # Auto-generated folder for database migrations
│   └── schema.prisma     # Prisma schema definition
├── src/
│   ├── app/              # Next.js app directory structure
│   ├── auth/             # NextAuth configuration
│   └── components/       # Reusable components (Forms, Layouts, etc.)
├── pages/
│   └── api/auth/         # API route for NextAuth authentication
├── public/               # Static files (images, icons, etc.)
├── middleware.ts         # JWT authentication middleware
└── .env                  # Environment variables configuration
```

---

## Authentication

Authentication in this boilerplate is handled by NextAuth.js. It comes with built-in support for OAuth providers, including:

- GitHub
- Google
- Credentials (Email and Password)

You can configure providers by modifying the `src/auth/[...nextauth].ts` file. Here’s an example of adding GitHub authentication:

```ts
import NextAuth from 'next-auth';
import GitHubProvider from 'next-auth/providers/github';

export default NextAuth({
    providers: [
        GitHubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
});
```

You can add multiple providers or configure session management, user roles, and JWT handling as per your requirements.

---

## Database Setup

The project uses Prisma to interact with a PostgreSQL database. Prisma makes it simple to work with a database by using models defined in the `prisma/schema.prisma` file.

An example of a user model:

```prisma
model User {
    id        String   @id @default(uuid())
    email     String   @unique
    password  String
    name      String?
    createdAt DateTime @default(now())
}
```

You can extend the schema by adding more models or fields. After making changes, run:

```bash
npx prisma migrate dev --name <migration_name>
```

This will apply your changes to the database and generate migration files.

---

## Server Actions

Server actions in this boilerplate handle API requests, such as login or registration, directly on the server. They are located in the `pages/api/` directory, which contains Next.js API routes.

You can create new API routes or modify existing ones to suit your app’s needs. For example, the `/api/auth/` route is set up to manage authentication with NextAuth.js.

---

## Environment Variables

The `.env` file should include the following variables:

```bash
DATABASE_URL=postgresql://<username>:<password>@localhost:5432/<database_name>
NEXTAUTH_SECRET=your-secret-key
NEXTAUTH_URL=http://localhost:3000
```

You can add more variables as needed for third-party services or additional configuration.

---

## Deployment

The project is optimized for deployment on Vercel. To deploy:

1. Push the repository to GitHub.
2. Connect the repository to Vercel via the Vercel Dashboard.
3. Vercel will automatically deploy your app.

Once deployed, ensure that the following environment variables are added in the Vercel project settings:

- `DATABASE_URL`
- `NEXTAUTH_SECRET`
- `NEXTAUTH_URL`

---

## Contributing

Contributions are welcome! Here’s how you can contribute:

1. Fork the repository.
2. Create a new feature branch (`git checkout -b feature/new-feature`).
3. Commit your changes (`git commit -m 'Add a new feature'`).
4. Push to the branch (`git push origin feature/new-feature`).
5. Create a pull request.

---

## License

This project is licensed under the MIT License. See the LICENSE file for more details.