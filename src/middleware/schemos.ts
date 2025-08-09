import z from 'zod';
export const CalculationDataSchema = z.object({
  operation: z.string(),
  op1: z.coerce.number(),
  op2: z.coerce.number(),
});
