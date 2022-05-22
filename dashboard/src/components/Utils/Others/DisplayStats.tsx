import React, { useMemo } from 'react';

type Props = {
  stats: any;
};

function DisplayStats({ stats }: Props) {
  console.log(stats);
  const H = useMemo(() => stats.H, [stats.H]);
  const F = useMemo(() => stats.F, [stats.F]);
  const results = useMemo(() => {
    const _s = { ...stats };
    delete _s.H;
    delete _s.F;
    return Object.entries(_s);
  }, [stats]);
  return (
    <div className="stats-table">
      <table>
        <thead>
          <tr>
            <th>Départements</th>
            <th>Nombre d'hommes</th>
            <th>Nombre de femmes</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {results.map((item: any, index: number) => {
            return (
              <tr key={index}>
                <td className="text-center">{item[0]}</td>
                <td className="text-center">{item[1].h}</td>
                <td className="text-center">{item[1].f}</td>
                <td className="text-center">{item[1].total}</td>
              </tr>
            );
          })}
          <tr>
            <td className="text-center">Tous les départements</td>
            <td className="text-center">{H}</td>
            <td className="text-center">{F}</td>
            <td className="text-center">{Number(H) + Number(F)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default DisplayStats;
