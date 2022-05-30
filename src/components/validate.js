function showError(form, element, er, settings) {
  const errorText = form.querySelector(`#${element.id}Validate`);

  element.classList.add(settings.inputErrorClass);
  errorText.textContent = er;
  errorText.classList.add(settings.errorClass);
}

function hideError(form, element, settings) {
  const errorText = form.querySelector(`#${element.id}Validate`);

  element.classList.remove(settings.inputErrorClass);
  errorText.classList.remove(settings.errorClass);
  errorText.textContent = '';
}

function isValid(form, element, settings) {
  if (!element.validity.valid) {
    showError(form, element, element.validationMessage, settings);
  } else {
    hideError(form, element, settings);
  }
};

function isInputValid(list) {
  return list.some((element) => {
    return !element.validity.valid;
  })
};

function toggleButton(list, button, settings) {
  if (isInputValid(list, settings)) {
    button.disabled = true;
    button.classList.add(settings.inactiveButtonClass);
  } else {
    button.disabled = false;
    button.classList.remove(settings.inactiveButtonClass);
  }
}

function setInputListeners(form, settings) {
  const inputList = Array.from(form.querySelectorAll(settings.inputSelector));  
  const submitButton = form.querySelector(settings.submitButtonSelector);
  toggleButton(inputList, submitButton, settings)

  inputList.forEach((element) => {
    element.addEventListener('input', () => {
      isValid(form, element, settings);
      toggleButton(inputList, submitButton, settings);
    })
  });
};

function enableValidation(settings) {
  const formList = Array.from(document.querySelectorAll(settings.formSelector));
  formList.forEach((form) => {
    form.addEventListener('submit', (evt) => evt.preventDefault()
  );
  setInputListeners(form, settings);
  });
}

export {enableValidation, toggleButton};