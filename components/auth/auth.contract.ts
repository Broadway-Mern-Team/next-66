import * as z from "zod";

const passwordSchema = z
  .string()
  .min(8, 'Password must be at least 8 characters long')
  .max(32, 'Password cannot exceed 32 characters')
  .regex(/[A-Z]/, 'Password must have at least one capital letter')
  .regex(/[a-z]/, 'Password must have at least one small letter')
  .regex(/[0-9]/, 'Password must have at least one number')
  .regex(/[^a-zA-Z0-9]/, 'Password must have at least special Character');


const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[^a-zA-Z0-9]).{8,32}$/;
const passwordSchema2 = z.string().regex(passwordRegex, {message: "Passwod must follow strong password rule"});


export const RegistrationSchema = z.object({
  fullName: z.string().min(2, "Full name must have at least 2 character").max(50, "Full name cannot have more than 50 characters"),
  username: z.email().nonempty("Username cannot be empty").nonoptional("Username must be present"),
  
  // password: z.string().nonempty("Password cannot be null").nonoptional(),  // Regex validation
  // confirmPassword: z.string().nonempty("Re-password cannot be null").nonoptional() ,  // Regex validation
  password: passwordSchema,
  confirmPassword: passwordSchema2,

  role: z.enum(["seller", "customer"]),
  phone: z.string().min(10).nonempty("Phone number cannot be empty").nonoptional("Phone field is missing"),
  image: z.file().nullable().optional(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Password and confirm-Password does not match",
  path: ['confirmPassword']
})


export const LoginSchema = z.object({
  username: z.email().nonempty("Username cannot be empty").nonoptional("Username must be present"),
  password: passwordSchema
})

export type RegisterData = z.infer<typeof RegistrationSchema> 