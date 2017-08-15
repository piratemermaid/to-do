var DOMstrings = {
  todoEntry: '.enter-todo',
  todoCount: '.todo-count'
};

var itemList = [];

document.querySelector(DOMstrings.todoEntry).addEventListener('keypress', function(e) {
  var newItem;

  if (e.keyCode === 13 || e.which === 13) {
    newItem = document.querySelector(DOMstrings.todoEntry).value;
    if (newItem !== '') {
      ctrlAddItem(newItem);
      updateCount();
    }
  }
})

var ctrlAddItem = function(item) {
  var index;
  itemList.push(item);
  index = itemList.length - 1;
  html = '<div class="item-check"></div><div class="item-text">' + item + '</div><div class="item-remove">X</div><br/>';
  document.querySelector('.main').insertAdjacentHTML('beforeend', html);
  document.querySelector(DOMstrings.todoEntry).value = '';
}

var updateCount = function() {
  var count;

  count = itemList.length;

  if(count === 1) {
    show(DOMstrings.todoCount);
    document.querySelector(DOMstrings.todoCount).textContent = '1 item left to do';
  }
  else if(count > 1) {
    show(DOMstrings.todoCount);
    document.querySelector(DOMstrings.todoCount).textContent = count + ' items left to do';
  }
  else {
    hide(DOMstrings.todoCount);
  }
}

var show = function(str) {
  document.querySelector(str).style.visiblity = "visible";
}

var hide = function(str) {
  document.querySelector(str).style.visibility = "hidden";
}