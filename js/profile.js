(function () {
  'use strict';

  function initProfilePage() {
    const firebase = window.BumbleFirebase;
    const form = document.getElementById('profileForm');
    const gate = document.getElementById('profileLoginGate');
    const content = document.getElementById('profileContent');
    const status = document.getElementById('profileStatus');
    if (!firebase || !form) return;

    const userName = document.getElementById('profileName');
    const userEmail = document.getElementById('profileEmail');
    const userPhoto = document.getElementById('profilePhoto');
    const phone = document.getElementById('profilePhone');
    const area = document.getElementById('profileArea');
    const address = document.getElementById('profileAddress');

    function setStatus(message, isError) {
      status.textContent = message;
      status.classList.toggle('error', Boolean(isError));
    }

    function fillProfile(user, profile) {
      userName.textContent = user.displayName || 'عميل Bumble Burger';
      userEmail.textContent = user.email || user.phoneNumber || 'حساب هاتف';
      userPhoto.src = user.photoURL || 'assets/images/favicon.svg';
      phone.value = profile && profile.phone ? profile.phone : user.phoneNumber || '+20';
      area.value = profile && profile.area ? profile.area : '';
      address.value = profile && profile.address ? profile.address : '';
    }

    firebase.onAuthStateChanged(firebase.auth, async user => {
      if (!user) {
        gate.hidden = false;
        content.hidden = true;
        return;
      }
      gate.hidden = true;
      content.hidden = false;
      try {
        const profile = await firebase.getUserProfile(user.uid);
        fillProfile(user, profile);
      } catch (error) {
        console.error('Failed to load profile', error);
        setStatus('تعذر تحميل بيانات الحساب. حاول مرة أخرى.', true);
      }
    });

    form.addEventListener('submit', async event => {
      event.preventDefault();
      const user = firebase.auth.currentUser;
      if (!user) return;
      const saveButton = document.getElementById('saveProfileBtn');
      saveButton.disabled = true;
      setStatus('جارٍ حفظ التغييرات...', false);
      try {
        await firebase.saveUserProfile(user.uid, {
          uid: user.uid,
          name: user.displayName || user.phoneNumber || '',
          email: user.email || '',
          phone: phone.value.trim(),
          area: area.value,
          address: address.value.trim()
        });
        window.BumbleUserProfile = {
          phone: phone.value.trim(),
          area: area.value,
          address: address.value.trim(),
          name: user.displayName || user.phoneNumber || ''
        };
        window.dispatchEvent(new CustomEvent('bumble-profile-loaded', { detail: window.BumbleUserProfile }));
        setStatus('تم حفظ بيانات حسابك بنجاح.', false);
        window.location.href = 'menu.html';
      } catch (error) {
        console.error('Failed to save profile', error);
        setStatus('تعذر حفظ التغييرات. حاول مرة أخرى.', true);
      } finally {
        saveButton.disabled = false;
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initProfilePage, { once: true });
  } else {
    initProfilePage();
  }
})();