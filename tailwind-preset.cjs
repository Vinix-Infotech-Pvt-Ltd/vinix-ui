/**
 * Vinix UI — Tailwind preset (optional).
 *
 * Projects that use Tailwind can share the exact tokens as utility classes:
 *
 *   // tailwind.config.js  (CommonJS)
 *   module.exports = { presets: [require('@vinix/ui/preset')], content: [...] }
 *
 * The component CSS in dist/vinix-ui.css does NOT need Tailwind — it is plain,
 * self-contained CSS driven by the --vx-* variables in tokens.css. This preset
 * is only a convenience so utility classes match the design system.
 *
 * Values here MUST stay in sync with src/css/tokens.css.
 */
module.exports = {
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
                mono: ['JetBrains Mono', 'Fira Code', 'ui-monospace', 'monospace'],
            },
            colors: {
                header: { DEFAULT: '#1E2A3A', light: '#2A3A4E', muted: '#94A3B8' },
                // Brand / primary — active tabs, links, primary actions
                primary: {
                    50: '#EFF6FF', 100: '#DBEAFE', 200: '#BFDBFE', 300: '#93C5FD',
                    400: '#60A5FA', 500: '#3B82F6', 600: '#2563EB', 700: '#1D4ED8',
                    800: '#1E3A5F', 900: '#1E2A3A', 950: '#172135',
                },
                section: { DEFAULT: '#6366F1', light: '#818CF8', dark: '#4F46E5' },
                success: { 50: '#ECFDF5', 100: '#D1FAE5', 500: '#10B981', 600: '#059669', 700: '#047857' },
                warning: { 50: '#FEF3C7', 100: '#FDE68A', 500: '#F59E0B', 600: '#D97706', 700: '#B45309' },
                danger: { 50: '#FEF2F2', 100: '#FEE2E2', 500: '#EF4444', 600: '#DC2626', 700: '#B91C1C' },
                info: { 50: '#EFF6FF', 100: '#DBEAFE', 500: '#3B82F6', 600: '#2563EB', 700: '#1D4ED8' },
                debit: '#DC2626',
                credit: '#059669',
                rupee: '#111827',
                // Neutral ramp — mirrors --vx-gray-* in tokens.css
                gray: {
                    50: '#F9FAFB', 100: '#F3F4F6', 200: '#E5E7EB', 300: '#D1D5DB',
                    400: '#9CA3AF', 500: '#6B7280', 600: '#4B5563', 700: '#374151',
                    800: '#1F2937', 900: '#111827',
                },
                surface: '#FFFFFF',
                bg: { DEFAULT: '#F1F5F9', soft: '#F8FAFC' },
            },
            spacing: { '4.5': '1.125rem', '13': '3.25rem', '15': '3.75rem', '18': '4.5rem', '72': '18rem', '84': '21rem', '88': '22rem' },
            borderRadius: { xs: '2px' },
            boxShadow: {
                header: '0 2px 8px rgba(0,0,0,0.12)',
                card: '0 1px 3px rgba(0,0,0,0.06)',
                dropdown: '0 4px 12px rgba(0,0,0,0.1)',
                modal: '0 20px 40px rgba(0,0,0,0.15)',
                'bottom-bar': '0 -1px 3px rgba(0,0,0,0.05)',
                stat: '0 1px 2px rgba(0,0,0,0.04)',
            },
            fontSize: {
                '2xs': ['0.6875rem', { lineHeight: '1rem' }],
                xs: ['0.75rem', { lineHeight: '1rem' }],
                sm: ['0.8125rem', { lineHeight: '1.25rem' }],
                base: ['0.875rem', { lineHeight: '1.375rem' }],
                lg: ['1rem', { lineHeight: '1.5rem' }],
                xl: ['1.125rem', { lineHeight: '1.75rem' }],
                '2xl': ['1.25rem', { lineHeight: '1.75rem' }],
                '3xl': ['1.5rem', { lineHeight: '2rem' }],
                '4xl': ['1.75rem', { lineHeight: '2.25rem' }],
            },
            letterSpacing: { 'widest-plus': '0.15em' },
            keyframes: {
                'vx-shimmer': { '0%': { backgroundPosition: '200% 0' }, '100%': { backgroundPosition: '-200% 0' } },
                'vx-toast-in': { from: { opacity: '0', transform: 'translateX(12px)' }, to: { opacity: '1', transform: 'none' } },
                'vx-spin': { to: { transform: 'rotate(360deg)' } },
                'vx-progress-slide': { '0%': { marginLeft: '-40%' }, '100%': { marginLeft: '100%' } },
            },
            animation: {
                'vx-shimmer': 'vx-shimmer 1.4s ease-in-out infinite',
                'vx-toast-in': 'vx-toast-in 0.2s ease-out',
                'vx-spin': 'vx-spin 0.6s linear infinite',
                'vx-progress-slide': 'vx-progress-slide 1.2s ease-in-out infinite',
            },
        },
    },
};
