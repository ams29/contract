import React from "react";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen bg-[#1E2029] text-white">
          <header className="bg-gradient-to-r from-blue-600 to-purple-600 py-4">
            <div className="container mx-auto px-4">
              <h1 className="text-3xl font-bold text-center">
                AI Contract Negotiation Agent
              </h1>
            </div>
          </header>
          <main className="container mx-auto py-8 px-4">
            {children}
          </main>
          <footer className="bg-[#2A2D3A] py-4 mt-12">
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
