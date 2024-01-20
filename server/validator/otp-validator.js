const { z }= require('zod')

const otpSchema = z.object({
    email:z
    .string({ required_error: "Email is required" }).email(),
    otp:z.string({ required_error: "OTP is required" }).length(4, { message: "OTP must be 4 digits" }),
});
const resetOtpSchema = z.object({
    email:z
    .string({ required_error: "Email is required" }).email(),
    otp:z.string({ required_error: "OTP is required" }).length(4, { message: "OTP must be 4 digits" }),
    password: z
    .string({ required_error: "Password is required" })
    .min(8, { message: "Password must be at least 8 characters long" })
    .max(20, { message: "Password cannot exceed 20 characters" }),
});

module.exports = {otpSchema,resetOtpSchema};