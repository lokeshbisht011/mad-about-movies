/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
          bg: 'var(--bg)',
          bgSoft: 'var(--bgSoft)',
          text: 'var(--text)',
          textSoft: 'var(--textSoft)',
          sidebarHover: 'var(--sidebarHover)',
          sidebarSelected: 'var(--sidebarSelected)',
          button: 'var(--button)',
          buttonHover: 'var(--buttonHover)',
          giveUpbutton: 'var(--giveUpButton)',
          giveUpbuttonHover: 'var(--giveUpButtonHover)', 
      },
    },
  },
  plugins: [],
};
