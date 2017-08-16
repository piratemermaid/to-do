var DOMstrings = {
  todoEntry: '.enter-todo',
  todoCount: '.todo-count',
  check: '.item-check',
  del: '.item-remove'
};

var itemList = [ {id: 0, text: 'one', complete: false}, {id: 1, text:'two', complete: false}, {id: 2, text: 'three', complete: false}, {id: 3, text: 'four', complete: false}, {id: 4, text: 'five', complete: false}];
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
  var parent, index, arrIndex, numComplete;
  index = $(this).parent().attr('data-element');
  for (i = 0; i < itemList.length; i++) {
    if(parseInt(itemList[i].id) === parseInt(index)) {
      arrIndex = i;
    }
  }
  parent = this.parentNode;
  $(parent.querySelector('.item-text')).toggleClass('checked');
  if (this.innerHTML === '') {
    this.innerHTML = '<img src="check.png" />';
    itemList[arrIndex].complete = true;
  }
  else {
    this.innerHTML = '';
    itemList[arrIndex].complete = false;
  }

  if(itemList.length > 0) {
    numComplete = 0;
    for (i = 0; i < itemList.length; i++) {
      if(itemList[i].complete === true) {
        numComplete++;
      }
    }
    if (numComplete === itemList.length) {
      document.querySelector('.mark-all').textContent = 'Unmark all as complete';
    }
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
  // var parent = this.parentNode;
  ($(this).find('.item-remove')).css('visibility', 'visible');
  $(this).css('background', '#E1C8E1');
})

$(document).on('click', '#all-check', function() {
  this.style.background = '#C4A3C4';
  var index, numComplete;
  numComplete = 0;
  for(i = 0; i < itemList.length; i++) {
    if(itemList[i].complete === false) {
      itemList[i].complete = true;
      index = itemList[i].id;
      document.querySelector('#item-' + index).innerHTML = '<div class="item-check"><img src="check.png" /></div><div class="item-text checked">' + itemList[i].text + '</div><div class="item-remove" class="hidden">X</div><br/>';
    }
    else {
      numComplete++;
    }
    document.querySelector('.mark-all').textContent = 'Unmark all as complete';
  }
  if(numComplete === itemList.length) {
    for(i = 0; i < itemList.length; i++) {
      itemList[i].complete = false;
      index = itemList[i].id;
      document.querySelector('#item-' + index).innerHTML = '<div class="item-check"></div><div class="item-text">' + itemList[i].text + '</div><div class="item-remove" class="hidden">X</div><br/>';
    }
    document.querySelector('.mark-all').textContent = 'Mark all as complete';
    this.style.background = 'none';
  }
})

document.getElementById('clear-check').addEventListener('click', function() {
  for(i = itemList.length - 1; i > -1; i--) {
    if(itemList[i].complete === true) {
      document.querySelector('#item-' + itemList[i].id).remove();
      itemList.splice(i, 1);
    }
  }
  document.querySelector('.mark-all').textContent = 'Mark all as complete';
  document.getElementById('all-check').style.background = 'none';
})

$(document).on('mouseleave', '.item', function() {
  var parent = this.parentNode;
  ($(this).find('.item-remove')).css('visibility', 'hidden');
  $(this).css('background', 'none');
})







var addItem = function(item) {
  var index, newObj;
  index = listIndex;
  newObj = { id: index, text: item, complete: false };
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

