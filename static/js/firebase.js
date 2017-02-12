$(document).ready(function() {
var config = {
    apiKey: "AIzaSyDv4Xzk9MSIh9KigMAub4K5vor8zNiQIrU",
    authDomain: "chat-demo-c8452.firebaseapp.com",
    databaseURL: "https://chat-demo-c8452.firebaseio.com",
    storageBucket: "chat-demo-c8452.appspot.com",
  };
var app = firebase.initializeApp(config);
var database = app.database();
var auth = app.auth();
$('#message').keypress(function(e) {


  if(e.keyCode == 13) {
    var username = $('#username').val();
    var message = $('#message').val();
    console.log(username);
    console.log(message);
    database.ref('/messages').push({'name':username, 'text':message});

  }
});
function displayChatMessage(name,message) {
	var messageList = $('#messagesList');
	var newMessage = $('<div>').attr('class', 'message');
    newMessage.text(name + ':' + message);
    newMessage.appendTo(messageList)
    messageList[0].scrollTop = messageList[0].scrollHeight;
}
function displayImageMessage(name,message) {
	$("<img>").attr("src", message).load(function () {
    $this = $(this);

    var messageList = $('#messagesList');
    var newMessage = $('<div>').attr('class', 'message');
    newMessage.text(name + ': ');
    $this.appendTo(newMessage);
    newMessage.appendTo(messageList);
    messageList[0].scrollTop = messageList[0].scrollHeight;
    }).error(function () {
         displayChatMessage(name,message);
    });
}
database.ref('/messages').on('child_added', function(data) {
	var extension = data.val().text.split('.').pop();
      if(extension === "jpg" || extension === "jpeg" || extension === "png"
      || extension === "gif" || extension === "JPG" || extension === "JPEG" ||
    extension === "PNG" || extension === "GIF" || extension === "img" ||
    extension === "IMG") {
          displayImageMessage(data.val().name, data.val().text);
      } else {
          displayChatMessage(data.val().name, data.val().text);
      }

});
function removeMessage() {
    $('message').val('');
}
 });
