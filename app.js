var DOMstrings = {
  todoEntry: '.enter-todo',
  todoCount: '.todo-count',
  check: '.item-check',
  del: '.item-remove'
};

var itemList = [ {id: 0, text: 'one'}, {id: 1, text:'two'}, {id: 2, text: 'three'}, {id: 3, text: 'four'}, {id: 4, text: 'five'}];
var listIndex = 5;

document.querySelector(DOMstrings.todoEntry).addEventListener('keypress', function(e) {
  var newItem;

  if (e.keyCode === 13 || e.which === 13) {
    newItem = document.querySelector(DOMstrings.todoEntry).value;
    if (newItem !== '') {
      addItem(newItem);
      updateCount();
    }
  }
})

$(document).on('click', DOMstrings.check, function() {
  var parent = this.parentNode;
  $(parent.querySelector('.item-text')).toggleClass('checked');
  if (this.innerHTML === '') {
    this.innerHTML = '<img src="check.png" />';
  }
  else {
    this.innerHTML = '';
  }
})

$(document).on('click', DOMstrings.del, function() {
  var parent, index;
  index = $(this).parent().attr('data-element');
  $('#item-' + index).remove();
  for(i = 0; i < itemList.length; i++) {
    if(itemList[i].id = index) {
      itemList.splice(i, 1);
    }
  }
})

$(document).on('mouseenter', '.item', function() {
  var parent = this.parentNode;
  ($(this).find('.item-remove')).css('visibility', 'visible');
  $(this).css('background', '#E1C8E1');
})

$(document).on('mouseleave', '.item', function() {
  var parent = this.parentNode;
  ($(this).find('.item-remove')).css('visibility', 'hidden');
  $(this).css('background', 'none');
})







var addItem = function(item) {
  var index, newObj;
  index = listIndex;
  newObj = { id: index, text: item };
  itemList.push(newObj);
  listIndex++;
  html = '<div id="item-' + index + '"" class="item" data-element=' + index + '><div class="item-check"></div><div class="item-text">' + item + '</div><div class="item-remove">X</div><br/>';
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

