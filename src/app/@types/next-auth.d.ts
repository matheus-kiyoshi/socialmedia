import NextAuth from "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
			id: string
			username: string
			nickname: string
			icon: string
			usersBlocked: string[]
			accessToken: string
    }
  }
}