class Person {
    public name: string; // accessible everywhere
    private age: number; // accessible only inside Person
    protected email: string; // accessible in Person and subclasses
    readonly id: number; // can be read, but not modified after initialization

    constructor(name: string, age: number, email: string, id: number) {
        this.name = name;
        this.age = age;
        this.email = email;
        this.id = id;
    }

    public getInfo(): string {
        return `${this.name} (${this.age} ans)`;
    }


    private getSecret(): string {
        return `Secret: ${this.age}`;
    }

    protected getEmail(): string {
        return this.email;
    }
}

class Employee extends Person {
    public jobTitle: string;

    constructor(name: string, age: number, email: string, id: number, jobTitle: string) {
        super(name, age, email, id);
        this.jobTitle = jobTitle;
    }

    public getEmployeeInfo(): string {
        // Can access protected member 'email'
        return `${this.name} - ${this.jobTitle} - ${this.getEmail()}`;
    }
}

const person = new Person("Alice", 30, "alice@example.com", 1);
console.log(person.name); // OK (public)
// console.log(person.age); // Error (private)
// console.log(person.email); // Error (protected)
console.log(person.id); // OK (readonly)
// person.id = 2; // Error (readonly)

const employee = new Employee("Bob", 25, "bob@example.com", 2, "Developer");
console.log(employee.getEmployeeInfo());
//console.log(employee.getEmail()); // Error (protected method)
// console.log(employee.getSecret()); // Error (private method)
console.log(employee.getInfo()); // OK (public method)          
console.log(employee.name); // OK (public)
// console.log(employee.age); // Error (private)
// console.log(employee.email); // Error (protected)
console.log(employee.id); // OK (readonly)
// employee.id = 3; // Error (readonly)
console.log(employee.jobTitle); // OK (public)
employee.jobTitle = "Senior Developer"; // OK (public)
console.log(employee.jobTitle); // OK (public)
// employee.age = 31; // Error (private)
// employee.email = "
// employee.name = "Charlie"; // OK (public)
// console.log(employee.name); // OK (public)
// console.log(employee.age); // Error (private)
// console.log(employee.email); // Error (protected)
console.log(employee.id); // OK (readonly)
// employee.id = 4; // Error (readonly)
console.log(employee.jobTitle); // OK (public)              
employee.jobTitle = "Manager"; // OK (public)
console.log(employee.jobTitle); // OK (public)      
// employee.getSecret(); // Error (private method)          
// employee.getEmail(); // Error (protected method)          
console.log(employee.getInfo()); // OK (public method)  
console.log(employee.name); // OK (public)
// console.log(employee.age); // Error (private)
// console.log(employee.email); // Error (protected)
console.log(employee.id); // OK (readonly)
// employee.id = 5; // Error (readonly)
console.log(employee.jobTitle); // OK (public)              
employee.jobTitle = "CTO"; // OK (public)
console.log(employee.jobTitle); // OK (public)      
console.log(employee.getEmployeeInfo()); // OK (public method)
// console.log(employee.getEmail()); // Error (protected method)
// console.log(employee.getSecret()); // Error (private method)
console.log(employee.getInfo()); // OK (public method)
console.log(employee.name); // OK (public)
// console.log(employee.age); // Error (private)
// console.log(employee.email); // Error (protected)
console.log(employee.id); // OK (readonly)
// employee.id = 6; // Error (readonly)
console.log(employee.jobTitle); // OK (public)              
employee.jobTitle = "CEO"; // OK (public)
console.log(employee.jobTitle); // OK (public)  
console.log(employee.getEmployeeInfo()); // OK (public method)