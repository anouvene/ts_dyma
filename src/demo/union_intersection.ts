let userStatus: 'Online' | 'Offline' | 'Away' = 'Online'
let value: string | number | boolean = 'Hello';
value = 42
value = true

interface Admin {
    name: string;
    privileges: string[];
}

interface Employee {
    name: string;
    startDate: Date;
}

type ElevatedEmployee = Admin & Employee;

const e1: ElevatedEmployee = {
    name: 'Alice',
    privileges: ['create-server'],
    startDate: new Date()
}
console.log(e1);

type Combinable = string | number;
type Numeric = number | boolean;

type Universal = Combinable & Numeric;

let myVar: Universal;
myVar = 42
console.log(myVar);
// myVar = 'Hello' // Erreur

/**
 * Fonction pour additionner deux valeurs
 * @param a Type string ou number
 * @param b Type string ou number
 * @returns Type string ou number
 */
function add(a: Combinable, b: Combinable) {
    if (typeof a === 'string' || typeof b === 'string') {
        return a.toString() + b.toString();
    }
    return a + b;
}

const result = add('Hello, ', 'world!');
// TypeScript ne sait pas que result est une string ici
if (typeof result === 'string') {
    console.log(result.toUpperCase());
} else {
    console.log(result);
}

const result2 = add(10, 20);
// TypeScript ne sait pas que result est un number ici
if (typeof result2 === 'number') {
    console.log(result2.toFixed(2));
} else {
    console.log(result2);
}

// Typer le retour d'une fonction en utilisant les unions
// remarque: void est lui même une union de types: undefined et null
function ajouter(isAdmin: boolean): string | void {
    if (isAdmin) {
        return 'secret';
    } else {
        return;
    }
}

const secret = ajouter(true);
if (typeof secret === 'string') {
    console.log(secret.toUpperCase());
}


/**
 * ============================================================================================================
 * UNIONS DISCRIMINANTES ET GARDES
 * Les gardes de types permettent d'utiliser une propriété ou méthode unique d'une des interfaces d'une union
 * C'est utile pour distinguer une interface en particulier et pouvoir accéder à des propriétés ou méthodes.
 * ============================================================================================================
 */

/**
 * Problématique fréquente: 
 */
interface User {
    name: string;
    email: string;
}

interface Moderator extends User {
    role: 'moderator';
    editMessage: (msg: string) => string
}

/*function uneFonction(user: User | Moderator) {
    user.editMessage('un message') // Erreur car user peut être de type User qui n'a pas la méthode editMessage
}*/

// Solution 1: utiliser le mot clé in
function uneAutreFonction(user: User | Moderator) {
    if ('editMessage' in user) {
        // Ici, TypeScript sait que user est de type Moderator
        user.editMessage('un message')
    }
}

// Solution 2: utiliser les unions discriminantes
interface User2 {
    type: 'user';
    name: string;
    email: string;
}

interface Moderator2 {
    type: 'moderator'; // propriété discriminante
    name: string;
    email: string;
    editMessage: (msg: string) => string
}

function encoreUneFonction(user: User2 | Moderator2) {
    if (user.type === 'moderator') {
        // Ici, TypeScript sait que user est de type Moderator2
        user.editMessage('un message')
    }
}

// Exemple plus commun
interface Carre {
  forme: "carre";
  cote: number;
}
interface Rectangle {
  forme: "rectangle";
  largeur: number;
  hauteur: number;
}
interface Cercle {
  forme: "cercle";
  rayon: number;
}

type Forme = Carre | Rectangle | Cercle;

function calcAire(e: Forme) {
  switch (e.forme) {
    case "carre":
      return e.cote * e.cote;
    case "rectangle":
      return e.largeur * e.hauteur;
    case "cercle":
      return Math.PI * e.rayon ** 2;
  }
}