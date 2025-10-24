# 🧩 Watheta Task

A **modern frontend application** built using **Next.js 16**, **React 19**, **TypeScript 5**, and **TailwindCSS v4**.
The project demonstrates clean architecture, scalable UI patterns, and modern development workflows aligned with current industry best practices.

---

## 🚀 Overview

This project serves as a **technical task implementation** focused on building a highly interactive and maintainable web interface.
The primary goals are:

- To ensure **performance**, **accessibility**, and **type safety**.
- To follow a **component-driven** design approach.
- To make the app **developer-friendly** through a clear, consistent setup.

---

## 🧠 Core Design Principles

| Principle                | Description                                                                           |
| ------------------------ | ------------------------------------------------------------------------------------- |
| **Scalability**          | Codebase structured to support growth without becoming complex.                       |
| **Reusability**          | UI built from reusable Radix primitives and composable components.                    |
| **Accessibility (a11y)** | All interactive elements use accessible Radix foundations.                            |
| **Type Safety**          | Full end-to-end safety with TypeScript and Zod schemas.                               |
| **Performance**          | TanStack Query for caching, concurrent React 19 features, and optimized UI rendering. |
| **Consistency**          | Prettier + ESLint + Tailwind Merge enforce stylistic and structural consistency.      |

---

## 🏗️ Tech Stack

| Category               | Technology                                                                | Reason for Choice                                                                |
| ---------------------- | ------------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| **Framework**          | [Next.js 16](https://nextjs.org/)                                         | Full-stack React framework with file-based routing, SSR, and static generation.  |
| **UI Library**         | [React 19](https://react.dev/)                                            | Latest React release featuring improved concurrent rendering and event handling. |
| **Styling**            | [TailwindCSS 4](https://tailwindcss.com/)                                 | Utility-first CSS that ensures consistent and responsive design.                 |
| **UI Components**      | [Radix UI](https://radix-ui.com/) + [Lucide React](https://lucide.dev/)   | Accessible, headless UI primitives + clean, modern icons.                        |
| **Forms & Validation** | [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/) | Fast, declarative forms with schema-based validation.                            |
| **Data Layer**         | [TanStack React Query](https://tanstack.com/query/v5)                     | Efficient data fetching, caching, and revalidation.                              |

| **Image Handling** | [Cloudinary](https://cloudinary.com/) | Image optimization, transformations, and CDN delivery. |
| **Notifications** | [Sonner](https://sonner.emilkowal.ski/) | Minimalistic toast system with intuitive styling. |
| **Code Quality** | ESLint, Prettier, TypeScript | Enforced consistency, linting, and static type checking. |

---

## 🧩 Key Features

### 💠 1. Component-Driven UI

- Built with **Radix UI** and **TailwindCSS**.
- Modular and composable — each component is isolated, testable, and reusable.
- Consistent use of Radix primitives ensures **WCAG-compliant accessibility**.

### 🧾 2. Dynamic filter

- Implemented using **Radix Slider** with controlled state.
- Users can drag **both ends** of the slider simultaneously for precise range selection.
- Fully keyboard-accessible and optimized for screen readers.

### 🔄 3. State Management via React Query

- Simplifies API calls, caching, and revalidation.
- Automatically handles background refetching and synchronization.
- Reduces boilerplate compared to traditional global state solutions.

### 🧰 4. Form Handling

- **React Hook Form** provides optimal performance and minimal re-renders.
- Integrated with **Zod** for schema-based validation and error messaging.
- Helps maintain strong typing between UI, business logic, and server APIs.

### 🎨 5. TailwindCSS + Utility-First Design

- Fast prototyping and flexible customization.
- Responsive design built with consistent spacing, typography, and color utilities.
- Uses `tailwind-merge` and `clsx` to avoid className conflicts and ensure clean dynamic styling.

### ⚡ 6. Developer Experience

- **Prettier** auto-formatting and **ESLint** linting ensure code readability.
- **TypeScript** enforces robust static typing across the entire app.
- Developer commands make maintenance, formatting, and builds effortless.

---

## 🧱 Folder Structure
