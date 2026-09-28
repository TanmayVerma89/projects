import Redis from "ioredis"
import "dotenv/config"

const redis = new Redis({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    password: process.env.REDIS_PASSWORD,
})

redis.on('connect', () => {
    console.log("Connected to Redis DB")
})

redis.on('error', (err) => {
    console.error("Error connecting to Redis DB", err)
    throw new Error(err.message)
})

export default redis