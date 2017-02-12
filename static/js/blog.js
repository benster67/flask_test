$(document).ready(function() {
var config = {
    apiKey: "AIzaSyA7bvXy6jHO-4sSz_Q299ApWreynQIVa2s",
    authDomain: "bens-tech-garage-blog.firebaseapp.com",
    databaseURL: "https://bens-tech-garage-blog.firebaseio.com",
    storageBucket: "bens-tech-garage-blog.appspot.com",
  };

    var app = firebase.initializeApp(config);
    var database = app.database();

	$('form#blogForm').on('click', 'button', function() {
    	var title = $('input#postTitle').val();
        var body = $('textarea#postBody').val();
        database.ref('/blog').push({"title": title, "body": body});
	});

    // child_added
    database.ref('/blog').on('child_added', function(data) {
        displayBlogPost(data.key, data.val().title, data.val().body);
    });
    $('#feed').delegate('.removeIcon', 'click', removePost);

        function removePost(e) {
            var $remove = $(e.target).closest('.post-container');
            var post_id = $remove.data('post_id');
            database.ref('/blog/' + post_id).remove();
            $remove.remove();
        }
    function displayBlogPost(post_id, title, body) {
        var $feed = $('#feed');
        var $newPanelTitleSpan = $('<span>').attr('class', "removeIcon glyphicon glyphicon-remove pull-right");
        var $newPanelTitle = $('<div/>').attr('class', "panel-title post-title").text(title);
        var $newHeading = $('<div/>').attr('class', "panel-heading");
        var $newPanelBody = $('<div/>').attr('class', "panel-body post-body").text(body);
        var $newPost = $('<div/>').attr({
            'class': 'post panel panel-default col-xs-12 col-sm-12 col-md-10 col-md-offset-1 post-container',
            'data-post_id': post_id
        });
        $newPanelTitleSpan.appendTo($newPanelTitle);
        $newPanelTitle.appendTo($newHeading);
        $newHeading.appendTo($newPost);
        $newPanelBody.appendTo($newPost);
        $newPost.prependTo($feed);
    }
});
