import { signOut } from 'next-auth/react';
import { useEffect } from 'react';

const Logout = () => {
  useEffect(() => {
    signOut({
      callbackUrl: '/login',
    });
  });

  return <h1>Logout</h1>;
};

export default Logout;
