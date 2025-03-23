# Simple Stocks Demo

[Loom Recording](https://www.loom.com/share/ff0af0d7d748441a912a74e399cd5aeb?sid=8519562d-4972-48b1-a2e4-f93db457316b)

[Vercel Deployment Link](https://assessment-mubashir-fp.vercel.app/)


Welcome to the **Simple Stocks Demo** repository! This project is a simple yet functional 
stock preview application that relies on a mix of real and mock data. It uses Polygon.io's free and limited API.


## Features

- **Search Tickers**: Search for a stock/ticker
- **List Stocks**: View the stock's ticker, name and live price (mocked)
- **Watch Stocks**: Add or remove stocks from a separate watch/monitor list
- **View Stock Price Trend**: Traditional OCHL CandleStick chart (data mocked due to API limitations)

## Tech Stack

- **Frontend**:
  - [Next.js](https://nextjs.org/): A React framework for production.
  - [React](https://reactjs.org/): A JavaScript library for building user interfaces.
  - [TypeScript](https://www.typescriptlang.org/): A typed superset of JavaScript.
  - [Tailwind CSS](https://tailwindcss.com/): A utility-first CSS framework. library for React
  - Axios for backend communication
- **Testing**:
  - [Jest](https://jestjs.io/): A delightful JavaScript testing framework.

## Getting Started

Follow these instructions to set up and run the project on your local machine.

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (version 14.x or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1. **Clone the repo**

```
    git clone https://github.com/mubashir-irfan/assessment_mubashir_fp
    cd assessment_mubashir_fp
```

2. **Installing Dependencies**

Run `npm install` or `yarn install`

### Running the Application


2. **Starting the Frontend Application**

Run `npm run dev or yarn dev`
By default, the application will be accessible at `http://localhost:3000`

## Project Structure

The application follows a modular, feature-isolation structure. The structure envisions the app size and team growing with time, hence provides a feature-level isolation so that teams can work without unnecessary conflicts.

- Global entities are present directly inside src (e.g src/contexts hosts global contexts)
- Feature level entities (components,types,hooks) have their isolated structure inside src/app/[feature])
- Shared entities are present inside src/shared

## Trade Offs

Since free stock APIs are highly limited, I have relied on a mix of mock data in most areas.

In a production environment, I would approach things differently. I would:

- write a custom AuthN and AuthZ layer for identity and access management
- write a reusable, generic API Integration layer using React Query on top of axios instance to centralize the communication and error handling
- write a Notification service based on App Theme to deliver error and success messages

## Available scripts

In the project directory, you can run:

- `npm run dev`: Starts the development server.
- `npm run build`: Builds the application for production.
- `npm run start`: Runs the built application in production mode.
- `npm run lint`: Lints the codebase for potential issues.
- `npm run test`: Runs the test suite.
