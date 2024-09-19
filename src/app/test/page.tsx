"use client";
import { useRouter } from 'next/router';

export default function TestPage() {
  const router = useRouter();

  return (
    <div>
      <h1>Test Router Push</h1>
      <button onClick={() => router.push('/welcome')}>
        Go to Welcome Page
      </button>
    </div>
  );
}