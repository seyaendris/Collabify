"use client"


import React, { useState } from 'react'
import { SigninFlow } from '../types'
import SigninCard from './SigninCard'
import SignupCard from './SignupCard'

const AuhtScreen = () => {
  const [state, setState] = useState<SigninFlow>("signIn")
  return (
    <div className='h-full flex items-center justify-center bg-[#5c3b58]'>
      <div className='md:h-auto md:w-[420px]'>
          {state === "signIn" ? <SigninCard setState = {setState} /> : <SignupCard setState = {setState}  />}
      </div>
    </div>
  )
}

export default AuhtScreen
