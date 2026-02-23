import { z } from "zod";

export const GuessSchema = z.object({
    status: z.enum(["correct", "almost", "wrong"]),
    correct: z.string().optional(),
});

export type Guess = z.infer<typeof GuessSchema>;