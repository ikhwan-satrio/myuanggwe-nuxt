import { type } from "arktype";

export const inviteOrgsSchema = type({
  email: "string.email",
  role: "'member'|'admin'"
})
