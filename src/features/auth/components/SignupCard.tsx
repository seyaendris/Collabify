import React from 'react'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { FaGithub } from 'react-icons/fa'
import { FcGoogle } from 'react-icons/fc'
import { SigninFlow } from '../types'

interface SignupCardProps {
  setState: (state: SigninFlow) => void
}

function SignupCard({ setState }: SignupCardProps) {
  const { register, handleSubmit, formState: { errors }, watch } = useForm();

  const onSubmit = (data: any) => {
    console.log(data); // Handle form submission
  };

  const password = watch('password', '');

  return (
    <Card className='w-full h-full p-8'>
      <CardHeader className='px-0 pt-0'>
        <CardTitle>Signup to continue</CardTitle>
        <CardDescription>Use your email or another service to continue</CardDescription>
      </CardHeader>

      <CardContent className='space-y-5 px-0 pb-0'>
        <form className='space-y-2.5' onSubmit={handleSubmit(onSubmit)}>
          <Input 
            {...register('email', { required: 'Email is required' })}
            placeholder='Email'
            type='email'
            hasError={!!errors.email}
          />
          {errors.email && errors.email.message && (
            <p className='text-red-500 text-xs'>{String(errors.email.message)}</p>
          )}

          <Input 
            {...register('password', { required: 'Password is required' })}
            placeholder='Password'
            type='password'
            hasError={!!errors.password}
          />
          {errors.password && errors.password.message && (
            <p className='text-red-500 text-xs'>{String(errors.password.message)}</p>
          )}

          <Input 
            {...register('confirmPassword', {
              required: 'You need to confirm your Password',
              validate: value => value === password || 'Passwords do not match',
            })}
            placeholder='Confirm Password'
            type='password'
            hasError={!!errors.confirmPassword}
          />
          {errors.confirmPassword && errors.confirmPassword.message && (
            <p className='text-red-500 text-xs'>{String(errors.confirmPassword.message)}</p>
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

        <p className='text-xs text-muted-foreground'>
          Already have an account? 
          <span 
            onClick={() => setState('signIn')} 
            className='text-sky-600 font-semibold hover:text-sky-500 hover:underline cursor-pointer'
          >
            Sign In
          </span>
        </p>
      </CardContent>
    </Card>
  )
}

export default SignupCard
