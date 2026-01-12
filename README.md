# Product Listing

## Tech Stack

- **React**
- **TypeScript**
- **Vite**
- **React Router 7 (declartive)**
- **TanStack React Query**
- **Tailwind**
- **shadcn**
- **nuqs**

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm

### Installation

1. Clone the repository:

   ```
   git clone <repository-url>
   cd product-listing
   ```

2. Install dependencies:

   ```
   pnpm install
   ```

3. Start the development server:

   ```b
   pnpm dev
   ```

4. Open [http://localhost:5173](http://localhost:5173) in your browser.

## Features

- **Product Filtering** - Disables facets with zero count
- **Sorting**
- **Pagination**
- **Prefetching** - Prefetches next page for instant navigation

---

## TODO

- install and setup tooling ✅
  - RR, RQ, tailwind, shadcn, nuqs
- route config ✅
- api types ✅
- fetchProducts (+ productsQueryOptions) ✅
- ProductListing page ✅
- styling
- Sorting ✅
- Pagination ✅
- Filtering ✅
- error handling
- do we need nuqs or stick with useSearchParams? currently using a hybrid due to dynamic filters

### nice to haves

- fix pagination logic, show ellipsis etc ✅
- show discounted price ✅
- show if is out of stock
- prefetch next page ✅
- sort resets on filter change
