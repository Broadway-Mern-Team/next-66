import * as z from "zod";

export const RegistrationSchema = z.object({
  fullName: z.string().min(2, "Full name must have at least 2 character").max(50, "Full name cannot have more than 50 characters"),
  username: z.email().nonempty("Username cannot be empty").nonoptional("Username must be present"),
  
  password: z.string().nonempty("Password cannot be null").nonoptional(),  // Regex validation
  confirmPassword: z.string().nonempty("Re-password cannot be null").nonoptional() ,  // Regex validation
  
  role: z.enum(["seller", "customer"]),
  phone: z.string().min(10).nonempty("Phone number cannot be empty").nonoptional("Phone field is missing"),
  image: z.file().nullable().optional(),
});

export type RegisterData = z.infer<typeof RegistrationSchema>