import NextAuth from "next-auth"
import { PrismaAdapter } from '@auth/prisma-adapter';
import prisma from "./lib/prisma";
import Google from 'next-auth/providers/google';
import GitHub from 'next-auth/providers/github';
import { Adapter } from 'next-auth/adapters';
import Resend from 'next-auth/providers/resend';
import Credentials from "next-auth/providers/credentials"
import { hashPassword } from "./utils/password";
import getUserFromDB from "./utils/user";
import { User } from "../types/user";

export const { handlers, signIn, signOut, auth } = NextAuth({
    trustHost: true,
    theme: {
        logo: '/logo.png',
    },
    adapter: PrismaAdapter(prisma) as Adapter,
    callbacks: {
        session({session, user}) {
            session.user.role = user.role;
            return session
        }
    },
    providers: [Google, GitHub, 
    //     Resend({
    //     from: "no-reply@next-auth.umer.tech",
    // }),
    Credentials({
        name: "Credentials",
        credentials: {
            email: { label: "Email", type: "text" },
            password: {  label: "Password", type: "password" },
        },
        authorize: async (credentials) => {
            let user: User | null = null
            try {
                user = await getUserFromDB(credentials!.email as string, credentials!.password as string)
            } catch (error) {
                throw new Error('Invalid credentials')
            }
            if(user){
                return {
                    id: user.id,
                    email: user.email,
                    role: user.role
                }
            }else{
                return null
            }
            

        }



    }),
    ],
})