import { z } from "zod";

const TypeSchema = z.object({
    slot: z.number(),
    type: z.object({
        name: z.string(),
        url: z.string().url(),
    }),
});

const AbilitySchema = z.object({
    ability: z.object({
        name: z.string(),
        url: z.string().url(),
    }),
    is_hidden: z.boolean(),
    slot: z.number(),
});

export const PokemonSessionSchema = z.object({
    sessionId: z.string().uuid(),
    hints: z.object({
        types: z.array(TypeSchema),
        abilities: z.array(AbilitySchema),
        color: z.string(),
        generation: z.string(),
        habitat: z.string().nullable(),
        shape: z.string(),
        isLegendary: z.boolean(),
        isMythical: z.boolean(),
        backSprite: z.string().url(),
        frontSprite: z.string().url(),
        cry: z.string().url().optional(),
        evolutionStage: z.number(),
        captureRate: z.number(),
    }),
});

export type PokemonSession = z.infer<typeof PokemonSessionSchema>;