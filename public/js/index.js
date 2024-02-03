import '@babel/polyfill';
import { login, logout } from './login';
import { displayMap } from './mapbox';
import { updateSetting } from './updateSetting';

const Mapbox = document.getElementById('map');
if (Mapbox) {
  const locations = JSON.parse(Mapbox.dataset.locations);
  displayMap(locations);
}
const LoginForm = document.querySelector('.form--login');
if (LoginForm) {
  LoginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    login(email, password);
  });
}
const Logout = document.querySelector('.nav__el--logout');
if (Logout) {
  Logout.addEventListener('click', logout);
}
const sendData = document.querySelector('.form-user-data');
if (sendData) {
  const updatedUser = sendData.addEventListener('submit', (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append('name', document.getElementById('name').value);
    form.append('email', document.getElementById('email').value);
    form.append('photo', document.getElementById('photo').files[0]);
    updateSetting(form, 'data');
  });
}
const sendPassword = document.querySelector('.form-user-password');
if (sendPassword) {
  const updatePassword = sendPassword.addEventListener('submit', async (e) => {
    e.preventDefault();
    const text = document.querySelector('.sav-pass-btn');
    text.textContent = 'Updating.....';
    const passwordCurrent = document.getElementById('password-current').value;
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('password-confirm').value;
    await updateSetting(
      { passwordCurrent, password, passwordConfirm },
      'password'
    );
    document.getElementById('password-current').value = '';
    document.getElementById('password').value = '';
    document.getElementById('password-confirm').value = '';
    text.textContent = 'save password';
  });
}
