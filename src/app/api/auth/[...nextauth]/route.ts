import prisma from "@/lib/prisma";
import NextAuth from "next-auth";
import CredentialsProvide from "next-auth/providers/credentials";
const handler = NextAuth({
  // Configure one or more authentication providers
  providers: [
    CredentialsProvide({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        try {
          const user = await prisma.users.findFirst({
            where: {
              username: credentials?.username,
              password: credentials?.password,
            },
          });
          if (!user) throw new Error("Invalid credentials");

          // If no error and we have user data, return it
          if (user) {
            const resultUser = { ...user, id: user.user_code.toString() };
            console.log(resultUser)
            return resultUser;
          }
        } catch (e) {
          console.log(e);
        }
        // Return null if user data could not be retrieved
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
});
export { handler as GET, handler as POST };
