import rateLimit from "express-rate-limit";

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 10000,
    standardHeaders: "draft-7",
    legacyHeaders: false,
    message: "Too many requests, please try again later."
});

export default limiter;