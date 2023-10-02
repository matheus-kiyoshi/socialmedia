import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

export const authOptions = {
	providers: [
		CredentialsProvider({
			name: 'Credentials',
			credentials: {
				username: { label: "Username", type: "text", placeholder: "username" },
				password: { label: "Password", type: "password" }
			},
			async authorize(credentials) {
				if (!credentials) {
					return null;
				}
				const payload = {
          username: credentials.username,
          password: credentials.password,
        }

        const res = await fetch('https://incognitosocial.vercel.app/api/login', {
          method: 'POST',
          body: JSON.stringify(payload),
          headers: {
            'Content-Type': 'application/json',
          },
        })
        const user = await res.json();
        if (!res.ok) {
          throw new Error(user.message);
        }
        if (res.ok && user) {
          return user;
        }

        return null;
			}
		})
	],
	secret: process.env.NEXTAUTH_SECRET,
	callbacks: {
    async jwt({ token, user, account }: { token: any, user: any, account: any }) {
      if (account && user) {
        return {
          ...token,
          accessToken: user.token,
          refreshToken: user.refreshToken,
        };
      }

      return token;
    },

    async session({ session, token }: { session: any, token: any }) {
      session.user.accessToken = token.accessToken;
      session.user.refreshToken = token.refreshToken;
      session.user.accessTokenExpires = token.accessTokenExpires;

      return session;
    },
  }
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
