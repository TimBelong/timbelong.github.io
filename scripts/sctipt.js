"use strict;"
let skillIconsLeft = document.querySelectorAll('.skill__item.left'),
  skillDescrLeft = document.querySelectorAll('.descr_item-left'),
  skillIconsRight = document.querySelectorAll('.skill__item.right'),
  skillDescrRight = document.querySelectorAll('.descr_item-right'),
  burgerBtns = document.querySelectorAll('.burger__menu'),
  mobileMenu = document.querySelector('.mobile__menu');

function eventToggle(eventTarget, obj, properties) {
  for (let i = 0; i < eventTarget.length; i++) {
    eventTarget[i].addEventListener('mouseenter', function () {
      obj[i].classList.toggle(properties)
    })
  }

  for (let i = 0; i < eventTarget.length; i++) {
    eventTarget[i].addEventListener('mouseleave', function () {
      obj[i].classList.toggle(properties)
    })
  }
}
eventToggle(skillIconsLeft, skillDescrLeft, 'left_active');

eventToggle(skillIconsRight, skillDescrRight, 'right_active');


window.addEventListener('scroll', () => {
  if (pageYOffset > 1) {
    document.querySelector('header').style.backgroundColor = '#000';
  } else {
    document.querySelector('header').style.backgroundColor = 'transparent';
  }
});

burgerBtns.forEach(button => {
  button.addEventListener('click', function () {
    button.classList.toggle('_active');
    mobileMenu.classList.toggle('_active');
  })
})

// Calc

let inputElement = document.getElementById("input"),
  clearButton = document.getElementById("clear"),
  oppositeButton = document.getElementById("opposite"),
  percentButton = document.getElementById("percent"),
  divideButton = document.getElementById("devide"),
  multiplyButton = document.getElementById("multiply"),
  minusButton = document.getElementById("minus"),
  plusButton = document.getElementById("plus"),
  equalButton = document.getElementById("equal"),
  operandButtons = document.querySelectorAll(".operand"),
  commaButton = document.querySelector("#comma");

operandButtons.forEach(button => {
  button.addEventListener('click', () => {
    checkInput();
    inputElement.value += button.textContent;
  })
})

function addOperators(operatorName) {
  operatorName.addEventListener('click', () => {
    inputElement.classList.remove('resolved');
    inputElement.value += operatorName.textContent;
  })
}

clearButton.addEventListener('click', () => {
  inputElement.value = '';
})

oppositeButton.addEventListener('click', () => {
  inputElement.value = -1 * parseFloat(inputElement.value);
})

addOperators(percentButton);
addOperators(plusButton);
addOperators(minusButton);
addOperators(divideButton);
addOperators(commaButton);
addOperators(multiplyButton);

function calculateResult() {
  let resultStr = inputElement.value;
  const operator = resultStr.match(/[^\d.]/)[0];
  const operands = resultStr.split(operator);
  let result = [parseFloat(operands[0]), parseFloat(operands[1])];

  switch (operator) {
    case "+":
      inputElement.value = result[0] + result[1];
      break;
    case "-":
      inputElement.value = result[0] - result[1];
      break;
    case "÷":
      result[1] !== 0 ? inputElement.value = result[0] / result[1] : inputElement.value = "Не дели на ноль!";
      break;
    case "*":
      inputElement.value = result[0] * result[1];
      console.log(result[0] * result[1])
      break;
    case "%":
      inputElement.value = parseFloat(result[0] * result[1]) / 100;
      break;
    default:
      break;
  }

  inputElement.classList.add('resolved');
}

equalButton.addEventListener('click', () => {
  calculateResult();
})

document.addEventListener('keydown', (event) => {
  if (event.code === 'Enter') {
    calculateResult();
  }
})

function checkInput() {
  if (inputElement.classList.contains('resolved')) {
    inputElement.value = '';
    inputElement.classList.remove('resolved')
  }
}

// TO DO List

const addBtn = document.querySelector('#add-btn'),
      newTaskInput = document.querySelector('#wrapper input'),
      tasksContainer = document.querySelector('#tasks'),
      error = document.querySelector('#error'),
      countValue = document.querySelector('.count-value');

let taskCount = 0;

const displayCount = (taskCount) => {
  countValue.innerText = taskCount;
}


const addTask = () => {
  const taskName = newTaskInput.value.trim();
  error.style.display = 'none';
  if (!taskName) {
    setTimeout(() => {
      error.style.display = 'block';
    }, 200)
    return;
  }

  const task = `<div class="task" ondragstart="dStart()" draggable="true">
                  <input type='checkbox' class="task-check">
                  <span class="taskname">${taskName}</span>
                  <button class="edit">
                  <img src="../images/toDO-edit.png" alt="">
                  </button>

                  <button class="delete">
                  <img src="../images/toDO-delete.png" alt="">
                  </button>
                </div>`
                
    tasksContainer.insertAdjacentHTML("beforeend", task);

    const deleteButtons = document.querySelectorAll('.delete');
    
    deleteButtons.forEach((button) =>{
      button.addEventListener('click', ()=>{
          button.parentNode.remove();
          if(taskCount > 0) taskCount -= 1;

          displayCount(taskCount);
          error.style.display = 'none';

          
      })
    });
    
    
    const editButtons = document.querySelectorAll('.edit');
    
    editButtons.forEach((editBtn) => {
      editBtn.addEventListener('click', (e)=>{
        let targetElement = e.target;

        if(!(e.target.className == 'edit')){
          targetElement = e.target.parentElement;
        }

        newTaskInput.value = targetElement.previousElementSibling?.innerText;
        targetElement.parentNode.remove();
        taskCount -= 1;
        displayCount(taskCount)
      }) 
      
    });

    const tasksCheck = document.querySelectorAll('.task-check');
    tasksCheck.forEach(checkBox =>{
      checkBox.addEventListener('change', ()=>{
        checkBox.parentNode.classList.toggle('completed');
        checkBox.checked ? taskCount -= 1 : taskCount += 1;
        displayCount(taskCount);
      })
    });

    taskCount +=1;
    displayCount(taskCount);
    newTaskInput.value = '';
};

addBtn.addEventListener('click', addTask);

window.onload = () => {
  taskCount = 0;
  displayCount(taskCount);
  newTaskInput.value = '';
}
