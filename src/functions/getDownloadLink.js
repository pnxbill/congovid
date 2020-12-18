const puppeteer = require('puppeteer');

exports.getDownloadLink = async () => {
  const url = 'http://www.congonhas.mg.gov.br/index.php/atualizacao-informe-epidemiologico/';
  const browser = await puppeteer.launch({
  args: [
    '--no-sandbox',
    '--disable-setuid-sandbox',
  ],
})
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