# Trading Orderbook Application

Welcome to the **Trading Orderbook Application**, a web-based platform that displays a real-time orderbook for cryptocurrencies using the Alpha Vantage API. This application is built with Next.js, React, TypeScript, and Tailwind CSS.

## Features

- **Real-Time Orderbook:** View the latest bids and asks for your favorite cryptocurrencies.
- **Search Functionality:** Easily search for different cryptocurrency symbols (e.g., BTC, ETH).
- **Live Price Updates:** Automatically refreshes data every hour to keep prices up-to-date.
- **Responsive Design:** Optimized for various screen sizes using Tailwind CSS.
- **Interactive UI Components:** Leveraging React and TypeScript for robust and type-safe components.

---

## Prerequisites

Before you begin, ensure you have met the following requirements:

- **Node.js** (version 14.x or later)
- **npm** or **yarn**
- An **Alpha Vantage API Key**. You can obtain a free API key by signing up [here](https://www.alphavantage.co/support/#api-key).

---

## Installation

Clone the repository and navigate to the project directory:

```bash
git clone https://github.com/ZonaZebra/trading-orderbook-app.git
cd trading-orderbook-app
```

Install the necessary dependencies:

```bash
# Using npm
npm install

# Or using yarn
yarn install
```

---

## Configuration

Create a `.env.local` file in the root directory to store your environment variables:

```bash
touch .env.local
```

Add your Alpha Vantage API key to the `.env.local` file:

```env
NEXT_PUBLIC_ALPHA_VANTAGE_API_KEY=your_alpha_vantage_api_key
```

_Replace `your_alpha_vantage_api_key` with the actual API key you obtained._

---

## Usage

Start the development server:

```bash
# Using npm
npm run dev

# Or using yarn
yarn dev
```

Open your browser and navigate to `http://localhost:3000` to view the application.

---

## Project Structure

The project follows a standard Next.js application structure:

```
├── app
│   ├── page.tsx               # Main page component
│   └── globals.css            # Global styles
├── components
│   ├── Orderbook.tsx          # Orderbook component
│   └── ui
│       └── input.tsx          # Custom input component
├── public                     # Public assets
├── styles
│   └── globals.css            # Global CSS styles
├── .env.local                 # Environment variables
├── package.json               # NPM package configuration
├── tailwind.config.js         # Tailwind CSS configuration
└── next.config.js             # Next.js configuration
```

---

## Scripts

Available scripts in the `package.json` file:

- **`dev`**: Runs the application in development mode.
- **`build`**: Builds the application for production.
- **`start`**: Starts the production build.
- **`lint`**: Lints the codebase using ESLint.

Example:

```bash
# Run the development server
npm run dev

# Build the application for production
npm run build

# Start the production server
npm start
```

---

## Dependencies

Key dependencies used in this project:

- **Next.js**: React framework for server-side rendering.
- **React**: JavaScript library for building user interfaces.
- **TypeScript**: Typed superset of JavaScript.
- **Tailwind CSS**: Utility-first CSS framework.
- **Lucide React**: Icon library for React.
- **ShadCn**: Component library for React.

---

## Contributing

Contributions are welcome! Please follow these steps:

1. **Fork the repository** on GitHub.
2. **Clone your fork** locally:

   ```bash
   git clone https://github.com/ZonaZebra/trading-orderbook-app.git
   ```

3. **Create a new branch** for your feature or bugfix:

   ```bash
   git checkout -b feature/your-feature-name
   ```

4. **Make your changes** and commit them with descriptive messages.
5. **Push to your fork**:

   ```bash
   git push origin feature/your-feature-name
   ```

6. **Open a pull request** on the main repository.

---

## Additional Notes

- **API Call Limits**: The free Alpha Vantage API key has a limit of 5 API calls per minute and 500 per day. Be mindful of these limits when testing the application.
- **Error Handling**: The application includes basic error handling for failed API requests and rate limiting.
