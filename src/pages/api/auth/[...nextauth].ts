import axios from "@/lib/axios"
import NextAuth, { AuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

export const authOptions: AuthOptions = {
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "text", placeholder: "abc@email.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        try {
          const response = await axios.post("/login", {
            email: credentials?.email,
            password: credentials?.password
          });

          if (response.status !== 200) {
            return null;
          }

          // Set the accessToken and userId as properties of the user object
          const user = response.data;
          console.log("ussss:", user)
          user.accessToken = response.data.access_token;
          user.userId = response.data.id;
          user.isAdmin = response.data.isAdmin
          return user;
        } catch (error: any) {
          console.log(error.response)
          console.error("Authorization error:", error.message);
          return null;
        }
      }
    }),
  ],
  jwt: {
    maxAge: 24 * 60 * 60
  },
  pages: {
    signIn: "/"
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async session({ session, token }: { session: any; token: any }) {
      session.user.name = token.sub
      session.user.acess_token = token.accessToken;
      session.user.userId = token.id;
      session.user.isAdmin = token.isAdmin;
      return session
    },
    async jwt({ token, user }: { token: any, user: any }) {
      if (user) {
        console.log('user:', user)
        token.id = user.id;
        token.accessToken = user.acess_token;
        token.isAdmin = user.isAdmin
      }
      return token;
    },
  },
}
export default NextAuth(authOptions)