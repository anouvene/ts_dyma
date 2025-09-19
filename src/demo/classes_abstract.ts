abstract class Animal {
    constructor(protected name: string) {}

    abstract makeSound(): void;

    move(): void {
        console.log(`${this.name} is moving.`);
    }
}

class Dog extends Animal {
    makeSound(): void {
        console.log("Woof! Woof!");
    }
}

class Cat extends Animal {
    makeSound(): void {
        console.log("Meow! Meow!");
    }
}

const dog = new Dog("Buddy");
dog.makeSound(); // Woof! Woof!
dog.move(); // Buddy is moving.

const cat = new Cat("Whiskers");
cat.makeSound(); // Meow! Meow!
cat.move(); // Whiskers is moving.

// const animal = new Animal("Generic Animal"); // Erreur : Impossible d'instancier une classe abstraite

// --------------------------------------------------
// Exemple avec méthode statique
abstract class Shape {
    constructor(protected color: string) {}

    abstract area(): number;

    static describe(shape: Shape): string {
        return `This shape is ${shape.color} and has an area of ${shape.area()}.`;
    }
}

class Circle extends Shape {
    constructor(color: string, private radius: number) {
        super(color);
    }

    area(): number {
        return Math.PI * this.radius * this.radius;
    }
}

const circle = new Circle("red", 5);
console.log(Shape.describe(circle)); // This shape is red and has an area of 78.53981633974483.
console.log(circle.area()); // 78.53981633974483

// --------------------------------------------------
// Exemple avec méthode statique et héritage
abstract class Vehicle {
    constructor(protected brand: string) {}

    abstract start(): void;

    static info(vehicle: Vehicle): string {
        return `This vehicle is a ${vehicle.brand}.`;
    }
}

class Car extends Vehicle {
    start(): void {
        console.log(`${this.brand} car is starting.`);
    }
}

const car = new Car("Toyota");
car.start(); // Toyota car is starting.
console.log(Vehicle.info(car)); // This vehicle is a Toyota.

// --------------------------------------------------
// Exemple avec méthode statique et héritage multiple
abstract class Employee {
    constructor(protected name: string) {}

    abstract getRole(): string;

    static details(employee: Employee): string {
        return `Employee Name: ${employee.name}, Role: ${employee.getRole()}`;
    }
}

class Manager extends Employee {
    getRole(): string {
        return "Manager";
    }
}

const manager = new Manager("Alice");
console.log(Employee.details(manager)); // Employee Name: Alice, Role: Manager

