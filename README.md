# am-coffee-time
モック生成・パターン管理を楽にし、休憩時間を増やそう☕

# repository
https://github.com/ampcpmgp/am-coffee-time

# Appearance

| モックパターン一覧 | アプリケーションページ |
| --- | --- |
| ![](https://github.com/ampcpmgp/am-coffee-time/images/am-coffee-time-pattern.gif) | ![](https://github.com/ampcpmgp/am-coffee-time/images/am-coffee-time-mock.gif) |

# sample page
[サンプルページ](https://ampcpmgp.github.io/am-coffee-time/docs/mock.html?__amCoffeeTime__=%255B%255B%2522setFullSettings%2522%255D%255D)

# start with parcel
以下をインストール。  

```
npm i am-coffee-time parcel-bundler -D
```

以下のファイル構造で用意します。  
( `npx am-coffee-time generate-template` でも作成可能です。)

```shell
# モック
mock/
  pattern.yml # パターンリスト表示用
  config.js # アプリケーションモック設定用

# アプリケーション本体
src/
  index.html
  app.js
```

作成後、以下のコマンドでparcelサーバーが立ち上がり、開発可能になります。  

```shell
npx am-coffee-time watch
# 出力パスは、デフォルトで `.am-coffee-time`に設定されていて、`.gitignore` に追加することを推奨します
```


また、ビルドのみの実行も可能です。
```shell
npx am-coffee-time build
```

`parcel` を自分で起動したい場合は、以下のオプションを使うことで、parcelの起動を止めます。
```shell
npx am-coffee-time watch --no-use-parcel
```

オプションの詳しい内容は `npx am-coffee-time help` でご覧くださいm(__)m

# config mock/pattern.yml
モックパターン一覧の表示に利用します。  
jsやjson等、import可能ファイルであれば何でも設定可能です。

以下が設定例です。
```yaml
Plan A:
  func: [setPlan, plan/a.json]
  view statistics:
    func: [click, statistics]
Plan B: [setPlan, plan/b.json]
plan C:
  funcs:
    - [setPlan, plan/c.json]
    - [waitForElement, error-modal]
    - [modal.close]
```

## reserved property
### func
配列の先頭に関数名、２つ目以降は、引数として扱われるものになります。
後述するactionを呼び出すトリガーになり、関数名は ドット `.` を繋げることで、object 階層を表すことが出来ます。  
[action property](#action-property)に直接この値を定義することで、 `func` propertyを省略できます。


### funcs
`func` を複数定義できます。  
funcと同様、省略可能です。

### switch
スイッチボタンによる、モック切り替えが可能です。  
switch配下の設定も他と同様で、新しく何かを覚える必要がありません。

### description
モック一覧の、横に表示するもの。改行ありです。yaml改行を使うと綺麗に書けます。  

## action property
reserved property以外は全てaction propertyとなり、pattern list表示用に利用されます。

# config mock/config.js
モックで呼び出される、アクション定義を設定します。

以下が設定例です。
```js
import { mock } from 'am-coffee-time'

const action = {
  async click (selector) {
    // wait selector
    // click selector
  },
  setPlan (planFile) {
    // set api callback to planFile object
  },
  async waitForElement (selector) {
    // await for specified selector
  },
  modal: {
    open () {
      // open modal action
    },
    close () {
      // close modal action
    }
  }
}

mock(action)
```

## mock(action: MockAction)
この関数を呼び出すことで、モック状態を生成します。

### MockAction
`func`で定義した関数名を、keyで持つobjectとなります。  
objectは階層を持つことが出来ます。その場合の `func` の指定は、 `func: [modal.open]` のように、 `.` でつなぎます。

# config src/index.html
こちらは、アプリケーション本体を配置します。  
parcelを利用する場合は、[parcel/Getting Started](https://parceljs.org/getting_started.html)を参考に出来ます。

# config src/index.js
上記ファイルから利用される、アプリケーション本体のjsとなります。  
am-coffee-timeでは、このjsに、モックアクションをinjectします。  
