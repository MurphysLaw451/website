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
    {
      files: '*.ts',
      options: {
        tabWidth: 4,
      },
    },
  ],
}
