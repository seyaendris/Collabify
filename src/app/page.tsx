"use client"

import { Authenticated, Unauthenticated, AuthLoading } from "convex/react";
import AuhtScreen from '@/features/auth/components/AuthScreen';
import UserButton from "@/features/auth/components/UserButton";
import { useGetWorkspaces } from '@/features/workspaces/api/useGetWorkspaces'
import { useEffect, useMemo } from "react";

export default function Home() {
  const {data, isLoading} = useGetWorkspaces()

  const workspaceId = useMemo(() => data?.[0]?._id, [data])
  
  useEffect(() => {
    if(isLoading) {
      return 
    }

    if(workspaceId) {
      console.log('Redirect to Workspace')
    }
    else{
      console.log('Open creation modal')
    }
  }, [workspaceId, isLoading])

  

  return (
    <>
    <AuthLoading>{<p>Loading...</p>}</AuthLoading>
    <Unauthenticated>
      <AuhtScreen />
    </Unauthenticated>
    <Authenticated>
      
      <UserButton />
      {/* <SignOut /> */}
      
    </Authenticated>
  </>   
  );
}
