export function genListPdfArray(data: any) {
  let str = ``;

  str += `<thead>
  <tr>
    <th>Rang</th>
    <th>Numéro</th>
    <th>Nom et prénoms</th>
    <th>Département</th>
    <th>Genre</th>
    <th>Total</th>
    <th>Total *</th>
    <th>Moy</th>
    <th>Moy *</th>
    <th>Moy finale</th>
  </tr>
  </thead>
  <tbody>`;

  let i = 1;
  for (const item of data) {
    str += `
  <tr>
    <td>${
      i + (i === 1 ? (item.candidate.sexe === 'H' ? 'er' : 'ère') : 'ème')
    }</td>
    <td>${item.candidate.numero}</td>
    <td>${(item.candidate.nom + ' ' + item.candidate.prenom).toUpperCase()}</td>
    <td>${item.candidate.departement.label}</td>
    <td>${item.candidate.sexe}</td>
    <td>${item.optTotal.toFixed(2)}</td>
    <td>${item.total.toFixed(2)}</td>
    <td>${item.optMean.toFixed(2)}</td>
    <td>${item.mean_.toFixed(2)}</td>
    <td>${item.mean.toFixed(2)}</td>
  </tr>
    `;
    i++;
  }

  str += '</tbody>';
  return str;
}

export function genListObject(data: any) {
  let result = [];
  let i = 1;
  for (const item of data) {
    let info: any = {
      Rang:
        i + (i === 1 ? (item.candidate.sexe === 'H' ? 'er' : 'ère') : 'ème'),
      'Numéro de table': item.candidate.numero,
      'Nom et prénoms': (
        item.candidate.nom +
        ' ' +
        item.candidate.prenom
      ).toUpperCase(),
      Département: item.candidate.departement.label,
      Genre: item.candidate.sexe,
      'Langue pricipale': item.candidate.language,
      'Langue secondaire': item.candidate.optionalLanguage,
      Total: item.optTotal.toFixed(2),
      'Total avec opt': item.total.toFixed(2),
      Moyenne: item.optMean.toFixed(2),
      'Moyenne avec opt': item.mean_.toFixed(2),
      'Moyenne finale': item.mean.toFixed(2),
    };

    result.push(info);
    i++;
  }
  return result;
}
