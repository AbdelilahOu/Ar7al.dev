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
intro: "Cobracase is an online store for custom phone cases. Customers upload their own image, put text on top of it, and see a live preview of the case before they buy. It's a Next.js app, with API routes for the backend and PostgreSQL through Drizzle ORM for data."
features:
  - name: Case editor
    summary: "Customers drag in an image, add text with their choice of font and color, and watch a live preview built on accurate mockups."
  - name: Checkout
    summary: "Stripe takes the payments and supports several payment methods and currencies."
  - name: Orders
    summary: "The store handles order management and shipping. Customers get order tracking and email notifications, and there's an admin dashboard for orders."
challenges:
  - name: An editor anyone can use
    summary: "The drag-and-drop upload, the text overlays, and the live preview all had to be easy to use."
  - name: Mockups that match the case
    summary: "The preview has to match the real case. Uploaded images go through a pipeline that transforms them for the preview and also produces the print-ready files for manufacturing."
  - name: Images at scale
    summary: "Image uploads, and the processing behind them, had to hold up at scale."
  - name: A reliable checkout
    summary: "The Stripe checkout had to stay reliable across several payment methods and currencies."
web: https://case-ecommerce.vercel.app/
github: https://github.com/AbdelilahOu/Case-ecommerce
createdAt: "2026-01-10"
published: true
---
