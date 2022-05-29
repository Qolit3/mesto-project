const profileForm = document.querySelector('#editForm');
const profileNameInput = profileForm.querySelector('#editName');

function showError(form, element, er) {
  const errorText = form.querySelector(`#${element.id}Validate`);

  element.classList.add('popup__input_er');
  console.log(er);
  errorText.textContent = er;
  errorText.classList.add('popup__validate_active');
}

function hideError(form, element) {
  const errorText = form.querySelector(`#${element.id}Validate`);

  element.classList.remove('popup__input_er');
  errorText.classList.remove('popup__validate_active');
  errorText.textContent = '';
}

function isValid(form, element) {
  if (!element.validity.valid) {
    showError(form, element, element.validationMessage);
  } else {
    hideError(form, element);
  }
};

function invalidInput(list) {
  return list.some((element) => {
    return !element.validity.valid;
  })
};

function toggleButton(list, button) {
  if (invalidInput(list)) {
    button.disabled = true;
    button.classList.add('popup__save_inactive');
  } else {
    button.disabled = false;
    button.classList.remove('popup__save_inactive');
  }
}

function setInputListeners(form) {
  const inputList = Array.from(form.querySelectorAll('.popup__input'));  
  const submitButton = form.querySelector('.popup__save');
  toggleButton(inputList, submitButton)

  inputList.forEach((element) => {
    element.addEventListener('input', () => {
      isValid(form, element)
      toggleButton(inputList, submitButton)
    })
  });
};

function validateAllforms() {
  const formList = Array.from(document.querySelectorAll('.popup__form'));

  formList.forEach((form) => {
    form.addEventListener('submit', (evt) => evt.preventDefault()
  );

  setInputListeners(form);
  });
}

export {validateAllforms};