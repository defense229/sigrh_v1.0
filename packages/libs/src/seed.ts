export const DF_TYPE_CANDIDAT = {
    normal: 'NORMAL',
    enseignant: 'ENSEIGNANT',
    aideSoignant: 'AIDE_SOIGNANT'
};

export type DF_CANDIDAT_CATEGORIE = 'NORMAL' | 'ENSEIGNANT' | 'AIDE_SOIGNANT';

export const departements = [
    "Atacora", "Donga", "Alibori", "Borgou", "Collines",
    "Zou", "Atlantique", "Littoral", "Couffo", "Mono", "Oueme", "Plateau"
];

export const departements_prefix = departements.map(it => it.toUpperCase().substring(0, 3));

export const random = (len: number) => Math.floor(Math.random() * len);

function generateWord(size: number) {
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
    return Math.floor(Math.random() * (maxValue - minValue))
}


function generateDate() {
    const now = Date.now();
    const offset = random(365 * 24 * 3600 * 1000 * 10);
    return new Date(now - offset).toISOString();
}

function generateBool() {
    return [true, false][Math.floor(Math.random() * 2)];
}

function generateNumDepDos(index: number) {
    return '22' + departements_prefix[random(departements_prefix.length)] + index;
}

function generateNumTable(index: number) {
    return random(13) + '22' + ['M', 'F'][random(2)] + index;
}


export function generateCandidat(index: number) {
    return {
        "demobilise": ['Oui', 'Non'][random(2)],
        "numeroDepotDossier": generateNumDepDos(index),
        "numero": generateNumTable(index),
        "accepted": generateBool(),
        "rejected": generateBool(),
        "sportPresent": false,
        "sportAccept": false,
        "motif": generateWord(20),
        "nom": generateWord(10),
        "prenom": generateWord(10),
        "departement": departements[random(departements.length)],
        "dateNaissance": generateDate(),
        "lieuNaissance": generateWord(15),
        "diplomePresente": generateWord(15),
        "numeroPiece": generateNumber(11111111, 999999999) + ''
    }
}

export function generateCandidates(size: number) {
    const result = [];
    for (let i = 0; i < size; i++) {
        result.push(generateCandidat(i + 1));
    }
    return result;
}

export function generateUsers(size: number) {
    const result = [{
        departement: departements[random(departements.length)],
        username: 'bigolo',
        password: 'bigolo'
    }];

    for (let i = 0; i < size - 1; i++) {
        result.push({
            departement: departements[random(departements.length)],
            username: generateWord(7),
            password: generateWord(8)
        });
    }

    return result;
}