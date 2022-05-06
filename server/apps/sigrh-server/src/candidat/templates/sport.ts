export function statsAll(stats: any) {
  return `<tr>
    <td>Tous</td>
    <td>${stats.all.presentsMen}</td>
    <td>${stats.all.presentsWomen}</td>
    <td>${stats.all.presents}</td>

    <td>${stats.all.notPresentsMen}</td>
    <td>${stats.all.notPresentsWomen}</td>
    <td>${stats.all.notPresents}</td>

    <td>${stats.all.acceptedMen}</td>
    <td>${stats.all.acceptedWomen}</td>
    <td>${stats.all.accepted}</td>

    <td>${stats.all.notAcceptedMen}</td>
    <td>${stats.all.notAcceptedWomen}</td>
    <td>${stats.all.notAccepted}</td>
</tr>`;
}

export function statsTop(stats: any) {
  const data: any[] = Object.entries(stats).filter((stat) => stat[0] !== 'all');
  let result = '';
  for (const stat of data) {
    result += `
<tr>
    <td>${stat[0]}</td>
    <td>${stat[1].presentsMen}</td>
    <td>${stat[1].presentsWomen}</td>
    <td>${stat[1].presents}</td>

    <td>${stat[1].notPresentsMen}</td>
    <td>${stat[1].notPresentsWomen}</td>
    <td>${stat[1].notPresents}</td>

    <td>${stat[1].acceptedMen}</td>
    <td>${stat[1].acceptedWomen}</td>
    <td>${stat[1].accepted}</td>

    <td>${stat[1].notAcceptedMen}</td>
    <td>${stat[1].notAcceptedWomen}</td>
    <td>${stat[1].notAccepted}</td>
</tr>`;
  }
  return result;
}

export function renderSportStats(stats: any) {
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
    <h3 class="text-center">Statistiques de la phase sportive</h3>
    <div className="stats-table p-10">
      <table>
        <thead>
          <tr>
            <th rowspan="2">Départements</th>
            <th colspan="3" class="text-center">Présents</th>
            <th colspan="3" class="text-center">Absents</th>
            <th colspan="3" class="text-center">Retenus</th>
            <th colspan="3" class="text-center">Non retenus</th>
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
