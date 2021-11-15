import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState, FormEvent } from 'react';

import { useUser } from '../utils/useUser';
import { User } from '@supabase/gotrue-js';

const SignUp = () => {
  const [newUser, setNewUser] = useState<User | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type?: string; content?: string }>({
    type: '',
    content: ''
  });
  const router = useRouter();
  const { signUp, user } = useUser();

  const handleSignup = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    setMessage({});
    const { error, user: createdUser } = await signUp({ email, password });
    if (error) {
      setMessage({ type: 'error', content: error.message });
    } else {
      if (createdUser) {
        setNewUser(createdUser);
      } else {
        setMessage({
          type: 'note',
          content: 'Check your email for the confirmation link.'
        });
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    if (newUser || user) {
      console.log("USER", newUser, user)
      // router.replace('/account');
    }
  }, [newUser, user]);

  return (
    <div className="flex justify-center height-screen-helper">
      <div className="flex flex-col justify-between max-w-lg p-3 m-auto w-80 ">
        <form onSubmit={handleSignup} className="flex flex-col space-y-4">
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
          <input
            placeholder="Name"
            value=""
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <div className="pt-2 w-full flex flex-col">
            <button type="submit">Sign up</button>
          </div>

          <span className="pt-1 text-center text-sm">
            <span className="text-accents-7">Do you have an account?</span>
            {` `}
            <Link href="/signin">
              <a className="text-accent-9 font-bold hover:underline cursor-pointer">
                Sign in.
              </a>
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
