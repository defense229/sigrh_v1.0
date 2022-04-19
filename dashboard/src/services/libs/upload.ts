import { read, utils } from 'xlsx';

export function xlsxUpload() {
  return new Promise((resolve) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.click();

    input.addEventListener('change', (e: any) => {
      const file = e.target.files[0];

      const fr = new FileReader();
      fr.readAsBinaryString(file);

      fr.onloadend = () => {
        const data = fr.result;
        const wb = read(data, {
          type: 'binary',
        });

        const result = utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]], {
          header: 1,
          raw: true,
          rawNumbers: true,
        });

        resolve(result);
      };
    });
  });
}
