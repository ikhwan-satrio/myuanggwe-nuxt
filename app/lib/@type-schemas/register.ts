import { loginSchema } from "./login"

export const registerSchema = loginSchema.merge({
  name: "string >= 5",
  confirmPassword: "string >= 8",
}).narrow((data, c) => {
  if (data.password !== data.confirmPassword) {
    return c.reject({
      expected: "identical to password",
      actual: "",
      path: ["confirmPassword"],
    })
  }
  return true
})
