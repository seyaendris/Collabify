"use client"

import { Authenticated, Unauthenticated, AuthLoading } from "convex/react";
import AuhtScreen from '@/features/auth/components/AuthScreen';

import { SignOut } from "@/features/auth/components/SignOut";
import UserButton from "@/features/auth/components/UserButton";

export default function Home() {

  return (
    <>
    <AuthLoading>{<p>Loading...</p>}</AuthLoading>
    <Unauthenticated>
      <AuhtScreen />
    </Unauthenticated>
    <Authenticated>
      Logged In
      <UserButton />
      {/* <SignOut /> */}
      
    </Authenticated>
  </>   
  );
}
