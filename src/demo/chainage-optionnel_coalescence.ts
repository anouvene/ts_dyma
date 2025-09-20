// Opérateurs de chaînage optionnel et coalescence par des exemples:
// https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#optional-chaining
// https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#nullish-coalescing


// Exemple de chaînage optionnel : accéder à des propriétés imbriquées dans un objet
// sans provoquer d'erreur si une propriété intermédiaire est undefined ou null
// L'opérateur de chaînage optionnel peut permettre d'éviter les erreurs d'accès sans avoir à vérifier l'existence d'une propriété
// à chaque niveau de l'objet.

type User = {
  id: number;
  name: string;
  address?: {
    street?: {
      name: string;
      number: number;
    };
    city?: string;
  };
};

const user1: User = {
  id: 1,
  name: "Alice",
  address: {
    street: {
      name: "Main St",
      number: 123,
    },
    city: "Wonderland",
  },
};

const user2: User = {
  id: 2,
  name: "Bob",
};

// Fonction pour obtenir le nom de la rue en utilisant le chaînage optionnel :
// Cas d'utilisation de cet opérateur pour ne pas avoir d'erreur de type à l'exécution.
function getStreetName(user: User): string {
  return user.address?.street?.name ?? "Adresse inconnue";
}

console.log(getStreetName(user1)); // Output: Main St
console.log(getStreetName(user2)); // Output: Adresse inconnue

// Exemple avec coalescence : obtenir la ville avec une valeur par défaut (valeurs falsy possibles de city : "", '', ``, 0, NaN, null, undefined, false)
function getCity(user: User): string {
  return user.address?.city ?? "Ville inconnue"; // Si la propriété city existe et de valeur falsy alors retourne sa valeur, sinon retourne "Ville inconnue"
}

console.log(getCity(user1)); // Output: Wonderland
console.log(getCity(user2)); // Output: Ville inconnue

// Exemple combiné
function getFullAddress(user: User): string {
  const street = user.address?.street?.name ?? "Adresse inconnue";
  const city = user.address?.city ?? "Ville inconnue";
  return `${street}, ${city}`;
}

console.log(getFullAddress(user1)); // Output: Main St, Wonderland
console.log(getFullAddress(user2)); // Output: Adresse inconnue, Ville inconnue         