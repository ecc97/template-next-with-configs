import NextAuth from 'next-auth/next';
import CredentialsProvider from 'next-auth/providers/credentials';
import { User } from 'next-auth';

const users = [
    { id: "1", email: "test@example.com", username: "test", password: "password123", token: "my-token-fake-123" },
];
const authenticateUser = async (email: string, password: string) => {
  const user = users.find((u) => u.email === email && u.password === password);
  if (user) {
    return {
      id: user.id,
      email: user.email,
      username: user.username,
      password: user.password,
      token: user.token,
    };
  } else {
    return null;
  }
}

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'Enter your email',
        },
        password: {
          label: 'Password',
          type: 'password',
          placeholder: 'Enter your password',
        },
      },
      async authorize(credentials: Record<"email" | "password", string> | undefined): Promise<User | null> {
        if (!credentials) return null;
        const user = await authenticateUser(
          credentials.email,
          credentials.password
        );
        if (user) {
          return user;
        } else {
          throw new Error('Invalid email or password');
        }
      },
    }),
  ],
  
  // pages: {
  //   signIn: '/sign-in',
  //   signOut: '/sign-out',
  //   error: '/error',
  // },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.username = user.name
        token.token = user.token;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
        session.user.username = token.username as string
        session.user.token = token.token as string;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET || 'some-super-secret-key',
  session: { strategy: 'jwt' },
});

export { handler as GET, handler as POST };
