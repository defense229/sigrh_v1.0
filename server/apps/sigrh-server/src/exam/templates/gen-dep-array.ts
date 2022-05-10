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
