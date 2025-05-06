'use client';
import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="w-full bg-gray-100 p-4">
      <div className="flex items-center justify-between max-w-6xl mx-auto">
        <div className="text-xl font-bold">To Do List </div>

        <button
          className="text-2xl md:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          ☰
        </button>

        <nav className="hidden md:flex gap-6">
          <Link href="/" className="hover:underline">Home</Link>
          <Link href="/about" className="hover:underline">About Us</Link>
          <Link href="/contact" className="hover:underline">Contact Us</Link>
        </nav>
      </div>

      {isOpen && (
        <nav className="md:hidden mt-4 flex flex-col gap-4">
          <Link href="/" onClick={() => setIsOpen(false)} className="hover:underline">Home</Link>
          <Link href="/about" onClick={() => setIsOpen(false)} className="hover:underline">About Us</Link>
          <Link href="/contact" onClick={() => setIsOpen(false)} className="hover:underline">Contact Us</Link>
        </nav>
      )}
    </header>
  );
}
