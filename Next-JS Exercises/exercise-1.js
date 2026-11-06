// ===== 1. app/(dashboard)/notifications/page.tsx =====
// URL: /notifications  (qaybta "(dashboard)" kuma jirto URL-ka)
export default function NotificationsPage() {
  return (
    <div>
      <h1>Notifications</h1>
      <p>You have no new notifications.</p>
    </div>
  );
}

// ===== 2. app/users/[username]/page.tsx =====
// URL: /users/ahmed  ->  "Welcome, ahmed"
export default async function UserPage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;

  return <h1>Welcome, {username}</h1>;
}


// ===== 3. app/blog/[[...slug]]/page.tsx =====
// /blog                 -> "You visited: /"
// /blog/2026            -> "You visited: /2026"
// /blog/2026/nov/post   -> "You visited: /2026/nov/post"
export default async function BlogPage({
  params,
}: {
  params: Promise<{ slug?: string[] }>;
}) {
  const { slug } = await params;
  const path = slug ? slug.join("/") : "";

  return <h1>You visited: /{path}</h1>;
}

// ===== 4. app/api/users/[username]/route.ts =====
// GET /api/users/ahmed  ->  { "username": "ahmed" }
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ username: string }> }
) {
  const { username } = await params;

  return NextResponse.json({ username });
}


app/
├── (dashboard)/
│   └── notifications/page.tsx
├── users/
│   └── [username]/page.tsx
├── blog/
│   └── [[...slug]]/page.tsx
└── api/
    └── users/
        └── [username]/route.ts