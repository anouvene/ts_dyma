/**
 * Types génériques
 * 
 * Les types génériques sont très importants pour maintenir la sécurité et l'autocomplétion permises par TypeScript.
 * Les types génériques permettent de créer des composants réutilisables qui fonctionnent avec une variété de types plutôt qu'un seul.
 * Ils sont définis en utilisant des paramètres de type, qui sont des variables représentant un type.       
 */

// 2 exemples de types génériques natifs
let list: Array<number> = [1, 2, 3]; // Array est un type générique

let condition: boolean = true;
const promesse: Promise<number | string> = new Promise((resolve, reject) => {
    if (condition) {
        resolve(42);
    } else {
        reject('Erreur');
    }
});

// FONCTION GÉNÉRIQUE
// Les fonctions génériques permettent de créer des fonctions qui peuvent travailler avec différents types tout en conservant la sécurité de type.
// Cela permet de réutiliser la même fonction avec différents types sans avoir à dupliquer le code pour chaque type spécifique.
// Les fonctions génériques améliorent la maintenabilité et la lisibilité du code en réduisant la redondance et en facilitant la compréhension des intentions du développeur.

// Exemple de fonction générique    
function identity<T>(arg: T): T {
    return arg;
}

let output1 = identity<string>("Hello, Generics!");
let output2 = identity<number>(42);

console.log(output1.toUpperCase()); // HELLO, GENERICS!
console.log(output2.toFixed(2));    // 42.00

// Utilisation de plusieurs paramètres de type
function merge<T, U>(obj1: T, obj2: U): T & U {
    return { ...obj1, ...obj2 };
}

const mergedObj = merge({ name: "Alice" }, { age: 30 });
console.log(mergedObj.name); // Alice
console.log(mergedObj.age);  // 30

// INTERFACE GÉNÉRIQUE
// Les interfaces génériques sont utiles pour définir des contrats pour des fonctions ou des classes qui utilisent des types génériques.
// Elles permettent de garantir que les implémentations respectent une certaine structure tout en restant flexibles.
// Cela permet également de réutiliser le même contrat avec différents types, améliorant ainsi la maintenabilité et la lisibilité du code.  

interface GenericIdentityFn<T> {
    (arg: T): T;
}

function identityFn<T>(arg: T): T {
    return arg;
}

let myIdentity: GenericIdentityFn<number> = identityFn;
console.log(myIdentity(100)); // 100
// Cela est particulièrement utile dans les cas où vous avez des types 
// qui partagent une structure commune mais ont des propriétés ou méthodes spécifiques.


let msg: string = 'Hello world';
let myIdentityBis: GenericIdentityFn<string> = (msg) => {
    return msg;
};
console.log(myIdentityBis(msg)); // Hello world


// Contraintes sur les types génériques : Une contrainte permet de limiter les types utilisables avec un type générique particulier
interface Lengthwise {
    length: number;
}

function logLength<T extends Lengthwise>(arg: T): T {
    console.log(arg.length);
    return arg;
}

logLength("Hello, World!"); // 13
logLength([1, 2, 3, 4]);    // 4
logLength({ length: 10, value: "Test" }); // 10
// logLength(42); // Erreur: number n'a pas de propriété length
// logLength({ value: "Test" }); // Erreur: l'objet doit avoir une propriété length
// Contraintes avec plusieurs types génériques
function combine<T extends object, U extends object>(obj1: T, obj2: U): T & U {
    return { ...obj1, ...obj2 };
}

const combined = combine({ name: "Alice" }, { age: 30 });
console.log(combined.name); // Alice
console.log(combined.age);  // 30

// CLASSE GÉNÉRIQUE
// Les classes génériques permettent de créer des classes qui peuvent travailler avec différents types tout en conservant la sécurité de type.
// Cela permet de réutiliser la même classe avec différents types sans avoir à dupliquer le code pour chaque type spécifique.
// Les classes génériques améliorent la maintenabilité et la lisibilité du code en réduisant la redondance et en facilitant la compréhension des intentions du développeur.

// Exemple de classe générique
class GenericIdentity<T> {
    value!: T;
    getValue(): T {
        return this.value;
    }
}       

let genericString = new GenericIdentity<string>();
genericString.value = "Hello, Generic Class!";
console.log(genericString.getValue()); // Hello, Generic Class!

let genericNumber = new GenericIdentity<number>();
genericNumber.value = 123;
console.log(genericNumber.getValue()); // 123   


// Autre exemple avec des classes génériques
class GenericNumber<T> {
    zeroValue!: T;
    add!: (x: T, y: T) => T;
}

let myGenericNumber = new GenericNumber<number>();
myGenericNumber.zeroValue = 0;
myGenericNumber.add = function(x, y) { return x + y; };

console.log(myGenericNumber.add(myGenericNumber.zeroValue, 5)); // 5

// Contraintes sur les types génériques dans les classes
class LengthwiseGeneric<T extends Lengthwise> {
    value!: T;
    logLength(): void {
        console.log(this.value.length);
    }
}

let lengthwiseString = new LengthwiseGeneric<string>();
lengthwiseString.value = "Hello, Lengthwise Generic!";
lengthwiseString.logLength(); // 26

let lengthwiseArray = new LengthwiseGeneric<number[]>();
lengthwiseArray.value = [1, 2, 3, 4, 5];
lengthwiseArray.logLength(); // 5

// let lengthwiseNumber = new LengthwiseGeneric<number>(); // Erreur: number n'a pas de propriété length    

// Contraintes avec plusieurs types génériques dans les classes
class CombineGeneric<T extends object, U extends object> {
    obj1!: T;
    obj2!: U;
    combine(): T & U {
        return { ...this.obj1, ...this.obj2 };
    }
}

let combineGeneric = new CombineGeneric<{ name: string }, { age: number }>();
combineGeneric.obj1 = { name: "Alice" };
combineGeneric.obj2 = { age: 30 };
let combinedObjGeneric = combineGeneric.combine();
console.log(combinedObjGeneric.name); // Alice
console.log(combinedObjGeneric.age);  // 30 

// Contraintes avec des types génériques par défaut
function createArray<T = string>(length: number, value: T): T[] {
    return Array.from({ length }, () => value);
}

let stringArray = createArray(3, "Hello");
console.log(stringArray); // ["Hello", "Hello", "Hello"]

let numberArray = createArray<number>(3, 42);
console.log(numberArray); // [42, 42, 42]

// let booleanArray = createArray<boolean>(3, true);
// console.log(booleanArray); // [true, true, true]

// Contraindre un type générique à partir des propriétés d'un autre type
// La contrainte K extends keyof T garantit que K est une clé valide de l'objet T
// Cela permet d'accéder de manière sûre à la propriété de l'objet en utilisant la clé fournie
// et de retourner la valeur de cette propriété avec le type correct.
// Cela améliore la sécurité de type et évite les erreurs potentielles lors de l'accès aux propriétés d'un objet.
// Cela est particulièrement utile dans les cas où vous travaillez avec des objets dont les propriétés peuvent varier,
// mais où vous souhaitez toujours garantir que vous accédez à des propriétés valides.
// L'opérateur keyof est spécifique à TypeScript.

// Exemple de fonction générique avec contrainte sur les clés d'un objet
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
    return obj[key];
}

const person = { name: "Alice", age: 30 };
const personName = getProperty(person, "name"); // Type de personName est string
const personAge = getProperty(person, "age");   // Type de personAge est number
console.log(personName); // Alice
console.log(personAge);  // 30

// const invalidProperty = getProperty(person, "address"); // Erreur: "address" n'est pas une clé de person

// Utilisation de types génériques avec des types alias

type Pair<T, U> = {
    first: T;
    second: U;
};

let stringNumberPair: Pair<string, number> = { first: "Age", second: 30 };
console.log(stringNumberPair.first);  // Age
console.log(stringNumberPair.second); // 30


// QUELQUES EXEMPLES DE TYPES NATIFS UTILISANT DES TYPES GÉNÉRIQUES

// ReadonlyArray<T> : Un tableau dont les éléments ne peuvent pas être modifiés
let readonlyArray: ReadonlyArray<number> = [1, 2, 3];
// readonlyArray.push(4); // Erreur: La méthode 'push' n'existe pas sur le type 'readonly number[]'.
// readonlyArray[0] = 10; // Erreur: L'index signature est en lecture seule.
console.log(readonlyArray); // [1, 2, 3]

// Partial<T> : Un type qui rend toutes les propriétés d'un type optionnelles
interface Person {
    name: string;
    age: number;
}

let partialPerson: Partial<Person> = { name: "Alice" }; // age est optionnel
console.log(partialPerson); // { name: 'Alice' }

// Required<T> : Un type qui rend toutes les propriétés d'un type obligatoires
interface Car {
    make?: string;
    model?: string;
}

let requiredCar: Required<Car> = { make: "Toyota", model: "Corolla" }; // make et model sont obligatoires
console.log(requiredCar); // { make: 'Toyota', model: 'Corolla' }

// Record<K, T> : Un type qui crée un objet avec des clés de type K et des valeurs de type T
type Roles = 'admin' | 'user' | 'guest';
type RolePermissions = Record<Roles, string[]>;

let rolePermissions: RolePermissions = {
    admin: ['read', 'write', 'delete'],
    user: ['read'],
    guest: ['read']
};  
console.log(rolePermissions); // { admin: [ 'read', 'write', 'delete' ], user: [ 'read' ], guest: [ 'read' ] }

// Pick<T, K> : Un type qui crée un sous-ensemble d'un type en sélectionnant certaines propriétés
interface FullPerson {
    name: string;
    age: number;
    email: string;
}

type PersonNameAndEmail = Pick<FullPerson, 'name' | 'email'>;

let personSubset: PersonNameAndEmail = { name: "Bob", email: "bob@example.com" };
console.log(personSubset); // { name: 'Bob', email: 'bob@example.com' }

// Omit<T, K> : Un type qui crée un sous-ensemble d'un type en omettant certaines propriétés
type PersonWithoutEmail = Omit<FullPerson, 'email'>;

let personWithoutEmail: PersonWithoutEmail = { name: "Charlie", age: 25 };
console.log(personWithoutEmail); // { name: 'Charlie', age: 25 }
