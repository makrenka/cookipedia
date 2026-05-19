import z from "zod";
export declare const zEnvNonemptyTrimmed: z.ZodString;
export declare const zEnvNonemptyTrimmedRequiredOnNotLocal: z.ZodOptional<z.ZodString>;
export declare const zEnvHost: z.ZodEnum<{
    local: "local";
    production: "production";
}>;
export declare const zStringRequired: z.ZodString;
export declare const zStringOptional: z.ZodOptional<z.ZodString>;
export declare const zEmailRequired: z.ZodString;
export declare const zNickRequired: z.ZodString;
export declare const zStringMin: (min: number) => z.ZodString;
export declare const zPasswordsMustBeTheSame: (passwordFieldName: string, passwordAgainFieldName: string) => (val: any, ctx: z.RefinementCtx) => void;
//# sourceMappingURL=zod.d.ts.map