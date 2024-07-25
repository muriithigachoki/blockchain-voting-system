import {z} from "zod"

const LoginSchema = z.object({
    name: z.string()
                .min(3, {message:"username must be atleast 3 charaters."}),
    password: z.string().min(8, {message:"password must be atleast 8 charaters."})
                .max(16, {message:"password can be maximum of 16 charaters."})
});

export type formData = z.infer<typeof LoginSchema>;

export default LoginSchema;