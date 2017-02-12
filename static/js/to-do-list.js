var config = {
    apiKey: "AIzaSyC49sSFw0NBbdQmRdWgiER6eUWPvv8RRTY",
    authDomain: "to-do-list-44f1a.firebaseapp.com",
    databaseURL: "https://to-do-list-44f1a.firebaseio.com",
    storageBucket: "to-do-list-44f1a.appspot.com",
};
var app = firebase.initializeApp(config);
var db = app.database();
var auth = app.auth();

$(document).ready(function() {
    $('input#enterToDo').keypress(function(e) {
    	if(e.keyCode == 13) {
            var newToDo = $(this).val();
            db.ref('/todo').push({'value': newToDo, 'status': ''});
            $(this).val("");
        }
    });

   $('#todoList').on('click', 'li', function() {
       var $toDoItem = $(this);
       if($toDoItem.hasClass("hot")) {
           db.ref('/todo/' + $toDoItem.attr('data-todo_id')).update({
               'value': $toDoItem.text(),
               'status': 'done'
           });
       } else if ($toDoItem.hasClass("done")) {
       		db.ref('/todo/' + $toDoItem.attr('data-todo_id')).remove();
       } else {
           db.ref('/todo/' + $toDoItem.attr('data-todo_id')).update({
               'value': $toDoItem.text(),
               'status': 'hot'
           });
       }
   });

    db.ref('/todo').on('child_added', function(data) {
    	addToDo(data.key, data.val().value, data.val().status);
    });

    db.ref('/todo').on('child_removed', function(data) {
    	removeToDo(data.key);
    });

    db.ref('/todo').on('child_changed', function(data) {
    	updateToDo(data.key, data.val().value, data.val().status);
    });
});

function removeToDo(key) {
    var $removeEl = $("[data-todo_id='" + key + "']");
    $removeEl.remove();
}

function updateToDo(key, todo, status) {
    var $updateEl = $("[data-todo_id='" + key + "']");
    $updateEl.text(todo).attr('class', status);
}

function addToDo(key, newToDo,status) {
   var $listToDo = $('<li>').text(newToDo).attr({'data-todo_id': key, 'class': status});
    $('#todoList').append($listToDo);
}
