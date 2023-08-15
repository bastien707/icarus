import { prisma } from "@/lib/prisma";
import { compare } from "bcrypt";
import NextAuth, { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Sign in",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "test@test.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user) {
          console.log("invalid email");
          return null;
        }

        const isPasswordValid = await compare(
          credentials.password,
          user.password
        );

        if (!isPasswordValid) {
          console.log("invalid password");
          return null;
        }

        return {
          id: user.id + "",
          email: user.email,
          name: user.name + "",
          ethAddress: user.ethAddress
        };
      },
    }),
  ],
  callbacks: {
    session: ({session, token}) => {
        //console.log('Session Callback', {session, token});
        return {
            ...session,
            user: {
                ...session.user,
                id: token.id,
                ethAddress: token.ethAddress
            }
        }
    },
    jwt: ({token, user}) => {
        //console.log('JWT Callback', {token, user});
        if(user) {
            const u = user as unknown as any;
            return {
                ...token,
                id: u.id,
                ethAddress: u.ethAddress
            }
        }
        return token;
    }
  },

};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
