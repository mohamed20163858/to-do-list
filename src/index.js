import './style.css';

let toDoListArray = [];
const showElement = (i) => {
  const ul = document.querySelector('.inner');
  const li = document.createElement('li');
  li.classList.add('added-item');
  li.innerHTML = `
  <div class="choices">
      <i class="fa-regular fa-square"></i>
      <input type="text" name="item-${i + 1}-text" id="item-${i + 1}-text" class="list-item" value="${toDoListArray[i].description}">
      <label for="item-${i + 1}-text"></label>
  </div>
  <i class="fa-solid fa-ellipsis-vertical"></i>
  `;
  ul.appendChild(li);
};

const loadPageElements = () => {
  for (let i = 0; i < toDoListArray.length; i += 1) {
    showElement(i);
  }
};
const addTask = () => {
  const listInput = document.querySelector('#add-item');
  const object = {};
  object.description = listInput.value;
  object.completed = false;
  object.index = toDoListArray.length + 1;
  toDoListArray.push(object);
  listInput.value = '';
  window.localStorage.tasks = JSON.stringify(toDoListArray);
};
const removeTask = (li, i) => {
  toDoListArray.splice(i, 1);
  li.remove();
  for (let j = i; j < toDoListArray.length; j += 1) {
    toDoListArray[j].index -= 1;
  }
  window.localStorage.tasks = JSON.stringify(toDoListArray);
};
const moveIntoListItemAction = (listItem) => {
  const li = listItem.parentElement.parentElement;
  li.addEventListener('click', () => {
    const icon = listItem.parentElement.parentElement.querySelector('div+i');
    icon.classList.remove('fa-ellipsis-vertical');
    icon.classList.add('fa-trash');
    listItem.parentElement.parentElement.style.backgroundColor = '#FFFECA';
    listItem.style.backgroundColor = '#FFFECA';
    listItem.style.caretColor = 'black';
  });
};
const moveOutListItemAction = (listItem) => {
  const li = listItem.parentElement.parentElement;
  li.addEventListener('mouseleave', () => {
    const icon = listItem.parentElement.parentElement.querySelector('div+i');
    icon.classList.remove('fa-trash');
    icon.classList.add('fa-ellipsis-vertical');
    listItem.parentElement.parentElement.style.backgroundColor = 'white';
    listItem.style.backgroundColor = 'white';
  });
};
const deleteIconClickAction = (listItem, i) => {
  const li = listItem.parentElement.parentElement;
  const icon = li.querySelector('div+i');
  icon.addEventListener('click', () => {
    if (icon.classList.contains('fa-trash')) {
      removeTask(li, i);
    }
  });
};
const editTask = (listItem, i) => {
  listItem.addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
      toDoListArray[i].description = listItem.value;
      const icon = listItem.parentElement.parentElement.querySelector('div+i');
      icon.classList.remove('fa-trash');
      icon.classList.add('fa-ellipsis-vertical');
      listItem.parentElement.parentElement.style.backgroundColor = 'white';
      listItem.style.backgroundColor = 'white';
      listItem.style.caretColor = 'transparent';
      window.localStorage.tasks = JSON.stringify(toDoListArray);
    }
  });
};
if (window.localStorage.tasks) {
  toDoListArray = JSON.parse(window.localStorage.tasks);
  loadPageElements();
}

const listInput = document.querySelector('#add-item');
listInput.addEventListener('keyup', (event) => {
  if (event.key === 'Enter') {
    addTask();
    showElement(toDoListArray.length - 1);
    const listItem = document.querySelector('.added-item:last-of-type .list-item');
    moveIntoListItemAction(listItem);
    moveOutListItemAction(listItem);
    deleteIconClickAction(listItem, toDoListArray.length - 1);
    editTask(listItem, toDoListArray.length - 1);
  }
});
const listItems = document.querySelectorAll('.list-item');
// const listCheckBoxes = document.querySelectorAll('.choices i');
for (let i = 0; i < listItems.length; i += 1) {
  moveIntoListItemAction(listItems[i]);
  moveOutListItemAction(listItems[i]);
  deleteIconClickAction(listItems[i], i);
  editTask(listItems[i], i);
}
