import throttle from 'lodash.throttle';

const form = document.querySelector(`form`);
const emailInput = document.querySelector(`[name=email]`);
const messageInput = document.querySelector(`[name=message]`);

function handleListener() {
  const {
    elements: { email, message },
  } = form;
  const userData = {
    email: email.value,
    message: message.value,
  };
  localStorage.setItem('userData', JSON.stringify(userData));
}

if (localStorage.length === 0) {
  form.reset();
} else {
  emailInput.value = JSON.parse(localStorage.getItem(`userData`)).email;
  messageInput.value = JSON.parse(localStorage.getItem(`userData`)).message;
}

form.addEventListener(`submit`, event => {
  event.preventDefault();
  if (form.email.value === '' || form.message.value.length === 0) {
    console.log(`Заповніть обидва поля, будь ласка`);
  } else {
    console.log(localStorage.getItem('userData'));
    form.reset();
    localStorage.removeItem('userData');
  }
});

form.addEventListener(`input`, throttle(handleListener, 500));
