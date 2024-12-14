/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class", // Enable dark mode based on the 'dark' class
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)", // Background color
        fg: "var(--fg)", // Foreground/Text color
        primary: "var(--primary)", // Primary Text color
        secondary: "var(--secondary)", // Muted/Secondary Text color
        accent: "var(--accent)", // Pink Accent
        accentHover: "var(--accent-hover)", // Hover Pink
        accentDark: "var(--accent-dark)", // Darker Pink
        border: "var(--border)", // Light Gray for borders
      },
      fontSize: {
        sm: "var(--fs-sm)", // Small font size
        md: "var(--fs-md)", // Medium font size
        lg: "var(--fs-lg)", // Large font size
        xl: "var(--fs-xl)", // Extra large font size
      },
      spacing: {
        xs: "var(--sp-xs)", // Extra small spacing
        sm: "var(--sp-sm)", // Small spacing
        md: "var(--sp-md)", // Medium spacing
        lg: "var(--sp-lg)", // Large spacing
        xl: "var(--sp-xl)", // Extra large spacing
      },
      borderRadius: {
        sm: "var(--rad-sm)", // Small border radius
        md: "var(--rad-md)", // Medium border radius
        lg: "var(--rad-lg)", // Large border radius
      },
    },
  },
  plugins: [],
};
