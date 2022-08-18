// import _ from 'lodash';
import './style.css';

// function component() {
//   const element = document.createElement('div');

//   // Lodash, now imported by this script
//   element.innerHTML = _.join(['Hello', 'webpack'], ' ');
//   element.classList.add('hello');
//   return element;
// }

// document.body.appendChild(component());
let toDoListArray = [];
let i = 0;
const loadPageElements = () => {
  const ul = document.querySelector('ul');
  for (let i = 0; i < toDoListArray.length; i += 1) {
    const li = document.createElement('li');
    li.innerHTML = `
    <div class="choices">
        <input type="checkbox" name="item-${i + 1}" id="item-${i + 1}">
        <label for="item-${i + 1}">${toDoListArray[i].description}</label>
    </div>
    <i class="fa-solid fa-ellipsis-vertical"></i>
    `;
    ul.appendChild(li);
  }
  const li = document.createElement('li');
  li.innerHTML = '<li><a href="#">Clear all completed</a></li>';
  ul.appendChild(li);
};
if (window.localStorage.tasks) {
  toDoListArray = JSON.parse(window.localStorage.tasks);
  loadPageElements();
}
const listInput = document.querySelector('#add-item');
listInput.addEventListener('keyup', (event) => {
  if (event.key === 'Enter') {
    const object = {};
    object.description = listInput.value;
    object.completed = false;
    object.index = i;
    i += 1;
    toDoListArray.push(object);
    listInput.value = '';
    window.localStorage.tasks = JSON.stringify(toDoListArray);
    loadPageElements();
  }
});