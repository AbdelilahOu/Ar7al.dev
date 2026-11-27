---
title: Cobracase
description: "Custom phone case store where customers upload an image, place it on their phone model, pick a color, material and finish, and pay with Stripe."
tech:
  - name: Next.js
    use: "The App Router storefront, the case configurator, server actions, and the auth, upload and webhook routes"
  - name: TypeScript
    use: "The language for the whole app"
  - name: Tailwind CSS
    use: "Styling, on top of shadcn/ui components"
  - name: shadcn/ui
    use: "Buttons, dialogs, dropdowns and the progress bars on the admin dashboard"
  - name: Drizzle ORM
    use: "Schema and queries for configurations, orders, users and addresses"
  - name: PostgreSQL
    use: "The database, hosted on Neon and reached through its serverless driver"
  - name: Kinde
    use: "Sign-in before checkout, and the admin check on the dashboard"
  - name: UploadThing
    use: "Stores the uploaded image and the cropped design"
  - name: react-rnd
    use: "Drag and resize the image on top of the phone in the configurator"
  - name: Stripe
    use: "Checkout sessions, and the webhook that marks an order as paid and saves its addresses"
  - name: Resend
    use: "Sends the order confirmation email, written with React Email"
web: https://case-ecommerce.vercel.app/
github: https://github.com/AbdelilahOu/Case-ecommerce
createdAt: "2026-01-10"
published: true
---

Cobracase is an online store for custom phone cases. Customers upload their own image, place it on their phone, choose how the case looks, and pay. It's a Next.js app with PostgreSQL through Drizzle ORM, Kinde for sign-in, and Stripe for payments.

## What it does

### Case configurator

Customers drag in an image, then move and resize it over a mockup of the phone. They pick the case color, the phone model, the material, and the finish, and see the result before they check out.

### Checkout

Stripe Checkout takes card payments and collects a shipping address for Morocco or the US. A webhook listens for completed sessions, marks the order as paid, and saves the shipping and billing addresses.

### Confirmation email

Once an order is paid, Resend sends a thank-you email built with React Email.

### Admin dashboard

An admin account sees every paid order, can change each order's status, and tracks revenue for the last week and month against a goal.

## What was hard

### Cropping the design to the case

The customer positions the image on screen, but the order needs an image cut to the exact case area. The configurator redraws the image on a canvas at the position and size the customer chose, crops it to the case, and uploads the result as the final design.
