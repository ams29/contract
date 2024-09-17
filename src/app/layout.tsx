import React from "react";
import './globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-background text-foreground">
        <div className="flex flex-col min-h-screen">
          <header className="bg-gradient-to-r from-blue-600 to-purple-600 py-4">
            <div className="container mx-auto px-4">
              <h1 className="text-3xl font-bold text-center text-white">
                AI Contract Negotiation Agent
              </h1>
            </div>
          </header>
          <main className="flex-grow container mx-auto py-8 px-4">
            {children}
          </main>
          <footer className="bg-gray-800 py-4 mt-12">
            <div className="container mx-auto px-4 text-center text-gray-400">
              <p>
                &copy; 2023 AI Contract Negotiation Agent. All rights reserved.
              </p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
