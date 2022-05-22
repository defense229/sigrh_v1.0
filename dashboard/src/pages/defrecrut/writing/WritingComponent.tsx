import React from 'react';

function WritingComponent({
  fields,
  scores,
}: {
  fields: any[];
  scores: any[];
}) {
  console.log(fields, scores);
  return (
    <div>
      <div className="mt-10 datatable">
        <table>
          <thead>
            <tr>
              <th>Rang</th>
              {/* <th>Nom et prénoms</th> */}
              <th>Département</th>
              <th style={{ width: '80px' }}>Genre</th>
              {fields.map((field: any) => {
                return <th key={field.id}>{field.label.slice(0, 5)}</th>;
              })}
              <th>Total</th>
              <th>Moyenne</th>
            </tr>
          </thead>
          <tbody>
            {scores.map((score: any, index: number) => {
              return (
                <tr key={index}>
                  <td style={{ textAlign: 'center' }}>
                    {index + 1}{' '}
                    {index === 0 ? (
                      <sup className="fs-10">
                        {score.candidate?.sexe === 'F' ? 'ère' : 'er'}
                      </sup>
                    ) : (
                      <sup className="fs-10">ème</sup>
                    )}
                  </td>
                  {/* <td>
                    {score.candidate?.nom} {score.candidate?.prenom}
                  </td> */}
                  <td>{score.candidate?.departement}</td>
                  <td>{score.candidate?.sexe}</td>
                  {fields.map((field: any) => {
                    return (
                      <td style={{ textAlign: 'center' }} key={field.id}>
                        {score.grades.find((s: any) => s.field === field.id)
                          ? score.grades.find((s: any) => s.field === field.id)
                              .value +
                            ' (' +
                            score.grades.find((s: any) => s.field === field.id)
                              .coef +
                            ')'
                          : ''}
                      </td>
                    );
                  })}
                  <td style={{ textAlign: 'center' }}>{score.total}</td>
                  <td style={{ textAlign: 'center' }}>
                    {score.mean.toFixed(2)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default WritingComponent;
