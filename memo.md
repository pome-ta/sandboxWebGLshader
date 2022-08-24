# 📝 2022/08/21

[doxas/twigl: twigl.app is an online editor for One tweet shader, with gif generator and sound shader, and broadcast live coding.](https://github.com/doxas/twigl)

のベースから削っていく

[wgld.org | WebGL: MRT(Multiple render targets) |](https://wgld.org/d/webgl/w084.html)

## `div` -> `canvas` サイズが気持ち悪い件

``` .js
cxtCanvas.addEventListener('touchmove', (event) => {
  event.preventDefault();
});
```

## todo 2022/08/22

- mode を`enum` で書く？

# 📝 2022/08/12

## 更新可能にする？

[WebGL入門 (2) シェーダーを使用する｜まくろぐ](https://maku.blog/p/8s4uhzv/)

## 描画サイズ

`gl.viewport(0, 0, canvasW, canvasH);` でいけるかな？

# 📝 2022/07/31

## 比較する値

Sample で、小数点が色々でてくる

最適な値どころを知りたい
