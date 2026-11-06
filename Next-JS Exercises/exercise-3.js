// 1. BASIC FORM  ->  app/ex1/actions.ts
"use server";

export async function submitEmail(
  prevState: { message: string },
  formData: FormData
) {
  const email = formData.get("email") as string;
  console.log("Email received:", email); // waxay ka muuqataa terminal-ka server-ka
  return { message: "Thanks for submitting!" };
}

// app/ex1/page.tsx
"use client";

import { useActionState } from "react";
import { submitEmail } from "./actions";

export default function Page() {
  const [state, formAction] = useActionState(submitEmail, { message: "" });

  return (
    <form action={formAction}>
      <input type="email" name="email" placeholder="Email" required />
      <button type="submit">Submit</button>
      {state.message && <p>{state.message}</p>}
    </form>
  );
}


// 2. REQUIRED FIELD (password)  ->  app/ex2/actions.ts
"use server";

export async function submitPassword(
  prevState: { error: string; success: string },
  formData: FormData
) {
  const password = formData.get("password") as string;

  if (!password || password.length < 6) {
    return { error: "Password must be at least 6 characters", success: "" };
  }

  console.log("Password OK, length:", password.length);
  return { error: "", success: "Password accepted!" };
}

// app/ex2/page.tsx
"use client";

import { useActionState } from "react";
import { submitPassword } from "./actions";

export default function Page() {
  const [state, formAction] = useActionState(submitPassword, {
    error: "",
    success: "",
  });

  return (
    <form action={formAction}>
      <input type="password" name="password" placeholder="Password" />
      <button type="submit">Submit</button>
      {state.error && <p style={{ color: "red" }}>{state.error}</p>}
      {state.success && <p style={{ color: "green" }}>{state.success}</p>}
    </form>
  );
}

// 3. FULL NAME GREETING  ->  app/ex3/actions.ts
"use server";

export async function greet(
  prevState: { greeting: string },
  formData: FormData
) {
  const firstName = formData.get("firstName") as string;
  const lastName = formData.get("lastName") as string;

  return { greeting: `Hello, ${firstName} ${lastName}!` };
}

// app/ex3/page.tsx
"use client";

import { useActionState } from "react";
import { greet } from "./actions";

export default function Page() {
  const [state, formAction] = useActionState(greet, { greeting: "" });

  return (
    <form action={formAction}>
      <input type="text" name="firstName" placeholder="First name" required />
      <input type="text" name="lastName" placeholder="Last name" required />
      <button type="submit">Greet me</button>
      {state.greeting && <h2>{state.greeting}</h2>}
    </form>
  );
}