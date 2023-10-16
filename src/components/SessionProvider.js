"use client";
// import { Session } from "next-auth";
import { SessionProvider as Provider } from "next-auth/react";
import React from "react";

// type Props={
//     children:React.ReactNode;
//     session:Session | null;
// }
export function SessionProvider({ children, session }) {
  // console.log(`from sessionprovider ${session}`)
  return <Provider session={session}>{children}</Provider>;
}
