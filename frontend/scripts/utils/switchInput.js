function switchInputTypeDate(inputElement) {
    if (inputElement.type === 'text') {
      inputElement.type = 'date';
    }
}
function switchBackToText(inputElement) {
    if (!inputElement.value) {
      inputElement.type = 'text';
    }
}
function switchInputTypeTime(inputElement) {
    if (inputElement.type === 'text') {
      inputElement.type = 'time';
    }
}
