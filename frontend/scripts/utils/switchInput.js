function switchInputTypeDate(inputElement) {
    if (inputElement.type === 'text') {
      inputElement.type = 'date';
    }
}
function switchInputTypeTime(inputElement) {
    if (inputElement.type === 'text') {
      inputElement.type = 'time';
    }
}
function switchBackToText(inputElement, force=false) {
  if (!inputElement.value || force) {
    inputElement.type = 'text';
  }
}