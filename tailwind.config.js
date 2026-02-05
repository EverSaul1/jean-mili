/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: ["./src/**/*.{html,ts}"],
  darkMode: 'class',
  theme: {
    extend: {
      display: ['masonry'],
      colors: {
        default: {
          // COLORS PRIMARY UPeU
          'blue-primary': '#003865',
          'hellow-primary': '#F7A701',
          'white-primary': '#FFFFFF ',
          'cream-primary': '#FFE9BA',

          // COLORS SECUNDARY UPeU
          'blue-secundary': '#def0ff',

          // COLORS HOVER UPeU
          'hellow-hover': '#CF7C00',
          'orange-hover': '#F68500',
          'blue-hover': '#002949',
          'blue-hover-2': '#0071CB',
          'sky-blue-hover': '#005EAA',

          // COLORS EXTRAS
          'red-came-extra': '#861239',
          'sky-blue-extra': '#008DFF',
          'black-extra': '#1E1E1E',
          'gray-background-extra': '#E7E7E7',
          'gray-linear-extra': '#B0B0B0',
          'golden-extra': '#E3AE5E',
          'golden-pastel-extra': '#F7DE90',

          // COLORS SELECTS
          'blue-select': '#2563EB',

          // COLORS BANNER
          'blue-banner': '#55B0F9',

          // COLORS BACKGROUND HEADER
          'blue-1': '#003865',
          'blue-2': '#124490',
          'blue-3': '#002e53',
          'blue-4': '#003865',
          'blue-5': '#0b1a21',
          'blue-6': '#0C1F31',
          'blue-7': '#0C1E2C',

          // COLORS PROGRESS BAR
          'blue-progress-bar': '#006FE6',
          'green-progress-bar': '#65C728',
          'green-progress-bar-hover': '#478D1C',
          'red-progress-bar': '#F62447',

          // COLORS PROGRESS BAR PASTEL
          'blue-progress-bar-pastel': '#EEF7FF',
          'green-progress-bar-pastel': '#E6FFE2',
          'red-progress-bar-pastel': '#FFECEF',
          'hellow-progress-bar-pastel': '#FFF9EC',

          // COLORS BACKGROUND SIGN IN
          'blue-sign-in-1': '#003865',
          'blue-sign-in-2': '#005599',

          // COLORS PASTEL
          'hellow-pastel': '#FFF7E7',

          // COLORS BACKGROUND PAGE
          'background-page': '#F9FCFF',
        },

        dark: {
          // COLORS PRIMARY UPeU
          'blue-primary': '#002340',
          'hellow-primary': '#F7A701',
          'blue-background-primary': '#001424',
          'white-primary': '#FFFFFF ',
          'cream-primary': '#FFE9BA',

          // COLORS HOVER UPeU
          'hellow-hover': '#E39900',
          'black-background-select-hover': '#1B2234',

          // COLORS EXTRAS
          'gray-extra': '#ACACAC',
          'color-barra': '#000E18',

          // COLORS SELECTS
          'black-background-select': '#262C3C',

          // COLORS BACKGROUND HEADER
          'blue-1': '#003865',
          'blue-2': '#124490',
          'blue-3': '#002e53',
          'blue-4': '#003865',
          'blue-5': '#0b1a21',
          'blue-6': '#0C1F31',
          'blue-7': '#0C1E2C',

          // COLORS SEARCH
          'background-search': '#000E1B',
        }
      },
      fontFamily: {
        montserrat: ['Montserrat'],
        romantic: ['Romantic-lovely'],
        greadVibes: ['GreatVibes-Regular'],
        playfairDisplayt: ['PlayfairDisplayt'],
        PlaylistScript: ['Playlist-script'],
        tangerineRegular: ['Tangerine-Regular'],
        lato: ['Lato'],
        body: ['Montserrat'],
        playlist: ['Playlist'],
        alexBrushRegular: ['AlexBrush-Regular'],
        dynaPuff: ['DynaPuff'],
        merienda: ['Merienda']
      }
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms"),
    require("@tailwindcss/aspect-ratio"),
    // require("@autoprefixer")
  ],
}

