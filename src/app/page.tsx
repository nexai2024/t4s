'use client';

import React from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useSession } from '@/lib/client-auth';
import { SignInButton, SignUpButton, UserButton } from '@clerk/nextjs';
import LandingPage from '@/components/LandingPage';

export default function Landing() {
  const session = useSession();

  return (
    <div className="flex flex-col min-h-[100dvh]">
      <header className="px-4 lg:px-6 h-14 flex items-center">
        <Link className="flex items-center justify-center" href="#">
          <MountainIcon className="h-6 w-6" />
          <span className="sr-only">Acme Inc</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6 items-center">
          {session.isLoggedIn ? (
            <UserButton />
          ) : (
            <div className="flex gap-2">
              <SignInButton mode='modal'>
                <Button variant="outline">Sign in</Button>
              </SignInButton>
              <SignUpButton mode='modal'>
                <Button>Sign up</Button>
              </SignUpButton>
            </div>
          )}
        </nav>
      </header>
      <main className="flex-1">
          <LandingPage />
      </main>
      
    </div>
  );
}

function CheckIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

function MountainIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  );
}
