import { z } from "zod";
export declare const signUpvalidation: z.ZodObject<{
    firstName: z.ZodString;
    lastName: z.ZodString;
    email: z.ZodString;
    password: z.ZodString;
}, z.core.$strip>;
export declare const signInvalidation: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
    lat: z.ZodOptional<z.ZodString>;
    lon: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export declare const locationValidation: z.ZodObject<{
    locationName: z.ZodString;
    lat: z.ZodString;
    lon: z.ZodString;
}, z.core.$strip>;
//# sourceMappingURL=zodvalidation.d.ts.map