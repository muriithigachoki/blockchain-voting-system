import { z } from "zod";

 const voterSchema = z.object({
    constituency: z.string().min(3),
    county: z.string().min(3),
    email: z.string().min(15),
    password: z.string().min(8),
    username: z.string().min(3),
  });

export type formData = z.infer<typeof voterSchema>;

export default voterSchema;