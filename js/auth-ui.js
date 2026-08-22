(function () {
  'use strict';

  function initAuthUI() {
    const firebase = window.BumbleFirebase;
    if (!firebase) return;

    const navActions = document.querySelector('.nav-actions');
    if (!navActions) return;

    const authButton = document.createElement('button');
    authButton.type = 'button';
    authButton.id = 'authUserButton';
    authButton.className = 'btn btn-secondary btn-sm auth-user-button';
    authButton.textContent = 'تسجيل الدخول';
    const accountMenu = document.createElement('div');
    accountMenu.className = 'account-menu-container';
    accountMenu.appendChild(authButton);

    const accountDropdown = document.createElement('div');
    accountDropdown.className = 'account-dropdown';
    accountDropdown.hidden = true;
    accountDropdown.innerHTML = `
      <a href="profile.html" class="account-dropdown-item">👤 <span>بروفايلي</span></a>
      <button type="button" class="account-dropdown-item account-logout-btn">↪ <span>تسجيل خروج</span></button>`;
    accountMenu.appendChild(accountDropdown);
    navActions.insertBefore(accountMenu, navActions.querySelector('#hamburgerBtn'));

    const logoutButton = accountDropdown.querySelector('.account-logout-btn');

    const modal = document.createElement('div');
    modal.className = 'order-modal-backdrop';
    modal.id = 'authModalBackdrop';
    modal.innerHTML = `
      <div class="order-modal auth-modal" role="dialog" aria-modal="true" aria-labelledby="authModalTitle">
        <button class="modal-close-btn" id="closeAuthModalBtn" type="button" aria-label="إغلاق">&times;</button>
        <div class="modal-header">
          <h3 class="modal-title" id="authModalTitle">تسجيل الدخول إلى Bumble Burger</h3>
        </div>
        <button class="btn btn-secondary btn-lg auth-google-btn" id="googleSignInBtn" type="button">
          <img class="google-logo" src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" />
          <span>تسجيل الدخول باستخدام Google</span>
        </button>
        <div class="auth-divider"><span>أو باستخدام البريد الإلكتروني</span></div>
        <div class="form-group">
          <label class="form-label" for="authEmailInput">البريد الإلكتروني</label>
          <input class="form-input" id="authEmailInput" type="email" autocomplete="email" placeholder="name@example.com" required />
        </div>
        <div class="form-group">
          <label class="form-label" for="authPasswordInput">كلمة المرور</label>
          <input class="form-input" id="authPasswordInput" type="password" autocomplete="current-password" placeholder="أدخل كلمة المرور" required />
        </div>
        <button class="btn btn-primary btn-lg" id="emailSignInBtn" type="submit">تسجيل الدخول</button>
        <p class="auth-status" id="authStatus" role="status"></p>
      </div>`;
    document.body.appendChild(modal);

    const status = document.getElementById('authStatus');
    const emailInput = document.getElementById('authEmailInput');
    const passwordInput = document.getElementById('authPasswordInput');

    function setStatus(message, isError) {
      status.textContent = message;
      status.classList.toggle('error', Boolean(isError));
    }

    function openModal() {
      modal.classList.add('open');
      document.body.style.overflow = 'hidden';
      emailInput.focus();
    }

    function closeModal() {
      modal.classList.remove('open');
      document.body.style.overflow = '';
      setStatus('', false);
    }

    function renderUser(user) {
      window.BumbleAuthUser = user || null;
      window.BumbleUserProfile = null;
      authButton.replaceChildren();
      if (user) {
        if (user.photoURL) {
          const avatar = document.createElement('img');
          avatar.src = user.photoURL;
          avatar.alt = '';
          avatar.className = 'auth-avatar';
          authButton.appendChild(avatar);
        } else {
          const placeholder = document.createElement('span');
          placeholder.className = 'auth-avatar auth-avatar-placeholder';
          placeholder.textContent = '👤';
          authButton.appendChild(placeholder);
        }
        const label = document.createElement('span');
        label.textContent = user.displayName || user.phoneNumber || 'حسابي';
        authButton.appendChild(label);
      } else {
        authButton.textContent = 'تسجيل الدخول';
      }
      authButton.classList.toggle('is-authenticated', Boolean(user));
      accountDropdown.hidden = true;
      window.dispatchEvent(new CustomEvent('bumble-auth-changed', { detail: user || null }));

      if (user && firebase.getUserProfile) {
        firebase.getUserProfile(user.uid).then(profile => {
          window.BumbleUserProfile = profile || null;
          window.dispatchEvent(new CustomEvent('bumble-profile-loaded', { detail: profile || null }));
        }).catch(error => console.error('Failed to load user profile', error));
      }
    }

    authButton.addEventListener('click', function () {
      if (window.BumbleAuthUser) {
        accountDropdown.hidden = !accountDropdown.hidden;
      } else {
        openModal();
      }
    });

    logoutButton.addEventListener('click', async function () {
      try {
        await firebase.signOut(firebase.auth);
        accountDropdown.hidden = true;
      } catch (error) {
        console.error('Sign-out failed', error);
        setStatus('تعذر تسجيل الخروج. حاول مرة أخرى.', true);
      }
    });

    document.addEventListener('click', function (event) {
      if (!accountMenu.contains(event.target)) accountDropdown.hidden = true;
    });
    document.getElementById('closeAuthModalBtn').addEventListener('click', closeModal);
    modal.addEventListener('click', event => {
      if (event.target === modal) closeModal();
    });

    document.getElementById('googleSignInBtn').addEventListener('click', async function () {
      setStatus('جارٍ تسجيل الدخول...', false);
      try {
        await firebase.signInWithPopup(firebase.auth, firebase.googleProvider);
        closeModal();
      } catch (error) {
        console.error('Google sign-in failed', error);
        setStatus('تعذر تسجيل الدخول باستخدام Google. حاول مرة أخرى.', true);
      }
    });

    document.getElementById('emailSignInBtn').addEventListener('click', async function (event) {
      event.preventDefault();
      const email = emailInput.value.trim();
      const password = passwordInput.value;
      if (!email || !password) {
        setStatus('أدخل البريد الإلكتروني وكلمة المرور.', true);
        return;
      }
      setStatus('جارٍ تسجيل الدخول...', false);
      try {
        await firebase.signInWithEmailAndPassword(firebase.auth, email, password);
        closeModal();
      } catch (error) {
        console.error('Email sign-in failed', error);
        setStatus('البريد الإلكتروني أو كلمة المرور غير صحيحة.', true);
      }
    });

    firebase.onAuthStateChanged(firebase.auth, renderUser);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAuthUI, { once: true });
  } else {
    initAuthUI();
  }
})();