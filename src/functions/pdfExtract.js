const pdfparse = require("pdf-parse");
const fs = require("fs");

exports.pdfExtract = async (filename) => {
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
    dia: dataAtualFormatada(),
    ...scrape(),
  };
};

function dataAtualFormatada() {
  var data = new Date(),
    dia = data.getDate().toString(),
    diaF = dia.length == 1 ? "0" + dia : dia,
    mes = (data.getMonth() + 1).toString(), //+1 pois no getMonth Janeiro começa com zero.
    mesF = mes.length == 1 ? "0" + mes : mes,
    anoF = data.getFullYear();
  return diaF + "/" + mesF + "/" + anoF;
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
