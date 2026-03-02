import rateLimit from "express-rate-limit";

export const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 20,
    message: { error: "Muitas Denuncias, por favor tente novamente mais tarde." },
    standardHeaders: true,
    legacyHeaders: false,
});

export const voteLimiter = rateLimit({
    windowMs: 60 * 60 * 2000,
    max: 10,
    message: { error: "Muitas Votos, por favor tente novamente mais tarde." },
    standardHeaders: true,
    legacyHeaders: false,
});
