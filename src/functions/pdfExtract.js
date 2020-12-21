const pdfparse = require("pdf-parse");
const fs = require("fs");

exports.pdfExtract = async (filename, date) => {
  const pdffile = fs.readFileSync(filename);
  const data = await pdfparse(pdffile);

  const scrape = () => {
    let obj = {};
    scraped.forEach((el) => {
      const numb = data.text
        .match(el.regex)[0]
        .trim()
        .replace(el.removed, "")
        .replace(/[.]/g, "");
      obj[el.name] = Number(numb);
    });
    return obj;
  };

  return {
    dia: dataAtualFormatada(date),
    ...scrape(),
  };
};

function dataAtualFormatada(date) {
  let newDate = `${date.replace(".", "-")}-${String(
    new Date().getFullYear()
  )}`.split("-");
  [newDate[0], newDate[1]] = [newDate[1], newDate[0]];
  newDate = newDate.join("-").concat(" 12:00");
  return new Date(newDate);
}

const scraped = [
  {
    name: "confirmados",
    regex: /CASOSCONFIRMADOS\s+\d.\d+/gm,
    removed: "CASOSCONFIRMADOS",
  },
  {
    name: "recuperados",
    regex: /CASOS RECUPERADOS\s+\d.\d+/gm,
    removed: "CASOS RECUPERADOS",
  },
  {
    name: "monitoramento",
    regex: /EM MONITORAMENTO\s+\d.\d+/gm,
    removed: "EM MONITORAMENTO",
  },
  {
    name: "obto_investigacao",
    regex: /ÓBITOS EM INVESTIGAÇÃO\s+\d+/gm,
    removed: "ÓBITOS EM INVESTIGAÇÃO",
  },
  {
    name: "obto_descartado",
    regex: /ÓBITOS DESCARTADOS\s+\d+/gm,
    removed: "ÓBITOS DESCARTADOS",
  },
  {
    name: "obto_confirmado",
    regex: /ÓBITO CONFIRMADO\s+\d+/gm,
    removed: "ÓBITO CONFIRMADO",
  },
];
