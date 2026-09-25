---
title: Cobracase
description: "Custom phone case store where customers upload an image, add text, preview their case, and pay with Stripe."
tech:
  - Next.js
  - TypeScript
  - Tailwind CSS
  - Drizzle ORM
  - PostgreSQL
  - Stripe
  - Kinde
web: https://case-ecommerce.vercel.app/
github: https://github.com/AbdelilahOu/Case-ecommerce
createdAt: "2026-01-10"
published: true
---

Cobracase is an online store for custom phone cases. Customers upload their own image, put text on top of it, and see a live preview of the case before they buy.

It's a Next.js app, with API routes for the backend and PostgreSQL through Drizzle ORM for data. Stripe takes the payments and supports several payment methods and currencies.

Uploaded images go through a pipeline that transforms them for the preview and produces print-ready files for manufacturing. Around that sit order management, shipping, and customer notifications.

## Features

- Drag-and-drop image upload
- Live case preview with accurate mockups
- Text overlays with font and color options
- Checkout with Stripe
- Order tracking and email notifications
- Admin dashboard for orders

## Challenges

- Making the drag-and-drop editor easy to use
- Getting the mockup preview to match the real case
- Handling image uploads and processing at scale
- Making the Stripe checkout flow reliable
