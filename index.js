const puppeteer = require('puppeteer');
const pdfparse = require('pdf-parse');
const request = require("request-promise-native");
const fs = require('fs');

const pdfExtract = (filename) => {
  const pdffile = fs.readFileSync(filename);

  pdfparse(pdffile).then(data => {
    console.log(data.text)
  })
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
  console.log('res', href)
  const filename = `Informe ${date}.pdf`
  await downloadPDF(filename, href)
  pdfExtract(filename)
})();