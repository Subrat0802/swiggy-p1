import { z } from "zod";
export const signUpvalidation = z.object({
    firstName: z.string().min(2),
    lastName: z.string().min(2),
    email: z.string().email(),
    password: z.string().min(6)
});
export const signInvalidation = z.object({
    email: z.string().email(),
    password: z.string().min(6),
    lat: z.string().optional(),
    lon: z.string().optional(),
});
export const locationValidation = z.object({
    locationName: z.string().min(2),
    lat: z.string().min(2),
    lon: z.string().min(2),
});
//# sourceMappingURL=zodvalidation.js.map