function addition(nb1: number, nb2:number) { // Inférence : pas besoin de préciser le type de retour car TS connaît le type retourné
    return nb1 + nb2;
}
console.log(addition(2, 2));

let add = (nb1: number, nb2:number): number => { // Exemple avec le type de retour explicite
    return nb1 + nb2;
}
console.log(add(1, 2));

// Souvent, on déclare d'abor la fonction puis on l'implémente après.
let addBis: (nb1: number, nb2: number) => number;
addBis = (nb1: number, nb2:number) => {
    return nb1 + nb2;
}
console.log(addBis(1, 2));

// Autre exemple de déclaration d'une fonction utilisée dans un objet typé

type monObjet = {
  data: number[],
  multiplier: (nombre1: number, nombre2: number) => number
}

// Rarement utilisé
//let addBis: Function;

// Ou encore dans une interface
interface monObjetBis {
  data: number[],
  multiplier: (nombre1: number, nombre2: number) => number
}

// Paramètres optionnels doivent être toujours placés à la fin des params non optionnels de la fonction
function ajouter(x: number, y: number, z?: number): number {
  return z ? x + y +z : x + y;
}

// Valeurs par défaut d'une param de la fonction
function sum(x = 0, y = 0): number { // Inférent : pas besoin de typer les params
  return x + y;
}

console.log(sum()); // 0
console.log(sum(50)); // 50

function sumBis(x = 0, y: number): number { // A la différence des params optionnels, on peut placer un param initialisé n'importe où
  return x + y;
}
console.log(sumBis(undefined, 5)); // 5
console.log(sumBis(7, 0)); // 5

// Param de la fonction avec l'opérateur rest
function addRest(...nombres: number[]): number {
    return nombres.reduce ((acc, i) => {
        return acc + i;
    }, 0);
}

console.log(addRest(2, 2, 3));

// Surcharge
function concat(x: string | number, y: string | number): string | number; // Signature 1
//function concat(x: number, y: number): number; // Signature 2
function concat(x: any, y: any): any { // Implémentation
    return x + y;
}

console.log(concat('Hello ', 'World')); // Hello World
console.log(concat(1, 2)); // 3
// console.log(concat(1, '2')); // Erreur car pas de signature correspondante

// Surcharge avec des types différents
interface User {
    id?: number;
    email?: string;
    prenom?: string;
    nom?: string;
}

function getUser(id: number): User;
function getUser(email: string): User;
function getUser(prenom: string, nom: string): User;

function getUser(param1: string | number, param2?: string ): User {

  let user: User = {};

  if (typeof param1 === 'number') {
    // Récupère le user par id
    user.id = param1;
  } else if (typeof param2 != 'undefined') {
      // Récupère le user par prénom et nom
    user.prenom = param1;
    user.nom = param2;

  } else {
      // Récupère le user par email
    user.email = param1;
  }

  return user;
}

// La valeur de retour change en fonction du tyoe d'argument passé
function getUsers(id: number): User;
function getUsers(ids: number[]): User[];

function getUsers(param: number | number[]): User | User[] {

  let users: User | User[] = {};

  if( typeof param === 'object') {
      // Récupère les users avec le tableau d'ids
        users = param.map(id => ({id})); // Simule la récupération des users

  } else {
      // Récupère le user par son id
      users = [{id: param}]; // Simule la récupération du user
    
  }

  return users;
}

console.log(getUsers(4342342));
console.log(getUsers([2342342341, 122241423]));


// Fonction anonyme auto-invoquée (IIFE)
let resultat = (function(x: number, y: number): number {
    return x + y;
})(1, 2);

console.log(resultat); // 3

// Fonction génératrice
function* generatrice() {
    let i = 0;
    while (i < 3) {
        yield i++;
    }
}

let gen = generatrice();

console.log(gen.next().value); // 0
console.log(gen.next().value); // 1
console.log(gen.next().value); // 2
console.log(gen.next().value); // undefined car plus de yield       


// Fonction avec this
let monObjetTer = {
    data: [1, 2, 3],
    multiplier(this: {data: number[]}, nombre: number): number[] { // Typage de this
        return this.data.map(i => i * nombre);
    }
}

console.log(monObjetTer.multiplier(2)); // [2, 4, 6]

// Si on essaie d'appeler la méthode en dehors de l'objet, on a une erreur car this n'est pas du bon type
// let maFonction = monObjetTer.multiplier;
// console.log(maFonction(2)); // Erreur car this n'est pas du bon type

// Solution : utiliser bind pour lier this à l'objet
let maFonction = monObjetTer.multiplier.bind(monObjetTer);
console.log(maFonction(2)); // [2, 4, 6]

// Ou utiliser une fonction fléchée pour conserver le contexte de this
let monObjetQuatre = {
    data: [1, 2, 3],
    multiplier: (nombre: number): number[] => { // Pas de typage de this car fonction fléchée
        return monObjetQuatre.data.map(i => i * nombre); // On utilise le nom de l'objet pour accéder à data
    }
}

console.log(monObjetQuatre.multiplier(3)); // [3, 6, 9]

// Fonction avec un paramètre this
function withThis(this: {name: string}, age: number): string {
    return `${this.name} a ${age} ans.`;
}

let personne = {name: 'Alice'};

console.log(withThis.call(personne, 30)); // Alice a 30 ans.
console.log(withThis.apply(personne, [25])); // Alice a 25 ans.
let boundFunction = withThis.bind(personne);
console.log(boundFunction(40)); // Alice a 40 ans.

// Fonction récursive
function factorielle(n: number): number {
    if (n <= 1) {
        return 1;
    }
    return n * factorielle(n - 1);
}

console.log(factorielle(5)); // 120

// Fonction asynchrone
async function fetchData(url: string): Promise<any> { // Retourne une promesse de n'importe quel type
    let response = await fetch(url);
    let data = await response.json();
    return data;
}

fetchData('https://jsonplaceholder.typicode.com/todos/1')
    .then(data => console.log(data))
    .catch(error => console.error('Erreur :', error));

// Fonction avec un callback
function processData(data: number[], callback: (item: number) => number): number[] {
    return data.map(callback);
}

let numbers = [1, 2, 3];
let processed = processData(numbers, item => item * 2);
console.log(processed); // [2, 4, 6]

// Fonction avec un paramètre générique
function identity<T>(arg: T): T {
    return arg;
}