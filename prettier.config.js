module.exports = {
  singleQuote: true,
  semi: false,
  plugins: [require('prettier-plugin-tailwindcss')],
  overrides: [
    {
      files: '*.tsx',
      options: {
        tabWidth: 4,
      },
    },
  ],
}
