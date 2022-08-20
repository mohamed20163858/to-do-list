const toggleCheckBox = (checkbox, Array, i) => {
  checkbox.addEventListener('click', () => {
    if (checkbox.classList.contains('fa-square')) {
      checkbox.classList.remove('fa-regular');
      checkbox.classList.remove('fa-square');
      checkbox.classList.add('fa-solid');
      checkbox.classList.add('fa-check');
      checkbox.style.color = '#2E8AE6';
      checkbox.parentElement.querySelector('input').style.textDecoration = 'line-through';
      checkbox.parentElement.querySelector('input').style.color = '#868686';
      Array[i].completed = true;
      window.localStorage.tasks = JSON.stringify(Array);
    } else {
      checkbox.classList.add('fa-regular');
      checkbox.classList.add('fa-square');
      checkbox.classList.remove('fa-solid');
      checkbox.classList.remove('fa-check');
      checkbox.style.color = '#868686';
      checkbox.parentElement.querySelector('input').style.textDecoration = 'none';
      checkbox.parentElement.querySelector('input').style.color = 'black';
      Array[i].completed = false;
      window.localStorage.tasks = JSON.stringify(Array);
    }
  });
};
const clearAllCompleted = (Array) => {
  const clearButton = document.querySelector('.outter li button');
  clearButton.addEventListener('click', () => {
    Array = Array.filter((item) => item.completed === false);
    for (let i = 0; i < Array.length; i += 1) {
      Array[i].index = i + 1;
    }
    window.localStorage.tasks = JSON.stringify(Array);
    window.location.reload();
  });
};
export { toggleCheckBox, clearAllCompleted };