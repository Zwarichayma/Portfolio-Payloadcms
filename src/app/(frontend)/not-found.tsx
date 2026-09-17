import Link from 'next/link'
import React from 'react'

export default function NotFound() {
  return (
    <div
      className="relative flex min-h-[80vh] items-center justify-center overflow-hidden px-6 py-24"
      style={{ backgroundColor: 'var(--portfolio-section-bg)' }}
    >
      {/* Ambient glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 60% 60% at 50% 35%, rgba(124,58,237,0.14) 0%, transparent 70%)',
        }}
      />
      {/* Grid */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            'linear-gradient(rgba(139,92,246,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(139,92,246,0.05) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative z-10 w-full max-w-xl text-center">
        <p
          className="mb-4 text-xs"
          style={{
            color: 'var(--portfolio-text-muted)',
            fontFamily: "'JetBrains Mono', monospace",
          }}
        >
          {'// error 404'}
        </p>

        <h1
          className="mb-4 text-7xl font-bold leading-none md:text-9xl"
          style={{
            background: 'linear-gradient(135deg, #a78bfa, #7c3aed)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          404
        </h1>

        <h2
          className="mb-3 text-xl font-semibold md:text-2xl"
          style={{ color: 'var(--portfolio-text-primary)' }}
        >
          Page introuvable
        </h2>

        <p className="mx-auto mb-8 max-w-md text-sm" style={{ color: 'var(--portfolio-text-muted)' }}>
          La page que vous recherchez n&apos;existe pas ou a été déplacée.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-lg px-6 py-3 text-sm font-medium text-white transition-transform duration-300 hover:-translate-y-0.5"
            style={{
              background: 'linear-gradient(135deg, #7c3aed, #6d28d9)',
              boxShadow: '0 8px 24px -8px rgba(124,58,237,0.6)',
            }}
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 12l9-9 9 9M5 10v10a1 1 0 001 1h3m10-11v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            Retour à l&apos;accueil
          </Link>

          <Link
            href="/posts"
            className="inline-flex items-center gap-2 rounded-lg border px-6 py-3 text-sm font-medium transition-colors duration-300"
            style={{
              borderColor: 'rgba(139,92,246,0.35)',
              color: 'var(--portfolio-text-secondary)',
            }}
          >
            Voir le blog
          </Link>
        </div>
      </div>
    </div>
  )
}
