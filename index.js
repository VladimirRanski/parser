const puppeteer = require('puppeteer')

async function parser() {
  //открываем браузер
  const browser = await puppeteer.launch()
  //открываем новую страницу
  const page = await browser.newPage()
  //переходим на сайт
  await page.goto('https://moonarch.app/miners')
  
  //селетор кнопки для прогрузки всех майнеров
  const buttonAllSelector = '#app > div.page > div.mainContent > div > div.miners-body > div:nth-child(3) > div > div.action-bar.bottom-action-bar > button'
  
  //ждем прогрузки кнопки
  await page.waitForSelector(buttonAllSelector)
  //клик по кнопке
  await page.click(buttonAllSelector)
  
  //селектор таблицы майнеров
  const allMinersSelector = '#__BVID__68'
  await page.waitForSelector(allMinersSelector)
  
  //ждем прогрузку таблицы
  await page.waitForTimeout(10000)
  
  //Получаем количество строк для считывания
  const tableRows = page.$eval(allMinersSelector, (el) => el.rows.length)
  
  //Перебираем строки и выводим интересующую информацию
  tableRows.then((el) => {
    
    const nameMinerSelector = `#__BVID__68 > tbody > tr.last.table-pin.table-superpin > td:nth-child(2) > a`
    const name = page.$eval(nameMinerSelector, (el) => el.textContent)
    name.then((el) => {console.log(1,el)})
    
    
    for (let i = 2; i < el; i++) {
      const nameMinerSelector = `#__BVID__68 > tbody > tr:nth-child(${i}) > td:nth-child(2) > a`
      const name = page.$eval(nameMinerSelector, (el) => el.textContent)
      name.then((el) => {console.log(i,el)})
    }
  })
  
  //закрываем браузер
  await browser.close()
}

parser()