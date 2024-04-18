import { DefaultSession, DefaultUser } from 'next-auth';

declare module 'next-auth' {
  interface User extends DefaultUser {
    rbacUser: {
      _id: string;
      email: string;
      role: string;
      status: string;
      token: `Bearer ___Hello___`;
    };
  }

  interface Session extends DefaultSession {
    rbacUser?: User['rbacUser'];
  }
}

declare module 'next-auth/jwt' {
  import { User } from 'next-auth';
  import { JWT } from 'next-auth/jwt';
  interface JWT {
    rbacUser?: User['rbacUser'];
  }
}
