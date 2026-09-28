import jwt from 'jsonwebtoken'
import redis from '../config/redis.js';
import config from '../config/config.js';

// Middleware controller for checking tokens and passing user's id to next controllers
export const authMiddleware = async (req, res, next) => {

    const token = req.cookies.token;

    if (!token)
        return res.status(401).send({
            message: 'Authentication is missing'
        });

    try {
        const decoded = jwt.verify(token, config.JWT_SECRET);

        if (!decoded) return res.status(401).json({
            success: false,
            message: `Inavlid or expired token`,
        });

        const isBlacklisted = await redis.get(token);
        if (isBlacklisted) return res.status(401).send({
            success: false,
            message: `Token is revoked`,
        })

        req.userId = decoded.id;
        next();

    } catch (err) {
        if (err && err.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Token has expired' })
        }
        if (err && err.name === 'JsonWebTokenError') {
            return res.status(401).json({ message: 'Invalid token' })
        }
        console.error('identifyUser middleware error:', err)
        return res.status(500).json({ message: 'Internal server error' })
    }
};