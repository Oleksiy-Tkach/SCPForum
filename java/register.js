document.addEventListener('DOMContentLoaded', function() {
  // Анімація рівня перевірки
  const securityLevel = document.getElementById('securityLevel');
  const levelText = document.getElementById('levelText');
  
  setTimeout(() => {
    securityLevel.style.width = '45%';
    levelText.textContent = '2/5';
  }, 500);

  // Перемикання видимості пароля
  const togglePassword = document.querySelector('.toggle-password');
  const passwordInput = document.getElementById('password');
  const confirmPasswordInput = document.getElementById('confirmPassword');
  
  togglePassword.addEventListener('click', function() {
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);
    confirmPasswordInput.setAttribute('type', type);
    this.innerHTML = type === 'password' ? '<i class="fas fa-eye"></i>' : '<i class="fas fa-eye-slash"></i>';
  });

  // Валідація пароля
  passwordInput.addEventListener('input', function() {
    checkPasswordStrength(this.value);
    validatePasswordMatch();
  });
  
  confirmPasswordInput.addEventListener('input', validatePasswordMatch);

  // Обробка форми реєстрації
  const registerForm = document.getElementById('registerForm');
  const scpAlert = document.getElementById('scpAlert');
  const alertMessage = document.getElementById('alertMessage');
  
  registerForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const username = this.username.value.trim();
    const password = this.password.value;
    const confirmPassword = this.confirmPassword.value;
    const clearanceLevel = this.clearanceLevel.value;
    const terms = this.terms.checked;
    
    // Валідація
    if (!username || !password || !confirmPassword || !clearanceLevel) {
      showAlert('Будь ласка, заповніть всі обов\'язкові поля');
      return;
    }
    
    if (!terms) {
      showAlert('Ви повинні погодитись з Протоколами безпеки');
      return;
    }
    
    if (password !== confirmPassword) {
      showAlert('Коди доступу не співпадають');
      return;
    }
    
    if (username.length < 5 || !/^[a-zA-Z0-9]+$/.test(username)) {
      showAlert('Ідентифікатор повинен містити мінімум 5 символів (лише латинські літери та цифри)');
      return;
    }
    
    if (password.length < 8) {
      showAlert('Код доступу повинен містити мінімум 8 символів');
      return;
    }
    
    // Симуляція реєстрації
    simulateRegistration(username, password, clearanceLevel);
  });
  
  // Функція для показу сповіщення
  function showAlert(message) {
    alertMessage.textContent = message;
    scpAlert.style.display = 'flex';
    
    setTimeout(() => {
      scpAlert.style.display = 'none';
    }, 5000);
  }
  
  // Перевірка надійності пароля
  function checkPasswordStrength(password) {
    const strengthBar = document.querySelector('.strength-bar');
    const strengthText = document.getElementById('strengthText');
    
    let strength = 0;
    if (password.length >= 8) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;
    
    const width = strength * 25;
    let color = '#c00';
    let text = 'Слабкий';
    
    if (strength === 2) {
      color = '#cc7700';
      text = 'Середній';
    } else if (strength === 3) {
      color = '#cccc00';
      text = 'Добрий';
    } else if (strength >= 4) {
      color = '#00cc00';
      text = 'Надійний';
    }
    
    strengthBar.style.width = width + '%';
    strengthBar.style.backgroundColor = color;
    strengthText.textContent = text;
    strengthText.style.color = color;
  }
  
  // Перевірка збігу паролів
  function validatePasswordMatch() {
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    if (password && confirmPassword && password !== confirmPassword) {
      document.getElementById('confirmPassword').style.borderColor = '#c00';
    } else {
      document.getElementById('confirmPassword').style.borderColor = password ? '#0c0' : '#333';
    }
  }
  
  // Симуляція реєстрації (замініть на реальний запит до API)
  function simulateRegistration(username, password, clearanceLevel) {
    // Показуємо завантаження
    const registerBtn = document.querySelector('.register-btn');
    const originalText = registerBtn.innerHTML;
    registerBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> ОБРОБКА ДАНИХ...';
    registerBtn.disabled = true;
    
    // Симулюємо затримку мережі
    setTimeout(() => {
      // Тут має бути реальний запит до API
      // fetch('/api/register', { method: 'POST', body: JSON.stringify({ username, password, clearanceLevel }) })
      
      // Приклад успішної реєстрації
      showAlert('РЕЄСТРАЦІЮ УСПІШНО ЗАВЕРШЕНО | ОЧІКУЙТЕ НА ПІДТВЕРДЖЕННЯ');
      
      // Перенаправляємо на сторінку входу
      setTimeout(() => {
        window.location.href = 'login.html';
      }, 2000);
    }, 2000);
  }
});