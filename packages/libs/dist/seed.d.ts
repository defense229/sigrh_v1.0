export declare const DF_TYPE_CANDIDAT: {
    normal: string;
    enseignant: string;
    aideSoignant: string;
};
export declare const departements: string[];
export declare const departements_prefix: string[];
export declare const random: (len: number) => number;
export declare function generateCandidat(index: number): {
    demobilise: string;
    numeroDepotDossier: string;
    numero: string;
    accepted: boolean;
    rejected: boolean;
    sportPresent: boolean;
    sportAccept: boolean;
    motif: string;
    nom: string;
    prenom: string;
    departement: string;
    dateNaissance: string;
    lieuNaissance: string;
    diplomePresente: string;
    numeroPiece: number;
};
export declare function generateCandidates(size: number): {
    demobilise: string;
    numeroDepotDossier: string;
    numero: string;
    accepted: boolean;
    rejected: boolean;
    sportPresent: boolean;
    sportAccept: boolean;
    motif: string;
    nom: string;
    prenom: string;
    departement: string;
    dateNaissance: string;
    lieuNaissance: string;
    diplomePresente: string;
    numeroPiece: number;
}[];
export declare function generateUsers(size: number): {
    departement: string;
    username: string;
    password: string;
}[];
//# sourceMappingURL=seed.d.ts.map