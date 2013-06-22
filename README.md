# Image Preloader

イメージをバックグラウンドでロードするためのライブラリです。

## 注意事項

このモジュールは作者の業務上の必要により開発されたものです。お使いになっ
たり参考にされたりするのは自由ですが、業務関係者以外の質問などへの対応
は行いませんし、特に業務上の必要がない限り、機能拡張などは行われないか
もしれません。

## ロード

普通にロードしてください。

```html
<script src="preloader.js"></script>
```

グローバルにev_preloadという関数がexportされます。

あるいはRequireJS経由でロードしてください。

## 関数定義

``javascript
ev_preload(imgs, [opts])
```

### imgs

ロードする画像のURL文字列の配列を指定します。

falseの場合、配列でない場合、空配列の場合は何もせず終了します。

### opts

オプションを格納したオブジェクト、あるいは関数を渡します。

この引数が指定されなかった場合、falseの場合、関数あるいはオブジェクト
以外の場合は、空のオブジェクトが渡されたとみなします。

#### オブジェクトが指定された場合

指定できるオプションは下記のとおりです。

- `success` … それぞれの画像のロードに成功した場合、各画像ごとに呼ば
  れるコールバック関数。引数にはその画像のURLが渡されます。
- `error` … それぞれの画像のロードがエラーに成った場合、各画像ごとに
  呼ばれるコールバック関数。引数にはその画像のURLが渡されます。
- `abort` … それぞれの画像のロードが中断された場合、各画像ごとに呼ば
  れるコールバック関数。引数にはその画像のURLが渡されます。
- `done` … 成功失敗に関わらず、すべての画像のロードが終了した際に呼ば
  れるコールバック関数。引数には、成功した画像のURLの配列、エラーになっ
  た画像のURLの配列、中断された画像のURLの配列の３つの配列が渡されます。
- `complete` … すべての画像のロードが成功した場合にのみ呼ばれるコール
  バック関数。引数には全画像のURLの配列が渡されます。
- `debug` … trueの場合多少のログが出ます。デフォルトはfalseです。
  
いずれのコールバックも、指定されない場合は何も行いません。

#### 関数が指定された場合

上記の`done`コールバックとして扱います。

## サンプル

```html
    <script src="preloader.js"></script>
    <script>
    ev_preload(["https://www.google.co.jp/images/srpr/logo4w.png",
                "https://www.google.co.jp/images/srpr/logoxxx.png"
                ], {
      done: function(list1, list2, list3){
        console.log("done:");
        console.log(list1);
        console.log(list2);
        console.log(list3);
      },
      complete: function(list){
        console.log("complete:");
        console.log(list);
      },
      success: function(src){
        console.log("success: ");
        console.log(src);
      },
      error: function(src){
        console.log("error: ");
        console.log(src);
      }
    });
    </script>
```
