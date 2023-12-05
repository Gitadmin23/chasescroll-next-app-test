import NextAuth, { AuthOptions, User } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { getSession } from 'next-auth/react'

export const authOptions: AuthOptions = {
    providers: [
        GoogleProvider({
            clientId: '126010586447-56kd8nikghvd4348b6uh04lpbhrq5rbt.apps.googleusercontent.com',
            clientSecret: 'I_nY6PbHlj3lflJFq-EtvbAX',
            authorization: {
                params: {
                  prompt: "consent",
                  access_type: "offline",
                  response_type: "code"
                }
            }
        })
    ],
    callbacks: {
        signIn: async ({ user, account }) => {
            return {
                user,
                account
            } as any
        },
        session: async ({ session, user, token }) => {
            return {
                session,
                user,
                token,
            } as any
        },
        jwt: ({ token, account }) => {
            token.accessToken = account?.access_token;
            token.idToken = account?.id_token;
            token.refeshToken =account?.refresh_token;
            console.log(token)
            return {
                token,
            }
        }
    },
    secret: 'wferonvoerbnoeribe',
}

export default NextAuth(authOptions);