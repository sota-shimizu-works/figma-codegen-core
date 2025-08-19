# 環境変数について

ルートディレクトに`.env.example`があるのでコピーし、`.env`としてしようしてください。

# figma-codegen-core について

figma-codegen-core は Figma の API で取得できるデータをパースして各プラットフォームに変換しやすい形(以下 NodeElements)に変換するライブラリです。

## NodeElements

API で取得したデータをパース処理したデータになります。
基本データはネスト形式になっており、タイプやクラス名、テキストなどが格納されています。
構造は HTML と同じ構造になるようにネストされています。

## 開発について

```
npm run dev
```

このライブラリでは上記コマンドで２つのファイルが生成できます。

- figma-fetch-debug.json
- figma-walk-result-debug.json
- figma-walk-result-mock.json
  基本的には上記ファイルの内容を見て開発を行なっていきます。

### figma-fetch-debug.json

このファイルは Figma の API で取得した Json をそのまま出力しています。

### figma-walk-result-debug.json

このファイルは Figma の API で取得した内容をパースした NodeElements の内容を出力したものになります。

### figma-walk-result-mock.json

このファイルは開発用に作成した Figma デザインデータを変換し、figma-walk-result-debug.json がこの形になれば OK という教師用データになります。

## 構造

NodeElements の中身は`components`,`layouts`,`pages`に分かれています。
Figma の API から取得したデータをパースし、各役割ごとに格納しています。
判定基準は後述の Figma 命名規則を確認してください。

## style 命名規則

NodeElements の命名規則はキャメルケースで命名してください。

```json
"fontSize": 24,
```

`font-size`であれば`fontSize`にしてください。

# Figma 命名規則

Figma API で取得したデータをパースする際、Figma データ側で特定の名前を入れることでパース処理に一部分岐を与えます。

## prefix

```
page:/path
layout:/path
```

この２つは NodeElements で page か layout の判断のために利用されます。
パースした結果どちらかであれば子要素含め page,layout に格納されます。

```
ignore
```

この prefix はいかなる場合においてもパース処理及び、NodeElements への格納を無視するものになります。
子要素も含め無視するものになり、Figma デザインデータ上ではメモ書きや、クライアント提出用プロトタイプなどで利用します。
