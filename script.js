/**
 * 定数管理
 */
const CONFIG = {
    SHAKE_DURATION: 1000,
    SPIN_DURATION: 2000,
    SPIN_INTERVAL: 30,
    IMAGE_COUNT: 7,
    BASE_PATH: "./images/omikuji-",
    DEFAULT_IMAGE: "./images/omikuji.png",
    RESULTS: ["大凶", "凶", "末吉", "吉", "小吉", "中吉", "大吉"]
  };
  
  /**
   * DOM要素
   */
  const elements = {
    btn: document.querySelector("#js-button"),
    resultArea: document.querySelector(".omikuji-result"),
    resultImg: document.querySelector("#js-result"),
    resultText: document.querySelector("#js-result-text")
  };
  
  /**
   * ユーティリティ
   */
  const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));
  
  const getRandomIndex = (max) => Math.floor(Math.random() * max);
  
  /**
   * 画像のプリロード
   */
  function preloadImages() {
    for (let i = 0; i < CONFIG.IMAGE_COUNT; i++) {
      new Image().src = `${CONFIG.BASE_PATH}${i}.png`;
    }
  }
  
  /**
   * ボタンの状態管理
   */
  function setButtonState(isEnabled) {
    const { btn } = elements;
    btn.disabled = !isEnabled;
    // CSSの :disabled 疑似クラスに任せるのが理想ですが、念のためJSでも制御
    btn.style.pointerEvents = isEnabled ? "auto" : "none";
  }
  
  /**
   * ルーレット実行処理
   * @returns {number} 最終的に表示された画像の番号
   */
  async function startRoulette() {
    const { resultImg } = elements;
    let lastNumber = 0;
  
    resultImg.classList.add("is-spinning");
  
    const timerId = setInterval(() => {
      lastNumber = getRandomIndex(CONFIG.IMAGE_COUNT);
      resultImg.src = `${CONFIG.BASE_PATH}${lastNumber}.png`;
    }, CONFIG.SPIN_INTERVAL);
  
    await wait(CONFIG.SPIN_DURATION);
  
    clearInterval(timerId);
    resultImg.classList.remove("is-spinning");
    
    return lastNumber;
  }
  
  /**
   * メインロジック
   */
  async function playOmikuji() {
    const { btn, resultArea, resultImg, resultText } = elements;
  
    // 1. 初期化
    setButtonState(false);
    resultText.classList.remove("is-visible");
    resultImg.src = CONFIG.DEFAULT_IMAGE;
    
    // 2. シェイク演出
    resultArea.classList.remove("is-shaking");
    void resultArea.offsetWidth; // 強制再描画
    resultArea.classList.add("is-shaking");
  
    await wait(CONFIG.SHAKE_DURATION);
  
    // 3. ルーレット開始
    const resultIndex = await startRoulette();
  
    // 4. 演出終了
    resultArea.classList.remove("is-shaking");
    
    // 5. 結果表示
    resultText.textContent = CONFIG.RESULTS[resultIndex];
    resultText.classList.add("is-visible");
    
    // 6. 完了
    btn.textContent = "もう一度引く";
    setButtonState(true);
  }
  
  // 初期実行
  preloadImages();
  elements.btn.addEventListener("click", playOmikuji);
