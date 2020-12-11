const puppeteer = require('puppeteer');
const pdfparse = require('pdf-parse');
const request = require("request-promise-native");
const fs = require('fs');

const pdfExtract = async (filename) => {
  const pdffile = fs.readFileSync(filename);
  const data = await pdfparse(pdffile);

  const confirmados = Number(data.text.match(/CASOSCONFIRMADOS\s+\d.\d+/gm)[0].trim().replace('CASOSCONFIRMADOS', ''));

  const recuperados = Number(data.text.match(/CASOS RECUPERADOS\s+\d.\d+/gm)[0].trim().replace('CASOS RECUPERADOS', ''));

  const monitoramento = Number(data.text.match(/EM MONITORAMENTO\s+\d.\d+/gm)[0].trim().replace('EM MONITORAMENTO', ''));

  const obto_investigacao = Number(data.text.match(/ÓBITOS EM INVESTIGAÇÃO\s+\d+/gm)[0].trim().replace('ÓBITOS EM INVESTIGAÇÃO', ''));

  const obto_descartado = Number(data.text.match(/ÓBITOS DESCARTADOS\s+\d+/gm)[0].trim().replace('ÓBITOS DESCARTADOS', ''));

  const obto_confirmado = Number(data.text.match(/ÓBITO CONFIRMADO\s+\d+/gm)[0].trim().replace('ÓBITO CONFIRMADO', ''));


  return {
    dia: dataAtualFormatada(),
    confirmados,
    recuperados,
    monitoramento,
    obto_investigacao,
    obto_descartado,
    obto_confirmado
  }
}

function dataAtualFormatada() {
  var data = new Date(),
    dia = data.getDate().toString(),
    diaF = (dia.length == 1) ? '0' + dia : dia,
    mes = (data.getMonth() + 1).toString(), //+1 pois no getMonth Janeiro começa com zero.
    mesF = (mes.length == 1) ? '0' + mes : mes,
    anoF = data.getFullYear();
  return diaF + "/" + mesF + "/" + anoF;
}


async function downloadPDF(outputFilename, pdfURL) {
  let pdfBuffer = await request.get({ uri: pdfURL, encoding: null, strictSSL: false });
  console.log("Writing downloaded PDF file to " + outputFilename + "...");
  fs.writeFileSync(outputFilename, pdfBuffer);
}

const getData = async () => {
  const url = 'http://www.congonhas.mg.gov.br/index.php/atualizacao-informe-epidemiologico/';
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.goto(url)

  const result = await page.evaluate(() => {
    let link;
    document.querySelectorAll('a')
      .forEach((a) => {
        if (a.innerText.includes('Informe Epidemiológico'))
          link = {
            href: a.href,
            date: a.innerText.slice(-5)
          }
      })
    return link
  })
  browser.close();
  return result;
}

(async () => {
  const { href, date } = await getData();
  const filename = `Informe ${date}.pdf`
  await downloadPDF(filename, href)
  // const filename = `Informe ${`02-12`}.pdf`
  const dailyInfo = await pdfExtract(filename)
  console.log(dailyInfo)
})();