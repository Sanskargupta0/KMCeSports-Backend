const { z } = require("zod");
// creating a schema for singup

const signupSchema = z.object({
  userName: z
    .string({ required_error: "Username is required" })
    .trim()
    .min(4, { message: "Username must be at least 4 characters long" })
    .max(20, { message: "Username cannot exceed 20 characters" })
    .regex(/^[a-zA-Z0-9]/),
  firstName: z
    .string({ required_error: "First name is required" })
    .min(4, { message: "First name must be at least 4 characters long" })
    .max(20, { message: "First name cannot exceed 20 characters" })
    .regex(/^[a-zA-Z]/),
  lastName: z
    .string({ required_error: "Last name is required" })
    .min(4, { message: "Last name must be at least 4 characters long" })
    .max(20, { message: "Last name cannot exceed 20 characters" })
    .regex(/^[a-zA-Z]/),
  email: z.string({ required_error: "Email is required" }).email(),
  password: z
    .string({ required_error: "Password is required" })
    .min(8, { message: "Password must be at least 8 characters long" })
    .max(20, { message: "Password cannot exceed 20 characters" }),
  isadmin: z.boolean().default(false),
});

module.exports = signupSchema ;
