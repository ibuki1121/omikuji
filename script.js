const btn = document.querySelector("#js-button");

/**
 * 0〜6のランダムな数字を生成し、おみくじ結果画像のパスを返す
 */
function getRandomImage() {
  const number = Math.floor(Math.random() * 7);
  return "./images/omikuji-" + number + ".png";
}

/**
 * おみくじを実行するメイン関数
 */
function playOmikuji() {
  const resultArea = document.querySelector(".omikuji-result");
  const resultImg = document.querySelector("#js-result");

  // --- 1. 状態の初期化 ---
  // ボタンを無効化（連打防止）
  btn.disabled = true;
  btn.style.opacity = "0.5";
  btn.style.cursor = "not-allowed";

  // 画像を初期の「箱」に戻す
  resultImg.setAttribute("src", "./images/omikuji.png");

  // シェイクアニメーションをリセットして実行
  resultArea.classList.remove("is-shaking");
  void resultArea.offsetWidth; // おまじない（再描画を強制してアニメーションを最初から動かす）
  resultArea.classList.add("is-shaking");

  // --- 2. シェイク終了後にルーレット開始 ---
  // CSSで shake 0.5s を 2回設定しているので、合計 1000ms(1秒) 後に実行
  setTimeout(function () {
    
    // 画像を高速で切り替える（ルーレット）
    const slotAnimationTimer = setInterval(function () {
      resultImg.setAttribute("src", getRandomImage());
    }, 100);

    // --- 3. ルーレットを止める ---
    // 2秒間ルーレットを回した後に停止させる
    setTimeout(function () {
      clearInterval(slotAnimationTimer);
      
      // アニメーション用クラスを外す
      resultArea.classList.remove("is-shaking");
      
      // ボタンを再度有効化
      btn.disabled = false;
      btn.style.opacity = "1";
      btn.style.cursor = "pointer";
    }, 2000); // ここでルーレットの長さを調整（2000 = 2秒）

  }, 1000); // ここでシェイクを待つ時間を調整（1000 = 1秒）
}

// ボタンクリック時に実行
btn.addEventListener("click", playOmikuji);
