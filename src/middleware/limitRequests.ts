import { rateLimit } from 'express-rate-limit';

const limitRequests = rateLimit({
    windowMs: 60 * 1000,
    max: 3,
    message: 'Too Many Requests',
    standardHeaders: true,
    legacyHeaders: false,
});

export default limitRequests; 
