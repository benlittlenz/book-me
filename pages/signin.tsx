import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState, FormEvent } from 'react';

import { useUser } from '../utils/useUser';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type?: string; content?: string }>({
    type: '',
    content: ''
  });
  const router = useRouter();
  const { user, signIn } = useUser();

  const handleSignin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    setMessage({});

    const { error } = await signIn({ email, password });
    if (error) {
      setMessage({ type: 'error', content: error.message });
    }
    if (!password) {
      setMessage({
        type: 'note',
        content: 'Check your email for the magic link.'
      });
    }
    setLoading(false);
  };

  useEffect(() => {
    if (user) {
      router.replace('/account');
    }
  }, [user]);

  if (!user)
    return (
      <div className="flex justify-center height-screen-helper">
        <div className="flex flex-col justify-between max-w-lg p-3 m-auto w-80 ">
          <div className="flex flex-col space-y-4">
            {message.content && (
              <div
                className={`${
                  message.type === 'error' ? 'text-pink' : 'text-green'
                } border ${
                  message.type === 'error' ? 'border-pink' : 'border-green'
                } p-3`}
              >
                {message.content}
              </div>
            )}
            <form onSubmit={handleSignin} className="flex flex-col space-y-4">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button type="submit">Sign in</button>
            </form>

            <span className="pt-1 text-center text-sm">
              <span className="text-accents-7">Dont have an account?</span>
              {` `}
              <Link href="/signup">
                <a className="text-accent-9 font-bold hover:underline cursor-pointer">
                  Sign up.
                </a>
              </Link>
            </span>
          </div>

          <div className="flex items-center my-6">
            <div
              className="border-t border-accents-2 flex-grow mr-3"
              aria-hidden="true"
            ></div>
            <div className="text-accents-4">Or</div>
            <div
              className="border-t border-accents-2 flex-grow ml-3"
              aria-hidden="true"
            ></div>
          </div>
        </div>
      </div>
    );

  return <div className="m-6">Loading</div>;
};

export default SignIn;
