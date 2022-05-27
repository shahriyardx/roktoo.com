import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { API_BASE } from "../../../constrains";

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "roktoo",
      credentials: {
        username: { label: "Phone", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const payload = {
          phone: credentials.phone,
          password: credentials.password,
        };

        const res = await fetch(`${API_BASE}/user/login`, {
          method: "POST",
          body: JSON.stringify(payload),
          headers: { "Content-Type": "application/json" },
        });

        const data = await res.json();

        console.log(data);
        if (!res.ok) {
          if (data.error) {
            throw new Error(data.error);
          }

          throw new Error("Something went wrong, Try again later");
        }

        return data;
      },
    }),
  ],
  secret: process.env.JWT_SECRET,
  pages: {
    signIn: "/login",
    error: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user.user;
        token.accessToken = user.accessToken;
      }

      return token;
    },

    async session({ session, token }) {
      session.user = token.user;
      session.accessToken = token.accessToken;

      return session;
    },
  },
});
