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
    if($('.filter-active').hasClass('selected')) {
      document.querySelector('#item-' + index).remove();
    }
  }
  else {
    this.innerHTML = '';
    itemList[arrIndex].complete = false;
    if($('.filter-completed').hasClass('selected')) {
      document.querySelector('#item-' + index).remove();
    }
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
  updateCount();
})



$(document).on('click', DOMstrings.del, function() {
  var parent, index;
  index = $(this).parent().attr('data-element');
  $('#item-' + index).remove();
  for(i = 0; i < itemList.length; i++) {
    if(parseInt(itemList[i].id) === parseInt(index)) {
      itemList.splice(i, 1);
    }
  }
  updateCount();
})




$(document).on('mouseenter', '.item', function() {
  ($(this).find('.item-remove')).css('visibility', 'visible');
  $(this).css('background', '#E1C8E1');
})

$(document).on('mouseleave', '.item', function() {
  var parent = this.parentNode;
  ($(this).find('.item-remove')).css('visibility', 'hidden');
  $(this).css('background', 'none');
})



// MARK/UNMARK ALL

$(document).on('click', '#all-check', function() {
  var index, numComplete, html;
  numComplete = 0;
  
  if(!($('.mark-all').hasClass('unmark'))) {
    // Change objects to complete:true
    for(i = 0; i < itemList.length; i++) {
      itemList[i].complete = true;
    }

    // Add checkbox and 'checked' style to UI
    if($('.filter-all').hasClass('selected')) {
      for(i = 0; i < itemList.length; i++) {
        itemList[i].complete = true;
        document.querySelector('#item-' + itemList[i].id).innerHTML = '<div class="item-check"><img src="check.png" /></div><div class="item-text checked">' + itemList[i].text + '</div><div class="item-remove" class="hidden">X</div><br/>';
      }
    }

    // If in Active filter, remove all from UI
    if($('.filter-active').hasClass('selected')) {
      document.querySelector('.main').innerHTML = '';
    }

    // If in Completed filter, add all to UI
    if($('.filter-completed').hasClass('selected')) {
      document.querySelector('.main').innerHTML = '';
      for(i = 0; i < itemList.length; i++) {
        html = '<div id="item-' + index + '"" class="item" data-element=' + itemList[i].id + '><div class="item-check"><img src="check.png" /></div><div class="item-text checked">' + itemList[i].text + '</div><div class="item-remove">X</div><br/>';
        document.querySelector('.main').insertAdjacentHTML('beforeend', html);
      }
    }

    // Set text to "Unmark all"
    document.querySelector('.mark-all').textContent = 'Unmark all as complete';
    this.style.background = '#C4A3C4';

    // Add class 'unmark' to '.mark-all'
    $('.mark-all').addClass('unmark');
  }

  else {
    // Change objects to complete:false
    for(i = 0; i < itemList.length; i++) {
      itemList[i].complete = false;
    }

    // Remove checkbox and 'checked' style from UI
    if($('.filter-all').hasClass('selected')) {
      for(i = 0; i < itemList.length; i++) {
      document.querySelector('#item-' + itemList[i].id).innerHTML = '<div class="item-check"></div><div class="item-text">' + itemList[i].text + '</div><div class="item-remove" class="hidden">X</div><br/>';
      }
    }

    // If in Active filter, add all to UI
    if($('.filter-active').hasClass('selected')) {
      document.querySelector('.main').innerHTML = '';
      for(i = 0; i < itemList.length; i++) {
        html = '<div id="item-' + index + '"" class="item" data-element=' + itemList[i].id + '><div class="item-check"></div><div class="item-text">' + itemList[i].text + '</div><div class="item-remove">X</div><br/>';
        document.querySelector('.main').insertAdjacentHTML('beforeend', html);
      }
    }

    // If in Completed filter, remove all from UI
    if($('.filter-completed').hasClass('selected')) {
      document.querySelector('.main').innerHTML = '';
    }

    // Set text to "Mark all"
    document.querySelector('.mark-all').textContent = 'Mark all as complete';
    this.style.background = 'none';

    // Remove class 'unmark' from '.mark-all'
    $('.mark-all').removeClass('unmark');
  }

  updateCount();
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
  updateCount();
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
  var count = 0;

  for(i = 0; i < itemList.length; i++) {
    if(itemList[i].complete === false) {
      count++;
    }
  }

  if(count === 1) {
    show(DOMstrings.todoCount);
    document.querySelector(DOMstrings.todoCount).textContent = '1 item left to do';
  }
  else if(count === 0) {
    document.querySelector(DOMstrings.todoCount).textContent = 'Nothing to do';
  }
  else {
    show(DOMstrings.todoCount);
    document.querySelector(DOMstrings.todoCount).textContent = count + ' items left to do';
  }
  // else {
  //   hide(DOMstrings.todoCount);
  // }
}





var show = function(str) {
  document.querySelector(str).style.visiblity = "visible";
}

var hide = function(str) {
  document.querySelector(str).style.visibility = "hidden";
}










$('li').click(function() {
  if(!($(this).hasClass('selected'))) {
    $('.filters').children().removeClass('selected');
    $(this).toggleClass('selected');
  }

  document.querySelector('.main').innerHTML = '';

  if($(this).text() === 'All') {
    displayAll();
  }
  else if($(this).text() === 'Active') {
    displayActive();
  }
  else if($(this).text() === 'Completed') {
    displayCompleted();
  }
})




displayAll = function() {
  var index;
  for(i = 0; i < itemList.length; i++) {
    displayItem(itemList[i].id, itemList[i].text, itemList[i].complete);
  }
}

displayActive = function() {
  var index;
  for(i = 0; i < itemList.length; i++) {
    if(itemList[i].complete === false) {
      displayItem(itemList[i].id, itemList[i].text, itemList[i].complete);
    }
  }
}

displayCompleted = function() {
  var index;
  for(i = 0; i < itemList.length; i++) {
    if(itemList[i].complete === true) {
      displayItem(itemList[i].id, itemList[i].text, itemList[i].complete);
    }
  }
}

displayItem = function(index, item, complete) {
  if(complete === false) {
    html = '<div id="item-' + index + '"" class="item" data-element=' + index + '><div class="item-check"></div><div class="item-text">' + item + '</div><div class="item-remove">X</div><br/>';
  }
  else {
    html = '<div id="item-' + index + '"" class="item" data-element=' + index + '><div class="item-check"><img src="check.png" /></div><div class="item-text checked">' + item + '</div><div class="item-remove">X</div><br/>';
  }
  document.querySelector('.main').insertAdjacentHTML('beforeend', html);
}
