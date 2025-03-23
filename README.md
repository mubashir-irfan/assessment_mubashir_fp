# Funding Pips - Senior Frontend Engineer Assessment

## Overview

Welcome to the Funding Pips frontend assessment. This challenge is designed to evaluate your ability to **architect, build, and optimize a scalable, high-performance Next.js application**. We are looking for **self-driven engineers** who can make sound technical decisions **without micromanagement**.

## The Challenge

### Problem Statement

You need to build a **real-time stock tracking application** where users can:

- Search for stocks by name or ticker symbol.
- View live stock price updates.
- Analyze historical price trends.
- Manage a watchlist of selected stocks.

### Requirements

- **Framework:** Must use **Next.js 15**.
- **React Components:** Implement proper **Server Components (RSCs) vs. Client Components** for optimized performance.
- **API Integration:** Use an appropriate **stock API** (e.g. Alpha Vantage, Yahoo Finance, or Polygon.io’s free tier) or mock the data if necessary.
- **State Management:** Use a scalable approach (e.g. **React Context, Zustand, or Redux Toolkit**).
- **UI/UX:** The design should be clean and responsive, using **Tailwind CSS**.

## What We Are Looking For

We want to see **how you approach building a Next.js system from scratch** but note that we don't expect everything to be perfect, it's about trade offs and how you approach problems to solve, you shouldn't need to spend anymore than 4-6 hours here as an example you could implement real time updates or add a poll to a http request, both achieve similar things but one is far quicker to deliver, this would be something to note in your trade offs or decisions made.

Key areas we will evaluate:

### 1️⃣ Architectural Decisions

- Do you correctly structure the project for **scalability and maintainability**?
- Are you effectively using **React Server Components (RSCs) vs. Client Components**?
- Are you minimizing client-side JavaScript to optimize performance?

### 2️⃣ Code Quality & Maintainability

- Is the codebase modular and well-organized?
- Are there reusable components?
- Are TypeScript types properly defined and enforced?

### 3️⃣ Performance Optimization

- Are API calls optimized with **ISR (Incremental Static Regeneration), SSR, or caching (`next/cache`)**?
- Are React components optimized to prevent unnecessary updates?
- Is Turbopack leveraged for fast builds?

### 4️⃣ Error Handling & Edge Cases

- How does the app handle API failures?
- Does it provide meaningful error messages?
- How does it handle edge cases like an invalid stock ticker?

### 5️⃣ Testing Strategy _(Optional but encouraged)_

- Optional but it would be good to see at least one unit and one integration test.
- Did you include unit or integration tests?
- Are Jest and Testing Library used effectively?
- How would you ensure the app remains stable as it scales?

## Technical Constraints

- **Must use Next.js 15, React 19, and TypeScript**.
- **Tailwind CSS** is the preferred styling solution.
- **State management can be done via React Context, Zustand, or Redux Toolkit**.

## Bonus Points (Not Required but Impressive)

- Implement WebSockets for real-time stock price updates.
- Use **ISR (Incremental Static Regeneration) or SSR (Server-Side Rendering)** effectively.
- Provide a **Dockerfile** for easy deployment.
- Implement authentication (OAuth, Firebase, etc.) for user watchlists.
- Optimize rendering using **caching, and or efficient data fetching strategies**.

## Deliverables

- A **GitHub repository** with your implementation.
- A **README file** explaining:
  - Your architectural decisions.
  - How to run the project.
  - Any trade-offs or optimizations you made.
- (Optional) A short Loom video or document explaining your approach.

## Submission Instructions

1. Clone this repository.
2. Complete the implementation.
3. Submit a link to your repo and ideally a link to your working application on vercel/netlify or equivalent.

## Final Notes

This is not just about "getting it working" - we are looking for **scalability, performance, and decision-making skills**. Show us how you think as a **senior engineer**.

Good luck, and happy coding! 🚀
