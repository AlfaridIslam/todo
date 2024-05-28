// import * as passport from "passport";
// import { Strategy as GoogleStrategy } from "passport-google-oauth20";

// // Passport session setup

// // Use the GoogleStrategy within Passport
// passport.use(
//   new GoogleStrategy(
//     {
//       clientID: process.env.GOOGLE_CLIENT_ID || "",
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
//       callbackURL: process.env.GOOGLE_REDIRECT_URL || "",
//     },
//     (accessToken: string, refreshToken: string, profile: any, done: any) => {
//       // In this example, the user's Google profile is supplied as the user record
//       return done(null, profile);
//     }
//   )
// );

// passport.serializeUser(function (user, done) {
//   done(null, user);
// });

// passport.deserializeUser<any, any>((user, done) => {
//   done(null, user);
// });

// export default passport;
