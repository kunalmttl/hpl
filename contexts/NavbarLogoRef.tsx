"use client";

import React, { createContext, useContext, useRef, RefObject } from "react";

type NavbarLogoRefContextType = {
  logoRef: RefObject<HTMLAnchorElement | null>;
  isIntroDone: boolean;
  setIntroDone: (done: boolean) => void;
};

const NavbarLogoRefContext = createContext<NavbarLogoRefContextType | null>(null);

export function NavbarLogoRefProvider({ children }: { children: React.ReactNode }) {
  const logoRef = useRef<HTMLAnchorElement | null>(null);
  const [isIntroDone, setIntroDone] = React.useState(false);

  return (
    <NavbarLogoRefContext.Provider value={{ logoRef, isIntroDone, setIntroDone }}>
      {children}
    </NavbarLogoRefContext.Provider>
  );
}

export function useNavbarLogoRef() {
  const ctx = useContext(NavbarLogoRefContext);
  if (!ctx) throw new Error("useNavbarLogoRef must be used inside NavbarLogoRefProvider");
  return ctx;
}
