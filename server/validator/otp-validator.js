const { z }= require('zod')

const otpSchema = z.object({
    email:z
    .string({ required_error: "Email is required" }).email(),
    otp:z.string({ required_error: "OTP is required" }).length(4, { message: "OTP must be 4 digits" }),
});

module.exports = otpSchema;