// app/not-found.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';

export default function NotFound(): JSX.Element {
  const reduce = useReducedMotion();

  const container = {
    hidden: { opacity: 0 },
    enter: {
      opacity: 1,
      transition: { staggerChildren: 0.06, when: 'beforeChildren' },
    },
    exit: { opacity: 0 },
  };

  const float = {
    initial: { y: 0 },
    animate: {
      y: [0, -10, 0],
      transition: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
    },
  };

  const pop = {
    initial: { scale: 0.95, opacity: 0 },
    animate: {
      scale: 1,
      opacity: 1,
      transition: { duration: 0.5, ease: 'backOut' },
    },
  };

  return (
    <motion.main
      className="min-h-[calc(100vh-6rem)] flex items-center justify-center px-6 py-12 bg-gradient-to-br from-white via-blue-50 to-white"
      variants={container}
      initial="hidden"
      animate="enter"
      exit="exit"
      aria-labelledby="not-found-heading"
      role="main">
      <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Left: Illustration */}
        <motion.section
          aria-hidden
          className="flex items-center justify-center"
          variants={reduce ? undefined : (float as any)}
          initial={reduce ? undefined : 'initial'}
          animate={reduce ? undefined : 'animate'}>
          <div className="relative w-80 h-80 md:w-96 md:h-96 rounded-2xl shadow-xl bg-white/60 backdrop-blur-md flex items-center justify-center">
            {/* Soft circular background shapes */}
            <svg
              className="absolute inset-0 w-full h-full"
              viewBox="0 0 600 600"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="xMidYMid slice"
              aria-hidden>
              <defs>
                <linearGradient id="g1" x1="0" x2="1">
                  <stop offset="0" stopColor="#e6f0ff" />
                  <stop offset="1" stopColor="#ffffff" />
                </linearGradient>
              </defs>
              <circle cx="160" cy="160" r="220" fill="url(#g1)" opacity="0.9" />
              <circle cx="420" cy="250" r="160" fill="#d9eaff" opacity="0.8" />
              <circle cx="340" cy="420" r="100" fill="#ffffff" opacity="0.7" />
            </svg>

            {/* Main numeric 404 */}
            <motion.div
              className="relative z-10 flex flex-col items-center justify-center text-blue-700"
              variants={reduce ? undefined : (pop as any)}
              initial={reduce ? undefined : 'initial'}
              animate={reduce ? undefined : 'animate'}>
              <div className="text-6xl md:text-7xl font-extrabold tracking-tight">
                404
              </div>
              <div className="mt-2 text-sm md:text-base text-blue-600/80">
                Page not found
              </div>
            </motion.div>

            {/* Subtle animated particles */}
            <motion.div
              aria-hidden
              className="pointer-events-none absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.3 } }}>
              <svg
                width="100%"
                height="100%"
                viewBox="0 0 600 600"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <motion.circle
                  cx="80"
                  cy="520"
                  r="4"
                  fill="#60a5fa"
                  animate={{ x: [0, 20, 0], y: [0, -10, 0] }}
                  transition={{
                    repeat: Infinity,
                    duration: 6,
                    ease: 'easeInOut',
                  }}
                />
                <motion.circle
                  cx="520"
                  cy="60"
                  r="6"
                  fill="#2563eb"
                  animate={{ x: [0, -18, 0], y: [0, 8, 0] }}
                  transition={{
                    repeat: Infinity,
                    duration: 5,
                    ease: 'easeInOut',
                  }}
                />
                <motion.circle
                  cx="520"
                  cy="300"
                  r="3"
                  fill="#93c5fd"
                  animate={{ x: [0, -6, 0], y: [0, 6, 0] }}
                  transition={{
                    repeat: Infinity,
                    duration: 4.5,
                    ease: 'easeInOut',
                  }}
                />
              </svg>
            </motion.div>
          </div>
        </motion.section>

        {/* Right: Copy & Actions */}
        <section className="flex flex-col items-start justify-center gap-6">
          <motion.h1
            id="not-found-heading"
            className="text-3xl md:text-4xl font-semibold text-blue-900 leading-tight"
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1, transition: { duration: 0.6 } }}>
            Uh oh — we can’t find that page.
          </motion.h1>

          <motion.p
            className="text-sm md:text-base text-slate-600 max-w-xl"
            initial={{ x: 20, opacity: 0 }}
            animate={{
              x: 0,
              opacity: 1,
              transition: { duration: 0.7, delay: 0.05 },
            }}>
            The page you’re looking for might have been moved, had its name
            changed, or is temporarily unavailable. Try returning to the
            homepage or contacting support if you think this is an error.
          </motion.p>

          <motion.div
            className="flex flex-wrap gap-3 mt-2"
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              transition: { duration: 0.6, delay: 0.12 },
            }}>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-5 py-2 rounded-lg bg-blue-600 text-white font-medium shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-300 transition-transform transform hover:-translate-y-0.5">
              Back to homepage
            </Link>

            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-blue-100 text-blue-700 bg-white/80 font-medium hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-200 transition">
              Contact support
            </Link>
          </motion.div>

          <motion.div
            className="mt-6 w-full max-w-lg text-sm text-slate-500"
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              transition: { duration: 0.6, delay: 0.18 },
            }}>
            <ul className="list-disc pl-5 space-y-2">
              <li>Check the URL for typos.</li>
              <li>Use the navigation to find what you’re looking for.</li>
              <li>If this page should exist, let us know and we’ll fix it.</li>
            </ul>
          </motion.div>
        </section>
      </div>
    </motion.main>
  );
}
