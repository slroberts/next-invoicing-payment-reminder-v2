'use client';
import { useCallback, useState } from 'react';
import { register, login } from '@/lib/api';
import { useAuth } from '@/hooks/useAuth';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';

const registerContent = {
  linkUrl: '/login',
  linkText: 'Already have an account?',
  header: 'Create a new account',
  subheader: 'Welcome, just a few things to get you started!',
  buttonText: 'Register',
};

const signinContent = {
  linkUrl: '/register',
  linkText: "Don't have an account?",
  header: 'Welcome back',
  subheader: 'Log in to access your account.',
  buttonText: 'Log In',
};

const initial = { email: '', password: '', firstName: '', lastName: '' };

export default function AuthForm({ mode }: { mode: 'register' | 'login' }) {
  const [formState, setFormState] = useState({ ...initial });
  const [error, setError] = useState('');

  const router = useRouter();
  const { setIsUserLoggedIn } = useAuth();

  const handleSubmit = useCallback(
    async (e: { preventDefault: () => void }) => {
      e.preventDefault();

      try {
        if (mode === 'register') {
          await register(formState);
        } else {
          await login(formState);
        }
        localStorage.setItem('user', JSON.stringify(formState));
        router.push('/dashboard');
        router.refresh();
        setIsUserLoggedIn(true);
      } catch (e) {
        mode === 'register'
          ? setError('This email address is already in use.')
          : setError('Invalid login');
      } finally {
        setFormState({ ...initial });
      }
    },
    [formState, mode, router, setIsUserLoggedIn]
  );

  const content = mode === 'register' ? registerContent : signinContent;
  return (
    <Card>
      <div className='w-full'>
        <div className='text-center'>
          <h2 className='text-2xl sm:text-3xl mb-2'>{content.header}</h2>
          <p className='tex-lg text-slate-400'>{content.subheader}</p>
          {error && (
            <p className='mt-6 py-2 bg-red-50 text-red-500 border border-red-200'>
              {error}
            </p>
          )}
        </div>
        <form onSubmit={handleSubmit} className='pt-8 pb-2 w-full'>
          {mode === 'register' && (
            <div className='flex gap-4 mb-4 sm:mb-8 justify-between flex-col sm:flex-row'>
              <div className='w-full'>
                <div className='text-sm mb-4 ml-2 text-blue-600 font-semibold'>
                  First Name
                </div>
                <Input
                  name='firstName'
                  required
                  type='text'
                  placeholder='First Name'
                  value={formState.firstName}
                  className='border-solid border-gray border-2 px-6 py-2 text-base rounded-3xl w-full'
                  onChange={(e: { target: { value: any } }) =>
                    setFormState((s) => ({ ...s, firstName: e.target.value }))
                  }
                />
              </div>
              <div className='w-full'>
                <div className='text-sm mb-4 ml-2 text-blue-600 font-semibold'>
                  Last Name
                </div>
                <Input
                  name='lastName'
                  required
                  type='text'
                  placeholder='Last Name'
                  value={formState.lastName}
                  className='border-solid border-gray border-2 px-6 py-2 text-base rounded-3xl w-full'
                  onChange={(e: { target: { value: any } }) =>
                    setFormState((s) => ({ ...s, lastName: e.target.value }))
                  }
                />
              </div>
            </div>
          )}
          <div className='mb-4 sm:mb-8'>
            <div className='text-sm mb-4 ml-2 text-blue-600 font-semibold'>
              Email
            </div>
            <Input
              name='email'
              required
              type='email'
              placeholder='Email'
              value={formState.email}
              className='border-solid border-gray border-2 px-6 py-2 text-base rounded-3xl w-full'
              onChange={(e: { target: { value: any } }) =>
                setFormState((s) => ({ ...s, email: e.target.value }))
              }
            />
          </div>
          <div className='mb-8'>
            <div className='text-sm mb-4 ml-2 text-blue-600 font-semibold'>
              Password
            </div>
            <Input
              name='password'
              required
              value={formState.password}
              type='password'
              placeholder='Password'
              className='border-solid border-gray border-2 px-6 py-2 text-base rounded-3xl w-full'
              onChange={(e: { target: { value: any } }) =>
                setFormState((s) => ({ ...s, password: e.target.value }))
              }
            />
          </div>
          <div className='flex flex-wrap gap-6 items-center justify-between'>
            <div>
              <span>
                <Link
                  href={content.linkUrl}
                  className='underline hover:text-black/50'
                >
                  {content.linkText}
                </Link>
              </span>
            </div>
            <div>
              <Button intent='primary'>{content.buttonText}</Button>
            </div>
          </div>
        </form>
      </div>
    </Card>
  );
}
