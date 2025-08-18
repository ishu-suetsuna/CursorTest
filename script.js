(function() {
  const progressEl = document.getElementById('progress');
  let n = 0;
  const timer = setInterval(() => {
    n += Math.ceil(Math.random() * 7);
    if (n >= 95) n = 95; // 実ロード完了まで上げ過ぎない
    if (progressEl) progressEl.textContent = String(n);
  }, 220);

  // 実アプリの初期化完了を想定
  window.addEventListener('load', () => {
    // 擬似的に遅延（デモ用）
    setTimeout(() => {
      clearInterval(timer);
      if (progressEl) progressEl.textContent = '100';
      const loading = document.getElementById('loading');
      if (!loading) return;
      loading.style.transition = 'opacity 240ms ease, visibility 0s linear 240ms';
      loading.style.opacity = '0';
      loading.style.visibility = 'hidden';
    }, 600);
  });
})();
