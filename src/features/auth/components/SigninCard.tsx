import React from 'react'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { FaGithub } from 'react-icons/fa'
import { FcGoogle } from 'react-icons/fc'
import { SigninFlow } from '../types'

interface SigninCardProps {
  setState: (state: SigninFlow) => void
}

function SigninCard({ setState }: SigninCardProps) {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data: any) => {
    console.log(data); // Handle form submission
  };

  return (
    <Card className='w-full h-full p-8'>
      <CardHeader className='px-0 pt-0'>
        <CardTitle>Login to continue</CardTitle>
        <CardDescription>Use your email or another service to continue</CardDescription>
      </CardHeader>

      <CardContent className='space-y-5 px-0 pb-0'>
      <form className='space-y-2.5' onSubmit={handleSubmit(onSubmit)}>

        <Input 
            {...register('email', { required: 'Email is required' })}
            placeholder='Email'
            type='email'
            hasError={!!errors.email}  // Pass the error state to the Input component
        />

        {errors.email && errors.email.message && (
            <p className='text-red-500 text-xs'>{String(errors.email.message)}</p>
        )}

        
        <Input 
            {...register('password', { required: 'Password is required' })}
            placeholder='Password'
            type='password'
            hasError={!!errors.password}  // Pass the error state to the Input component
        />

        {errors.password && errors.password.message && (
            <p className='text-red-500 text-xs'>{String(errors.password.message)}</p>
        )}
        
        
        <Button type='submit' className='w-full' size="lg">
            Continue
        </Button>
    </form>

        
        <Separator />

        <div className='flex flex-col gap-y-2.5'>
          <Button 
            onClick={() => {}}
            variant="outline"
            size="lg"
            className='w-full relative'
          >
            <FcGoogle className='size-5 absolute top-2.5 left-2.5' />
            Continue with Google
          </Button>
          <Button 
            onClick={() => {}}
            variant="outline"
            size="lg"
            className='w-full relative'
          >
            <FaGithub className='size-5 absolute top-2.5 left-2.5' />
            Continue with Github
          </Button>
        </div>

        <p className='text-xs text-muted-foreground'>Don&apos;t have an account <span onClick={() => setState('signUp')} className='text-sky-600 font-semibold hover:underline cursor-pointer hover:text-sky-500'>Sign Up</span></p>
      </CardContent>
    </Card>
  )
}

export default SigninCard
