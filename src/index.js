/* eslint-disable import/no-cycle */
import './style.css';
import 'bootstrap';
import statusToggler from './updates.js';
import { createTask, taskEdit, deleteElement, deleteCompleted, filtering } from './add_remove.js';
import { filter } from 'lodash';

export let todoTasks = [

];

const searchID = (id) => document.getElementById(id);
const deleteButton = searchID('delete-all');

const todoInput = document.querySelector('.todoInput');
const input = searchID('todoInput');


function filler(list) {
  const listWrapper = searchID('listWrapper');
  const taskFiller = createTask(list, todoInput.value);

  elementCreator(list, taskFiller);

  deleteCompleted(deleteButton, list);

  const pushing = { description: taskFiller.description, completed: false, index: list.length };
  todoTasks.push(pushing);
  localStorage.setItem('pushing', JSON.stringify(todoTasks));
}

input.addEventListener('keyup', (event) => {
  if (event.keyCode === 13 && todoInput.value !== '') {
    filler(todoTasks);
    input.value = '';
  }
});

function fillOutList(list) {
  const listWrapper = searchID('listWrapper');
  list.forEach((element) => {
    element.index = list.indexOf(element);
    localStorage.setItem('pushing', JSON.stringify(list));

    elementCreator(list, element);


    deleteCompleted(deleteButton, list, element);
  });
}

function elementCreator(list, element){

  const listElement = document.createElement('li');
  listElement.classList.add('list-group-item', 'pl-5', 'pt-4', 'pb-4', 'clearfix');

  const checkBox = document.createElement('input');
  checkBox.type = 'checkbox';
  checkBox.classList.add('form-check-input', 'float-left');
  if (element.completed === true) {
      checkBox.checked = true;
  }
  listElement.appendChild(checkBox);
  statusToggler(checkBox, list);

  const listText = document.createElement('input');
  listText.classList.add('text-input');
  listText.setAttribute('type', 'text');
  listText.value = element.description;
  taskEdit(listText, element);

  listElement.appendChild(listText);

  const trashcan = document.createElement('span');
  trashcan.innerHTML = '<i class="fas fa-trash-alt"></i>';
  trashcan.classList.add('trashcan', 'float-right', 'pl-3', 'pr-3', 'text-danger');
  trashcan.addEventListener('click', function(){
    deleteElement(list, element);
  });
  listElement.appendChild(trashcan);
  

  const dragIcon = document.createElement('span');
  dragIcon.innerHTML = '<i class="fas fa-ellipsis-v"></i>';
  dragIcon.classList.add('float-right', 'pl-3', 'pr-3');
  listElement.appendChild(dragIcon);

  listWrapper.appendChild(listElement);
}


window.onload = () => {
  const retrieve = JSON.parse(localStorage.getItem('pushing'));
  if (retrieve !== null) {
    todoTasks = retrieve;
  }
  if (todoTasks.length > 0) {
    fillOutList(todoTasks);
  }
};

export {  fillOutList };