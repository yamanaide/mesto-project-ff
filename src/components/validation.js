export const enableValidation = (options) => {
  const forms = Array.from(document.querySelectorAll(options.formSelector))

  forms.forEach(formElement => setEventListeners(formElement, options))
}


const setEventListeners = (formElement, options) => {
  const inputList = Array.from(formElement.querySelectorAll(options.inputSelector));
  const buttonElement = formElement.querySelector(options.submitButtonSelector);

  inputList.forEach(inputElement => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement, options);

      toggleButtonState(inputList, buttonElement, options);
    });
  });
}; 


const isValid = (formElement, inputElement, options) => {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errormessage);
  } else {
    inputElement.setCustomValidity("");
  }

  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, options);
  } else {
    hideInputError(formElement, inputElement, options);
  }
};


const showInputError = (formElement, inputElement, errorMessage, options) => {
  const errorElement = formElement.querySelector(`.${inputElement.name}-error`);
  inputElement.classList.add(options.inputErrorClass);
  errorElement.classList.add(options.errorClass);
  errorElement.textContent = errorMessage;
};


const hideInputError = (formElement, inputElement, options) => {
  const errorElement = formElement.querySelector(`.${inputElement.name}-error`);
  inputElement.classList.remove(options.inputErrorClass);
  errorElement.classList.remove(options.errorClass);
  errorElement.textContent = '';
}


const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};


const toggleButtonState = (inputList, buttonElement, options) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true
    buttonElement.classList.add(options.inactiveButtonClass);
  } else {
    buttonElement.disabled = false
    buttonElement.classList.remove(options.inactiveButtonClass);
  }
}; 


export const clearValidation = (formElement, options) => {
  const inputList = Array.from(formElement.querySelectorAll(options.inputSelector))
  const button = formElement.querySelector(options.submitButtonSelector)
  
  inputList.forEach(inputElement => {
    hideInputError(formElement, inputElement, options)
  })

  formElement.reset()
  toggleButtonState(inputList, button, options)
}
