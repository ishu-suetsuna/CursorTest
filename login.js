// ログイン画面のJavaScript
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const loginBtn = document.querySelector('.login-btn');
    const btnText = document.querySelector('.btn-text');
    const btnLoader = document.querySelector('.btn-loader');
    
    // ログインフォームの送信処理
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const remember = document.querySelector('input[name="remember"]').checked;
        
        // バリデーション
        if (!email || !password) {
            showNotification('メールアドレスとパスワードを入力してください', 'error');
            return;
        }
        
        // ローディング状態の表示
        setLoadingState(true);
        
        // 擬似的なログイン処理（実際のAPI呼び出しに置き換え）
        simulateLogin(email, password, remember);
    });
    
    // ローディング状態の切り替え
    function setLoadingState(isLoading) {
        if (isLoading) {
            btnText.style.display = 'none';
            btnLoader.style.display = 'block';
            loginBtn.disabled = true;
        } else {
            btnText.style.display = 'block';
            btnLoader.style.display = 'none';
            loginBtn.disabled = false;
        }
    }
    
    // 擬似的なログイン処理
    function simulateLogin(email, password, remember) {
        // 実際の実装では、ここでAPIを呼び出します
        setTimeout(() => {
            // ログイン成功のシミュレーション
            if (email && password) {
                showNotification('ログインに成功しました！', 'success');
                
                // ログイン情報を保存
                if (remember) {
                    localStorage.setItem('rememberLogin', 'true');
                    localStorage.setItem('userEmail', email);
                }
                
                // 音声ガイド一覧画面に遷移
                setTimeout(() => {
                    window.location.href = 'guide-list.html';
                }, 1500);
            } else {
                showNotification('ログインに失敗しました。入力内容を確認してください。', 'error');
                setLoadingState(false);
            }
        }, 2000);
    }
    
    // 通知の表示
    function showNotification(message, type) {
        // 既存の通知を削除
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }
        
        // 新しい通知を作成
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-message">${message}</span>
                <button class="notification-close">&times;</button>
            </div>
        `;
        
        // 通知を表示
        document.body.appendChild(notification);
        
        // アニメーション
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);
        
        // 閉じるボタンのイベント
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', () => {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
            }, 300);
        });
        
        // 自動で閉じる
        setTimeout(() => {
            if (notification.parentNode) {
                notification.classList.remove('show');
                setTimeout(() => {
                    if (notification.parentNode) {
                        notification.remove();
                    }
                }, 300);
            }
        }, 5000);
    }
    
    // 保存されたログイン情報の復元
    function restoreLoginInfo() {
        const rememberLogin = localStorage.getItem('rememberLogin');
        const userEmail = localStorage.getItem('userEmail');
        
        if (rememberLogin === 'true' && userEmail) {
            document.getElementById('email').value = userEmail;
            document.querySelector('input[name="remember"]').checked = true;
        }
    }
    
    // ページ読み込み時に保存された情報を復元
    restoreLoginInfo();
    
    // 入力フィールドのフォーカス効果
    const inputs = document.querySelectorAll('.form-group input');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            if (!this.value) {
                this.parentElement.classList.remove('focused');
            }
        });
    });
});

// 通知のスタイルを動的に追加
const notificationStyles = `
    .notification {
        position: fixed;
        top: 20px;
        right: 20px;
        background: white;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        padding: 16px 20px;
        max-width: 400px;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        z-index: 1000;
        border-left: 4px solid #667eea;
    }
    
    .notification.show {
        transform: translateX(0);
    }
    
    .notification-success {
        border-left-color: #48bb78;
    }
    
    .notification-error {
        border-left-color: #f56565;
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 12px;
    }
    
    .notification-message {
        color: #2d3748;
        font-size: 14px;
        line-height: 1.4;
    }
    
    .notification-close {
        background: none;
        border: none;
        font-size: 20px;
        color: #a0aec0;
        cursor: pointer;
        padding: 0;
        width: 24px;
        height: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 4px;
        transition: all 0.2s ease;
    }
    
    .notification-close:hover {
        background: #f7fafc;
        color: #4a5568;
    }
    
    .form-group.focused label {
        color: #667eea;
    }
    
    .form-group.focused input {
        border-color: #667eea;
    }
`;

// スタイルをheadに追加
const styleSheet = document.createElement('style');
styleSheet.textContent = notificationStyles;
document.head.appendChild(styleSheet);
