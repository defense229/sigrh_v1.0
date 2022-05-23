export function genDepArray(data: any) {
  let str = '';
  for (const key in data) {
    str += `<h2>${key}</h2>`;
    for (let i = 0; i < data[key].length; i++) {
      str += `<h3>Salle ${i + 1}</h3>`;
      str += `
      </div>  
    <table>
    <thead>
    <tr>
        <th>N°</th>
        <th>Numéro de table</th>
        <th>Nom et prénoms</th>
        <th>Genre</th>
        <th>Département</th>
        <th>Observation</th>
    </tr>
    </thead>
    <tbody>`;
      for (let j = 0; j < data[key][i].length; j++) {
        str += `<tr>
        <td>${j + 1}</td>
        <td>${data[key][i][j].numero}</td>
        <td>${
          data[key][i][j].nom.toUpperCase() +
          ' ' +
          data[key][i][j].prenom.toUpperCase()
        }</td>
        <td>${data[key][i][j].sexe}</td>
        <td>${data[key][i][j].departement}</td>
        <td></td>
    </tr>`;
      }
      str += `</tbody>
    </table>`;
    }
  }

  return str;
}

export function genListArray(data: any, field: string) {
  let str = `<table>
    <thead>
    <tr>
        <th>N°</th>
        <th>Numéro de table</th>
        <th>Tag qrcode</th>
    </tr>
    </thead>
    <tbody>`;
  for (let i = 0; i < data.length; i++) {
    str += `<tr>
        <td>${i + 1}</td>
        <td>
        ${data[i].numero}
        </td>
        <td>${data[i].qrcodes[field].tag}</td>
    </tr>`;
  }
  str += `</tbody>
    </table>`;

  return str;
}

export function genCodeArray(data: any, field: string): string {
  let str = ``;
  for (let i = 0; i < data.length; i++) {
    str += `<div>
      <img src="${data[i].qrcodes[field].qrcode}" />
      <div>${data[i].qrcodes[field].tag}</div>
    </div>`;
  }

  return str;
}

export function genDepObject(data: any) {
  let result = [];
  for (const key in data) {
    for (const item of data[key]) {
      result = [
        ...result,
        ...item.map((it: any, index: number) => ({
          'N°': String(index + 1),
          nom: it.nom,
          prenom: it.prenom,
          numero_de_table: it.numero,
          departement: it.departement,
          genre: it.sexe,
        })),
        {
          'N°': '',
          nom: '',
          prenom: '',
          numero_de_table: '',
          departement: '',
          genre: '',
        },
      ];
    }
  }
  return result;
}

export function genStatsObject(data: any) {
  console.log(data);
  let result = [];
  const clone = { ...data.stats };
  delete clone.H;
  delete clone.F;
  for (const key in clone) {
    result.push({
      Départements: key,
      "Nombre d'hommes": clone[key].h,
      'Nombre de femmes': clone[key].f,
      Total: clone[key].total,
    });
  }
  result.push({
    Départements: 'Tous les départements',
    "Nombre d'hommes": data.stats.H,
    'Nombre de femmes': data.stats.F,
    Total: data.stats.H + data.stats.F,
  });
  return result;
}

export function genListObject(
  data: any,
  fields: any[],
  departement: string = '*',
) {
  console.log(data, fields);
  const values =
    departement === '*'
      ? data.values
      : data.values.filter((v: any) => v.candidate.departement === departement);
  let result = [];
  let i = 1;
  for (const item of values) {
    let info: any = {
      Rang:
        i + (i === 1 ? (item.candidate.sexe === 'H' ? 'er' : 'ère') : 'ème'),
      'Numéro de table': item.candidate.numero,
      'Nom et prénoms': (
        item.candidate.nom +
        ' ' +
        item.candidate.prenom
      ).toUpperCase(),
      Département: item.candidate.departement,
      Genre: item.candidate.sexe,
    };
    for (const field of fields) {
      info[field.label] = item.grades.find(
        (s: any) => s.field === field.id,
      ).value;
    }
    info = {
      ...info,
      Total: item.total.toFixed(2),
      Moyenne: item.mean.toFixed(2),
    };

    result.push(info);
    i++;
  }
  return result;
}

export function genStatsArray(data: any): string {
  let str = ``;

  const clone = { ...data.stats };
  delete clone.H;
  delete clone.F;
  for (const key in clone) {
    str += '<tr>';
    str += `<td>${key}</td>`;
    str += `<td>${clone[key].h}</td>`;
    str += `<td>${clone[key].f}</td>`;
    str += `<td>${clone[key].total}</td>`;
    str += '</tr>';
  }

  str += '<tr>';
  str += `<td>Tous les départements</td>`;
  str += `<td>${data.stats.H}</td>`;
  str += `<td>${data.stats.F}</td>`;
  str += `<td>${data.stats.H + data.stats.F}</td>`;
  str += '</tr>';
  return str;
}

export function genListPdfArray(
  data: any,
  fields: any,
  departement: string = '*',
) {
  const values =
    departement === '*'
      ? data.values
      : data.values.filter((v: any) => v.candidate.departement === departement);

  console.log(values, departement);
  let str = ``;

  str += `<thead>
  <tr>
    <th>Rang</th>
    <th>Numéro de table</th>
    <th>Nom et prénoms</th>
    <th>Département</th>
    <th>Genre</th>`;

  for (const f of fields) {
    str += `<th>${f.label}</th>`;
  }
  str += `
  <th>Total</th>
  <th>Moyenne</th>
</thead>
<tbody>`;

  let i = 1;
  for (const item of values) {
    str += `
  <tr>
    <td>${
      i + (i === 1 ? (item.candidate.sexe === 'H' ? 'er' : 'ère') : 'ème')
    }</td>
    <td>${item.candidate.numero}</td>
    <td>${(item.candidate.nom + ' ' + item.candidate.prenom).toUpperCase()}</td>
    <td>${item.candidate.departement}</td>
    <td>${item.candidate.sexe}</td>
    `;
    for (const field of fields) {
      str += `<td>${
        item.grades.find((s: any) => s.field === field.id).value
      }</td>`;
    }
    str += `
    <td>${item.total.toFixed(2)}</td>
    <td>${item.mean.toFixed(2)}</td>
  </tr>
    `;
    i++;
  }

  str += '</tbody>';
  return str;
}
