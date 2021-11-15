import Link from 'next/link';
import * as z from 'zod';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { Form, InputField } from '@/components/Form';
import { Button } from '@/components/Elements';

import { useUser } from '../utils/useUser';

const schema = z.object({
  email: z.string().min(1, 'Required'),
  password: z.string().min(1, 'Required')
});

type RegisterValues = {
  email: string;
  password: string;
};

const SignUp = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type?: string; content?: string }>({
    type: '',
    content: ''
  });
  const router = useRouter();
  const { signUp, user } = useUser();

  const handleSignup = async (email: string, password: string) => {
    setLoading(true);
    setMessage({});
    const { error, user: createdUser } = await signUp({ email, password });
    if (error) {
      setMessage({ type: 'error', content: error.message });
    } else {
      setMessage({
        type: 'note',
        content: 'Check your email for the confirmation link.'
      });
    }
    setLoading(false);
  };

  useEffect(() => {
    if (user) {
      router.replace('/');
    }
  }, [user]);

  if (!user)
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="flex justify-center"></div>

          <h2 className="mt-3 text-center text-3xl font-extrabold text-gray-900">
            Register
          </h2>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <Form<RegisterValues, typeof schema>
              onSubmit={async ({ email, password }) =>
                await handleSignup(email, password)
              }
              schema={schema}
            >
              {({ register, formState }) => (
                <>
                  <InputField
                    type="email"
                    label="Email Address"
                    error={formState.errors['email']}
                    registration={register('email')}
                  />
                  <InputField
                    type="password"
                    label="Password"
                    error={formState.errors['password']}
                    registration={register('password')}
                  />
                  <div>
                    <Button
                      type="submit"
                      className="w-full"
                      isLoading={loading}
                    >
                      Register
                    </Button>
                  </div>
                </>
              )}
            </Form>
            <div className="mt-2 flex items-center justify-end">
              <div className="text-sm">
                <Link href="/register">
                  <a className="font-medium text-blue-600 hover:text-blue-500">
                    Register
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
};

export default SignUp;
