# next-invoicing-payment-reminder-v2

This project is a Next.js application that provides a platform for invoicing and payment reminders. It utilizes a variety of tools and libraries to provide a complete solution for invoice management and email notifications.

![Invoicing and Payment App Screenshot](https://shomariroberts.com/_next/image?url=https%3A%2F%2Fimages.ctfassets.net%2Fd33jlrbsef5n%2F1P3HxNekJcuIeTQq0Dguu0%2F2071b990b5c35865e373d533b9557f58%2Finvoicing-payment-reminder-app.png&w=3840&q=75)

## Installation

1. Clone the repository.

2. Install the dependencies:

```bash
npm install
```

## Scripts

- `dev`: Start the development server.

```bash
npm run dev
```

- `build`: Generate Prisma Client and build the application.

```bash
npm run build
```

- `start`: Start the production server.

```bash
npm start
```

- `lint`: Lint the project using ESLint.

```bash
npm run lint
```

## Prisma Seed

To seed the Prisma database, run the following command:

```bash
npm run prisma:seed
```

## Dependencies

- `@prisma/client & prisma`: ORM for type-safe database access.
- `@sendgrid/mail`: SendGrid library for email functionality.
- `@stripe/stripe-js & stripe`: Handling Stripe payments.
- `bcrypt`: Hashing library, mainly used for passwords.
- `cookie`: Parsing and serializing HTTP cookies.
- `ejs`: A simple templating language for generating HTML markup with plain JavaScript.
- `next`: The React framework for server-rendered or statically-exported React apps.
- `react & react-dom`: The core React library and the DOM bindings.
- `react-feather`: Library of customizable SVG icons.
- `react-modal`: Accessible modal dialog components for React.
- `recharts` : A composable charting library built on React components.
- `tailwindcss`: A utility-first CSS framework.
- `typescript & @types/`: TypeScript language and type definitions for various libraries.
- `clsx`: A utility for conditionally constructing classnames.
- `jose`: JavaScript Object Signing and Encryption.
- `class-variance-authority`: Utility library for class name variance.
- `text-encoding`: Encoding and decoding for text.
- `eslint & eslint-config-next`: Linting tools for ensuring code quality.
- `autoprefixer & postcss`: Tools for processing and optimizing CSS.

## Dev Dependencies

- `cypress`: End-to-end testing framework.
- `ts-node`: TypeScript execution environment and REPL.

If you have any questions or need further assistance, please don't hesitate to ask!
