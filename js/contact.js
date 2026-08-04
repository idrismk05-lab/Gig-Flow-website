// contact.js — real-time validation for the Contact page

const fullNameInput = document.getElementById('fullName');
const emailInput = document.getElementById('email');
const subjectInput = document.getElementById('subject');
const messageInput = document.getElementById('message');

const fullNameError = document.getElementById('fullNameError');
const emailError = document.getElementById('emailError');
const subjectError = document.getElementById('subjectError');
const messageError = document.getElementById('messageError');

function setError(input, errorEl, isValid, message) {
  if (input.value.trim() === '') {
    input.classList.remove('invalid');
    errorEl.textContent = '';
    return;
  }
  if (isValid) {
    input.classList.remove('invalid');
    errorEl.textContent = '';
  } else {
    input.classList.add('invalid');
    errorEl.textContent = message;
  }
}

function validateName() {
  const value = fullNameInput.value.trim();
  setError(fullNameInput, fullNameError, value.length >= 3, 'Please enter your full name.');
}

function validateEmail() {
  const value = emailInput.value.trim();
  const isValid = value.includes('@') && value.includes('.');
  setError(emailInput, emailError, isValid, 'Please enter a valid email address.');
}

function validateSubject() {
  subjectError.textContent = subjectInput.value === '' ? '' : '';
}

function validateMessage() {
  const value = messageInput.value.trim();
  setError(messageInput, messageError, value.length >= 10, 'Message should be at least 10 characters.');
}

fullNameInput.addEventListener('input', validateName);
emailInput.addEventListener('input', validateEmail);
messageInput.addEventListener('input', validateMessage);

document.getElementById('contactForm').addEventListener('submit', (e) => {
  e.preventDefault();

  validateName();
  validateEmail();
  validateMessage();

  let hasError = false;

  if (fullNameInput.value.trim().length < 3) {
    fullNameError.textContent = 'Please enter your full name.';
    fullNameInput.classList.add('invalid');
    hasError = true;
  }
  if (!emailInput.value.includes('@') || !emailInput.value.includes('.')) {
    emailError.textContent = 'Please enter a valid email address.';
    emailInput.classList.add('invalid');
    hasError = true;
  }
  if (subjectInput.value === '') {
    subjectError.textContent = 'Please choose a subject.';
    hasError = true;
  }
  if (messageInput.value.trim().length < 10) {
    messageError.textContent = 'Message should be at least 10 characters.';
    messageInput.classList.add('invalid');
    hasError = true;
  }

  if (!hasError) {
    alert('Message sent! (This is a demo — no data is actually sent anywhere.)');
    e.target.reset();
  }
});
