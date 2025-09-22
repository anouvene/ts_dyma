import moment from 'moment';
import _ from 'lodash';    

import '../globals.js'; // Types au niveau global : Pour la variable globale 'greet'
import { add } from './myLib/add.js'; // Types au niveau local : Pour la fonction add


// UTILISATION DE FICHIERS DE TYPES

console.log(moment().format('MMMM Do YYYY, h:mm:ss a'));

let local = moment.locale('fr');
console.log(local);

// UTILISATION DE declare
// Permet de dire à TypeScript qu'une variable existe, même si on ne la voit pas dans le code
// Utile pour les variables globales, les librairies externes, etc.
// declare permet de signifier à TypeScript qu'une variable existe même si on ne l'importe pas
// Mais il faut privilégier l'installation des librairies de types si elles sont disponibles !

// Utilisation de la variable _ avec lodash (installée via npm install lodash)
// lodash est une librairie JavaScript populaire pour la manipulation des tableaux, objets, etc.
// Cependant, TypeScript ne sait pas que _ existe car on ne l'a pas importée dans ce fichier
// Donc, on a une erreur de compilation si on essaie de l'utiliser directement
// Pour éviter cette erreur, on peut utiliser declare pour dire à TypeScript que _ existe 

// On déclare que _ existe et qu'il peut être de n'importe quel type
// declare var _: any; // c'est commenté car on a installé les types via npm install --save-dev @types/lodash sinon utiliser lodash via cdn
console.log(_.VERSION); // On peut maintenant utiliser _ sans erreur de compilation
// Si on ne met pas le declare, TypeScript va nous dire que _ n'existe pas
// console.log(_.VERSION); // Erreur : Cannot find name '_'.

// On peut aussi déclarer des fonctions globales
declare function greet(name: string): void;

// On peut maintenant utiliser greet sans erreur de compilation
greet('Anouar');

// Si on ne met pas le declare, TypeScript va nous dire que greet n'existe pas
// greet('Anouar'); // Erreur : Cannot find name 'greet'.

// Utilisation de la fonction add importée depuis myLib/add
console.log(add(2, 3)); // 5

// Pour les librairies externes, on peut installer les fichiers de types via npm
// Par exemple, pour lodash : npm install --save-dev @types/lodash
// Cela permet d'avoir l'autocomplétion et la vérification de types pour lodash

// Pour moment.js, les types sont déjà inclus dans le package, donc pas besoin d'installer @types/moment

// On peut aussi créer nos propres fichiers de types (.d.ts) pour nos librairies ou notre code
// Exemple : créer un fichier lodash.d.ts avec le contenu suivant :
// declare var _: {
//   VERSION: string;
//   chunk<T>(array: T[], size: number): T[][];
//   // etc.
// };

// Ensuite, on peut utiliser lodash avec les types définis dans lodash.d.ts

// Note : Les fichiers de types doivent être inclus dans le tsconfig.json via la propriété "include" ou "files"
// Exemple : "include": ["src/**/*.ts", "src/**/*.d.ts"]




// ========================================================================
// Exemple de fichier de types pour une librairie externe (express-session)
// ========================================================================

// src/demo/fichiers-de-types.ts
type Session = { userId?: string };

// simulation de l’interface Request
type Request = { session?: Session; sessionID?: string };

const req: Request = { session: { userId: "123" }, sessionID: "abc" };
console.log(req.session?.userId);
// ========================================================================

// Notes :

// Pour plus d'infos sur les fichiers de types : https://www.typescriptlang.org/docs/handbook/declaration-files/introduction.html
// Pour plus d'infos sur les types pour les librairies externes : https://www.typescriptlang.org/docs/handbook/declaration-files/consumption.html
// Pour plus d'infos sur moment.js : https://momentjs.com/docs/
// Pour plus d'infos sur lodash : https://lodash.com/docs/
// Pour plus d'infos sur declare : https://www.typescriptlang.org/docs/handbook/declaration-files/by-example.html#global-variables
// Pour plus d'infos sur npm install @types : https://www.npmjs.com/package/@types
// Pour plus d'infos sur tsconfig.json : https://www.typescriptlang.org/tsconfig
// Pour plus d'infos sur les modules ES : https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules
// Pour plus d'infos sur les modules CommonJS : https://nodejs.org/api/modules.html
// Pour plus d'infos sur les modules UMD : https://umdjs.com/
// Pour plus d'infos sur les modules AMD : https://requirejs.org/docs/whyamd.html
// Pour plus d'infos sur les modules SystemJS : https://systemjs.org/docs/
// Pour plus d'infos sur les modules Node.js : https://nodejs.org/api/modules.html#modules_modules
// Pour plus d'infos sur les modules TypeScript : https://www.typescriptlang.org/docs/handbook/modules.html
// Pour plus d'infos sur les modules ESNext : https://www.typescriptlang.org/tsconfig#module
// Pour plus d'infos sur les modules NodeNext : https://www.typescriptlang.org/tsconfig#module
// Pour plus d'infos sur les modules Node16 : https://www.typescriptlang.org/tsconfig#module
// Pour plus d'infos sur les modules CommonJS : https://www.typescriptlang.org/tsconfig#module
// Pour plus d'infos sur les modules UMD : https://www.typescriptlang.org/tsconfig#module
// Pour plus d'infos sur les modules AMD : https://www.typescriptlang.org/tsconfig#module
// Pour plus d'infos sur les modules System : https://www.typescriptlang.org/tsconfig#module
// Pour plus d'infos sur les modules None : https://www.typescriptlang.org/tsconfig#module

// Note : Si vous utilisez un bundler comme Webpack, Rollup, Parcel, etc., assurez-vous que la configuration du bundler est compatible avec le module que vous utilisez dans tsconfig.json
// Par exemple, si vous utilisez "module": "ESNext" dans tsconfig.json, assurez-vous que votre bundler supporte les modules ESNext
// Sinon, vous risquez d'avoir des erreurs lors de la compilation ou de l'exécution du code
// Fin des notes
// Bon codage !
