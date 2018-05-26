// client-side js
// run by the browser each time your view template is loaded

// by default, you've got jQuery,
// add other scripts at the bottom of index.html

$(function() {
  console.log('hello world :o');

  $('form').submit(function(event) {
    event.preventDefault();
    var phone = $('input.phone').val();
    var message = $('textarea.message').val();
    $.post('/message?' + $.param({phone: phone, message: message}), function(reply) {
      console.log(reply);
      $('<li></li>').text(reply).appendTo('ul#reply');
      // $('input').val('');
      // $('input.phone').focus();
      alert(reply);
    });
  });

});
