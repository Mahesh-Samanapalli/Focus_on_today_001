// Sign up interactions
const USERS_STORAGE_KEY = 'focusOnTodayUsers';

function getStoredUsers() {
  try {
    const rawUsers = localStorage.getItem(USERS_STORAGE_KEY);
    const parsedUsers = rawUsers ? JSON.parse(rawUsers) : [];
    return Array.isArray(parsedUsers) ? parsedUsers : [];
  } catch (error) {
    return [];
  }
}

function saveUsers(users) {
  localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
}

const signupPasswordInput = document.getElementById('password');
const signupConfirmInput = document.getElementById('confirmPassword');
const signupTogglePasswordBtn = document.querySelector('.toggle-password');
const signupToggleConfirmBtn = document.querySelector('.toggle-confirm');
const signupStrengthFill = document.getElementById('strengthFill');
const signupStrengthLabel = document.getElementById('strengthLabel');
const signupMatchLabel = document.getElementById('matchLabel');
const signupForm = document.getElementById('signupForm');
const signupNameInput = document.getElementById('fullname');
const signupEmailInput = document.getElementById('email');
const signupTermsCheck = document.getElementById('termsCheck');
const signupMessage = document.getElementById('signupMessage');

function showSignupMessage(message, type) {
  if (!signupMessage) return;

  signupMessage.textContent = message;
  signupMessage.classList.add('is-visible');
  signupMessage.classList.remove('is-error', 'is-success');

  if (type === 'success') {
    signupMessage.classList.add('is-success');
  } else {
    signupMessage.classList.add('is-error');
  }
}

if (signupTogglePasswordBtn && signupPasswordInput) {
  signupTogglePasswordBtn.addEventListener('click', function () {
    signupPasswordInput.type = signupPasswordInput.type === 'password' ? 'text' : 'password';
  });
}

if (signupToggleConfirmBtn && signupConfirmInput) {
  signupToggleConfirmBtn.addEventListener('click', function () {
    signupConfirmInput.type = signupConfirmInput.type === 'password' ? 'text' : 'password';
  });
}

if (signupPasswordInput && signupStrengthFill && signupStrengthLabel) {
  signupPasswordInput.addEventListener('input', function () {
    const val = signupPasswordInput.value;
    let strength = 0;

    if (val.length >= 8) strength++;
    if (/[A-Z]/.test(val)) strength++;
    if (/[0-9]/.test(val)) strength++;
    if (/[^A-Za-z0-9]/.test(val)) strength++;

    const levels = ['', 'Weak', 'Fair', 'Good', 'Strong'];
    const colors = ['', '#e53935', '#fb8c00', '#43a047', '#48A300'];
    const widths = ['0%', '25%', '50%', '75%', '100%'];

    signupStrengthFill.style.width = widths[strength];
    signupStrengthFill.style.backgroundColor = colors[strength];
    signupStrengthLabel.textContent = strength > 0 ? levels[strength] : '';
    signupStrengthLabel.style.color = colors[strength];
  });
}

if (signupConfirmInput && signupPasswordInput && signupMatchLabel) {
  signupConfirmInput.addEventListener('input', function () {
    const passwordValue = signupPasswordInput.value;

    if (signupConfirmInput.value === '') {
      signupMatchLabel.textContent = '';
      return;
    }

    if (signupConfirmInput.value === passwordValue) {
      signupMatchLabel.textContent = 'Passwords match';
      signupMatchLabel.style.color = '#48A300';
    } else {
      signupMatchLabel.textContent = 'Passwords do not match';
      signupMatchLabel.style.color = '#e53935';
    }
  });
}

if (
  signupForm &&
  signupNameInput &&
  signupEmailInput &&
  signupPasswordInput &&
  signupConfirmInput &&
  signupTermsCheck
) {
  signupForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const name = signupNameInput.value.trim();
    const email = signupEmailInput.value.trim().toLowerCase();
    const password = signupPasswordInput.value;
    const confirm = signupConfirmInput.value;
    const terms = signupTermsCheck.checked;

    if (!name || !email || !password || !confirm) {
      showSignupMessage('Please fill in all required fields.', 'error');
      return;
    }

    if (!terms) {
      showSignupMessage('Please accept Terms of Service and Privacy Policy.', 'error');
      return;
    }

    if (password !== confirm) {
      showSignupMessage('Passwords do not match.', 'error');
      return;
    }

    const users = getStoredUsers();
    const existingUser = users.find(function (user) {
      return user.email === email;
    });

    if (existingUser) {
      showSignupMessage('An account with this email already exists. Please sign in.', 'error');
      return;
    }

    users.push({
      name: name,
      email: email,
      password: password,
      lastLoginAt: null,
    });

    saveUsers(users);
    const nowIso = new Date().toISOString();
    localStorage.setItem(
      'focusOnTodayCurrentUser',
      JSON.stringify({
        name: name,
        email: email,
        lastLoginAt: null,
        loggedInAt: nowIso,
      })
    );

    showSignupMessage('Account created successfully. Redirecting...', 'success');
    window.setTimeout(function () {
      window.location.href = 'index.html';
    }, 900);
  });
}
