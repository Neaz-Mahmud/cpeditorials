import { Router } from "express";
import rateLimiter from "express-rate-limit";
import { registrationSchema } from "../validator/auth.validator";
import validate from "../middleware/validate";

const router = Router();

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20, // limit each IP to 20 requests per window
  message: {
    success: false,
    message: "Too many authentication attempts. Please try again later.",
  },
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

router.post("/register", authLimiter, validate(registrationSchema));
