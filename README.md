# 🍕 Fast React Pizza Co.

> A modern, responsive, high-performance pizza ordering single-page application built with **React 19**, **Vite 8**, **Tailwind CSS v4**, **React Router Data APIs**, and **Redux Toolkit**.

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Key Features](#-key-features)
- [Architecture & Tech Stack](#-architecture--tech-stack)
- [Responsive Design System](#-responsive-design-system)
- [Project Directory Structure](#-project-directory-structure)
- [State Management Architecture](#-state-management-architecture)
- [Routing, Data Loaders & Actions](#-routing-data-loaders--actions)
- [Services & API Integration](#-services--api-integration)
- [Design Tokens & UI System](#-design-tokens--ui-system)
- [Getting Started](#-getting-started)
- [Available Scripts](#-available-scripts)
- [Production & Performance Considerations](#-production--performance-considerations)

---

## 🍕 Overview

**Fast React Pizza Co.** is an end-to-end e-commerce application designed to streamline food ordering with zero layout friction across mobile, tablet, and desktop screens. It simulates a real-world restaurant ordering pipeline:

1. **Guest Onboarding**: Users enter their name to initialize session state.
2. **Interactive Menu**: Pizzas are loaded directly via React Router route loaders (eliminating data-fetching waterfalls).
3. **Live Cart Operations**: Items can be added, incremented, decremented, or removed in real-time, synced to Redux store.
4. **Geolocation-Enabled Checkout**: Users can manually type an address or automatically retrieve GPS coordinates and reverse-geocode them to a formatted address string via an asynchronous thunk.
5. **Order Lifecycle & Real-Time Tracking**: Orders are submitted via React Router route actions. Users are redirected to an order tracking page that calculates real-time delivery estimates, verifies status, and allows upgrading to priority delivery in the background using non-navigational fetchers.

---

## ✨ Key Features

- **Zero-Waterfall Data Architecture**: Route-level data loading through `createBrowserRouter` loaders and actions fetches data before components render.
- **Dynamic Cart Management**: Centralized client-side state for cart operations with derived selectors calculating total quantity and total price.
- **GPS Reverse Geocoding**: Browser Geolocation API integrated with BigDataCloud reverse geocoding via Redux Toolkit `createAsyncThunk`.
- **Background Data Mutation**: Uses `useFetcher` to mutate order priority (`PATCH`) and fetch pizza ingredients on demand without navigation or full-page reloads.
- **Adaptive Responsive Design**: Tailored from narrow smartphones (320px) up to ultra-wide displays (1440px+) using Tailwind CSS v4.
- **Form Validation & Action Feedback**: Server-style form validation handled within React Router action functions with error feedback displayed inline.
- **Order Search**: Quick order status lookup by Order ID directly from the header navigation bar.

---

## 🛠 Architecture & Tech Stack

| Layer | Technology | Purpose |
| :--- | :--- | :--- |
| **Runtime / Library** | [React 19](https://react.dev/) | Component model, strict mode rendering, modern hooks |
| **Build Tool** | [Vite 8](https://vite.dev/) | Lightning-fast HMR, ES-module bundling, production optimization |
| **Routing & Data Fetching** | [React Router v7 / v6 Data APIs](https://reactrouter.com/) | Declarative nested routing, loaders, actions, fetchers, and error boundaries |
| **Global State Management** | [Redux Toolkit](https://redux-toolkit.js.org/) + [React Redux](https://react-redux.js.org/) | Predictable store slices, mutating drafts via Immer, async thunks |
| **Styling & Design System** | [Tailwind CSS v4](https://tailwindcss.com/) (`@tailwindcss/vite`) | Utility-first styling, CSS theme variables, `@layer` component abstractions |
| **Typography** | Google Fonts (`Roboto Mono`) | Monospace aesthetic tailored for receipts, order counters, and tech-forward branding |
| **Code Quality** | ESLint + Prettier + Prettier Tailwind Plugin | Automated code linting and consistent class sorting |

---

## 📱 Responsive Design System

The application is engineered with a **mobile-first** responsive architecture tested across standard viewports (320px mobile, 375px modern mobile, 768px tablet, 1024px laptop, 1440px desktop):

### 1. Viewport & Layout Shell (`AppLayout`)
- Utilizes `100dvh` (`h-dvh`) with CSS Grid layout: `grid-rows-[auto_1fr_auto]`.
- Top: Persistent sticky Header.
- Middle: Scrollable content container with horizontal overflow protection (`overflow-x-hidden overflow-y-auto`) and fluid maximum container widths (`max-w-3xl xl:max-w-4xl`).
- Bottom: Dynamic Cart Overview bar rendered conditionally when cart items exist.

### 2. Header Adaptations (`Header` & `SearchOrder`)
- Mobile (< 640px): Logo scales down with tight letter spacing; search field shrinks to 28 units with no overflow; username is hidden to maximize touch area.
- Tablet / Desktop (>= 640px): Search field smoothly expands on focus (`sm:w-64 sm:focus:w-72 lg:w-72 lg:focus:w-80`); truncated user badge is displayed (`md:block`).

### 3. Menu & Item Cards (`Menu` & `MenuItem`)
- Responsive image sizing (`h-20 w-20` on mobile, scaling to `sm:h-24 sm:w-24 md:h-28 md:w-28`).
- Price, quantity adjuster, and delete action wrap gracefully on narrow viewports without clipping or horizontal scrollbars.

### 4. Cart & Checkout Form (`Cart` & `CreateOrder`)
- Mobile: Form labels stack vertically above input fields for comfortable touch input.
- Tablet / Desktop (`sm` breakpoint and above): Form transforms into a clean two-column grid layout where labels maintain a consistent `sm:basis-40` column.
- Geolocation Button: Embedded cleanly on the right inside the address input with responsive positioning and safe z-index layering below loader backdrops.
- Primary and secondary buttons maintain identical touch targets and vertical alignment across all screen sizes.

---

## 📂 Project Directory Structure

```text
16-fast-react-pizza/starter1/
├── index.html                   # HTML entry point with meta viewport, SEO description & font imports
├── vite.config.js               # Vite configuration with React and Tailwind CSS v4 plugins
├── package.json                 # Project dependencies, scripts, and build metadata
├── eslint.config.js             # Flat ESLint configuration with React Hooks & Refresh plugins
├── .prettierrc                  # Prettier config with Tailwind class sorting plugin
├── .env                         # Environment variables (VITE_API_URL)
├── public/                      # Static assets (favicons, SVG icons)
└── src/
    ├── App.jsx                  # Central routing tree (createBrowserRouter, loaders, actions)
    ├── main.jsx                 # React root injection wrapped in Redux Provider & StrictMode
    ├── store.js                 # Redux Toolkit store setup combining user and cart slices
    ├── index.css                # Tailwind CSS v4 directives, custom themes, and reusable classes
    │
    ├── features/                # Feature-driven modular architecture
    │   ├── cart/                # Shopping cart slice and components
    │   │   ├── Cart.jsx         # Full cart page with item listing, clear and checkout buttons
    │   │   ├── CartItem.jsx     # Single cart entry displaying details, quantity adjuster & delete
    │   │   ├── CartOverview.jsx # Sticky bottom summary bar (total count, total price, link)
    │   │   ├── cartSlice.js     # Redux slice: state, reducers, and memoized-style selectors
    │   │   ├── DeleteItem.jsx   # Reusable button dispatching deleteItem action
    │   │   ├── EmptyCart.jsx    # Empty state fallback with navigation link back to menu
    │   │   └── UpdateItemQuantity.jsx # Round +/- buttons with live item quantity display
    │   │
    │   ├── menu/                # Menu catalog feature
    │   │   ├── Menu.jsx         # Menu list view consuming route loader data
    │   │   └── MenuItem.jsx     # Pizza card with ingredients, pricing, sold-out badge & cart CTA
    │   │
    │   ├── order/               # Order creation and order tracking feature
    │   │   ├── CreateOrder.jsx  # Order checkout form with geolocation and validation action
    │   │   ├── Order.jsx        # Real-time order tracking page with loader and fetcher
    │   │   ├── OrderItem.jsx    # Individual order line item with dynamically loaded ingredients
    │   │   ├── SearchOrder.jsx  # Search input component for navigating directly to order IDs
    │   │   └── UpdateOrder.jsx  # Non-navigational fetcher form to set priority on orders
    │   │
    │   └── user/                # User profile and authentication slice
    │       ├── CreateUser.jsx   # Welcome screen form to register user name in Redux
    │       ├── UserName.jsx     # Responsive user name badge rendered in the main Header
    │       └── userSlice.js     # Redux slice with createAsyncThunk for GPS reverse geocoding
    │
    ├── services/                # External API abstractions
    │   ├── apiGeocoding.js      # Reverse geocoding client (BigDataCloud API)
    │   └── apiRestaurant.js     # Fast React Pizza REST API (getMenu, getOrder, createOrder, updateOrder)
    │
    ├── ui/                      # Reusable presentational components (design system)
    │   ├── AppLayout.jsx        # Main application layout wrapper with header, main, and footer
    │   ├── Button.jsx           # Variant-based button & link component (primary, small, round, secondary)
    │   ├── Error.jsx            # Error boundary fallback component using useRouteError
    │   ├── Header.jsx           # Top application header containing branding, search, and user badge
    │   ├── Home.jsx             # Landing view showing greeting or continue ordering CTA
    │   ├── LinkButton.jsx       # Styled router link or history-back navigation button
    │   └── Loader.jsx           # Full-screen backdrop blur loading indicator
    │
    └── utilities/               # Pure helper functions
        └── helpers.js           # Currency formatter (EUR), date formatter, minutes remaining calculator
```

---

## 🧠 State Management Architecture

State is divided into three distinct categories:

```
┌─────────────────────────────────────────────────────────────┐
│                       Application State                     │
├──────────────────────────────┬──────────────────────────────┤
│ 1. Remote Server State       │ Managed by React Router      │
│    • Menu catalog            │ • Route Loaders              │
│    • Order status & details  │ • Route Actions              │
│    • Fetcher background data │ • useFetcher data store      │
├──────────────────────────────┼──────────────────────────────┤
│ 2. Global Client State       │ Managed by Redux Toolkit     │
│    • Cart items array        │ • cartSlice.js               │
│    • Active user profile     │ • userSlice.js               │
│    • Geolocation coordinates │ • fetchAddress (Thunk)       │
├──────────────────────────────┼──────────────────────────────┤
│ 3. Local UI State            │ Managed by React Hooks       │
│    • Form inputs             │ • useState                   │
│    • Priority toggle state   │ • Local component state      │
└──────────────────────────────┴──────────────────────────────┘
```

### Redux Toolkit Slices

#### 1. Cart Slice (`cartSlice.js`)
- **State**: `{ cart: [] }`
- **Item Schema**: `{ pizzaId, name, quantity, unitPrice, totalPrice }`
- **Actions**:
  - `addItem(newItem)`: Appends pizza object to cart.
  - `deleteItem(pizzaId)`: Filters out pizza by ID.
  - `increaseItemQuantity(pizzaId)`: Increments count and updates `totalPrice`.
  - `decreaseItemQuantity(pizzaId)`: Decrements count; automatically triggers `deleteItem` case reducer if quantity reaches 0.
  - `clearEntireCart()`: Resets cart to empty array.
- **Selectors**:
  - `getCart`: Returns full cart array.
  - `getTotalCartQuantityOfPizzas`: Computes total pizza count across items.
  - `getTotalCartPriceOfPizzas`: Computes aggregate price of all cart items.
  - `getCurrentPizzaById(id)`: Returns quantity of a specific pizza in cart (or 0).

#### 2. User Slice (`userSlice.js`)
- **State**: `{ userName, status, position, address, error }`
- **Async Thunk**: `fetchAddress()`
  1. Requests GPS coordinates from `navigator.geolocation.getCurrentPosition()`.
  2. Queries `getAddress({ latitude, longitude })` via reverse geocoding API.
  3. Returns resolved `{ position, address }` to update state on `fulfilled` or captures error message on `rejected`.

---

## 🚦 Routing, Data Loaders & Actions

Configured in `src/App.jsx` using `createBrowserRouter`:

| Route Path | Component | Type | Description |
| :--- | :--- | :--- | :--- |
| `/` | `Home` | Page | Welcome screen / User login input |
| `/menu` | `Menu` | Page + `loader` | Fetches complete pizza list via `getMenu()` |
| `/cart` | `Cart` | Page | Displays cart items, clear cart action, checkout button |
| `/order/new` | `CreateOrder` | Page + `action` | Validates form, creates order via `createOrder()`, redirects to `/order/:orderId` |
| `/order/:orderId` | `Order` | Page + `loader` + `action` | Fetches order by ID via `getOrder()`; handles priority upgrade via `updateOrderAction` |

### Why React Router Data APIs?
- **Render-As-You-Fetch**: Instead of fetching inside `useEffect` after component mount (causing loading waterfalls), React Router starts data fetching the instant a route is initiated.
- **Declarative Form Submissions**: Using `<Form method="POST">` offloads request interception to React Router's action handlers, enabling idiomatic web form processing.
- **`useFetcher` for Seamless Interactions**: Allows components (like `OrderItem` loading ingredients or `UpdateOrder` modifying priority) to fetch or mutate data without changing the current URL.

---

## 🌐 Services & API Integration

The app connects to a REST API configured via the `VITE_API_URL` environment variable:

### 1. Restaurant API (`src/services/apiRestaurant.js`)
- `GET /menu`: Retrieves list of pizzas with prices, ingredients, images, and sold-out flags.
- `GET /order/:id`: Fetches order details, delivery estimate, order price, and priority price.
- `POST /order`: Creates a new order. Accepts customer details, cart array, priority flag, and coordinates.
- `PATCH /order/:id`: Updates existing order properties (e.g. `{ priority: true }`).

### 2. Geocoding API (`src/services/apiGeocoding.js`)
- Calls BigDataCloud Reverse Geocode API:
  `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`
- Formats city, locality, postal code, and country name into a single address string.

---

## 🎨 Design Tokens & UI System

Implemented via Tailwind CSS v4 in `src/index.css` and `src/ui/Button.jsx`:

- **Theme Font**: `--font-pizza: "Roboto Mono", monospace;`
- **Color Palette**:
  - Primary Accent: Stone / Yellow palette (`yellow-400`, `yellow-300`, `yellow-500`)
  - Neutral Backgrounds: `stone-100`, `stone-200`, `stone-800`
  - Status Indicators: `green-500` (delivered / in progress), `red-500` (priority badge / error alert)
- **Shared Input Class (`.input`)**:
  `min-w-0 rounded-full border border-stone-200 bg-white px-4 py-2 text-sm transition-all duration-300 placeholder:text-stone-400 focus:ring-2 focus:ring-yellow-400 focus:outline-none disabled:cursor-not-allowed md:px-6 md:py-3`
- **Reusable Button Component (`Button.jsx`)**:
  - `primary`: Standard call-to-action button with rounded pill geometry and active/hover states.
  - `small`: Compact variant for table actions and "Add To Cart".
  - `round`: Symmetrical circular buttons for `+` and `-` quantity incrementation.
  - `secondary`: Neutral bordered button for non-destructive actions like "Clear Cart".

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (version `18.x` or higher recommended)
- `npm` (or `pnpm` / `yarn`)

### Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd 16-fast-react-pizza/starter1
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Create or verify the `.env` file in the root directory:
   ```env
   VITE_API_URL= value
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```
   Open your browser at `http://localhost:5173`.

---

## 📜 Available Scripts

| Command | Action |
| :--- | :--- |
| `npm run dev` | Launches Vite local development server with Hot Module Replacement (HMR) |
| `npm run build` | Compiles production assets to the `dist/` directory with minification and tree shaking |
| `npm run preview` | Locally serves the optimized production bundle for testing |
| `npm run lint` | Runs ESLint across all `.js` and `.jsx` files |

---

## ⚡ Production & Performance Considerations

- **Asset Splitting**: Code-splitting and vendor chunks are handled automatically by Vite.
- **Scroll Restoration & Overflow Handling**: Custom scroll containers prevent involuntary horizontal scroll on touch devices while preserving viewport fluid height on mobile browsers (`100dvh`).
- **Dynamic Image Optimization**: External images render with lazy loading and explicit aspect ratios to minimize Cumulative Layout Shift (CLS).
- **Selector Optimization**: Selectors in `cartSlice.js` follow Redux best practices; for scaled catalogs, memoization via [Reselect](https://github.com/reduxjs/reselect) can be integrated effortlessly.

---

## 📄 License & Credits

Built as part of Jonas Schmedtmann's **The Ultimate React Course**. Refactored and enhanced with modern React 19, Tailwind CSS v4, and comprehensive responsive UI design.
