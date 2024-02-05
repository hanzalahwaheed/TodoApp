// userValidation.js
import { z } from "zod";

const TodoSchema = z.object({
  title: z.string(),
  description: z.string() 
});

export default TodoSchema;
