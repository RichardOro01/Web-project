import NextAuth from "next-auth"

declare module "next-auth" {
    interface Session {
      name: string;
      role_code:number
  }
}
