import NextAuth from "next-auth"
import Resend from "next-auth/providers/resend"
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import clientPromise from "./db";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    Resend({
      from: "whatever@thebusinessholics.com",
      sendVerificationRequest: async ({ identifier: email, url, provider }) => {
        const { host } = new URL(url)
        const customUrl = `${url}`;  
        
        const emailContent = `
          <body style="background: #f9f9f9; padding: 20px;">
            <table width="100%" border="0" cellspacing="20" cellpadding="0"
              style="background: #ffffff; max-width: 600px; margin: auto; border-radius: 10px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
              <tr>
                <td align="center" style="padding: 20px 0; font-size: 24px; font-family: Arial, sans-serif; color: #e60000;">
                  Sign in to <strong>${host}</strong>
                </td>
              </tr>
              <tr>
                <td align="center" style="padding: 20px 0;">
                  <table border="0" cellspacing="0" cellpadding="0">
                    <tr>
                      <td align="center" style="border-radius: 5px;" bgcolor="#e60000">
                        <a href="${customUrl}" target="_blank"
                          style="font-size: 18px; font-family: Arial, sans-serif; color: #ffffff; text-decoration: none; border-radius: 5px; padding: 12px 25px; border: 1px solid #e60000; display: inline-block; font-weight: bold;">
                          Sign in
                        </a>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
              <tr>
                <td align="center" style="padding: 20px 0; font-size: 16px; line-height: 24px; font-family: Arial, sans-serif; color: #666;">
                  If you did not request this email you can safely ignore it.
                </td>
              </tr>
              <tr>
                <td align="center" style="padding: 20px 0; font-size: 14px; font-family: Arial, sans-serif; color: #999;">
                  © 2024 RUReady. All rights reserved.
                </td>
              </tr>
            </table>
          </body>
        `;

        // Make the fetch call but don't return the response
        await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${provider.apiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: provider.from,
            to: email,
            subject: `Sign in to ${host}`,
            html: emailContent,
          }),
        });
      },
    }),
  ],
});
