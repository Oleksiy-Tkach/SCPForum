document.addEventListener('DOMContentLoaded', function() {
  // Анімація рівня безпеки
  const securityLevel = document.getElementById('securityLevel');
  const levelText = document.getElementById('levelText');
  
  setTimeout(() => {
    securityLevel.style.width = '75%';
    levelText.textContent = '3/5';
  }, 500);

  // Перемикання видимості пароля
  const togglePassword = document.querySelector('.toggle-password');
  const passwordInput = document.getElementById('password');
  
  togglePassword.addEventListener('click', function() {
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);
    this.innerHTML = type === 'password' ? '<i class="fas fa-eye"></i>' : '<i class="fas fa-eye-slash"></i>';
  });

  // Обробка форми входу
  const loginForm = document.getElementById('loginForm');
  const scpAlert = document.getElementById('scpAlert');
  const alertMessage = document.getElementById('alertMessage');
  
  loginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const username = this.username.value.trim();
    const password = this.password.value;
    const remember = this.remember.checked;
    
    // Валідація
    if (!username || !password) {
      showAlert('Будь ласка, заповніть всі поля');
      return;
    }
    
    // Симуляція запиту до сервера
    simulateLogin(username, password, remember);
  });
  
  // Функція для показу сповіщення
  function showAlert(message) {
    alertMessage.textContent = message;
    scpAlert.style.display = 'flex';
    
    setTimeout(() => {
      scpAlert.style.display = 'none';
    }, 5000);
  }
  
  // Симуляція входу (замініть на реальний запит до API)
  function simulateLogin(username, password, remember) {
    // Показуємо завантаження
    const loginBtn = document.querySelector('.login-btn');
    const originalText = loginBtn.innerHTML;
    loginBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> ПЕРЕВІРКА ДОСТУПУ...';
    loginBtn.disabled = true;
    
    // Симулюємо затримку мережі
    setTimeout(() => {
      // Тут має бути реальний запит до API
      // fetch('/api/login', { method: 'POST', body: JSON.stringify({ username, password }) })
      
      // Приклад успішної авторизації
      if (username === "admin" && password === "securepassword") {
        showAlert('ДОСТУП НАДАНО | РІВЕНЬ 4');
        
        // Зберігаємо в localStorage, якщо обрано "Запам'ятати мене"
        if (remember) {
          localStorage.setItem('scp_remember', 'true');
          localStorage.setItem('scp_username', username);
        }
        
        // Перенаправляємо на захищену сторінку
        setTimeout(() => {
          window.location.href = 'dashboard.html';
        }, 1500);
      } else {
        showAlert('ДОСТУП ЗАБОРОНЕНО | НЕВІРНІ ОБЛІКОВІ ДАНІ');
        loginBtn.innerHTML = originalText;
        loginBtn.disabled = false;
      }
    }, 1500);
  }
  
  // Заповнюємо поле імені, якщо є збережені дані
  if (localStorage.getItem('scp_remember') === 'true') {
    const savedUsername = localStorage.getItem('scp_username');
    if (savedUsername) {
      document.getElementById('username').value = savedUsername;
      document.getElementById('remember').checked = true;
    }
  }
});