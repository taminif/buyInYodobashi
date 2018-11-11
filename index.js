const account = require('./account');

const loginPageUrl = 'https://order.yodobashi.com/yc/login/index.html';
const productUrl = 'https://www.yodobashi.com/product/100000001002383900/';

const puppeteer = require('puppeteer');

(async () => {
  // ヘッドレス = 実際にブラウザを立ち上げない
  const browser = await puppeteer.launch({headless: false});
  const page = await browser.newPage();

  await Promise.all([
    // 画面内にないものをクリックしようとするとイベントが発火しないため全画面表示される大きさに設定
    page.setViewport({width: 1920, height: 2000}),
    page.goto(loginPageUrl, {
      waitUntil: 'networkidle2',
    }),
  ]);
  await page.waitForSelector('.loginEntry');
  await page.type('#memberId', account.LOGINID);
  await page.type('#password', account.PASSWORD);
  await page.click('#js_i_login0');
  // 描画を待つ
  await page.waitForSelector('#wrapper');
  // 商品ページへ遷移
  await page.goto(productUrl);
  const response = await page.goto(productUrl, {
    waitUntil: 'networkidle2',
  });
  if (response.status() != 200) {
    console.log('product page loaded error');
    console.log(response.status());
    return 'error';
  }
  // 商品をカートに入れる
  await page.click('#js_m_submitRelated');
  await page.waitForSelector('.strcBtn30');

  // 購入手続きに進むボタンを取得
  const buyButtonDivs = await page.$$('.strcBtn30');
  if (buyButtonDivs === null) {
    console.log('button error');
  }
  for (const buyButtonDiv of buyButtonDivs) {
    const buyButton = await buyButtonDiv.$('a.btnRed');
    if (buyButton != null) {
      await buyButton.click();
      await page.waitForSelector('#sc_i_buy');
      break;
    }
  }

  // ショッピングカートから「次に進む」
  await page.click('#sc_i_buy');
  await page.waitForNavigation({waituntil: 'domcontentloaded'});

  // 購入確認画面
  const securityCodeText = (await page.$$('.js_c_securityCode'))[0];
  await securityCodeText.type(account.SECURITYCODE);
  const orderButton = (await page.$$('.js_c_order'))[0];
  // 購入確定
  await orderButton.click();
  // 購入確定ボタンを押した後は無制限で待つ
  await page.waitForSelector('.ecOrderFinishInfo', {timeout: 0});

  browser.close();
})();
