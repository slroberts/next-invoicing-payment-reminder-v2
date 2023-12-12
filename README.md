# next-invoicing-payment-reminder-v2

This Next.js application, tailored for freelancers and small businesses, offers a user-friendly platform for streamlined invoicing and automated payment reminders. Integrated with essential tools like Prisma for database management, Resend for email notifications, and Stripe for secure online payments, this app provides a complete solution for efficient invoice management. With intuitive features designed to simplify financial tasks, this Next.js project is the go-to choice for hassle-free invoicing and payment tracking during development and testing phases.

**It's important to note that, as of now, this application is not set up for production use.
**

![Invoicing and Payment App Screenshot](https://shomariroberts.com/_next/image?url=https%3A%2F%2Fimages.ctfassets.net%2Fd33jlrbsef5n%2F1P3HxNekJcuIeTQq0Dguu0%2F2071b990b5c35865e373d533b9557f58%2Finvoicing-payment-reminder-app.png&w=3840&q=75)

## Key Insights

Engaging with the tools used throughout this project has provided a robust learning experience. I've gained proficiency in secure database management, streamlined email functionality through Resend, and efficiently handled online payments, specifically with Stripe. The intricacies of password security and user authentication, employing bcrypt and cookies, added an interesting layer to the learning process. Utilizing EJS for dynamic email templates proved effective, and Tailwind CSS simplified styling tasks. TypeScript played a crucial role in maintaining code integrity. Cypress served as a reliable testing tool, ensuring the reliability of the codebase. Simplifying CSS for different browsers was facilitated by Autoprefixer and PostCSS. Additionally, tools addressing JavaScript Object Signing and Encryption, class names, and text encoding enriched my understanding. In summary, this hands-on experience has solidified my foundation across various facets of modern web development.

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
- `@stripe/stripe-js & stripe`: Handling Stripe payments.
- `resend`: Handling email functionality.
- `bcrypt`: Hashing library, mainly used for passwords.
- `cookie`: Parsing and serializing HTTP cookies.
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
