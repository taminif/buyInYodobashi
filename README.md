# buyInYodobashi

[yodobashi.com](https://www.yodobashi.com) で商品を購入するプログラムです。  
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

```
事前に[yodobashi.com](https://www.yodobashi.com)で会員登録とクレジットカードを登録しておく必要があります。
ID・PW・クレジットカードのセキュリティコードを設定します。
※セキュリティには十分注意してください。特に外の環境で実行する場合はセキュリティが担保されていないところには置かないようにする方が好ましいです。
```

3. 実行します。

```
node index.js
```

## License

MIT License
