import React from "react";
import PayoutWizard from "./components/PayoutWizard";
import ErrorBoundary from "./components/ErrorBoundary";
import "./App.css";

function App() {
  return (
    <div className="app">
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <header className="app-header">
        <div className="container">
          <h1 className="app-title">Payout Management System</h1>
        </div>
      </header>
      <main id="main-content" className="app-main">
        <div className="container">
          <ErrorBoundary>
            <PayoutWizard />
          </ErrorBoundary>
        </div>
      </main>
    </div>
  );
}

export default App;
