import type { NextAuthOptions } from "next-auth";
import bcrypt from "bcryptjs";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
export const options: NextAuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "Enter your Email",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Enter your password",
        },
      },
      async authorize(credentials) {
        if (!credentials || !credentials.email || !credentials.password) {
          console.error("Missing credentials");
          return null;
        }
        try {
          // Send GraphQL query to fetch user by email
          const response = await fetch(
            "https://local.hasura.local.nhost.run/v1/graphql",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "x-hasura-admin-secret": "nhost-admin-secret",
              },
              body: JSON.stringify({
                query: `
              query GetUserByEmail($email: citext!) {
  user: users(where: { email: { _eq: $email } }) {
    id
    displayName
    email
    passwordHash
  }
}`,
                variables: {
                  email: credentials?.email,
                },
              }),
            }
          );

          const { data, errors } = await response.json();

          // Handle GraphQL errors
          if (errors) {
            console.error("GraphQL errors:", errors);
            return null;
          }

          const user = data?.user?.[0];

          // If no user is found, return null
          if (!user) {
            return null;
          }

          // Compare the provided password with the hashed password
          const isValidPassword = bcrypt.compareSync(
            credentials?.password,
            user.passwordHash
          );

          if (isValidPassword) {
            // Return the user object to NextAuth
            return {
              id: user.id,
              name: user.displayName,
              email: user.email,
            };
          } else {
            // Invalid password
            return null;
          }
        } catch (error) {
          console.error("Error in authorize function:", error);
          return null;
        }
      },
    }),
  ],
  pages: {
    newUser: "/", // Redirect new users to a welcome page
  },
  callbacks: {
    async redirect({ url, baseUrl }) {
      // Log for debugging
      console.log("Redirect URL:", url, "Base URL:", baseUrl);

      // Redirect to a custom page after login
      if (url.startsWith(baseUrl)) {
        return url; // Keep the redirect within the same domain
      }

      // Default redirect for all logins
      return "/"; // Redirect users to the admin page
    },
  },
};
