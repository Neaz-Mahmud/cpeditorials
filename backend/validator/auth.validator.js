import { z } from "zod";

export const registrationSchema = z.object({
  body: z.object({
    username: z
      .string({ required_error: "Username is required" })
      .min(3, "Username must be at least 3 characters")
      .max(30, "Username must be at most 30 characters")
      .trim(),

    email: z
      .string({ required_error: "Email is required" })
      .email("Invalid email address")
      .trim()
      .toLowerCase(),

    password: z
      .string({ required_error: "Password is required" })
      .min(6, "Password must be at least 6 characters")
      .max(100, "Password must be at most 100 characters"),

    // Optional fields that can be set during registration
    handle: z.string().trim().optional(),
    bio: z.string().max(500, "Bio must be at most 500 characters").optional(),
  }),
});
