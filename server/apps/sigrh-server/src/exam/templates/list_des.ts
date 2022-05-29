import {
  genCodeArray,
  genListArray,
  genListPdfArray,
  genStatsArray,
} from './gen-dep-array';

export const getPdfListDes = (
  data: any,
  params: any,
  field: any,
) => `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      * {
        font-family: Arial, Helvetica, sans-serif;
        font-size: 14px;
      }
      .flex {
        display: flex;
      }

      .jcc {
        justify-content: center;
      }

      .jcb {
        justify-content: space-between;
      }

      .aic {
        align-items: center;
      }

      .bande {
        display: grid;
        grid-template-columns: 70px 70px 70px;
        margin: 5px 0;
      }

      .vert {
        background-color: green;
        height: 5px;
      }
      .jaune {
        background-color: yellow;
        height: 5px;
      }
      .rouge {
        background-color: red;
        height: 5px;
      }

      .semibold {
        font-weight: 500;
      }

      .bold {
        font-weight: bold;
      }

      .text-right {
        text-align: right;
      }

      .text-center {
        text-align: center;
      }

      .line-2 {
        line-height: 2;
      }

      .big {
        font-size: 16px;
      }

      .huge {
        font-size: 18px;
      }

      .maroon {
        color: maroon;
      }

      h1 {
        font-size: 20px;
      }
      h2 {
        font-size: 18px;
      }
      h3 {
        font-size: 16px;
      }

      table {
        width: 100%;
        border-collapse: collapse;
        margin: 20px 0;
      }

      td,
      th {
        padding: 3px;
        border: solid 1px #aaa;
        text-align: center;
      }

      .super-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        line-height: 1.4;
      }
    </style>
  </head>
  <body>
    <div class="flex jcb aic">
      <div class="flex aic" style="gap: 10px">
        <img
          width="80"
          height="80"
          src="data:image/png;base64,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"
          alt="MDN"
        />

        <div class="semibold">
          <div>MINISTERE</div>
          <div>DE LA DEFENSE NATIONALE</div>
          <div class="bande">
            <div class="vert"></div>
            <div class="jaune"></div>
            <div class="rouge"></div>
          </div>
          <div>REPUBLIQUE DU BENIN</div>
        </div>
      </div>

      <div class="text-right line-2">
        <div>01 BP 772 Cotonou</div>
        <div>Tél: 00229 21 30 02 58</div>
        <div>dopa_admin@defense.bj</div>
      </div>
    </div>
    <div>
      <div class="bold text-center big">ETAT MAJOR GENERAL</div>
      <br />
      <div class="text-center big">
        DIRECTION DE L'ORGANISATION ET DU PERSONNEL DES ARMÉES
      </div>
      <hr />
      <br />
    </div>
    <div>
      <div class="maroon huge bold text-center">
        Concours de recrutement militaire au titre de l'année 2022
      </div>
      <br />
    </div>

    <div class="super-grid">
      <div><b>Département: </b> ${params.departement}</div>
      <div><b>Centre: </b> ${params.center}</div>
      <div><b>Salle: </b> ${Number(params.room) + 1}</div>
      <div><b>Matière: </b> ${field.label}</div>
    </div>

    ${genListArray(data, field.id)}
    
  </body>
</html>
`;

export const getPdfCodes = (data: any, field: string) => `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        * {
          margin: 0;
          padding: 0;
        }
        body {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            font-size: 10px;
        }

        body > div {
            height: 30mm;
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 2px;
            flex-direction: column;
        }

        img {
            width: 70px;
            height: 70px;
        }
    </style>
</head>
<body>
    ${genCodeArray(data, field)}
</body>
</html>`;

export const getPdfStats = (data: any) => `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      * {
        font-family: Arial, Helvetica, sans-serif;
        font-size: 14px;
      }
      .flex {
        display: flex;
      }

      .jcc {
        justify-content: center;
      }

      .jcb {
        justify-content: space-between;
      }

      .aic {
        align-items: center;
      }

      .bande {
        display: grid;
        grid-template-columns: 70px 70px 70px;
        margin: 5px 0;
      }

      .vert {
        background-color: green;
        height: 5px;
      }
      .jaune {
        background-color: yellow;
        height: 5px;
      }
      .rouge {
        background-color: red;
        height: 5px;
      }

      .semibold {
        font-weight: 500;
      }

      .bold {
        font-weight: bold;
      }

      .text-right {
        text-align: right;
      }

      .text-center {
        text-align: center;
      }

      .line-2 {
        line-height: 2;
      }

      .big {
        font-size: 16px;
      }

      .huge {
        font-size: 18px;
      }

      .maroon {
        color: maroon;
      }

      h1 {
        font-size: 20px;
      }
      h2 {
        font-size: 18px;
      }
      h3 {
        font-size: 16px;
      }

      table {
        width: 100%;
        border-collapse: collapse;
        margin: 20px 0;
      }

      td,
      th {
        padding: 3px;
        border: solid 1px #aaa;
        text-align: center;
      }

      .super-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        line-height: 1.4;
      }
    </style>
  </head>
  <body>
    <div class="flex jcb aic">
      <div class="flex aic" style="gap: 10px">
        <img
          width="80"
          height="80"
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHkAAAB9CAYAAACGa8xfAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAFiJSURBVHgB7f0FfFXX0j8Oz97HPe5GAiEJgQAx3N29BQqFtlCsfu+t33Irt3Jrty0FWlwKRYq7WyAhCRCSEHeX4277nbUPoWgJlP6e533+GT6Hc3LO1jVrzXznO7PWBmiTNmmTNmmTNmmTNmmTNmmTNmmTNmmTNmmTNmmTNmmTNmmTNvl/LBT8dUL7+3v3EfKF47hcTj+KojrzuDwhntHGOJ0G/L3OardeNhjN581m22GVSlUB//eE4+/t3ZMn4A0SioRDOTQnAu/fnQJKwDBOcDqZEofDft1kMqdpdIbVer2+Af4C+UuU7OHhEeOukC0TCAS9UcE8p9PpOhn1++loigaKpsBut4PFYi2rrW9M/qtu8n9KQkKCXpGKRd/weXyKAfzHuF4tQj7TNE1+AZvN3qzV6b+vqan7HH8ywxMULjxBcUNRyMQfi8XixVwuFwR8AVhtVvZm8CZQoTayGfnPQdMcAXYAiigee3WYUCgM+r+mZMbpSMIOTlmsFiAd3W53WMgIxubgcTg0zcM2gpvtxOPwPLkczlKpWDjLYDK9Wl1dvx+ekDxZJculn0sk4vlEcdh7weFwgN2BI9VswdFqW43vO5yUXelw0BbsBO58PtUOx3Oow8GompqarsD/MbE74CudzljCUA6t08aU2ZzOcrRcdj6fFvO5vHZ2HvdVgUDYnWwrFAjZUc3nCyI4HO4Wp79jQG1tUwY8AXli5trX17eHh0J2iMPluJHDioRCMFvMYDQaHXqjaX59feMaaJM7BN1asEQsWCWVSIaR0UxzOGDFUU/EYDTuLS2rHA9PQGh4MkKhmXnPpWCX73WZJ7vDbLW+0Kbg+4tSqazU6U1PWazWCw6n444Rh4NknLe3ex94AvJElOzv79mRz+eNavmb4Csn+h6H3XGxurpuE7TJA0WNolVp378dkBEhplsqkv4dnoA8ESVzge9D0fStjoihgWs0M846/NMObfKHgg1UcjfyJsLlcfzhCcgTAV54cZI7nTtB0zai6CAUUVVVlQmekBAEj67Ai8NxiDlOLp/hMrTRaKs1mUwEmVvgyQnl5eUlRcQYwPApN7udsuE5LU6n3aBWm6vgCXZeHo8XTAaFDSOROy6AAgk8AXkySuZwJLfHwOx32CsRJSY7HIZE/PMsPJ5QCoUgXCZxn8zj87ojmRKB5/HH+FqO/YiLxgOjDg7ZzIBWQ2symtNNBuO3tY2NF/BLJzyGyOVyD5lEtEgmlU7k8niBNEWJ8dgiBwkVMPRzMozN24tpQhKj1GG359msluN6k+2cVqtVwuMJJRUJFpAPzD2/UCJwgWMG/oQ8EXTt7+8z0U0u/83V4HeK2WJNLyou7Qmt7Pk4emQCmo7lCXnTeDz+dPT1vnd3IHIeEqIRISGak4+gxYsCmoujwWQHQ72xwlhn/KKusXkFbuJozXkxtvf3DHD7UewhHC9Q8NkTMiZsW5UrHCQ+koDJlrj/drG7JA1DxM06o/kAutlyaKUEBvrNVshl6wk5dLuQc5hNppLissr28L9Dyd79xELRGYFQAHdfLBEMB44iipyDsXDtAw7B8fX1SBQLJVMEAv5kDCfCiGIJ4rzHT3GQPBC4SBazxQJcPxrkUTLgS/nAEeC5ORRpITA1WUBfqvm+F1Crlh/Oz3rAeaHn1J4ip8gw36y2/V0eJg8UuPHQBuC5rXbg8DigLdeD9roeeHYexrICFmsYTcZ7bwA7Hrl3dFPoOUwXrQ7HRq1Wf1aj0ZTAA9vNd4ZcKv2Wx+N63/0bcXd4nMsVVbVJ8CfliShZoVC083CTF+GN0kJU9P0EqUuV1Wr9wWq3VTN2xsLjczyFQpEbl8sLpSlmjEAodCcsGfK6LgLFcq97pbARSUOzv9ssIOksAoGXABxmB3DFXGSY0EUIOahsDlAMMml4d911djO/1jj33zuytt5+rAFzwoQOme8/+FLOG7SAK28xFnajHWz44uIx7HhcDo9mW6k5TcWOaqFAhJ3PjvGs9Z7rI6OdkBo3QSchgZw2uz0bO+oJvB+l3WZTWew2LVooLwG6H7yXZ8g+dwuxGOT+LWbrb1W1dZPhT8oTGsn+Yj6HyuDyuFHoh5G14f3h9iKR6L4jvkUIieJygXcKIQxIA5rMJpB1FICkkwIJBOwUVozJDTYcTRRwRFwykGEUjkY/Pgf0DicITI7y1Fx90oqjWbdo08QZnfvFUvSn/cPce5mwc5wwWaDOgqbf5mQ7isBNwCIfp80BTjy+w+oAZYoGOFYOIAXLKuG+14idkFibBwmxQGSUPkiI5SLHJp3EaLA8W9fQsAH+pDyREKq2ttaIPXYNuUAEJOxN3G1mW4QoiU1KWC3szZCbJn+zvtXpZPdrSWjcvR8Z6WR7Kd8JoyLkQOMoI6OOJ8bRiyMZODRYNVaguDRcQdzljUpuJ+KBt0IQ6ufFJNx+vKRmu35wgKx7tskGBzUmUKEyuQTOBohB5I0WAhUbpLcBFzsNhecR+YhA1lnquk7sOA9SZMs9tFC6VmyLW/eKo5+Elw8Ssg/Zjt3f7tRY7fbd8ATkiXHXeqN5NZ/PfxFHUwSrNHwRpXDwRd8GnFzJitt68l2Dgfi2+3UQDDNcDYfH7R8jhVj0wel4HJEdAQpuzhVgB7CggnE002o05VxX/8VrAgYblwdc+e3HCwsQv+0t4wt7ocKiiB+3OKAOfboJDybBURRKceAyD02+yQFiixOKEefGuvMhBwe4ATuaSCgCTJWyLuJ2abnGB3Xyu6UlPiZtcnvndthsPyMjpoUnIE9MySSEkEmEP1KU4AsMbViYTW6W3DRRHHmR0Xg3Ur5bWkxgy82TGyd+C3OxrlGEDRsd4AMSVEw8KkTB58IR9J1OHG1dsF3zxTwcPQ7oLuC5zkcS2GiCTXb7rQZbOLqzu6ec34+9RtxXgcdSeIsh+DbFqHEUD5cKWFNXy3EAbbDDKHcRmL24kFmF10FCRHQ5ZrvFdR7kgogLup8Vup+Q/Z14r+R+797H7nDkKbX6b+AJyRPNQlXXNnzj7+NFfO7neNPssYmiWkZ2i5Jvf7XI7YxPy+eWvwU3wRbp7WFefPCUoSLtTujK47LBRbTFBtUaM/RRCCEMvz+Jx8UkJpQbbdDIWMHT4ihX6h2ZLefiMLYgIZf2NlkdrP92R2USi3M7GeFkTS52MHQB/gjCRvJp1pwP7OQGqaW1YCOm92YnJIpy3QvFUrot93XPPRJTfp/7u10wJVtkd1onYGKnBp6QPFElozC1DU3fBPh6q4UiMqqpO6D2g27soUK5QgrSUYI9BKDHWJhzk0W1oiLCcNT5mDEMlzIQhmFPMgLzg5i/1glpAnmBo7LuPHIwt67lcHbaqWzSWZtFFodXiI8Y6UOeqzOS68PftegCDuD+Er0TOuH+NvxeiMoOQR/viW5CyGXYTnf3vQFbGACPLei/r2t1xv4YdqngCQoH/gLRGYxXhHxhKVrYXmhqpfAnhZhFYrKJood3cYMwVIwQG1ws5IEEX+4SHqscDY7cCtT9GRECMDTfXB7NAh2znTlekVp9quV46QXNunBfydUQX+lUmYhHmDPIRPC1w2iBNLQE9ajgRjxgk4QLBRQDRYjcc9A/N+FvHjj6i2oM6JdpcFGRRNl/iqtw+WS7fZfZYn8a/XATPGH50+h629IY/v2+r21o2KxU6zthqvFrRNx1Tubx+7j9tlCFx/nd/LHMFwIrYs4DPUUQ6iMBLaJtYqqJgu02NLlGh8WhMxfEz/cX335MiUBQ5S7hc9mQxWqD9miSxwrxWOgeq+XoDhCt27HTEGRNewtZM1yCkeFOjJGbbl6CC0k/FnvagjcwbLan6I3G2ZVVtZMaGxvr7rftqaUD/pTF/VM7H/spYYjOyJB6pPPbpk7lcAflewptIn690qKf88FVDUVplQjI3vD19f0cjVEyxtB90cwO49B0B8xaiVn/1YpQ/WZu2hVD2n5vVDKyadoJLW6Pj4h6oJ8UHOifs2guS5JQXEog9JWu5zskr/R8xveVi5uuppBtxQK6EyIlbqrRCsXY/ZQ4GmXE3GK3t2AYxpehWcYOZDM5XFk1lzMFOwF2+JG+CZpaK2wfZxi7w+lU4+uSA62L2Wo4oVLp8+Am5bt2aZjQw81XIeQ5+TWo8blLy9haL7u/acm2bTE/TpuWa4XHkMdW8m//TvKMjZatrG20fHL058SwmPDK1/hi3yih1FuICjFUnnQrKzlkrkY8IyX1amqtsxDRZ9lL3wsTMjIyFD3k4q56CsLKbE4JzeF0xAYIRYVL0LagJ6WQLAb057QAFYhsFOWNGqVIQykNd/pCp/POhuai6R2CAEzdbIBKGY9NUzhsDtppcSZwFPx9iTPi5l3+5dpvfB6HcMKs8gggMmL4ZMUwDONToK0UWLXYgRBsET6cR1gpVDTZDpUDeCxyTFc863Ra8b0Bj2PEcY1BLlhxUwvuYUTrVYvXX+JgmIIkHi0rtTgv1AOU/vx2SEy7UPolhAJ9JEIqBC2OHtk8RuLm014gkfoyDgtfr6KVefv8TpQV2V6LinKb21DHEIv5BTyGPLKSz6xNmmG3OvJMZlKDR0nbhchWtA+0c3KLzHRtkwG2HcoHoVuUbGxyU+dR/WWdW/bzcuf0qm1gmhYNUf0sbPQd6cOjftI7wKxyOj+dmlO8+OZmVNqWnj0tFttz4SG8ScgKMtfyzDeQnvz+1f/UUlwu//2sCj2vf4z7HbH37dLiFOKxl5TpcfQTv+xgmnCHM6C1/IAKPk1+tzkcjTRu3BGBWrCThqN6K9Q6GOAh20UTYkWEyiQKRcvBsl7Yl3hSHhjxHh06B1FuergftezDxQG9uVznsHZBPP/qOlud08HbVlZp+37aWxkacp61MWF+HhzuZneaHoSmvaLKZB3o7UGN9/eiZ0lvJRIp9rr//nUxaCwB0CmoDDp3EHr17i56ykMhmKDwlgmMWs3xYyvjQyRiOqZOQ5VMWpJWAK2UR/bJbnJqbGJXXkZVszaNT+t8GusbeVkFZrquyQ594sXw+lwvsFuaoW+ChL1wgkvIiwwGtLj5U9+9VsOlmC4i7CESmhKJafp1ctylS5fSP74X+98bxZoTFbWm5602uzuOE4+qBnPvsADOR6veC3I3mAwJ2RWG/DM5KpLzI4MLmJsv8tmOSrKiUkhc7CXkgjsqi4f+lS/neWLk3h5HX3PLfeSabTm71WZYjRe3ARmZOimXHfXEVJubLWDDdwcCLgZHNst3cCiW2qxPaSQ8/OdfvuL77Kev+L3r48m8cCXPEOIup2SFFeYOEqnto5TrmpyUzT3ZxIKI4gyQU/QgOd4/n6I8BFwnR6Vnjt00IGzb2B2uappuHR0Q5NEIS2Z6gIcbB2oa7XDxmk5gUFVCXbP5dS7XUdwhlHtQzqMC4RHkkUeyWk1tsfpST/eME9E8NGVyKQ2Y54WETiI4l2EEKSLbfy/mYEPT9oJSZzZGOOWYKSjHztqOw5peYNZ2dfzTm6FfcpIkAjBnyHEndz34VpCPZMn1QguVX8EFn5AEuHK1APw8zZCZa4LYuO6vLZomSv9ha86CrSk1LxsttgldQuV31yqwYsaRp0O60oxgyoKUJ4FexmbjmZqsZoiQy9tbvESicg/RMi4xvxobaxUImeFE1ou8s5w1a6oR0eMI56Mftmgt0HClqcHYYPyRJ3DsFHl1W1lSd6O9u84Aah12BEE0JCTo4PipHHh3gWegzc7s2fpFfB/LGlWmg8MYHQwltjDM3ik3qgoPOQO86ptAbbU4V+K5/LFtApHuj5s8VOFNYu+Vv6rghcluCCoRPKI1EWDmMyKYj9wAw1WqmWKlyp4JjyCPnKA4+F2y3NOTWeWugKmHLmhg/hQPyC22QLMKCXytHeJjRBDsz4NLWY43G76oWYWOrSftpNpxheDH8eUl0lWONCHFdJXS1JgGO6Tpw3kL6jpSr0aFc2eXVlthSL8I8Ok4HelJGWTmKKF9zGB4klK//L/gPes5oKUyeFKSm5MDPToTTITNaciCEwe3QoAPF347qisd3df9/aavlDwFh14h5YBZ6XD+CiKOBbzpSHOJ7QTDcSqtTk6m32J+YViEIt3fBzruOaGDrtFC2H1CC/OmukM9WslreRZI7iLTFpbYZg1blL73Ua7vkUfyqJdTtdjZnsrc1oN+caoHmwZDf4Q9jQdmvM/zGQZWye52xzS+QDQfud12ehpWOBxUHcdH0cHpMEtM1cacJptjtNdihf5Yim7na0Pc2+kMDujfqx3Y3SaDCZMDqoYMNPvuEBQUBE9SaJkMfAMDgSOTw5OSpqZGqC3bA3yBDNy8o2D4qNFA6y6AyeJsp9KZNxUPEy4LTLfGaDWOCXyGThbHBw42FTYdFXJtQgHFeUXGoTo37XSclH/EBKu0TvBEUx2InWT2BDdE+GgCg/hovnnGzGzbrJGPqGAij4Wud32d1GVgL2qyCgGIweCEy9km6NVVjH4SwNvdxa9ExIniaz/sCXoVL8cn0h9blIpTeAe2K7l+4mhF9cW/hXu6L/TzhKWf9/IW55Vg7GmLg1Cv8aDXkAZLyzUZtPtVxtgeeKh+8L9cCCaorbjxLz6PH2m2GEYGhPR0Y7jtoaxhIzw1xAoDk5jFdYOdvbOLHM875MKfg2KGVEkUAZPxXvegU84x5VVHdO1YO0giqsVjYSZMTENhuRVCAniwYa8Gpg2XI+lDiSPbcQhA/X+jZDvHoTKbKdhzSgszRrvB0L6BkF9qAIXYDMlxLs6Bi6R+QCQf7NIBnRx2K3mBuqkMfbWlq0XD/VYvtj6/+6QZnhobCu3jx0M4PxjjThtUFWecNDVlfBvkx0nCG5NbTGoQiNzgf7PIqDKQySuCjGYmra5ImY7JlE/8QuKEk2csBMaYAennT2LWytFVq7cdD5bQ35oMzXKRzAM8/dtNZStKImKB3/AliymkqOBurKnWQUi79vD0qGrIKzGy2bGwQKEBHkMei9Z8fWZo/+AAenpcRxEQ8FWr8oDQ2Ak4iglZkAy0vRGcos6YGQrEoFECZTfOQlNtAZj0avDw9POIClYmp13TwJypYUD7PIVhjqvy1GLSQkXhxU3Xb9R/3D1GMCIwwMuvQWkHqUcUovMnQ7Przp8BaVIPjMDvrGAhrNemXw9BZPtQTGvee66rWQVQXFoJIUF+d3yvrL2KgX0Z5q4zu6dmGUY0N2tz5W5eeJvtfUi47+SHQjDu4jRXYjrWKUpMjEtQaim+urGMwhdLjQrEbqgII34Wg1OIlAG2W2R0Z2gyICYzFUFoABePwcP9gTsqzmPNpmP1NngEeWQlr1wZzwsQcj5C/+vJ51HSrEITcsd2qKhsQgYgBGyUB1h4SCaJo0GjM0FV4QWkCOpBCmXAcerBPXQAT+rVCYK8bcD3GYY35MfaO526BjRN1U1W9bVtcVHcGSlXjBDYvjdYqRAgmUskWaCpMgU3xeQ+X4IN8vulk++oB1Sa6FXliJLJFBRXtcqDlMzFEXXhciF8suwIxpVm6BAegLQpDXmFlfDFj3thy4Fr8PzT/UEiEd2xn6r+BpgMGmhqrAejXgldOoo4tU3OHz19w8ZZjGrgC5FH44chG8eAh3cQSAJGCYzKEkrizMZ2aQADMmqa5kqQ+Q8CM6cdqDQUmJxeUFVaBPrmQrBbNWjRGdBoKSuGoAatkVey8WDVDXgEeeTh8eKLGaQXTTm5LjleKmbSlWoHdIl0IECoBLOhGprreNhIdlSOJ2aK0GQrVKDC8OPiNSOMH8xAZQG6odDBIPAeDDrkhs2GXLbUparoylYMXxRgg/oAb67d0I7PlXGrEYT5g9Xsy567qWgbiGQ+YDQ6wDt8NHgFkblieMxrP2Pqzwxu/j3BIyjxDoXXF+zA+FYJ8sDh4Bf+x+595oQEOHaxAkMiB7z97y1sOBUU4IuZLj7Mm5YMcvGdPLUTM1FGdSHIsJNLRZXADyPZLCBMSWF+xoEzbl7BvnptXZRQ7I6gDE0yzwk1ZVdA5MwCjsABB85q4MWnCqG0WgCFlysxFLcDn9YDQekBHsjBI5JpVDHQrHHi8TkHtmQIpy1devqR670f2wYiB23chz55dH8JkJKutGIced48CPJxpdu43EYg1C6p6/Ny50OHUD7bePn5JRCNI8tJeyKvLGD0qoYSnlDMqC0NCydITusucHsMq6y3w+XrJugYZQYOTwEyzw7sOT3Cnwaf0B63rsGBCfvKK/9FxiESAjv0AW1TIZRfWQFh3Rfd2kbm1wf3Sb7vPbQUJJBCBIfDCnVXP4Lp/YKhCLnv/7w/E4wGEyY8bPDevz6GvsiyVWf9DCHdXwKe4GZiDa2JRxC6J0se6DD7u/ekDgb3UHBTKvad++ADGHh606T5QqniWw63WsNDBp1m9GDVlUFJvRaG9JTA4hke7GF8PSyoVgtLGBmMAApU7sGzWhjeWwrtMD7edUxL3Ilp6dJLj1XQ/9hZKDQesqkj5ahMGipqbYSGg9BAHigw/CQvqdj1fi5TD6VVVvj1sA7q1SLoGe8G7X0qoaLoEuRnX1Y1NlYsVDWVjJk497SamgaOuiZr0J7jWu6ciR5gpCPBI3ggiNBUG5X5wDRuRMX+Pj9bWXEMvGA3UMbrIJR4AYP+S27ZASadq16PZIjMKsIb3JsAIwUB67cegZpaZLDMaqhIew9EjkyIc98PTuURdDUGkOMNHDt7FWb2vALK3A+BYzgOlddXs8mSnftOQVZOIXj4xYFKaQavgFhUnBSOXdBHLF0KTkL66IzlG5trK8bqG7K/27//FPCt16B9oAFiO7rDnjNOFkHvwY6B7B7IsN9IsM28PUnBIkCf7mLEBhQQJnFkXzn+LfGAx5Q/VPLB70YKDi0fMGDbl93jV3/e8Q72QCzjDK5rABPpfdWIAw6d00NOsauMtrDCAiS8ItItSgTeHlwYO7obRHXpAnKfcPhhswp6dBEYgrztHzjMVtnI50/ltxw3OIBrmDvRDbYf1oCYZ4Syq+sRsDWArextcONcAVXel+zIa66+BlT9MiAYydZ8EJoqzgBXsw1DDTOUXHyT9dPKkp3gZtkIDXlr71E08behQd4w4/VfYNWWc6C3+6PiGTSLdugXcR1OnctEt2AATfk2aOdtAgHPgcrgQqMpEJ5/cyMcPlcO0ZFh0FSdiZbMAsqGIiiutMKkYTJ1yznGvZhhdKj0181mS8GwZOEJDbbJ6XQbYo3OMHpMMoS184F+CWJQSF34oqgCIxCtq9027FVDExJMOYVm/M7pNFuZ5KPfdwu4/R52fpcctPuH+OQja4b1gsdVskdw8GepBZxTsZF0Oli4NRs+jvtXy29VdUyeSm3/B6Exe2KMPDBJguiai3yrjWW/CFX4zfpmHNEUXMtHc8QTw7VcFcjcvOD1hXEIhLiSUH/qnYhQ0LQck/DX5zN0A0hjDemFuWGNETokLYLmG1+DUVMLSOmBpf4A1BfuBGvxGzgc1WjeGBBhz6/NeBek/GZUBJpoOg9Kr64DY8m3SEggcq5eB9rGnHvub1C/BIgMEqLrUMDy/Q64VqEAM27vpzBBXfZP8OKChdAjOIutQmnUcmHLBT/YdMIJvp4SeGZCV8xjI0nh3wUctDdI5V5I7QrhWIo+fNvX8bcSM+V1zeqIEG5sgB81qGusB4wZkwiNSgfm241Qp+SjxXCylnDzPjXLMxjMTra0aVgvKfh7c2FAopQgcHVdnWOwycH3Yttpfueorf+JO+K0GSuddsclAxV5ftvXPQMfS8lms7p03vNjLcX1PsT0SQUCxz+P/5zwA/pcSmQ1H/Xx5rygQZxALpKYFb3JCadSDRDXUYi9k4bXnvVE04O5Q1QC31IKypoCJPxxB1Eg7DwnBq5Q5o/x8P6Pl0RfLzrQ4/rTCYdKZoyRzapFYt7NMwDDsE6IpMU4Ou3I+FC3XqrC74FmkDPWAjQ048WQiRO0HQEKg2iVAR8PpBcbN4MHhnRuaH98EMQw1vsXXDw3fSAeUwxff/Q6iCO/gN3XEiHlqhFKCi5DdvoRKCjTw9aTXLhu/hvMXfglfPLGKARcVmTnuroaEEM78uK49QItRrGRCL76deNduLEvqeDUmu5Xpd6ivJAA+oNj6UKqoCEY89WIzs1VUF+WB3xHPWuJIkL4MHOsG3QM40NZlQ1uFFmhEtuUdADCgGEU4yGV0vHjX03N2vVN17DErpwjCOKGpeeYoM+gERAeKFRbCE34OEru//Sv3+ddOfNeaGQyjB8/EtNzpFzW9sLJtd0HglwSrFbBeTSDTekIkqLbCyC30AKYXoT1e9RQjhdJYlylTgxdE3oCJQiA/okKOHc6HTLScmBMfzkcu8xFtOwpHNpbGOvpDrHn03WhChlH6O0tBT23r7G6Hq7eHRqxrJoHg/4eEagvBWL0Y1q9y48ZDAy6DgbPS+qWjWA0PbwYJS4mFNKu3ABSAjR8QBeYv/hjOFXQDTbsa4KKOgu8+2MzxPRGBc8cByGB3pCeVYHZtvA7jqG2+DH1TcwRvnt35Kx5GBHYZdmFxg7Ix8d16yQIa8L0odVOQ1SwCVauOgtSjhLiu/iCd1AXcPeJxEHiYF3F5v0avCcuVCOpHxclxMyTHcpqLDjynUeQFg4gg6tdCP/D0ipzSGK3YFi4+Dmoa3DkNpZe7Trr3YwHTUH6Y3SNZoK00pdntggUQkHse05RDF7ANYG/J/3P4QsvDsDfllQc69EP/YUXKXPujuZKhFzrwqddGOH4RT2GVzQ0NiJKRZ8nkcVA1z4CEDJliErSYFwvHHHcMDiTVsiOfpmEgma1Hbr3nARpqZeeLWiITvDy/KWr+13RPFsXSbl6KEkaueNodVPQbMpOpmfAXUFWOqBAb3i4ki9fLYTk7tG4rxP2HUuHqrydMDa+AC6c4YPNyYNBiQLQlm2A/67Uw4ihAyEpLhTe+SIDxo/syRIZZkMz1BSfpppLDz7To9+YTQGh2uEpF3MhMlQASo0DMvP5MCsG4OlBJsyGmWDu7NHQpMWeaReDtrYIvDD0qqhFZE3xYOYYBRuZyJD1cldwwISjmigfv9rWZ07qmmOW+M71KsMsby8F5sp7gdhUo6kqyHhm/MsX/3B5rFah66qyqq8bagrO+/r5gw65apuD6b32m66upSMArN0xzZhy1cRe3MZ9LhebkmlkG93HkwZfWQXI5QpQ1pdCeWkJNBpDweG9EHhuicCz18LLszxZkEGmvJBjUIwRQiISPhg9JOQlxtG6wsWqeobNzRIpKm9d3RWp7Phl10Uoq9bAwr9/DoLad2Bk1GnQommYNGkM/Ps/yxHx8qBnh2oY6LMcdm/6Byp4JwjR/5xPzWaPYdLXQZdYX+g9ZEoqTyiKoZwG1qqVYUaNpAdnjsA8tA1DQb+nQCecgOygCBpry0CrrsYYXAgeEjWLpNfvVrM58poGGxxN0bPtXFxpQSqTLLDDVhwhl83tp9JgbG4TogtD7FNTtAQV/NAFdVql5Jlvn1fZzcZ9AqEERvZHkoPr5LrRvHjyW+YNE6bBTEBGMpmL5OXmMg5dY4Qwoo8rnqQYE8jd3ZC+k7DxaGVRWnpJXkaOkZsEVs95YJf0RXPuC6Eh/kBLIqFZL9HTHCbWamoQ2+2ti/II+GoB0FJR6zKoF9JyobTeAjIhmuWZIujorwNSeh0Z4QUDhs+EqROHgV/7IazPl4ntMDmpBib2BtDobbB842nELBYQS30RYeeB1aILt1qMch3EWCTyIPzeE3PMUWBTTAKz+3PQ0OQ0luZfPNJYmavh8vggFCtAwPmdiiYdnYBVEQJZOaJtCb6T128YI+uMDvaGbpRYBsRhtBITHQo2k8pu1xdtb819tjpOdjDOhrLyGiivNmLca2do2s5Sa/GdRJQW04TdMI9cgqh4UDKiYr0TNmL2hIzOTYgaTZjM4PDdWCaKdBSb2bKl8vrZAQVZx5ebTXa7Q9oXpO3mQ3j881DaGLwq7ej2TtUFaTMLixtOhsROadX1ebpTGFe6Pvv5PFzJZBTnF5bCmn8/BfOf7g0CilgMDG5pARzM7gLJiYmInoXQsesUKGmQgp2RIieAyXs/B3z93mQYP6wLlFbUggDjc4ewC1QWZrxZmH16bH5B85hmpm9ZwtBXwOY2ieWim+qKlcXXj486lPHzKA5fWM9BJfP5CMA4UjibbsDow4z5dyNcQlbQXcaB9gjE6tEfi4QcSEQX6CZx+St0yYXEQtzIq8EOZtaPermoVSsrtJrx4tA8/uih7eH80TRClJ8et+RKLbxECsKhWSSgMWyyA0HFeSUWCPTlIfQXk7ouGDMACROPfhimiNnLJIV3Trvt+ri/ZTQtXZqxRCJRDMSMTJS7dzuoKb2sK7ue+t20tzLQx2T8snbt2iiRxHuQ3XMUmE0dbyoHWN+m57rmIZO8BYPQQctxMW1OHNE67s2yIDS1Rq5L4UJpyB33Q/zpczNHw83F4iA0+SPIO/seXK4KBEVwBzTTfMQSzdC3Vzd44+0usOzDqdBccQoTMc/gyObCU+P7/z7jQ9SRGfTMjltFdqe3TFtDgf1DicIXGnGUNzdUfj3suUNsBczQXfYifIskn0nnSOqWBU6bksUku45rWTOfds2E2TwRZBeZ2RSuVs+wqxio9PQOi4l5e9AAb7DzfcSMa2mWhwKPVin5wKpRoQ3NMC936y7Q66zQPUbxXcvBNTrIxgscSkzaYKTqruSaIbGzCE6m6lkkHNUpAWyyXmgGja4icovZpNRVXiX7Emao2zcp7/pFdP6sqbbYUF+ZP2vS6xfvCWhlAYPw/0HwpOX36SyIA8h0mLg3YPvGrTB1hBg++HoXmmAzeHooQOKTCHvOaZHbXnIr0XH7/ndLTXXxcovRUI/p8xXK+oqPNU1VJ1p+Mxl1F2QKz1FW0h5ITpMsnEC1CdbtrIYxA2Vs5+yFPprQwIRzkIq59rJ6YIv2nns3I3PdR7H7L6Zmj6lQqfj1FZM+AfjtXXhIdf9DzXU6Zp3c3L0ORcV2TNBiIIhQvkwp1x9s+R3BThkJP+oaHWzIci3fxMbNecUIPEIE4BAT101hg7lm52PGZu+0l680tuw//rVLu5yMw2Q2qHYLKUfFwy74r5TNuzPAarWz1Rj/fHU8fPvhXFRsD0xMOGDviTzQGFoH6GagldI3VR40G/VamssvmvxG5qWW3yyqms02s8liNevZvxmuJzCCcJb52nNCiy7Ozro9ndGJkYaDzJrU2RjTLcLI4qQ21DZYwEvuhIB2Xd4+tn7c4oddz0OVrBYGzDM6FNFlN05gWIDhkJL68vYib4fVqbmE5oVo5tdDGpbLJrMcFiH5zkcin+Eo2O1M+iY0ufoyU3PNx3edgtE2Vr0kkrr3sVBUb/gfErPFCoE+Qti35iV4akI/kEpcxQ/hYQHw1fvPwKdvToTrN4pbdSxkn5BuD37F5rDvaaos3XP7b6OXpJRrmus/saHLsZhdEy2d3AAIRyQ+ZZgc6QcOXEUgu3YnsoP4OT3XrLebJLcSE35C+WGLhc6c1E8Dew+kgMIz6INtn8Ur/uh6/tBcb/ouWe7mE/KWSCyA1Dzkm7vKD7mrhSu/ht/TmTa7Uz97vAK5Zi1MGa5gudejKTp4doI75lEDEchIwI4hhFZZra8rz58zbtHp7LvPM/yFo2fxbSj8D4oQ2ZSJYwY+8PeO7UPYV2tk2usXyZJWD1xoramx+ksOh9NR5lY50zuwE6LwCAQSwI5cwl9PH+0GBMwacDRHhogsJ844byl5/JsXdGc29nwJ232v01zvGRA8xEunrMZzZbz3oPP94UgO8Q3/1tM3PJjSXoKEWOnhvHzjnIF35TOdwDWS6pDe3V3AqgqTFRW1SCNSQlL6w26jbiiFxprit8YtOnUG/oelrqIc1IWtrkv/S4R0AmdB/ZzmuuIzNosBrZ0bOCT9WKYLoQHkI3glZEoHfDEUZZEH2O9o8/6zLqbkFTIznxkttJs05eATHPXG7pVDOj/ofA9U8uE1w8d7+IbN0StvwLUbmhpU3OuT/p51z1LFmAr2IswWCQP2ntRCZZ0N/vacJzhkQ/Di8d1ug/qK7M+Gzdm/DFoh25bG/OlZkPcTh8UC1998DXiXzkPZm69AY2Y6/BVC5jOReWEP244MltrK8lnKxgrWB9glSdC7RyTSmjyWYdpyQIPEkhqq62w+aq3tnjYZujDtyNV86+vnzyJNqvBBKjhoN5m6dL9z3ddcb/hPF4mbR9ByqUxKbVy7C0b2kX+V8HTafUtO5GJmTNeOUmRq7EBSaSIhhYyQGKyiWFbBlUWXt6bXpCyFVop/uOyTI8u7fDJ8YVaD9uBeurq6BJ6ENNfVAXP+DEuD8puboPgfr4Cx/yB27tSflYa6hlsH6RLl86wqqKwctsPhh+03YfHRypTtgbNFYvlWuUdgsFPUBZMp5ZhU4SA3b4PEWBEgVPB2MBwSct0zwIxm4eZAb/OCE8dOxvTtmxRutRqmA6T9cPd291VygF+HoZ7+4f6q6lQI8uOmlaTWLL/fdsfXJ3l6utMDvt2I8WR3CSYlrGhmMFBF80NmAtZX5WwpyTq06OXXWhe0H/4psVOgNz2lxEyRUd8gGzqS8Z04AZ6EuOn1cKO0CAQ11eBA1iTg+QUQMHQEPAmpuXKFgR9Wus4jh64CAT304EsjT436/tBD77vX1LUpB5dXjo/tPfmCu8xdRGquf9mvZrN3hFQS46AJ9BVNwk3P370vmn3lgR8S3jFrSnZ7KhKhWSB7BwHwMuquCOW+ShaIpM9fulwIwdIKJthf/OqQ97LvWRuTzJkN8TH/QFOMz8wxbmy9NX5mY2NwakDbVJGbl3bgnYYbnFaVkWZs6bE0IpR6V2dgEOhy3c+vTh7YyCkZz/X6fR0zEmdXN1ayS0CFB0Zg5uj+VtGOOKWytoKdshjmH+5aOQiPE7tmC2QveQG8pkyHkGkzHngtzE2WobXC9/GBgz8mfcanqQ1NGsYU256eLB+njDvWpfu4ofMyH1p0p3fWFFaXZj4t7xi0h0ThXB4Fk4a6iv/rSNpVTr18/OfkQ0PmpR67e9/RS9L3FB5I2rZ69fZpg0aM89+3fMBoWHj6jlXv71EyqcaUK3y6RXLKIC/bZhBJRPn3u7AmqXrOid/00yYj7Ceo0DtezBaFk4oLymmC2qLjQjffoO0icf043PyONBjpIAZ3fZSDsdrkao9iUZRplkzm+CCr0Ia5U1oa5E9f8HKjmIoyGVniiAUUhZUF8PX2L6C0qQTsmDsOlgfDknGvQHzUnQvWlVQXw9e//QcKG/LZNUCC5aEwb8wC6NOlHwh9fMG3ewIEjBwDD5IDB/bDF59/DsOHD4eGhgZ4+513yYLtZG1qkGBYRfhquVzOdoLCggLoEBnJdoogX0oQGkDlXLhicuoMIsgqMLaPjxFvPPhB8iA7ZbejcetsZqBi0qsZdXezVFJu8ByrUfeSsvKMOcAThITGJJP3yIA5l2kATzcup7re8R26sf7Ejd19zVo9ncHj2KeFBHmBpt6jC351h5LvAV7Z2RqaK5DSpHa6st5uMjsM95ic9C09kpPjBMveW+hNk9l3ZNLb6h0qCPXnY7znYoTEUkE4TfNWjXjx3C0Fn1jeMzB9a9Lr3l2NFVGR1PWwYF5eu57mvA5B9Mfucpotg5FgcoEQ81UNzmctdMCtUXAt/wpEBURDKCqNh2m5Sn0lvLnpb7Dx0Npb13Xu2hlYtGIe5DXmuqhKWRhE+8dAdkHWrTU+ODenf+l0Oti8aSP8tnMHFBYWwpYtv7DfKxRu8Ou27VBVVQUlJcVQX18HV65cgVnPzIBhw4bAcHwpm5vh11+3QkPj7+2d1yRbWtcMpxQymtYbHeDnxSPtEh/dg7oU34/XJHN3XOoXz6tJ2ZSwP/XXpOHEWLTsO+rFIz9w+Xw+l2MXEsZrGCZ2iKn+ak0TDO8tY33z5KHSqJAA0daD37W/Z8nD2ma7uoFw3QIr0szUPQP3ni88PYtsyGBpKmvN/l06CkTeUjGxl7dM7tqlXd38fGDdqTQ9n6TISFrs2fFuLG9NaLiSKis7F0okMYGGdht0YNnQVMNpt+teo41d27fj7iir54fp7D7grZBgcr0WIv0aIlb9Wg7PTXRDpscCMXgPPh5kOShmLq9OfYt9mDLkKfZdb9TB+atnYf3ptdBgrIed6dshObYXBHsHw7d7vwQb4M2CEGYPeA6GJg0Dd/n9698upqSARqOB9PR0pFc/QAvCw/TiZOjTpw8UFxdDSsp5MBoMrHIjItqj4ndAdXUVnDlzFo4fPw4nThyDn35efet4HTy1A+ViTkRogAh+Qw66X7wECsstgI0f3bdnO7hY4gsxHp6QebZo1DMjqaH5R4N+PvhB9dsqoZEjd/MbQFbjlYnssGGPGiYOkcOR8zp2CmszphbLa2zoohhoH8wbGBDoiTRm0T9vv5cgH047YkU1ajMIOVTTQ5VM+OSJ/QwXlLbIqIExuVKnEz7b9U3XBRNfu8oWqMV3Fi6hKWfUlOFytisSBZPy2QFJYhYsEMZm5zENTB+rB73Db5pYFjlG1MWrSeER4i5TuMvi2pNT/u7vbJh/jYlagyhSAyP7yWDLQQ10CGYsEjE3LcKrZv7t10bMYmZ+OtyoyoVOAZ1AUiuGGmMNHM88CtFB0aAyqqCdJAyC/IOhRlkFaTdSYVD8YOBx713WZBiaY/Iixzx44ABcvpwKqZcuglAkhkv4rseRznYqfH92zlyQSqXQsWMU1NfVw0svLYIflq24dSyxgKbUFnhVa2QurdnVHPz8FA/KTUYj+gVMaIwGm0d3GDrS1dSz55KaOyfP38e+SORTO6G5oRAzKw5/EVTSFTUWbAcGmS4aZiDOIbllkYBi6+dcHdxJkkPP7/02ftW4VzPYQoHTaxOGhgRQCzuEikBnkYG6qeLC3fd6X+Qysa9Endi7zxytzkhdy66K7RMvmdU/3lvRP9nfq1sU9/MdxzSC7tEiWIUmmpS7EJ41BE01Kdf49agVhveRg0xkA4pMl6HceE6Kp6BoSsATytFn37XuJsWHJg0f5JwC+Gm7Cp6b7I6sGfVm92lpn0x7am5QRFR3tmj6SNoheOPnl+Ho9cPobwugrLkE1BY1ZrScUNFcDpfz09BUWUDlUEOFqgIKGgvgfN5Z2HdpNxh1BogKjWbnUd89g+Lq1Sswd84suJ6VBXv27IaQkFC4nJYKlZWuYguyquD7/1zKKlmr1cL8+c+zHeODD/4FLUs/E5NemL6na32FYdvY4e7jMfnvu3qHGi1AEDCy3iCT3zlNlqziZzYiOFWWyRjGLhcxZZSAqoF2QUIoq+OgL6bA14Ni67usqHQy79uIDp3U0KFlkEWE8IMkYgWz7J2Iz8OD6Y++36wVzn72Kairqc4e8uyuD+7W533JEEIzFl47+ZbQrZOt75AxsHovFciTBvxTrbZuV2ntcn8vLlsI/jwqhFQUnicXYRMAJYuGvn1jITTYC85nmiAjWweB8nzgWvJBpyyH2tJ0TL1lA2F5bpe4zsHsO5nvQ6ovDWYn2xtrVFyWmN95eht8seffYMAwqLNnFxAY+OAvCIA4/66skg0OA2idWjZs6+IXBz58bxBbRRAp7QhGlQF+SdsEqw6svN+twvZtv95C0kR5CZhHJmZ8wsTJMHDQYPY3680Ve7/68guoqqxkOwJR/qVLrryD1c4wZPmIaUtzrTYbk2NAn0wqWGVyNwgMvDM60GvqoKbsMoaX18GMbJU7dR2CPRqRq1ajaaZh3Kho8GvXBWhRAFy5YUF60wljB8mga5QQwoN4cL3ATKbETsW02fbSJvcxp7J84dnnZ0JhSf212pLsqfe7xwcyXshQfVGenzmtsqI2ZVCfjuVyhVfF8AEBFoyb0TSTwgAHfLKykW3Y1+ZFgcyvK1gZCWTdUKKy24NTHA49EgLg2AUNkgUVECy5AjYjmS/UDLXlmeB0/D5nq7S4iJ3X3D2GPGbISZZoimv5Ta1TwcYz66C9ewcY2W00VBoqwIpEQY2hGq6XX4O5g+aByClCq0HBjN7PQGl9CdTp8Dw8IxRpC2FAl8EQ5xkH+9L3QE7x9XvuMzs7G4aPGAnjJ0xCpcjZWRWDhwyF2c/OgZEjR8P3y5ZDXn4eZGZmwq9bt7D7+Pn5w8oVK+Da1at3HGvl0ngxJrE6kDImP28OHDxBIMXvmStNcwWSMvlsJ+da8qCjfwlsO1gJBgvFKldPdwCNCdswF9tQEooYoSd0jZbCtTwz7DiiAZK3J/7a34cDwwd1bPTx9qkI8ncrqC3P21yZlz5h3Eun8+6ny0eie6pP9CioV1o7GNBsXLpqglmYmHCXC4D26Aa7D5VDcKAM4uN82G2PnCpH3yhBIMUHI5rOqloDeHlIod7SDTshF9y8wjCDEgpFxZWgLt0OncIMaG4ZOJ5iwFEgVf6aKfYNDX32n4y39f3LuWnQv9sg+PnUCnaRliBFMDw79DnYc/E3uFGQAZ7NVszkUGAQckAaHALPDnkOzmSfgtSCS8ATIaBKmAIGgx7UBjUsUkrAd/Grtyahz58/D9579z24cOE8BOMIbWiog/ffe5esGu9aawtfP/ywHPbv3wfHjx1h9wkKCoYKNOc//rgCRowcRUw+061bdzptS495Nrv5JwJCiR812yjYmxYBT02fxlq+2vIMVLARHNhRQzwqEFBZoVNMINDSCFjzSy6MHREO3p6u7Ney1ddgxuSO4CZUgVNfhkBMT0pzcbQ7YOwAKYJUeK3b1NRvW6O3R5oLpTcy1pgIly8jo45d+lDaDkrKDdAh3A0uZdRipsYd1m7JgednxEJZpQbWbLwCE/pz2CrMUH8r2NGv8cQetxY5CxBngX+IAQ6c1sG4wXJ2GQaRgPGIlKs6EiPp6+YHny/+Bl74djbwnDxIaN8bXp32Bnz8y1IoV5XDRPfuIKy4CkarDRgvd0hBM7ru5Br474JlsP/cbjiYsR92pm6DHxf+DJm5GQDK39OFZrMZzpw6AcePHrn1XUBAAKvglnUxpWIJhIaFwonjv/MQpaWlaK4xdFTcOW/aQwG9c4odEIGsX3ahGWQYEg6LK8LrbgA75eVaCQZFIdKAgAcsDZyXVwspNwwwY0oslFZo4OipChg6MBQEZL0TqxO0lDvI+BoY1ptd1JGtA0OqE5G/vdUPVXmkuVBGE92cgwzltsMaVsFrd5ugXsmHnPxmCAtRwLABoez3LzwTC/uPlSBS5cK4kR1YkkQi5qCfRrhJu5Aul4s+3K4CKZPLLvwydYQCruSQ0UPV6Q3UqgLtRDZGHtZjJKTmXMSRaIAFIxfDR/M/ZYmRrJprEIKW4KkF74DDOxBHMg9GvPIh9OrYC5S2Zjh7/TTMm7QI3pr+Hrjx3eFi7oVbYViLlJeVsfOaSNFDy6sKw6Tb2S6y2l/WtWt3rLznKhkiC7bcidorm+gvO7cXn87MMUNUhJBdFqKq1gy0MZWtPmmpKjHZhGyBXo84MZA07rPTY+HwSddc5RmTo6Cx0ci+52K71uPn3046ILvIxpYZExepReBvwbwP/BVKNluZa0E+Apg2wpWjnjtRAj6CIoxraTSbzVBeoUVfbYHLmXWYn+WiX5KgAq1QXm1j/UKwv7BYr1G/pW6qWScQyUGvVUF9k4lF6L8d1bIz+MICRVtyt4QuWLp0KduqXGyYrLJrEObbDsb3m8SeN7s8i51WGu4dAZ5BoRDy9NPAGT4EOiT1gujgaHaba6Uuf0li6EHdh7BhFwFLtwtZAd9VJPX7wq4Ou2suEvHN7Eq5TgeGV2nsd8zNv8k78d/7kR27fv33x1sMnJ2SnXvVOGlkX7nqdKoB782B7oyDmKTWpWSKX6Ftqv2gqdH4HekE+WWYGSvExI7WBt06+8Cp85Vs/TdRrNXigIoqHQS4azDaMUDnDnxsC4C35nmDwQR6g8N2vZVqezQlN6odK7U6xtmydtaKrc2g15sgIkSC/lYEfXoGgi8qtndyIFvZqFSZYfjAENbzk4HA4zKH+k/f+nlDccFHZP+KaiVrsmQi/o99E2WlGi3nHB79OUHv0tG3n1epa4a4kG63/q5WVwOD5IBM5ApNTGIuWPxdplMoQJ+GTHsZAjDnzdHXwS8SR1Tlrf0Jk/XxR/9iqzGJMkcMHwWLlrwMvXv3ZZU+bPgIOHz0BLz08itoQYxseDVkyDBYvXY9fPTRv2HAwIGs6d2wbg2cPfN7ipyUSkn9hOsxQmiKaie57uXB3+zhxs+7kN7MzqLk8kWX+0zb/KFOX7c01J+nLiyzwtB+/uDlKYL8IiVMHB2BiqRgUN9gcHMTQGw0cpw8O5y4qIWcItdsTgL0tQbm6JgXrxZBK+WRlDxuyeUctY5hU2hESQuecmfXuCjHRjNrsBEZB1sgvnzdNRg1KAiCAqSwenMumnQGTawF8kvtbG2YT7uYznyhFGJiwhGYyeBGkW1L+PDUiPinUvvHTEh1G//qnSvcRPp3hOROv89LVuvVrK8c29eVoVIiYq9TutjTxJgkCPQKAqPdxCYyiMS0i4XuEfG39g9FgEUQ9Yf/QqYLzfH0mTMhKDAQln74EYweMxYmT5kGMpkMYmO7wOef/wdInXRs586wZ/cu2Lt3D+Tn5QEPTfVbb78Lz8yadeu4CS9m2AbMvTyuw+jUyF3ZI7uGD7/0DMa52ZNGt3dx+hQdT0p1xiy6rmpWwwWypNWuw5WQV6iEEYOCQYWM1ZmUavZYjN2AoVY+mA1aGNxDAtGIhRjGtbCbSu1c25oqzRZ5JOC188tuoZgv7lRc6UC0p4XFM9zZ7y9lKmHOJA72bgvQqOjEbn5wMbUUYjvKYHgPGrykfCQ4uHAx3ZGyF8MMp9My02LWgUCI+3MVEBJknooXff5B55014lmMDX9PhMnR1JNnTzQ01yNp4AdKbRM0aFwuSoUuQKNCX485P/JgEiK+nr6wYOKSW/uTBcwTE5Ng1eo1MHPGDHh21kz2e9eTXSgEWUdv+V3yHVko9Zuvv7zDV48eMwbmzX/xgW1F3M3uZf2CJWJbb7a8B3Vit5mDxRI56a1HEEBdnDvRfbRIxIcGkwVsukpIu2KAOU93ck3Oc1iRqbJAZrYNencTs6W6h88Z4OmR7pgooQdhO54ctzTDCK2QVimZFBF4y0VzvBXU++gKOUoNnT11mHusyexaTpGM6EaVHY5cSIOJ47uDp7sQCQVMC1aroam+Fi402DG2lplyD4sNS0+fth9bF3DRoKmbKhC0B4YfAu0CG+df3pJUVtFo3u4vRiYDnLpeL2TeMkfEn4mFvz/RrmNAFKgwfg4PimAVUauqhTqNa6F3d4UHDEkezj5SiHMzFUn8Old07xNuJBIprFm7Dp6aOhkRc8l9Fya/31PcySLozz8//57jHVsZrxDxmejGOmedTwjPLczX+ikmLPxtvDCwmo2g09TqjCb9NbKt2eZsalY7oa5IB0WVV/EaerIT+MhpVE1NcDpVBeP6SoGc3oj928+TD4OTuYa6JuaamxSW0BG8Lju+Svj7lDfSHzpNplVKLjFkmdygy8FyiygDo4sqbw8mUqujD1TUOdc1q60LwgJpdvrlwEQhHDjVCNHtuODOqSY+GIp0TkjqLEJOmxKOeMH089LTMJexmk9Vl2SupyjObE+3aEogyBTGtOd8HRIg/gjBhRhJLHPOvmEfXW623ff6hiWOgNTci2QhcGTHDIhqKzExgXCzuQ7z2j4YvmTBm888sK4NFrz6CZhufxqMJAKcotZXAvOlMvhi2Tb8tI39W6NshEPLe4RhAmatu8w+wBJBmdC18qUS4JCVjRwcDyi5ur/YbFJvDVc4mw+v6BYnEdB/JwWhWgOFfpcGRlcIUgQT5VU4YGoc0LuzAzEFB/ZjaOnvJSoQCelSDk0HFuUKhtMe+g6Uk+I6hcbC1lxvq5RMkhYAWaX4kbxg27aptXRzxRqbzXkKU2oLBHiRmblmMNtFEOgvhTDPGtdT0tB/9IwTYdKbQ3okhWQ7mxseNv/Y1b3f9v6nwjNoptwjicsRxgDHWkBKXiQMjlqGHy6ySLt8JG6qyr7f9Xi5ecOCcYvRhOPoUGlBaWhiHxNUUJmPaUoJzB35ArQLCH/g/eRUI0FD3x7+hII8NBQeRbKrfv9s0XEZd/+ua93DQgYITOdA6FCLXFNuxGCXDkS/qgSLSZfe/+ntbM87uiI5UCikIkialrzIXG4+1w49uvBAZVOBxU0B24+UwYzRHhCBfLbNQUsr623vyoT8SdOWniYF24/01PjHWhhm2rTtJM5YfGF90o+eCgwRlI6KTu0FIQarADy9jFBZoYO0bBN06yjEUIfGEWZla8Bi24vC9v2Q1HPskrSL5oCA6rqqvBU0zV3gHzaSy1GMR59FXAxFnrtkN2srckVUM4mV4+53DdHtOrHvmSnpeBcuU5qSex76du0PyZ3/cHUFZMHcgUcL4UmJn1yv1DTnHjEzvQZYxbPsTqeVK5J6sPdCuOrq0tQGVV3lrcQB5iueIuupfL9ZCbPHuUF1gwNjaifsP6ODp0fRoOcFwUQkhkwmxoz0oEUhpQIqGmn9kBcvvQuPIX9qBTStnlkrEjKk8iMDE/0h569ooFOEHoIw0UAKw8tr7CwMD8S/24fykHigPL3dOYSRuHizo7y09wfNClVT1VNevpGRNrsp0aRt0piN+ktCqaL2zS9O7es1Vvm0h8eD10S5WvL7grGFDYVsHMuh/5JHazxQSooqjzh66zfVlFwbardb6hwOm793YGSwWa88XFOek2JS154c/2rqLfLCXUFPIysmPTfJDTNbNLviDwmNhiCKJrFm1pU8HNVCEhc70B9fRuzTLBQxlfCY8qdLFfd83lvWMdq+p1FtGdixnQB9L80CBbLUA3nGF4KLZm8P2nPVbw3w9jwfKCpniqrLOd1Jkfjdx0Ig0c3otBbM/nvWrTTVrl27Tk2YMGHA/c5tt9tg9sfTAR0F+zeP5sGPr6wCT4XnA6+35rMPYXqqFM31kxnJTpvBXpu7tUdtcWYG+ZuUTwU6rFKjmR807fWMewiLQyuTprYP5GwrqzMi6eGEzu2ljUAxEmQKxV4erhWAyBITJCkR5MtjbhTCPE6deP3Ax1i/q0X+9FqGbp6W9r5e3AHltU42wa3RM06djqKR567B/Odeh41y6AzMlEVP+/iSRVuaNcxqRmolzMU9Sr4fUvzppx8WBwcGno9PTHS/5+KRyvxl6Q74nxKn0waa6rSvWxRM5OZidqqbr3vEbnQ2Gs2c9KRYcUJ9I7aHyrmFw6WG6AyObQI+ZylZmMaDRJboguxOhgoJpF84bK3aBH/iodx/yq7t+6pbXFwXwQ6pmPIgM+LJEv5X85xzrDbKF4GWoFDDzKCtGHzQ9DfIPk1w2Clxk8rxMZIqrabkiopKG01m8wFkmHr6B/j7C4Ui+DNCigZ2IvC6TynUIwgDFm2VXll6/ENL05XP9Hp9q9e63HKkpmzepKDhSGpEqzXMzxWNjvWYg97OpbjeHB7To76R+RTz06qocF40IZpkUirImyfyqLf1OpKbm/tYkwEf+07Jo4K6d+N/LRFBhNmKYQCfISba2HQ4dPO07ds3oNkSx2eBLeGnDHaonVo7IBwJjS8lCH7hEZ+M3qdPnxKFm9ucX37ZMlEkEkzgcfkRFpOpsq6hIbVZ2XTd4XD8YS8XCESiuM6dew0cPHgsEJYPCRuLri7X0HT9jN2iy4OHPLILM050RFhQ++jIdj3d3KRhHnL+9ZioQZtpesi1jIwMzptvvgmtlW3fdfO22Zn2BRUwdfTC1J0t3yO5UTD4xQy2MP7cuuS5eEWTiDM1Wxgm2I9etGRM+YXt2+EXeAx5/GUXPWQ+6Ed6VNYyKhun3Z6IMP4chrphEg4pEcB2MKLZuoONGTj3tHnbtpjXudXCiNae4/ihQz07REVN4PP5I8USSezAgQMpHNUtBEWMXqeLrKqo2FFWUfHOtGnTSh92vBdemPvUPC7zk65Sd6Gs8NIsna66+WH7rFy5UhwTHf1laFjYc9jRBK7nP8IAsVg8gNR/denSpWDShAnnmhsbf0vLzDzx8ssv/3EK0Mzl1Ku4o8a/dOGOx/Tdzl5xaIZmUDV6Kt5YUHplW2SIdY6PO0UWEn0sJT828CIAo6cP94TewFRqLD4/xPUYmaKwH0e2pjYLdVCGhxbSHIaPn81WXoy2odGxu9eU9VsedlyyYFufnj3HxcbFvYQN2U8qlXKzs69D585d2N+NyMawj6DF95ZnGNfX12eXlZf3QUVrHnb8KcF+y64arJ8WKZVV0Aq5lJJy0M/ffySp5xIIheyLUJ0SsfgOFsxkMjlUSmV2YVHRT6dPn17RkkV7kJDV9NpH937Dnb4aRjuNMtQEebiNAe0MLRLQCULvPj5FFc7UgitnJnSO4uRgBnBWtympB+Ex5LFHsr8OFDohZdUbnQcpjk3bUFsCnNCJIA1Td+FacrrQ7INbyGoxEjALekBxyV7f375N4k16NW3DAw5JXTp7trNXQMC3YWFhA+tqa2HnDrRPmzdB125d4d+ffsGmCgn1WFJUxPLThIMm+V6dThdm1WhISuqhSj5pMG5UKrWtUjARjUYTT5RK8s7k+cckodE57t7QXSQScW7U1cYlJCQsCw8LewWtzkv9+vU7dnOZrDuE8Pc0V/QGRQvGeYQODKfNxGOQR0pxwckLZpeZaNaowahP1+UaLzcEa5IuqHUQhbs+lpIfewFVmV6mLm+0PT184eXNNodN0lBdtKA092xewY289NxS+lJJc2ShijOMabInQlnRjToeh3Nm4itpG+93rIMHDwrSLl5c2Tk+Pk2hUAz89ycfsTMZjhw+BNt3/gYzZs7GRHojq+D6ujrQajRsFsjbxwfcMYZGU360qLq6VU8pRQVfgkcQ7FibFe7u7LlIhyJPWyUd8G4hneD06ZOwaOGLpOg+Mjkp6ciNnJyftm3b5nf3tsQ0pzcMeMOga5CXVprVBtFoqDElWvOrvHNyi7Sn8q+nNBRcO/GxyaC7RNjGyr2hE01qWA+PKU/kcfctsu3zhI7T3kxnp9WQqTBMB5+3see/Ymiu72O1W+PHLj69+e59Th09mhAZHb1OIpN12vbrVli7ZjWMHTcOnnt+HowdPQLat+/ATkt5E9N6hBQhSiZmkkxhCQwKIpWUlfkFBRPGjRv3SI/RafU9bdvm0TEy8iJ2vsiG+npAv8xaEHd89/C8Mx7Pu3EDlixeCGHt2sHYseNg/ISJ0NzUVFdaXDw7sUePe+Yx7f9x0JsiTGlK5F7zldXFM0ctOs12QMI9aGidaPZ9pgo/jjxRJd9Ptn2ZHDPtb6m5JKGe4Iohb8mZkydno+9dVl9fJ62uqoLU1EugVqnBy9sL/vHm2zD/hefYBP30Gc/AtWtXcRTZwM/Pj613JiMZ93FUV1aOGzthwmOZsdbK/v37Y/18fVP9AwLEpMHIMyLJNJv2HTqwo7tF/v631wkQg0mTp7LbVFVVsiW8vfv0teffuLE0MTn5k9uPyz7fMinfU6gXmUf9K/WJPPX8f42g2aWuZmZ+h/Gl8/ixY8zhw4eYsaNHMkajkamsqGCSE+MZlUrF7N71GzNk0ABmzKgRzOKFLzLFRUVMRXk5o1KrGa1Ox75nZWX9unHjRn/4i2Tt2rXCy2lp6MeVNnJO8iLXWFZaytTW1jItcvbMGebpp6YwGo2a/Rt9OdO3d0+89uHMDz/8lzGbzQya782H0TLA/2NpNRlCFBMRESFBs8jZs2fPY7Mvq1evlklEopUxsbHzeTwetXr1KuRvNWwi49LFFJg4aTKoVEo4dvQwa7KJvP/BUoiJjmFHjRBRLf9mAR0BRLk5OZ0SkpLmz5450w9Hfd7OnTvV8ATkwIEDoW/94x/Px3Xtul+t0SSePXOa7hQbe+u87GjWatHquIrnd2z/FQYPGQaxsZ1Z7LD0g/dZJL5h4y+waeNGdvYFxumdRXJ5n67duu1HuvaxngxDhHS8YcOGCRHLtOoprK0y19tWrfKQ+vouEwqFg93c3Z1mi+WksqHhqzETJ2bAIwgZcX169drh6+/f64vPPoXE5CSIiYmFV15eAvPnvQgrVvwIr73+BvTs1Zv1zfNfXEB8cHV9Tc0vPIFgDp7bW46+0FXBAaw5XLJoAaxbv4mdvzRixEhLY339WZPFsj0vLy8LTWr+3LlzW6X07777TuAulXZqHx2d5OvjMxr9bb+6ulr5l//5AvR6Hby4YDHEJySw2xIlatVqwJAJf9N/Fh4RMUoml3chnZC4EhIVbN60gZ0op8QoQNncBM/OeQ4mTHQVIqIJLyivqBiHJE8+PIJsWbMmODw6+h08z2i1Wi01GY2pZptt4cSJE8v+aL+HKpnErckJCVvlCsVUAnjQL7U0ck1BYeFLQ4cO/Q1aIVu3bo3skZy8CxsuhvjV119/lfhUkCLwIMCKzPX929//wdY0f7D0Q6isrCwz6HQfpF6+vJcoKuPy5ZMYrw60YlLi1MmTMGXqNPj6y89BJlNAYmIifPXVl7Br915Ak86W76K/tJtNpiarzVaDSmnEeFqD74RJYSgOu3wfRXM4pHBKweXxvDAh748g0QMRvbigIB9Gjx6LlGoBrFu3Flb+tBrWrFnFlgyhf2Xvx6jXQ0VFRe7BQ4c6IyDkJScnj/T383sf26f7unVroBd21CK8ll07d6CPngJDhg4jYRamYSvgIlqs/v3616RevDht/OTJF1rTfof37UvqEBOzAa+zI1FaHQJQwhGgW8jSGQyJyBE8cFQ/NE5OTkx8x8fXd6rF7Mr0kAMTJaPZDIiKilq9Y/Pmq1NmzvzDhT1OHD6cFBUbu2Prll+CU/AGKyvK2dH3+muvwMuvvsb2/gP79kFgYBCMHz9Rif7622vXr/8HlXvrgRN5BQVz0fxdtjns3tt+3cI+3u/kiRNw7MRp+OCf78GUKVNY1E1GUFBwCJw9e5q7Z89uPwFf4PfmW29Dv/4DYPmPy9hHDhAhE9jmv7iQBXvElA4bNhz+8/ln0NjUCD169oQtWzbDO+++DyuWL4c5zz4Ds2fPge7x8bceTmIwGhtqKiufu0l6EJZrN7JjB3r06DFl5MjR3wUGBnrl5GSzU2rGjhvPhlibNq6Hn3/6CXRoGUaOGh0wEAfIxfPn5/Xs0+cPn9pGBlq7yMhf3NzcIgjLRnTQUkKM33WRSCRkDu0seBzZvHlzUkF+vg5DA+bMqVPMhXPnGFQAcwOJ8sL8fCYnO5tB3/WH628dO3x4Gsa1zd988xXztzdeY9CEMuPGjmZqamqYSxcvMsOHDWYwBmbwwpn8/PwTZ44di37QsY4fOBCJZvjGf//7LTNpwljm+PHjDJotZtyYUXi8agRuBqZXj0QWtE2bOpnZt3cPg6OG+fmnFS5wdPYM8/qrLzPYuZhzZ89izsPJ7N69i/nX0n+yv0+aMJ7B0cd+Jr8R+XXrFuatf/ydqagoZ15asohZv34dk5OTU3/o0KHEB10ncUvYRluyrl1jsLMw5WVlzNQpk1hgduTIIWb2MzPY+/3Xvz5g0OTbU86f//sfteGGDRvaZWZkMGV4HHLM7OvXmXMI9MiLfEbr5Tywd+/4B+3/QDKEAK3oqKgv0P5LkV4E8iKjOSomBiI7dgQvX1+wOxzlaBrv65cxvpQimny7Y3T0hk2bNniEhIRA9vUs+OjDf7HTUFAxsH79WnYuEZpH4+WLF7+MjIwc0n/o0AeusTFk9OiCo0ePJqOpW7Zs+U/2vv36seCHLPVARsrhw4chKiqa9G74O5p+4uM/xvP17def3b9v337s8g94HujT11Vj7Ymxd7OSXZ8U95MDiYWJnD93FrJIvTWa2TNnTsGrL79EQJWzS5e4HampqQkjR468/KDrnDVrVm10TMx0VODfhg4Zpv7ll80EL7DVo9989RUMGjwYsBPA1StXSNzNSerR4wt0Vz+uQuxzv+PNnj27FDtFCnFrpP1jOnVi2T9iUUjpMH6mkDP4Yf369Q9OpN9Pdm3fPpj0EAQJzDXsPatX/cygL2R7N3LGTElxsfXIwYMj77fvkSNHotC34s8HmAnjxzC7ftvJoBKYZd9/h2FFD0bZ3Iy9spS5fDmNQd65GrnegfCIcvr48Z446n5BpegRpDGzZk5n+vXpxVzJzGAQrLGjFTsg89mnnzAff/SvW6HO8h9/YFYsX3br72y0RjOmT2NH1s6dO5hZOMp2bN/GTBw/lklPv8xug0q2FRcX/4ad6JGXC7pw4UIsjuRMYhmIpSFWJy0tlVm/bi3z6b8/YpAqZdauXc3s37eXwbZOS0lJ6X+/46BPjsvPy2tEN8FeU1pqKlPf0MAgsGNqqquZ0pISYm1ffKSLQ1CwGYEFU4sNNmniOGb40EHMP99/l40PS/CARw8ffoeM9tv3wZ4UiOZjGSYUGvbv38f0TE5gG/3XLb8w7779Fts53n3nLeaN119llY5KOnbq1Kkw+BNy8uTJTjdu3HgnOysru6qqim0AorC5z85ipj81lRk0oC9z+NDBByoZwR8zYtgQtkMQ2bd3L4OImkEAxuDxyooKCj5G69Eb/S3vca8Rza0Ec8G/oAVjpkyeyGjQxTwz42l0dfuZxYsWMM/Omsl2euIGr169YsD72YKWsOPdxzm0b9/EwsJCRzlyBUTBLXG7Rqsl18qkpqTct/Dxgega0WxhWHh4+2+//Roup12GtevWY3y2mp1VN3bseDu+78ZQ5SQqS4ehVRC+houEwr779u/loFLh3fc/gCsZGXDw0AF2xgKZ52u1WhBhikk8bPdy91jVNSGBPIrtia2Ke2jPno6+gYGD3N3dh0nl8k5NTY1+7u6YE0XeuSVjRJaMIJ+Tkl0zMsiU1mNHjzJDhw03IS9dh6nMQmyw1Mbq6l2jJky4dr8Ew+MIKo0fHBy8GLmGD9G8Svv37QUYLbD055KXXmFDwBfnPQ+dMM7esnUbYdQYVXNzOqLnk3abLZficmncLwndy1xfPz8hAV4mk+lW4zkRjCH7Z+3UufM9C8c8UMnpaWkXs3NzemzasB5GjBoNOZju++ab/8Ibb7zKThPpg/6NkBUyRKmfY8z79rvvAo5WQKSHiW4LrFj5MyJZI1u4/sprr0Mzxoq/btkC773/gZVL08926dbt1yfVgPcTYmXWrVun8Pf3D+RSVLRYJGonUyh8kICREl9mNJtNmK5swlizlHI68+pVqqpwlUqd8OKLj/RE00eVowcPDouIjNyw7IfvfGfPmQudOsXCqlU/wcH9+1l8QpIfH378CaC1g3nzCU9Qy1K5HaPuxaMEZZP8egvSxtx6E/pr71ZfzIljx+YSP4zkP0P8wI0buQyODKZPrx7s+6+/bmEG9OvD7Nu3B6nH/qwZJn4Hexf795UrmTfpvtNMdFQH5g30kWjKc9CvdYf/j8vuLVuCC/LyTmPUwbyH7TZj+lPMqJHDmNcQ+f+0cgWDbBq2bW+2nd/8x9/Q3RxgHiSELmXNNppsdLGf3e98D0TXzSrVhh49ex3HkcDGsQS1kriUWFeSaSGfQ8PCWIRI5gRlZKQDggFAsw2zMKZcsfxH9jgE2W7YuBnmz1+wJfPKlaQRI0b8Jdmi/3+SCdOnVxaVlAwvKS39aMq0p5j1GzbB99//iEmYayxLhsplM12enl4s20YInwcJ5+Z0XOTRi8srKz+FRxXkgYMwds2xIUgiMhsBwhkcmZ9+8jHzyccfsvHoTAQQE8aNwaRCdwRo41lARYAPAWsNDfUMol9tyrlz0+8GaW3iklPHjg1BDFBMrOCwIQPZpAfSosyrLy9h23zWM9PZ6OZBQvZDAKs8c+ZM9GNfBKlxys3O/gbNgWXVzz8xCE4YTI4z816Yy5oVBBAMIj728+JFC5nTSJqQEyNwMCKi3Lhp0yY5tMkfCuHNL6emflJUVKglbfc5hn179+5mwysSyq1ds4o5c/oUIujKOxRMqkQLCgoOPKyNWz26CKSPioxc7B8Y2Nug18du2riBv2jJS4BUJWuuCdIzG406B8Ok11ZXn2poatoyfPjw4r8SXP1fExKCdoiImB0QFNQXM20k4RFIeG6y7AUhfJAfh6SkZAZJqUJ0p2eQ31+JbfzQJNEjm1CS5vJ1cwsUSiRBmLiXE7YFjbkRldyEFGNdeHh4c0JCwl+KUP+vC3Fty5Yt84hp396PL5X6IIxml1RwkLV5jMZqJJoaFi1a1LpH37VJm7RJm7RJm7RJm7RJm7RJm7RJm7RJm7RJm7RJm7RJm7RJm/xPyP8PVTOTyMf7WFUAAAAASUVORK5CYII="
          alt="MDN"
        />

        <div class="semibold">
          <div>MINISTERE</div>
          <div>DE LA DEFENSE NATIONALE</div>
          <div class="bande">
            <div class="vert"></div>
            <div class="jaune"></div>
            <div class="rouge"></div>
          </div>
          <div>REPUBLIQUE DU BENIN</div>
        </div>
      </div>

      <div class="text-right line-2">
        <div>01 BP 772 Cotonou</div>
        <div>Tél: 00229 21 30 02 58</div>
        <div>dopa_admin@defense.bj</div>
      </div>
    </div>
    <div>
      <div class="bold text-center big">ETAT MAJOR GENERAL</div>
      <br />
      <div class="text-center big">
        DIRECTION DE L'ORGANISATION ET DU PERSONNEL DES ARMÉES
      </div>
      <hr />
      <br />
    </div>
    <div>
      <div class="maroon huge bold text-center">
        Concours de recrutement militaire au titre de l'année 2022
      </div>
      <br />
    </div>

    <h3 class="center">Statistiques</h3>

    <table>
      <thead>
        <th>Départements</th>
        <th>Nombre d'hommes</th>
        <th>Nombre de femmes</th>
        <th>Total</th>
      </thead>
      <tbody>
        ${genStatsArray(data)}
      </tbody>
    </table>
    
  </body>
</html>
`;

export const getPdfResultList = (
  data: any,
  fields: any[],
  departement: string = '*',
  name = '',
) => `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      * {
        font-family: Arial, Helvetica, sans-serif;
        font-size: 14px;
      }
      .flex {
        display: flex;
      }

      .jcc {
        justify-content: center;
      }

      .jcb {
        justify-content: space-between;
      }

      .aic {
        align-items: center;
      }

      .bande {
        display: grid;
        grid-template-columns: 70px 70px 70px;
        margin: 5px 0;
      }

      .vert {
        background-color: green;
        height: 5px;
      }
      .jaune {
        background-color: yellow;
        height: 5px;
      }
      .rouge {
        background-color: red;
        height: 5px;
      }

      .semibold {
        font-weight: 500;
      }

      .bold {
        font-weight: bold;
      }

      .text-right {
        text-align: right;
      }

      .text-center {
        text-align: center;
      }

      .line-2 {
        line-height: 2;
      }

      .big {
        font-size: 16px;
      }

      .huge {
        font-size: 18px;
      }

      .maroon {
        color: maroon;
      }

      h1 {
        font-size: 20px;
      }
      h2 {
        font-size: 18px;
      }
      h3 {
        font-size: 16px;
      }

      table {
        width: 100%;
        border-collapse: collapse;
        margin: 20px 0;
      }

      td,
      th {
        padding: 3px;
        border: solid 1px #aaa;
        text-align: center;
      }

      .super-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        line-height: 1.4;
      }
    </style>
  </head>
  <body>
    <div class="flex jcb aic">
      <div class="flex aic" style="gap: 10px">
        <img
          width="80"
          height="80"
          src="data:image/png;base64,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"
          alt="MDN"
        />

        <div class="semibold">
          <div>MINISTERE</div>
          <div>DE LA DEFENSE NATIONALE</div>
          <div class="bande">
            <div class="vert"></div>
            <div class="jaune"></div>
            <div class="rouge"></div>
          </div>
          <div>REPUBLIQUE DU BENIN</div>
        </div>
      </div>

      <div class="text-right line-2">
        <div>01 BP 772 Cotonou</div>
        <div>Tél: 00229 21 30 02 58</div>
        <div>dopa_admin@defense.bj</div>
      </div>
    </div>
    <div>
      <div class="bold text-center big">ETAT MAJOR GENERAL</div>
      <br />
      <div class="text-center big">
        DIRECTION DE L'ORGANISATION ET DU PERSONNEL DES ARMÉES
      </div>
      <hr />
      <br />
    </div>
    <div>
      <div class="maroon huge bold text-center">
        ${name}
      </div>
      <br />
    </div>

    <h3 class="text-center">Liste ${
      departement.length > 2 ? `(${departement})` : ''
    }</h3>

    <table>
        ${genListPdfArray(data, fields, departement)}
    </table>
    
  </body>
</html>
`;
