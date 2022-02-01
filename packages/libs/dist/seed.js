"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateUsers = exports.generateCandidates = exports.generateCandidat = exports.random = exports.departements_prefix = exports.departements = exports.DF_TYPE_CANDIDAT = void 0;
exports.DF_TYPE_CANDIDAT = {
    normal: 'NORMAL',
    enseignant: 'ENSEIGNANT',
    aideSoignant: 'AIDE_SOIGNANT'
};
exports.departements = [
    "Atacora", "Donga", "Alibori", "Borgou", "Collines",
    "Zou", "Atlantique", "Littoral", "Couffo", "Mono", "Oueme", "Plateau"
];
exports.departements_prefix = exports.departements.map(it => it.toUpperCase().substring(0, 3));
const random = (len) => Math.floor(Math.random() * len);
exports.random = random;
function generateWord(size) {
    const vowels = 'aouiey';
    const consonents = 'bcdfghjklmnpqrstvwxz';
    let result = '';
    for (let i = 0; i < size; i++) {
        if (i % 2 === 0) {
            result += consonents[Math.floor(Math.random() * consonents.length)];
            continue;
        }
        result += vowels[Math.floor(Math.random() * vowels.length)];
    }
    return result;
}
function generateNumber(minValue = 0, maxValue = 9999) {
    return Math.floor(Math.random() * (maxValue - minValue));
}
function generateDate() {
    const now = Date.now();
    const offset = (0, exports.random)(365 * 24 * 3600 * 1000 * 10);
    return new Date(now - offset).toISOString();
}
function generateBool() {
    return [true, false][Math.floor(Math.random() * 2)];
}
function generateNumDepDos(index) {
    return '22' + exports.departements_prefix[(0, exports.random)(exports.departements_prefix.length)] + index;
}
function generateNumTable(index) {
    return (0, exports.random)(13) + '22' + ['M', 'F'][(0, exports.random)(2)] + index;
}
function generateCandidat(index) {
    return {
        "demobilise": ['Oui', 'Non'][(0, exports.random)(2)],
        "numeroDepotDossier": generateNumDepDos(index),
        "numero": generateNumTable(index),
        "accepted": generateBool(),
        "rejected": generateBool(),
        "sportPresent": false,
        "sportAccept": false,
        "motif": generateWord(20),
        "nom": generateWord(10),
        "prenom": generateWord(10),
        "departement": exports.departements[(0, exports.random)(exports.departements.length)],
        "dateNaissance": generateDate(),
        "lieuNaissance": generateWord(15),
        "diplomePresente": generateWord(15),
        "numeroPiece": generateNumber(11111111, 999999999)
    };
}
exports.generateCandidat = generateCandidat;
function generateCandidates(size) {
    const result = [];
    for (let i = 0; i < size; i++) {
        result.push(generateCandidat(i + 1));
    }
    return result;
}
exports.generateCandidates = generateCandidates;
function generateUsers(size) {
    const result = [{
            departement: exports.departements[(0, exports.random)(exports.departements.length)],
            username: 'bigolo',
            password: 'bigolo'
        }];
    for (let i = 0; i < size - 1; i++) {
        result.push({
            departement: exports.departements[(0, exports.random)(exports.departements.length)],
            username: generateWord(7),
            password: generateWord(8)
        });
    }
    return result;
}
exports.generateUsers = generateUsers;
//# sourceMappingURL=seed.js.map