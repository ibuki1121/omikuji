const btn = document.querySelector("#js-button");

function getRandomImage() {
  const number = Math.floor(Math.random() * 7);
  return "./images/omikuji-" + number + ".png";
}

function playOmikuji() {
  const resultArea = document.querySelector(".omikuji-result");
  const resultImg = document.querySelector("#js-result");

  // 初期化
  btn.disabled = true;
  btn.style.opacity = "0.5";
  resultImg.setAttribute("src", "./images/omikuji.png");
  
  // シェイク開始
  resultArea.classList.remove("is-shaking");
  void resultArea.offsetWidth;
  resultArea.classList.add("is-shaking");

  // 1秒後（シェイク終了後）にルーレット開始
  setTimeout(function () {
    // なめらかに見せるためのクラスを追加
    resultImg.classList.add("is-spinning");

    const slotAnimationTimer = setInterval(function () {
      resultImg.setAttribute("src", getRandomImage());
    }, 30); // 高速切り替え

    // 2秒間回す
    setTimeout(function () {
      clearInterval(slotAnimationTimer);
      
      // 演出クラスをすべて削除
      resultImg.classList.remove("is-spinning");
      resultArea.classList.remove("is-shaking");
      
      btn.disabled = false;
      btn.style.opacity = "1";

      alert("おみくじの結果が出ました！");
    }, 2000);

  }, 1000);

  
}

btn.addEventListener("click", playOmikuji);
