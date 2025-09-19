// Déclarer directement un attribut de classe en argument du constructeur
class Personne {
    constructor(
        public nom: string,
        private age: number,
        protected email: string,
        readonly id: number
    ) {}

    public getInfo(): string {
        return `${this.nom} (${this.age} ans)`;
    }

    public getEmail(): string {
        return this.email;
    }

    // Remarque : les méthodes statiques sont héritables
    static decrire(personne: Personne): string {
        return `Nom: ${personne.nom}, Age: ${personne.age}, Email: ${personne.email}, ID: ${personne.id}`;
    }
}
const personne = new Personne("Alice", 30, "alice@example.com", 1);
console.log(personne.getInfo()); // Alice (30 ans)
console.log(personne.nom); // Alice
// console.log(personne.age); // Erreur : 'age' est privé
console.log(personne.getEmail()); // alice@example.com
console.log(personne.id); // 1
// personne.id = 2; // Erreur : 'id' est en lecture seule
console.log(Personne.decrire(personne)); // Nom: Alice, Age: 30, Email: alice@example.com, ID: 1
