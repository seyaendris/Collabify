import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { FaGithub } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { SigninFlow } from '../types';
import { TriangleAlert } from 'lucide-react';
import { useAuthActions } from "@convex-dev/auth/react";

interface SignupCardProps {
  setState: (state: SigninFlow) => void;
}

interface SignupFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

function SignupCard({ setState }: SignupCardProps) {
  const { register, handleSubmit, formState: { errors }, watch } = useForm<SignupFormData>(); // Specify the form data type
  const { signIn } = useAuthActions();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState('');

  // Watch the password and confirmPassword fields
  const password = watch('password');
  const confirmPassword = watch('confirmPassword');

  const onProviderSignup = (provider: 'github' | 'google') => {
    setPending(true);
    signIn(provider)
      .finally(() => {
        setPending(false);
      });
  };

  const onPasswordSignup = (data: SignupFormData) => {
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setPending(true);

    signIn('password', { name: data.name, email: data.email, password: data.password, flow: 'signUp' })
      .catch(() => {
        setError('Something went wrong!');
      })
      .finally(() => {
        setPending(false);
      });
  };

  return (
    <Card className='w-full h-full p-8'>
      <CardHeader className='px-0 pt-0'>
        <CardTitle>Signup to continue</CardTitle>
        <CardDescription>Use your email or another service to continue</CardDescription>
      </CardHeader>

      {!!error && (
        <div className='bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive mb-6'>
          <TriangleAlert className='size-4' />
          <p>{error}</p>
        </div>
      )}

      <CardContent className='space-y-5 px-0 pb-0'>
        <form className='space-y-2.5' onSubmit={handleSubmit(onPasswordSignup)}>
          
          <Input
            disabled={pending}
            {...register('name', { required: 'Name is required' })}
            placeholder='Full Name'
            type='text'
            hasError={!!errors.name}
          />
          {errors.name && errors.name.message && (
            <p className='text-red-500 text-xs'>{String(errors.name.message)}</p>
          )}

          <Input
            disabled={pending}
            {...register('email', { required: 'Email is required' })}
            placeholder='Email'
            type='email'
            hasError={!!errors.email}
          />
          {errors.email && errors.email.message && (
            <p className='text-red-500 text-xs'>{String(errors.email.message)}</p>
          )}

          <Input
            disabled={pending}
            {...register('password', { required: 'Password is required' })}
            placeholder='Password'
            type='password'
            hasError={!!errors.password}
          />
          {errors.password && errors.password.message && (
            <p className='text-red-500 text-xs'>{String(errors.password.message)}</p>
          )}

          <Input
            disabled={pending}
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

          <Button type='submit' className='w-full' size="lg" disabled={pending}>
            Continue
          </Button>
        </form>

        <Separator />

        <div className='flex flex-col gap-y-2.5'>
          <Button
            disabled={pending}
            onClick={() => onProviderSignup('google')}
            variant="outline"
            size="lg"
            className='w-full relative'
          >
            <FcGoogle className='size-5 absolute top-2.5 left-2.5' />
            Continue with Google
          </Button>
          <Button
            disabled={pending}
            onClick={() => onProviderSignup('github')}
            variant="outline"
            size="lg"
            className='w-full relative'
          >
            <FaGithub className='size-5 absolute top-2.5 left-2.5' />
            Continue with Github
          </Button>
        </div>

        <p className='text-xs text-muted-foreground'>
          Already have an account?{' '}
          <span
            onClick={() => setState('signIn')}
            className='text-sky-600 font-semibold hover:text-sky-500 hover:underline cursor-pointer'
          >
            Sign In
          </span>
        </p>
      </CardContent>
    </Card>
  );
}

export default SignupCard;
