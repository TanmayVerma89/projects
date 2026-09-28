import passport from "passport"
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import config from "./config.js";

passport.use(
    new GoogleStrategy({
        clientID: config.GOOGLE_CLIENT_ID,
        clientSecret: config.GOOGLE_CLIENT_SECRET,
        callbackURL: config.GOOGLE_CALLBACK_URL
    },
        async (_, __, profile, done) => {
            try {
                return done(null, profile);
            } catch (error) {
                console.error("Error in Google Strategy", error)
                return done(error, null);
            }
        }
    )
)

export default passport