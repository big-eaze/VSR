import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import AuthModal from "./Auth/AuthModal";

export default function Layout() {
  const [authOpen, setAuthOpen] = useState(false);

  return (
    <>
      <Header onAuthOpen={() => setAuthOpen(true)} />
      <AuthModal isOpen={authOpen} onClose={() => setAuthOpen(false)} />

      <main className="pt-20">
        <Outlet />
      </main>
    </>
  );
}
