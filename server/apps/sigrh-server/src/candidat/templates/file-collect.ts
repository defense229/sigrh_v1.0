export function statsAll(stats: any) {
  return `<tr>
    <td>Tous</td>
    <td>${stats.all.mens}</td>
    <td>${stats.all.womens}</td>
    <td>${stats.all.womens + stats.all.mens}</td>

    <td>${stats.all.acceptedMen}</td>
    <td>${stats.all.acceptedWomen}</td>
    <td>${stats.all.accepted}</td>

    <td>${stats.all.rejectedMen}</td>
    <td>${stats.all.rejectedWomen}</td>
    <td>${stats.all.rejected}</td>
</tr>`;
}

export function statsTop(stats: any) {
  const data: any[] = Object.entries(stats).filter((stat) => stat[0] !== 'all');
  let result = '';
  for (const stat of data) {
    result += `
<tr>
    <td>${stat[0]}</td>
    <td>${stat[1].mens}</td>
    <td>${stat[1].womens}</td>
    <td>${stat[1].womens + stat[1].mens}</td>

    <td>${stat[1].acceptedMen}</td>
    <td>${stat[1].acceptedWomen}</td>
    <td>${stat[1].accepted}</td>

    <td>${stat[1].rejectedMen}</td>
    <td>${stat[1].rejectedWomen}</td>
    <td>${stat[1].rejected}</td>
</tr>`;
  }
  return result;
}

export function renderFileCollectStats(stats: any) {
  return `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      .text-center {
        text-align: center;
      }

      table {
        width: 100%;
        border-collapse: collapse;
      }

      td,
      th {
        border: 1px solid #aaa;
        padding: 5px;
      }
    </style>
  </head>
  <body>
    <h3 class="text-center">Statistiques de la phase de dépôt de dossier</h3>
    <div className="stats-table p-10">
      <table>
        <thead>
          <tr>
            <th rowspan="2">Départements</th>
            <th colspan="3" class="text-center">Candidats reçus</th>
            <th colspan="3" class="text-center">Acceptés</th>
            <th colspan="3" class="text-center">Rejetés</th>
          </tr>
          <tr>
            <th class="text-center">Homme</th>
            <th class="text-center">Femme</th>
            <th class="text-center">T</th>

            <th class="text-center">Homme</th>
            <th class="text-center">Femme</th>
            <th class="text-center">T</th>

            <th class="text-center">Homme</th>
            <th class="text-center">Femme</th>
            <th class="text-center">T</th>
          </tr>
        </thead>
        <tbody>
          ${statsTop(stats)} ${statsAll(stats)}
        </tbody>
      </table>
    </div>
  </body>
</html>
`;
}
