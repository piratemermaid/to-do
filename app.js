var DOMstrings = {
  todoEntry: '.enter-todo'
};

var itemList = [];

document.querySelector(DOMstrings.todoEntry).addEventListener('keypress', function(e) {
  if (e.keyCode === 13 || e.which === 13) {
    ctrlAddItem();
  }
})

var ctrlAddItem = function() {
  var newItem, index;
  newItem = document.querySelector(DOMstrings.todoEntry).value;
  if(newItem !== '') {
    itemList.push(newItem);
    index = itemList.length - 1;
    html = '<div class="item-check"></div><div class="item-text">' + newItem + '</div><div class="item-remove">X</div><br/>';
    document.querySelector('.main').insertAdjacentHTML('beforeend', html);
    document.querySelector(DOMstrings.todoEntry).value = '';
  }
}
