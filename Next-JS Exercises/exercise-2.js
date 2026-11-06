// 1.  products/page.tsx

type Product = { id: number; title: string };

export default async function ProductsPage() {
  const res = await fetch("https://dummyjson.com/products");
  const data: { products: Product[] } = await res.json();
  const products = data.products.slice(0, 5);

  return (
    <main>
      <h1>Products</h1>
      <ul>
        {products.map((p) => (
          <li key={p.id}>{p.title}</li>
        ))}
      </ul>
    </main>
  );
}


// 2. Counter.tsx

"use client";

import { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increase</button>
    </div>
  );
}


// -- counter/page.tsx { Server }

import Counter from "../components/Counter";

export default function CounterPage() {
  return (
    <main>
      <h1>Counter Page (Server Component)</h1>
      <Counter />
    </main>
  );
}


// 3. SSR Simulation time/page.tsx

export const dynamic = "force-dynamic"; // si mar kasta server-ka u render gareeyo

export default function TimePage() {
  return (
    <main>
      <h1>Server Time</h1>
      <p>{new Date().toLocaleTimeString()}</p>
    </main>
  );
}


// 4. Static Page: about/page.tsx

export const dynamic = "force-static";

export default function AboutPage() {
  return (
    <main>
      <h1>About Us</h1>
      <p>We are a small team building great web apps.</p>
    </main>
  );
}

// 5. Streaming  components/SlowComponent.tsx

export default async function SlowComponent() {
  await new Promise((resolve) => setTimeout(resolve, 3000));

  return <p>✅ Waa la soo dhammaystiray (3 ilbiriqsi kadib)</p>;
}

// -- streaming/page.tsx


import { Suspense } from "react";
import SlowComponent from "../components/SlowComponent";

export const dynamic = "force-dynamic"; // si streaming-ku run ahaan u shaqeeyo

export default function StreamingPage() {
  return (
    <main>
      <h1>Streaming Demo</h1>
      <Suspense fallback="Loading...">
        <SlowComponent />
      </Suspense>
    </main>
  );
}