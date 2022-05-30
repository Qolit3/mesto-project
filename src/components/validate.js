

function showError(form, element, er, formSelector, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass) {
  const errorText = form.querySelector(`#${element.id}Validate`);

  element.classList.add(inputErrorClass);
  console.log(er);
  errorText.textContent = er;
  errorText.classList.add(errorClass);
}

function hideError(form, element, formSelector, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass) {
  const errorText = form.querySelector(`#${element.id}Validate`);

  element.classList.remove(inputErrorClass);
  errorText.classList.remove(errorClass);
  errorText.textContent = '';
}

function isValid(form, element, formSelector, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass) {
  if (!element.validity.valid) {
    showError(form, element, element.validationMessage, formSelector, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass);
  } else {
    hideError(form, element, formSelector, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass);
  }
};

function invalidInput(list, formSelector, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass) {
  return list.some((element) => {
    return !element.validity.valid;
  })
};

function toggleButton(list, button, formSelector, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass) {
  if (invalidInput(list, formSelector, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass)) {
    button.disabled = true;
    button.classList.add(inactiveButtonClass);
  } else {
    button.disabled = false;
    button.classList.remove(inactiveButtonClass);
  }
}

function setInputListeners(form, formSelector, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass) {
  const inputList = Array.from(form.querySelectorAll(inputSelector));  
  const submitButton = form.querySelector(submitButtonSelector);
  toggleButton(inputList, submitButton, formSelector, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass)

  inputList.forEach((element) => {
    element.addEventListener('input', () => {
      isValid(form, element, formSelector, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass);
      toggleButton(inputList, submitButton, formSelector, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass);
    })
  });
};

function validateAllforms({formSelector, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass}) {
  const formList = Array.from(document.querySelectorAll(formSelector));

  formList.forEach((form) => {
    form.addEventListener('submit', (evt) => evt.preventDefault()
  );

  setInputListeners(form, formSelector, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass);
  });
}

export {validateAllforms};