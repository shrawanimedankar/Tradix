import { z } from "zod";

const signupSchema = z.object({
    fullName: z.string().min(3, "Full Name is required"),

    email: z.string().min(1, "Email is required").email("enter a valid email"),

    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(1, "Please confirm your password"),

    termsAccepted: z.boolean().refine((value) => value === true, {
      message: "You must accept the terms and conditions",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export default signupSchema;
