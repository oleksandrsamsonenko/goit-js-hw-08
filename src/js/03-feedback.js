import throttle from 'lodash.throttle';

const form = document.querySelector(`form`);
const emailInput = document.querySelector(`[name=email]`);
const messageInput = document.querySelector(`[name=message]`);

function handleListener() {
  const {
    elements: { email, message },
  } = form;
  localStorage.setItem(
    'feedback-form-state',
    JSON.stringify({ email: email.value, message: message.value })
  );
}

if (JSON.parse(localStorage.getItem(`feedback-form-state`)) === null) {
  form.reset();
} else {
  emailInput.value = JSON.parse(
    localStorage.getItem(`feedback-form-state`)
  ).email;
  messageInput.value = JSON.parse(
    localStorage.getItem(`feedback-form-state`)
  ).message;
}

form.addEventListener(`submit`, event => {
  event.preventDefault();
  if (form.email.value === '' || form.message.value.length === 0) {
    console.log(`Заповніть обидва поля, будь ласка`);
  } else {
    console.log(localStorage.getItem('feedback-form-state'));
    form.reset();
    localStorage.removeItem('feedback-form-state');
  }
});

form.addEventListener(`input`, throttle(handleListener, 500));
