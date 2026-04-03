import { z } from "zod";

export const formSchema = z.object({
    planName: z
        .string()
        .min(1, "Plan Name is required")
        .regex(/^[A-Za-z\s]+$/, "Only letters allowed"),

    price: z.string().min(1, "Price is required").regex(/^\d+$/, "Only numbers allowed"),

    frequency: z.string().min(1, "Payment Frequency is required"),

    installments: z.string().min(1, "Installments are required").regex(/^\d+$/, "Only numbers allowed"),

    validFrom: z.any().refine((val) => val !== null, {
        message: "Valid From is required",
    }),

    term: z.any().refine((val) => val !== null, {
        message: "Academic Term is required",
    }),
});
