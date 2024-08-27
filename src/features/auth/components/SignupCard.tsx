import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import React from 'react'
import { FaGithub } from 'react-icons/fa'
import { FcGoogle } from 'react-icons/fc'
import { SigninFlow } from '../types'

interface SignupCardProps {
    setState: (state: SigninFlow) => void
}

function SignupCard({setState}: SignupCardProps) {
  return (
    <Card className='w-full h-full p-8'>
        <CardHeader className='px-0 pt-0'>

            <CardTitle>
                Login to continue
            </CardTitle>

            <CardDescription>
                Use your email or another service to continue
            </CardDescription>
            
        </CardHeader>

        <CardContent className='space-y-5 px-0 pb-0'>
            <form className='space-y-2.5'>
                <Input 
                    disabled={false}
                    value=""
                    onChange={() => {}}
                    placeholder='Email'
                    type='email'
                    required
                    />
                <Input 
                    disabled={false}
                    value=""
                    onChange={() => {}}
                    placeholder='Password'
                    type='password'
                    required
                    />
                <Button type='submit' className='w-full' size="lg" disabled={false}>
                    Continue
                </Button>
            </form>
            <Separator />

            <div className='flex flex-col gap-y-2.5'>
                <Button 
                    disabled={false}
                    onClick={() => {}}
                    variant="outline"
                    size="lg"
                    className='w-full relative'
                    >
                    <FcGoogle className='size-5 absolute top-2.5 left-2.5' />
                    Continue with Google
                </Button>
                <Button 
                    disabled={false}
                    onClick={() => {}}
                    variant="outline"
                    size="lg"
                    className='w-full relative'
                    >
                    <FaGithub className='size-5 absolute top-2.5 left-2.5' />
                    Continue with Github
                </Button>
            </div>

            <p className='text-xs text-muted-foreground'>Already have an account<span onClick={() => setState('signIn')} className='text-sky-700 hover:underline cursor-pointer'>Sign In</span></p>
        </CardContent>
    </Card>
  )
}

export default SignupCard
