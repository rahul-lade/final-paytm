import db from "@repo/db/client";
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcrypt";
import type { NextAuthOptions } from "next-auth";
import { LoginSchema } from "@repo/validators";

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                phone: { label: "Phone number", type: "text", placeholder: "1231231231", required: true },
                password: { label: "Password", type: "password", required: true }
            },
            async authorize(credentials) {
                if (!credentials) return null;

                const parsed = LoginSchema.safeParse({
                    phone: credentials.phone,
                    password: credentials.password
                });

                if (!parsed.success) {
                    return null;
                }

                const { phone, password } = parsed.data;
                const existingUser = await db.user.findFirst({
                    where: {
                        number: phone
                    }
                });

                if (existingUser) {
                    const passwordValidation = await bcrypt.compare(password, existingUser.password);
                    if (passwordValidation) {
                        return {
                            id: existingUser.id.toString(),
                            name: existingUser.name,
                            email: existingUser.number
                        }
                    }
                    return null;
                }

                return null;
            },
        })
    ],
    secret: process.env.JWT_SECRET,
    callbacks: {
        async session({ token, session }) {
            if (session.user) {
                session.user.id = token.sub || "";
            }
            return session;
        }
    }
};