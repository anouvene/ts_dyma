// Les namespaces permettent de regrouper des fonctionnalités liéeses
// Ils permettent d'éviter les collisions de noms dans le code
// Ils sont principalement utilisés pour organiser le code dans des projets plus importants
// Ils peuvent être imbriqués et divisés en plusieurs fichiers

// Pour utiliser un namespace défini dans un autre fichier, on utilise la directive /// <reference path="..." />
// Cela permet au compilateur TypeScript de savoir où trouver les définitions du namespace

// Note: Les namespaces sont moins utilisés dans les projets modernes qui préfèrent les modules ES6
// Cependant, ils restent utiles dans certains contextes, notamment pour les bibliothèques ou les projets plus anciens

// Fichier: namespace_1.ts  
namespace Validation {
  export interface StringValidator {
    isAcceptable(s: string): boolean;
  }
}


