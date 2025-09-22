// Déclaration d'une variable globale
// Utile pour les variables globales, les librairies externes, etc.

export {};
(globalThis as any).greet = (name: string) => {
  console.log(`Hello, ${name}!`);
};

// Fin du fichier
// Pour plus d'infos sur les variables globales : https://www.typescriptlang.org/docs/handbook/declaration-files/by-example.html#global-variables
// Pour plus d'infos sur declare global : https://www.typescriptlang.org/docs/handbook/declaration-files/do-s-and-don-ts.html#global-augmentation
