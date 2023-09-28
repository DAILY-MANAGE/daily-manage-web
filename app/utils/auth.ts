import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Sign in",
      credentials: {
        usuario: {
          label: "Usuário",
          type: "email",
          placeholder: "Usuário",
        },
        senha: { label: "Senha", type: "password" },
      },
      async authorize(credentials) {
        const user = { id: "1", name: "Admin", email: "admin@admin.com" };
        return user;
      },
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      return true
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};