// Alias de type
// Permet de créer un nouveau nom pour un type existant
type LES_TYPES = string | number | boolean;
type nomDuType = LES_TYPES;
let variable1: nomDuType = "Bonjour";
let variable2: nomDuType = 42;
let variable3: nomDuType = true;

// Type Interface
interface Personne {
  nom: string;
  age: number;
}

let personne1: Personne = { nom: "Alice", age: 30 };
let personne2: Personne = { nom: "Bob", age: 25 };

// Type intersection
type Adresse = {
  rue: string;
  ville: string;
};

type Employe = Personne & Adresse;

let employe1: Employe = {
  nom: "Charlie",
  age: 28,
  rue: "123 Rue Principale",
  ville: "Paris",
};

// Type union
type Animal = "chien" | "chat" | "poisson";
let monAnimal: Animal = "chien";
monAnimal = "chat"; // Valide
// monAnimal = "oiseau"; // Erreur

// Type générique
function echo<T>(arg: T): T {
  return arg;
}

let resultat1 = echo<string>("Hello");
let resultat2 = echo<number>(123);

// Type tuple
type Point = [number, number];
let point1: Point = [10, 20];

// Type enum
enum Direction {
  Haut,
  Bas,
  Gauche,
  Droite,
}

let dir: Direction = Direction.Haut;

console.log(variable1, variable2, variable3);
console.log(personne1, personne2);
console.log(employe1);
console.log(monAnimal);
console.log(maCouleur);
console.log(resultat1, resultat2);
console.log(point1);
console.log(dir);   

// Résumé
// Alias de type : Crée un nouveau nom pour un type existant.
// Interface : Définit la structure d'un objet.
// Type intersection : Combine plusieurs types en un seul.
// Type union : Permet à une variable d'être l'un des types spécifiés.
// Type littéral : Définit une variable qui ne peut prendre qu'une valeur spécifique.
// Type générique : Permet de créer des composants réutilisables avec des types variables.
// Type tuple : Définit un tableau avec un nombre fixe d'éléments de types spécifiques.
// Enum : Définit un ensemble de constantes nommées.    
// Ces fonctionnalités permettent de créer des types complexes et flexibles en TypeScript, améliorant ainsi la robustesse et la maintenabilité du code. 
// Elles sont essentielles pour tirer pleinement parti du système de types de TypeScript.

// Exercice 
// Créez une interface "Voiture" avec les propriétés "marque", "modèle" et "année".
// Utilisez un alias de type pour définir un type "Couleur" qui peut être "rouge", "bleu" ou "vert".
// Créez une fonction générique "afficherInfo" qui prend un argument de type "Voiture" et affiche ses informations.
// Définissez un type tuple "Coordonnées" pour représenter les coordonnées GPS avec deux nombres (latitude et longitude).
// Utilisez une énumération "TypeDeCarburant" avec les valeurs "Essence", "Diesel" et "Électrique".
// Créez une variable de type union qui peut être soit une chaîne de caractères (le nom du conducteur) soit un nombre (l'ID du conducteur).
// Implémentez ces éléments dans un code TypeScript et affichez les résultats dans la console.

// Solution de l'exercice

// 1. Interface Voiture
interface Voiture {
  marque: string;
  modele: string;
  annee: number;
  couleur: Couleur; // Utilisation de l'alias de type Couleur
}

// 2. Alias de type Couleur
type Couleur = "rouge" | "bleu" | "vert";

// 3. Fonction générique afficherInfo
function afficherInfo<T extends Voiture>(voiture: T): void {
  console.log(`Marque: ${voiture.marque}, Modèle: ${voiture.modele}, Année: ${voiture.annee}, Couleur: ${voiture.couleur}`);
}

// 4. Type tuple Coordonnées
type Coordonnees = [number, number]; // [latitude, longitude]

// 5. Énumération TypeDeCarburant
enum TypeDeCarburant {
  Essence,
  Diesel,
  Electrique
}

// 6. Variable de type union
let conducteur: string | number;
conducteur = "Alice"; // Nom du conducteur
conducteur = 12345; // ID du conducteur
// Exemple d'utilisation
const maVoiture: Voiture = {
  marque: "Toyota",
  modele: "Corolla",
  annee: 2020,
  couleur: "bleu"
};

afficherInfo(maVoiture);

const mesCoordonnees: Coordonnees = [48.8566, 2.3522]; // Paris

let monTypeDeCarburant: TypeDeCarburant = TypeDeCarburant.Essence;

console.log(`Coordonnées GPS: Latitude ${mesCoordonnees[0]}, Longitude ${mesCoordonnees[1]}`);
console.log(`Type de carburant: ${TypeDeCarburant[monTypeDeCarburant]}`);
console.log(`Conducteur: ${conducteur}`);       
let maCouleur: Couleur = "rouge";
maCouleur = "vert"; // Valide


// maCouleur = "jaune"; // Erreur   
// Résumé de l'exercice
// Interface Voiture : Définit la structure d'un objet voiture avec des propriétés spécifiques.
// Alias de type Couleur : Crée un type qui peut être l'une des valeurs spécifiées.
// Fonction générique afficherInfo : Affiche les informations d'une voiture en utilisant un type générique contraint.
// Type tuple Coordonnées : Représente les coordonnées GPS avec deux nombres.
// Énumération TypeDeCarburant : Définit un ensemble de constantes nommées pour les types de carburant.
// Variable de type union conducteur : Peut être soit une chaîne de caractères (nom) soit un nombre (ID).
// Ces concepts montrent comment utiliser les fonctionnalités avancées de TypeScript pour créer des types robustes et flexibles, améliorant ainsi la qualité et la maintenabilité du code.      
