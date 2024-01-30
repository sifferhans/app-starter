import { email, minLength, object, string, type Input } from "valibot";

export const SignupSchema = object({
  email: string([email("Invalid email address")]),
  username: string([
    minLength(2, "Username must be at least 2 characters long"),
  ]),
  password: string([
    minLength(8, "Password must be at least 8 characters long"),
  ]),
});

export const LoginSchema = object({
  email: string([email("Invalid email address")]),
  password: string([
    minLength(8, "Password must be at least 8 characters long"),
  ]),
});
