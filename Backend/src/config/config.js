import 'dotenv/config';

const config = {
    PORT: process.env.PORT,
    MONGO_URI: process.env.MONGO_URI,
    JWT_SECRET: process.env.JWT_SECRET,
    REDIS: {
        PORT: process.env.REDIS_PORT,
        HOST: process.env.REDIS_HOST,
        PASSWORD: process.env.REDIS_PASSWORD,
    },
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    GOOGLE_CALLBACK_URL: process.env.GOOGLE_CALLBACK_URL
};

export default config