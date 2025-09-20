// Les intersections de types permettent de combiner plusieurs types en un seul. 
// Cela est utile lorsque vous souhaitez qu'une variable ou une fonction respecte plusieurs types à la fois.

// Exemple avec des interfaces
interface A {
    propA: string;
}

interface B {
    propB: number;
}

// Intersection de types
type C = A & B;

const obj: C = {
    propA: "Hello",
    propB: 42
};

// Exemple avec des types littéraux
type D = { x: number } & { y: number };

const point: D = {
    x: 10,
    y: 20
};  
