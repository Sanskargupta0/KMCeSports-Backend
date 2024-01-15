const { z }= require('zod')

const emailSchema = z.object({
    email:z
    .string({ required_error: "Email is required" }).email(),
});

const contactSchema = z.object({
    name: z.string({ required_error: "Name is required" })
        .min(4, "Name must be at least 4 characters long")
        .max(20, "Name cannot exceed 20 characters"),
    email: z.string({ required_error: "Email is required" }).email(),
    message: z.string({ required_error: "Message is required" }),

});

module.exports = {emailSchema, contactSchema};