import { z } from "zod";

const isoDate = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format")
  .refine((date) => !Number.isNaN(Date.parse(date)));

const schema = z.object({
  page: z.coerce.number().int().min(1).max(500).catch(1),
  sort: z
    .enum(["p_desc", "p_asc", "r_desc", "r_asc", "date_desc", "date_asc"])
    .optional()
    .catch(undefined),
  genres: z
    .string()
    .transform((s) =>
      Array.from(
        new Set(
          s
            .split(",")
            .map(Number)
            .filter((n) => Number.isInteger(n) && n > 0),
        ),
      )
        .sort((a, b) => a - b)
        .join(","),
    )
    .optional()
    .catch(undefined),
  from: isoDate.optional().catch(undefined),
  to: isoDate.optional().catch(undefined),
});

export function parseSearchParams(
  searchParams: Record<string, string | string[] | undefined>,
) {
  const flat = Object.fromEntries(
    Object.entries(searchParams).map(([k, v]) => [
      k,
      Array.isArray(v) ? v[0] : v,
    ]),
  );
  return schema.parse(flat);
}
