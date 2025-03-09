import React from "react";
import { Slot } from "expo-router"; //majeo de rutas
import { SessionProvider } from './ctx'; 

export default function Root() {
  return (
    <SessionProvider>
      <Slot />
    </SessionProvider>
  );
}