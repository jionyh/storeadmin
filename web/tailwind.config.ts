/** @type {import('tailwindcss').Config} */

const tailwindColors: Record<
  string,
  string | Record<number, string>
> = require('tailwindcss/colors')

const colorSafeList: string[] = []

// Skip these to avoid a load of deprecated warnings when tailwind starts up
const deprecated = ['lightBlue', 'warmGray', 'trueGray', 'coolGray', 'blueGray']

for (const colorName in tailwindColors) {
  if (deprecated.includes(colorName)) {
    continue
  }

  // Define all of your desired shades
  const shades = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900]

  const pallette = tailwindColors[colorName]

  if (typeof pallette === 'object') {
    shades.forEach((shade) => {
      if (shade in pallette) {
        // colorSafeList.push(`text-${colorName}-${shade}`)  <-- You can add different colored text as well
        colorSafeList.push(`bg-${colorName}-${shade}`)
        colorSafeList.push(`text-${colorName}-${shade}`)
        colorSafeList.push(`fill-${colorName}-${shade}`)
        colorSafeList.push(`border-${colorName}-${shade}`)
        colorSafeList.push(`focus:outline-${colorName}-${shade}`)
        colorSafeList.push(`hover:bg-${colorName}-${shade}`)
      }
    })
  }
}

module.exports = {
  safelist: colorSafeList,
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
