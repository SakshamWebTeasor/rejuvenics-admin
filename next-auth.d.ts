import NextAuth from "next-auth"

declare module "next-auth" {
    interface User {
        id: string
        name: string,
        email: string,
        phone: string,
        acess_token: string
    }

    /**
     * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
     */
    interface Session {
        user: {
            /** The user's name. */
            name: string,
            acess_token: string
        }
    }
}