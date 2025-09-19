class Vehicule {
    type: string;
    vitesse: number;

    constructor(type: string, vitesse: number) {
        this.type = type;
        this.vitesse = vitesse;
    }

    accelerer(increment: number) {
        this.vitesse += increment;
        console.log(`La vitesse du ${this.type} est maintenant de ${this.vitesse} km/h.`);
    }
}

class Voiture extends Vehicule {
    marque: string;
    modele: string;
    annee: number;

    constructor(marque: string, modele: string, annee: number) {
        super("Voiture", 0);
        this.marque = marque;
        this.modele = modele;
        this.annee = annee;
    }

    demarrer() {
        console.log(`La voiture ${this.marque} ${this.modele} démarre.`);
    }

}

const maVoiture: Vehicule = new Voiture("Toyota", "Corolla", 2020);
(maVoiture as Voiture).demarrer(); // La voiture Toyota Corolla démarre.
maVoiture.accelerer(50); // La vitesse du Voiture est maintenant de 50 km/h.
console.log(maVoiture);

// Exemple d'héritage avec une interface
interface EnfantLike {
  seulementEnfant(): void;
}

class Parent {
  afficher(): void {
    console.log("Parent");
  }
}

class Enfant extends Parent implements EnfantLike {
  seulementEnfant(): void {
    console.log("Spécifique à l'enfant");
  }
}

// Fonction type guard
function isEnfantLike(obj: any): obj is EnfantLike {
  return typeof obj.seulementEnfant === "function";
}

const p: Parent = new Enfant();
p.afficher(); // parent

// Utilisation du type guard
if (isEnfantLike(p)) {
  // ✅ Ici TypeScript sait que p est de type EnfantLike
  p.seulementEnfant();
} else {
  console.log("p n'a pas la méthode seulementEnfant");
}

