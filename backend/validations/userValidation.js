// userValidation.js
import { z } from "zod";

const UserSchemaSignUp = z.object({
  username: z.string().min(3).max(20),
  email: z.string().email(),
  password: z.string().min(6),
});

const UserSchemaSignIn = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export { UserSchemaSignUp, UserSchemaSignIn };
