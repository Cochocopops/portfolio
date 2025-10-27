import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
      "src/types/**/*.d.ts", // Ignorer les fichiers de déclaration de types
    ],
  },
  {
    rules: {
      "@typescript-eslint/no-explicit-any": "warn", // Convertir en warning au lieu d'erreur
      "react/jsx-no-comment-textnodes": "warn", // Convertir en warning
      "@typescript-eslint/ban-ts-comment": "warn", // Convertir en warning
      "@next/next/no-img-element": "warn", // Convertir en warning
      "react/no-unescaped-entities": "warn", // Convertir en warning
      "@typescript-eslint/triple-slash-reference": "warn", // Convertir en warning
    },
  },
];

export default eslintConfig;
