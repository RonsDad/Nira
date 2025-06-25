import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			screens: {
				'xs': '475px',
				// Tailwind defaults: sm: 640px, md: 768px, lg: 1024px, xl: 1280px, 2xl: 1536px
			},
			fontFamily: {
				'heading': ['Orbitron', 'sans-serif'],
				'body': ['Comfortaa', 'sans-serif'],
				'inter': ['Inter', 'sans-serif'],
				sans: ["var(--font-inter)", "system-ui", "sans-serif"],
				audiowide: ["var(--font-audiowide)", "cursive"],
				mono: ["var(--font-fira-code)", "monospace"],
			},
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				"ron-navy": {
					DEFAULT: "hsl(var(--ron-navy))",
					dark: "hsl(var(--ron-navy-dark))",
				},
				"ron-cyan": "hsl(var(--ron-cyan))",
				// Cyberpunk theme colors
				"electric-cyan": "#00f3ff",
				"cyber-magenta": "#ff00ff",
				"acid-green": "#7dff7d",
				"volcanic-orange": "#ff5e1a",
				"alert-red": "#ff1a1a",
				"cyber-dark-bg": "#0D0515", // For overall page background
				"light-text": "#E0E0E0", // General light text color
			},
			boxShadow: {
				// Glow effects
				"glow-cyan-xs": "0 0 5px 0px rgba(0, 243, 255, 0.5)",
				"glow-cyan-sm": "0 0 8px 1px rgba(0, 243, 255, 0.5)",
				"glow-cyan-md": "0 0 15px 3px rgba(0, 243, 255, 0.5)",
				"glow-cyan-lg": "0 0 25px 5px rgba(0, 243, 255, 0.5)",
				"glow-magenta-sm": "0 0 8px 1px rgba(255, 0, 255, 0.5)",
				"glow-magenta-md": "0 0 15px 3px rgba(255, 0, 255, 0.5)",
				"glow-panel-cyan": "0 8px 32px rgba(0, 243, 255, 0.2)", // Outer glow for panels
				"glow-panel-magenta": "0 8px 32px rgba(255, 0, 255, 0.2)",
				// Subtle inner edge for glass (can be combined with outer glow if needed or used on pseudo-elements)
				"inner-edge-cyan": "inset 0 0 2px 0px rgba(0, 243, 255, 0.3)",
				"inner-edge-white": "inset 0 0 2px 0px rgba(255, 255, 255, 0.2)",
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'fade-in': {
					'0%': {
						opacity: '0',
						transform: 'translateY(20px)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateY(0)'
					}
				},
				'slide-up': {
					'0%': {
						opacity: '0',
						transform: 'translateY(30px)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateY(0)'
					}
				},
				'progress-fill': {
					'0%': { width: '0%' },
					'100%': { width: '100%' }
				},
				'task-complete': {
					'0%': { 
						transform: 'translateX(0) scale(1)',
						opacity: '1'
					},
					'50%': {
						transform: 'translateX(10px) scale(1.05)',
						opacity: '0.8'
					},
					'100%': {
						transform: 'translateX(200px) scale(0.9)',
						opacity: '0'
					}
				},
				"pulse-glow": {
					"0%": { opacity: "0.5", transform: "scale(0.95)" },
					"100%": { opacity: "1", transform: "scale(1.05)" }
				},
				"projector-flicker": {
					"0%, 100%": { opacity: "0.7" },
					"10%": { opacity: "0.3" },
					"30%": { opacity: "0.9" },
					"50%": { opacity: "0.5" },
					"70%": { opacity: "0.9" },
					"90%": { opacity: "0.4" }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.6s ease-out',
				'slide-up': 'slide-up 0.8s ease-out',
				'progress-fill': 'progress-fill 3s ease-in-out',
				'task-complete': 'task-complete 1s ease-in-out',
				"pulse-glow": "pulse-glow 4s infinite alternate ease-in-out",
				"pulse-glow-slow": "pulse-glow 6s infinite alternate ease-in-out",
				"pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
				"projector-flicker": "projector-flicker 0.6s ease-in-out forwards",
			}
		}
	},
	plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
} satisfies Config;
