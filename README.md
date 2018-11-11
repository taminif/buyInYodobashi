# buyInYodobashi

yodobashi.com で商品を購入するプログラムです。  
Headless Chrome, puppeteer を使用しています。

## 商品指定方法

`productUrl` に購入したい商品の詳細ページ URL を設定してください。

```
const productUrl = 'https://www.yodobashi.com/product/100000001002383900/';
```

## 動作環境

Node8 以上で動作します。

## 実行方法

1. リポジトリを clone し、プロジェクトに移動してライブラリをダウンロードします。

```
cd buyInYodobashi
npm install
```

2. src/account.js にアカウント情報を設定します。

3. local で実行します。

```
node index.js
```

## License

MIT License
