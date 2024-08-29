import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { FaGithub } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { SigninFlow } from '../types';
import { useAuthActions } from "@convex-dev/auth/react";
import { TriangleAlert } from 'lucide-react';

interface SigninCardProps {
  setState: (state: SigninFlow) => void;
}

interface SigninFormData {
  email: string;
  password: string;
}

function SigninCard({ setState }: SigninCardProps) {
  const { signIn } = useAuthActions();
  const { register, handleSubmit, formState: { errors } } = useForm<SigninFormData>(); // Specify the form data type
  const [pending, setPending] = useState(false);
  const [error, setError] = useState('');

  const onProviderSignin = (provider: 'github' | 'google') => {
    setPending(true);
    signIn(provider)
      .finally(() => {
        setPending(false);
      });
  };

  const onPasswordSignin = (data: SigninFormData) => {
    setPending(true);
    signIn('password', { email: data.email, password: data.password, flow: 'signIn' })
      .catch(() => {
        setError('Invalid Email or Password');
      })
      .finally(() => {
        setPending(false);
      });
  };

  return (
    <Card className='w-full h-full p-8'>
      <CardHeader className='px-0 pt-0'>
        <CardTitle>Login to continue</CardTitle>
        <CardDescription>Use your email or another service to continue</CardDescription>
      </CardHeader>

      {!!error && (
        <div className='bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive mb-6'>
          <TriangleAlert className='size-4' />
          <p>{error}</p>
        </div>
      )}

      <CardContent className='space-y-5 px-0 pb-0'>
        <form className='space-y-2.5' onSubmit={handleSubmit(onPasswordSignin)}>
          <Input
            disabled={pending}
            {...register('email', { required: 'Email is required' })}
            placeholder='Email'
            type='email'
            hasError={!!errors.email}  // Pass the error state to the Input component
          />
          {errors.email && (
            <p className='text-red-500 text-xs'>{String(errors.email.message)}</p>
          )}

          <Input
            disabled={pending}
            {...register('password', { required: 'Password is required' })}
            placeholder='Password'
            type='password'
            hasError={!!errors.password}  // Pass the error state to the Input component
          />
          {errors.password && (
            <p className='text-red-500 text-xs'>{String(errors.password.message)}</p>
          )}

          <Button type='submit' className='w-full' size="lg" disabled={pending}>
            Continue
          </Button>
        </form>

        <Separator />

        <div className='flex flex-col gap-y-2.5'>
          <Button
            disabled={pending}
            onClick={() => onProviderSignin('google')}
            variant="outline"
            size="lg"
            className='w-full relative'
          >
            <FcGoogle className='size-5 absolute top-2.5 left-2.5' />
            Continue with Google
          </Button>
          <Button
            disabled={pending}
            onClick={() => onProviderSignin('github')}
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
  );
}

export default SigninCard;
