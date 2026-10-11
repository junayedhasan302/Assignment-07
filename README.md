# 🛒 BazarDor — Market Price Tracker

> A modern, responsive web application built with **Next.js (App Router)**, **Tailwind CSS**, **Better-Auth**, and **TypeScript** to track, compare, and analyze daily essential commodity prices across different markets in Bangladesh.

------------------------------------------------------------------------

## 🌐 Live Demo: https://damkoto-sable.vercel.app/

------------------------------------------------------------------------

## 📖 About The Project

**BazarDor** is a comprehensive market price tracking platform designed to help consumers stay updated with current commodity prices (such as rice, oil, lentils, vegetables, fish, meat, eggs, and spices) across various regions and local markets in Bangladesh.

The application offers an interactive user experience featuring real-time price tickers, dynamic sorting with Bengali numerals, protected route access for product details, seamless multi-provider authentication, profile customization, skeleton loading states, custom error handling, and full responsiveness across all devices.

------------------------------------------------------------------------

## ✨ Key Features & Implementations

### 🔝 1. Dynamic Navbar & Live Ticker
- **Header & Logo**: Figma-aligned design featuring the app logo and live Bengali date display.
- **Category Navigation**: Interactive navbar links with active state highlighting for quick filtering.
- **Marquee Price Ticker**: Infinite scrolling strip displaying real-time commodity updates (emoji, item name, unit price, and price movement percentage).
- **User Dropdown Menu**: Accessible avatar and name button opening an interactive popup menu for quick profile access and sign-out.

### 🅱️ 2. Hero Banner & Price Trend Sections
- **Hero Banner**: Engaging banner with a CTA button that smoothly scrolls down to the **#সব-পণ্য** section.
- **Section A — "আজ দাম বেড়েছে ▲"**: Highlights top price risers with green trend badges.
- **Section B — "আজ দাম কমেছে ▼"**: Highlights top price fallers with red trend badges.
- **Section C — "সব পণ্য"**: Comprehensive grid displaying all market products.

### 📦 3. Responsive Product Cards & Protected Details Page
- **Product Cards**: Shows thumbnail emoji/illustrations, product name, unit label (e.g., প্রতি কেজি, প্রতি ডজন), and pricing with Bengali digits and trend badges (green ▲, red ▼, gray —).
- **Protected Routing**: Accessing detailed product breakdown pages (`/product/[slug]`) strictly requires user authentication. Unauthenticated users are redirected appropriately.

### 📊 4. Category Filtering & Custom Bengali Sorting
- **Category Filtering**: Filter products dynamically based on categories (e.g., চাল, ডাল, তেল, সবজি, মাছ, মাংস).
- **Advanced Sorting ("সাজান")**: Custom sorting control (Default, Price: Low to High, Price: High to Low) engineered to parse and sort Bengali numeric values accurately.

### 🔐 5. Authentication & Social Login
- **Better-Auth Integration**: Robust credentials authentication (Email & Password).
- **Social Authentication**: One-click Sign In and Sign Up via **Google** and **GitHub**.
- **Error Handling**: Clear error messages and feedback handling for authentication and validation.

### 👤 6. Profile Management & Information Update
- **My Profile Dashboard**: View account details, creation time, and user status.
- **Profile Edit Feature**: Seamless update form allowing users to update their display name and profile avatar image URL.

### 🎨 7. Enhanced Responsive Design & User Experience
- **Skeleton Loaders**: Custom loading skeletons rendered during data fetching for smooth user transition.
- **Custom 404 Page**: Friendly Bengali 404 error page (`not-found`) with a direct CTA button to return home (**"হোম পেজে ফিরে যান"**).
- **Fully Responsive**: Mobile-first design optimized for mobile phones, tablets, and desktop displays.


------------------------------------------------------------------------

## 🛠️ Technologies Used

| Technology | Purpose |
| :--- | :--- |
| **Next.js (App Router)** | Core React framework for SSR, client components, and dynamic routing (`/product/[slug]`) |
| **React** | Component-driven UI development |
| **Tailwind CSS** | Utility-first styling and fully responsive layouts |
| **TypeScript** | Type safety and enhanced developer experience |
| **Better-Auth** | Authentication engine for Email/Password, Google, and GitHub |
| **React Icons** | Modern icon integration for UI elements |

------------------------------------------------------------------------

## 🧠 Technical Highlights & Learning Outcomes

While building BazarDor, key architectural and functional concepts implemented include:
- Securing dynamic client/server routes with middleware and session management using **Better-Auth**.
- Developing custom array sorting algorithms capable of handling Bengali numeric characters (`০-৯`).
- Structuring fallback states using Next.js `not-found` handlers and suspense skeletons.
- Ensuring zero reload errors on dynamic routes after deployment on Vercel.

------------------------------------------------------------------------

**BY: Junayed Hasan**

- 🎓 CSE Student — Bangladesh University of Business & Technology (BUBT)
- 📞 01789042515
- 📧 junayedhasan302@gmail.com
- 🆔 WEB14-0687