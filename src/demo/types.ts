const TEST : number = 12345;
console.log(TEST);

// let prenom: string;
// prenom = 'Tuan';
// prenom = 'Minh';
// console.log(prenom);

// let actif: boolean;
// actif = true;
// actif = false;
// console.log('Hello');

let nombres: number[] = [1, 2, 3];
let fourreTout: any[] = [nombres, {}, true, 'hello'];
let liste: Array<number> = [100, 200, 300];
let tuples: [string, number];
tuples= ['World', 3];

// for(let val of nombres) {
//     console.log(val);
// }

// for(let val of fourreTout) {
//     console.log(val);
// }

for(let val of tuples) {
    console.log(val);
}

// Énumération
enum Role {ADMIN, READ_ONLY, READ_WRITE};

// console.log(Role[0]); // ADMIN
for(let val in Role) {
    //console.log(Role[val]);
    console.log(val);
}

enum Couleur { Bleu = '#2980b9', Vert = "#27ae60", Rouge = '#c0392b' };
console.log(Couleur.Bleu); // #2980b9


const var1: null = null;
const var2: undefined = undefined;

function add(nb1: number, nb2: number): number {
    return nb1 = nb2;
}

function erreur(err: any): never {
    throw new Error(err);
}

function log(): never {
    return erreur('Problème !');
}

function boucleInfinie(): never {
    while(true) {
        console.log('To do something ...');
    }
}

// Inférences 
// L'inférence d'un type est la faculté de TypeScript de 
// déduire un type à partir des assignations et des contextes
let x = 42; // TS détermine automatiquement que x est un number

window.onmousedown = (e) => { // e de type mouseEvent
    console.log(e.button); // fonctionne
    // console.log(e.random); // Erreur
};

window.onscroll = (e) => { // e de type UIEvent
    // console.log(e.button); // Erreur
}

// Assertion
// L'assertion est utile lorsque le développeur a plus d'informations que TypeScript sur une variable
// par exemple pour le retour d'une requête HTTP
let maVar: any = "Une chaîne";

let longueur: number = (maVar as string).length;
// Ancienne syntaxe
let longueurBis: number = (<string>maVar).length;