// On a déjà vu l'utilisation des unions discriminantes dans le fichier union_intersection.ts
// mais on peut aussi utiliser des gardes de types plus générales comme le mot clé "in", "typeof", "instanceof"
// ou encore "fonction de garde personnalisée appelée fonction de prédicat"

// Exemple avec une propriété discriminante
interface User {
    role: 'user';
    name: string;
    email: string;
}

interface Moderator {
    role: 'moderator'; // propriété discriminante
    editMessage: (msg: string) => string
}   

function uneFonction(user: User | Moderator) {
  if (user.role === 'moderator') {
    user.editMessage('un message')
  } else {
    console.log(user.email);
  }
}

// Exemple avec typeof
function printId(id: number | string) {
    if (typeof id === 'string') {
        console.log(id.toUpperCase());
    } else {
        console.log(id);
    }
}

// Exemple avec instanceof
class Dog {
    bark() {
        console.log('Woof!');
    }
}

class Cat {
    meow() {
        console.log('Meow!');
    }
}

function makeSound(animal: Dog | Cat) {
    if (animal instanceof Dog) {
        animal.bark();
    } else {
        animal.meow();
    }
}

// Exemple avec une fonction de garde personnalisée
interface Fish {
    swim: () => void;
}

interface Bird {
    fly: () => void;
}

function isFish(pet: Fish | Bird): pet is Fish {
    return (pet as Fish).swim !== undefined;
}

function move(pet: Fish | Bird) {
    if (isFish(pet)) {
        pet.swim();
    } else {
        pet.fly();
    }
}

// Autre exemple avec le mot clé in
interface Car {
    drive: () => void;
}

interface Boat {
    sail: () => void;
}

function operate(vehicle: Car | Boat) {
    if ('drive' in vehicle) {
        vehicle.drive();
    } else {
        vehicle.sail();
    }
}

// Exemple avec les types littéraux
type Shape = 
    | { kind: 'circle'; radius: number }
    | { kind: 'square'; sideLength: number }
    | { kind: 'rectangle'; width: number; height: number };

function area(shape: Shape): number {
    switch (shape.kind) {
        case 'circle':
            return Math.PI * shape.radius ** 2;
        case 'square':
            return shape.sideLength ** 2;
        case 'rectangle':
            return shape.width * shape.height;
        default:
            // Utilisation de "never" pour s'assurer que tous les cas sont couverts
            const _exhaustiveCheck: never = shape;
            return _exhaustiveCheck;
    }
}

// Résumé des gardes de types:
// Un garde de type est un ensemble de pratiques pour permettre à TypeScript de différencier les types dans une union.
// Cela permet d'accéder en toute sécurité aux propriétés ou méthodes spécifiques à un type particulier.

// Les gardes de types les plus courants sont:
// - typeof: pour les types primitifs (string, number, boolean, symbol, bigint)
// - instanceof: pour les classes et les objets
// - in: pour vérifier la présence d'une propriété dans un objet
// - fonctions de garde personnalisées (prédicats de type)
// - propriétés discriminantes dans les unions de types
