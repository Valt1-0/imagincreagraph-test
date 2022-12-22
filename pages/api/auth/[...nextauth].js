import NextAuth from "next-auth";
import connectMongo from "../../../utils/connectMongo";
import CredentialsProvider from "next-auth/providers/credentials";
import Users from "../../../models/Users";
import bcrypt from "bcrypt";

connectMongo();

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      async authorize(credentials, req) {
        const email = credentials.email;
        const password = credentials.password;
        const test = credentials.test;

        const user = await Users.findOne({ email });

        if (!user) {
          throw new Error("Vous n'êtes pas encore inscrit");
        }
        if (user) {
          return signInUser({ password, user});
        }
      },
    }),
    // ...add more providers here
  ],
  callbacks: {
    async session({ session, token, user}) {
      // Send properties to the client, like an access_token from a provider.
      session.accessToken = token.accessToken
      // session.user = user
      console.log("SESSION " + JSON.stringify(session));
      
      return session
    }
  },
  pages: {
    signIn: "/",
    signUp: "/register",
  },
  session: {
    maxAge : 10 * 60,
  },
  database: process.env.MONGO_URI,
});

const signInUser = async ({ password, user}) => {
  if (!password) {
    throw new Error("Veuillez saisir votre mot de passe");
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Mot de passe incorrect");
  }
  return user;
};
