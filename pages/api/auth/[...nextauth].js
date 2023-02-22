import connectToMongo from "@/database/conn";
import Users from "@/model/Schema";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcryptjs";

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      async authorize(credentials, req) {
        try {
          connectToMongo();
        } catch (error) {
          console.log("Connection Failed");
        }
        const result = await Users.findOne({ email: credentials.email });

        if (!result) {
          throw new Error("No user found with email Please sign up");
        }

        // check password
        const checkPassword = await compare(credentials.password, result.password);
        console.log(checkPassword)

        //incorrect password
        if (!checkPassword || result.email !== credentials.email) {
          console.log("Wrong");
          throw new Error("Email or Password does not much");
          
        }
        return result
      },
    }),
  ],
});
