// Sign in interactions
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

const signinToggleBtn = document.querySelector('.toggle-password');
const signinPasswordInput = document.getElementById('password');
const signinForm = document.getElementById('signinForm');
const signinEmailInput = document.getElementById('email');
const signinMessage = document.getElementById('signinMessage');

function showSigninMessage(message, type) {
  if (!signinMessage) return;

  signinMessage.textContent = message;
  signinMessage.classList.add('is-visible');
  signinMessage.classList.remove('is-error', 'is-success');

  if (type === 'success') {
    signinMessage.classList.add('is-success');
  } else {
    signinMessage.classList.add('is-error');
  }
}

if (signinToggleBtn && signinPasswordInput) {
  signinToggleBtn.addEventListener('click', function () {
    signinPasswordInput.type = signinPasswordInput.type === 'password' ? 'text' : 'password';
  });
}

if (signinForm && signinEmailInput && signinPasswordInput) {
  signinForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const email = signinEmailInput.value.trim().toLowerCase();
    const password = signinPasswordInput.value;

    if (!email || !password) {
      showSigninMessage('Please enter both email and password.', 'error');
      return;
    }

    const users = getStoredUsers();
    const matchedUserIndex = users.findIndex(function (user) {
      return user.email === email && user.password === password;
    });
    const matchedUser = matchedUserIndex > -1 ? users[matchedUserIndex] : null;

    if (!matchedUser) {
      showSigninMessage('Invalid email or password. Please try again.', 'error');
      return;
    }

    const previousLoginAt = matchedUser.lastLoginAt || null;
    const nowIso = new Date().toISOString();

    users[matchedUserIndex] = {
      ...matchedUser,
      lastLoginAt: nowIso,
    };
    saveUsers(users);

    localStorage.setItem(
      'focusOnTodayCurrentUser',
      JSON.stringify({
        name: matchedUser.name,
        email: matchedUser.email,
        lastLoginAt: previousLoginAt,
        loggedInAt: nowIso,
      })
    );

    showSigninMessage('Sign in successful. Redirecting...', 'success');
    console.log('Signed in user:', { email: matchedUser.email });
    window.setTimeout(function () {
      window.location.href = 'index.html';
    }, 700);
  });
}
