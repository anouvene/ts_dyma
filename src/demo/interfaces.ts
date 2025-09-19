// Interface = un contrat qui définit la forme que doit prendre on objet javascript (objets litéraux, classes et fonctions)
interface User {
  prenom: string;
}

function printUser(user: User) {
  console.log(user.prenom);
}

const paul = {prenom: 'Paul', nom: 'Dupont'};

printUser(paul); // Cela fonctionne car paul a au moins une propriété nom

// const jean: User = {prenom: 'Jean', nom: 'Duprey'}; // Erreur car jean a une propriété en trop qui ne respecte pas le contrat imposé par l'interface User

/**
 * Propriétés optionnelles et en lecture seule
 */
interface Car {
  readonly brand: string; // Propriété en lecture seule
  model?: string; // Propriété optionnelle
}

const myCar: Car = {brand: 'Toyota'};
console.log(myCar.brand);   // Toyota
// myCar.brand = 'Honda';    // Erreur : Impossible de modifier une propriété en lecture seule
console.log(myCar.model);   // undefined

myCar.model = 'Corolla';    // OK : On peut ajouter une propriété optionnelle
console.log(myCar.model);   // Corolla

// remarque concernant readonly: readonly empêche la réaffectation de la propriété, mais ne rend pas l'objet immuable. Si une propriété est un objet ou un tableau, ses éléments peuvent toujours être modifiés.
// Par exemple: on peut l'utiliser pour rendre un tableau immutable
const numbers: readonly number[] = [1, 2, 3];
// Syntaxe équivalente : const numbersAlt: ReadonlyArray<number> = [1, 2, 3];

// numbers.push(4); // Erreur : Impossible de modifier un tableau en lecture seule
console.log(numbers[0]); // 1
// numbers.push(4); // Erreur : Impossible de modifier un tableau en lecture seule
console.log(numbers); // [1, 2, 3]

/**
 * Interfaces pour les fonctions
 */
interface MathOperation {
  (x: number, y: number): number; // Définition de la signature de la fonction
}

const add: MathOperation = (a, b) => a + b;
const multiply: MathOperation = (a, b) => a * b;

console.log(add(2, 3));       // 5
console.log(multiply(2, 3));  // 6

/**
 * Héritage d'interfaces
 */
interface Animal {
  name: string;
  makeSound(): void;
}

interface Dog extends Animal {
  breed: string;
}

const myDog: Dog = {
  name: 'Rex',
  breed: 'German Shepherd',
  makeSound() {
    console.log('Woof! Woof!');
  }
};

console.log(myDog.name);   // Rex
console.log(myDog.breed);  // German Shepherd
myDog.makeSound();         // Woof! Woof!

/**
 * Interfaces pour les classes
 */
interface Movable {
  move(): void;
}

class Cat implements Animal, Movable {
  constructor(public name: string) {}

  makeSound(): void {
    console.log('Meow! Meow!');
  }

  move(): void {
    console.log(`${this.name} is moving.`);
  }
}

const cat = new Cat("Whiskers");
cat.makeSound(); // Meow! Meow!
cat.move(); // Whiskers is moving.

// const animal = new Animal("Generic Animal"); // Erreur : Impossible d'instancier une classe abstraite

// --------------------------------------------------

/**
 * Indexes sur les interfaces servent à définir des types pour les objets dont on ne connaît pas à l'avance les propriétés
 * Un type indexable dans une interface permet d'affecter des propriétés dynamiques à un objet
 * Par exemple,cela permet de typer des dictionnaires avec un type de clé et un type de valeur.
 */
interface StringArray {
  [index: number]: string; // Index signature
}

const myArray: StringArray = ["Alice", "Bob", "Charlie"]; // OK
console.log(myArray[0]); // Alice
console.log(myArray[1]); // Bob

// myArray[2] = 42; // Erreur : Type 'number' is not assignable to type 'string'

/**
 * On peut définir des index numériques ou des index de type string
 * Et combiner les deux dans une même interface
 * 
 * Remarque: Si une interface contient à la fois un index numérique et un index de type string, 
 * le type de l'index numérique doit être un sous-type du type de l'index de type string. 
 * En effet, en JavaScript, les clés numériques sont converties en chaînes de caractères 
 * lorsqu'elles sont utilisées comme propriétés d'objet.  
 * Exemple: si on a un index de type string qui retourne des valeurs de type string, 
 * l'index numérique doit aussi retourner des valeurs de type string (ou un sous-type de string)
 * 
 * Exemple contraire qui génère une erreur: 
   interface BadExample {
      [index: number]: string; // Index numérique
      [prop: string]: number; // Index de type string - Erreur car number n'est pas un sous-type de string
   }   
 */
interface UserProfile {
  [index: number]: any; // Index signature
  [prop: string]: any; 
}

const profile: UserProfile = {
  0: "Alice",
  1: 30,
  name: "Alice",
  age: 30,
  isAdmin: true
};

console.log(profile[0]); // Alice
console.log(profile["name"]); // Alice
console.log(profile.age); // 30
console.log(profile.isAdmin); // true
// --------------------------------------------------

/**
 * Interfaces et fonctions
 * On peut utiliser des interfaces pour typer les fonctions, y compris les fonctions avec des propriétés supplémentaires    
 * Exemple: une fonction qui a une propriété "description"
 * Remarque: une interface peut décrire à la fois la signature d'une fonction et ses propriétés
 */
interface DescriptiveFunction {
  (x: number, y: number): number; // Signature de la fonction
  description: string; // Propriété supplémentaire
}

const multiplyWithDescription: DescriptiveFunction = (a, b) => a * b;
multiplyWithDescription.description = "This function multiplies two numbers.";

console.log(multiplyWithDescription(3, 4)); // 12
console.log(multiplyWithDescription.description); // This function multiplies two numbers.      
// --------------------------------------------------

/**
 * Compositions d'interfaces et classes
 * On peut combiner des interfaces et des classes pour créer des structures de données complexes
 * Exemple: une interface pour un objet qui combine les propriétés d'un utilisateur et d'une adresse
 */
interface Address {
  street: string;
  city: string;
  country: string;
}

interface UserWithAddress extends User, Address {}

const userWithAddress: UserWithAddress = {
  prenom: "John",
  street: "123 Main St",
  city: "Anytown",
  country: "USA"
};

console.log(userWithAddress.prenom); // John
console.log(userWithAddress.street); // 123 Main St
console.log(userWithAddress.city); // Anytown
console.log(userWithAddress.country); // USA

// --------------------------------------------------

/**
 * Un exemple de classe implémentant les interfaces Adress et UserWithAdress
 * Cela montre comment une classe peut implémenter plusieurs interfaces
 */
class Person implements User, Address {
  constructor(
    public prenom: string,
    public street: string,
    public city: string,
    public country: string
  ) {}
}

const person = new Person("Jane", "456 Elm St", "Othertown", "Canada");
console.log(person.prenom); // Jane
console.log(person.street); // 456 Elm St
console.log(person.city); // Othertown
console.log(person.country); // Canada

// --------------------------------------------------

/**
 * Extension d'une classe par une interface
 * Une interface peut étendre une classe, héritant ainsi de ses membres
 * Exemple: une interface qui étend une classe de base
 */
class Base {
  baseProperty: string = "base property";
}

interface Extended extends Base {
  extendedProperty: string;
}

const extendedObject: Extended = {
  baseProperty: "base property value",
  extendedProperty: "extended property value"
};

console.log(extendedObject.baseProperty); // base property value
console.log(extendedObject.extendedProperty); // extended property value
// --------------------------------------------------

/**
 * Autre exemple d'interface étendant une classe
 */

 class Player {
    protected record(): void {
        console.log("Recording...");
    };

    constructor(private isPlaying: boolean) {}
}

interface PlayerBasic extends Player {
    play(): void;
}

/**
 * Erreur si on décommente le code ci-dessous:
 * 'Game' est déclaré mais n'est jamais utilisé.ts(6196)
La classe 'Game' implémente de manière incorrecte l'interface 'PlayerBasic'.
  Les types ont des déclarations distinctes d'une propriété privée 'isPlaying'.
 */

/*
class Game implements PlayerBasic {
  play() {}

  constructor(private isPlaying: boolean) {}
}
*/

// Solution: faire hériter la classe Game de la classe Player
class Game extends Player implements PlayerBasic {
  constructor(isPlaying: boolean) {
    super(isPlaying);
  }

  public record(): void {
      console.log("Game recording...");
  }

  play(): void {
      console.log("Game playing...");
  }
}
