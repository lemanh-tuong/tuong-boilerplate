import { NextApiRequest, NextApiResponse } from 'next';
import NextAuth, { NextAuthOptions, User } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
  },
  providers: [
    CredentialsProvider({
      id: 'credentials',
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'Input email' },
        password: {
          label: 'Password',
          type: 'password',
          placeholder: 'Input password',
        },
      },
      // Step 1
      async authorize(credentials) {
        console.log('Authorize', credentials);
        if (credentials) {
          const user: User = {
            id: '1',
            rbacUser: {
              _id: '5cc2d094-00f4-11ee-be56-0242ac120002',
              role: 'admin',
              status: 'active',
              // status: "unactive",
              token: 'Bearer ___Hello___',
              email: credentials?.email,
            },
          };
          return Promise.resolve(user);
        }
        return Promise.reject('Login error');
      },
    }),
    // CredentialsProvider({
    //   id: "intranet-credentials",
    //   name: "Two Factor Auth",
    //   credentials: {
    //     email: { label: "Username", type: "text ", placeholder: "jsmith" },
    //     "2fa-key": { label: "2FA Key" },
    //   },
    //   async authorize(credentials, req) {
    //     const user: User = {
    //       id: "1",
    //       email: "Hello",
    //       image: "",
    //       name: "J Smith",
    //     };
    //     return user;
    //   },
    // }),
  ],
  pages: {
    signIn: '/login',
    signOut: '/logout',
  },
  callbacks: {
    redirect({ baseUrl, url }) {
      console.log(`Redirect to ${url}`);
      return url.startsWith(baseUrl) ? Promise.resolve(url) : Promise.resolve(baseUrl);
    },
    // Step 2
    async signIn({ user }) {
      console.log('Sign in proxy', user);
      if (user.rbacUser.status === 'unactive') {
        return '/expire';
      }
      return true;
    },
    // Step 3
    async jwt({ token, user, trigger, session }) {
      console.log('JWT', { token, user, trigger, session });
      if (trigger === 'update' && session.role && token.rbacUser) {
        token.rbacUser.role = session.role;
      }
      if (user) {
        token.rbacUser = user.rbacUser;
      }
      return token;
    },
    async session({ session, token }) {
      // console.log("Session", { session, token });
      session.rbacUser = token.rbacUser;
      return session;
    },
  },
};

const auth = (req: NextApiRequest, res: NextApiResponse) => {
  return NextAuth(req, res, authOptions);
};

export default auth;
