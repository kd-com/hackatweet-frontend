module.exports = {
  presets: [
    ["next/babel"], // Pour Next.js (à garder si tu utilises Next.js)
    // ou ["@babel/preset-env", "@babel/preset-react"] pour un projet React classique
  ],
  plugins: [
    [
      "import",
      {
        libraryName: "antd",
        style: "css", // Charge uniquement le CSS des composants utilisés
      },
    ],
  ],
};