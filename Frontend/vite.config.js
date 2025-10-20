import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'


// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],
})
//  module.exports = {
//   content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
//   theme: {
//     extend: {
//       colors: {
//         orange: {
//           500: "#FF6A00", // primary orange
//           600: "#E85A00",
//           700: "#C84A00",
//         },
//       },
//       boxShadow: {
//         "lg-boost": "0 12px 40px rgba(16,24,40,0.08)",
//       },
//     },
//   },
//   plugins: [],
// };
