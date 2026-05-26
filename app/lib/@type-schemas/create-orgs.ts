import { type } from "arktype";

export const createOrgsSchema = type({
  name: "string > 0",
  slug: "string > 0"
})
