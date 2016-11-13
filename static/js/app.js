$(document).ready(function(){
  console.log("App Started");

  $("#message_button").click(function() {

    var message = $("#message_input").val();

    $.ajax({
      type: "POST",
      url: "http://127.0.0.1:5000/echo",
      data: JSON.stringify({"input":message}),
      success: function(response){
        var outputDiv = $("#output").html(response.input);
        console.log(response);
      }
    });

  });

  $("#done_button").click(function() {

    var message = $("#message_input").val();
    var username = $("#username_input").val();

    $.ajax({
      type: "POST",
      url: "http://127.0.0.1:5000/messages",
      data: JSON.stringify({"username": username, "input":message}),
      success: function(response){
        var outputDiv = $("#output").html(response.input);
        console.log(response);
      }
    });

  });

  $("#get_button").click(function() {

    var username = $("#username_input").val();

    $.ajax({
      type: "GET",
      url: "http://127.0.0.1:5000/messages/"+username,
      success: function(response){
        console.log(response);

        var outputDiv = $("#output")

        outputDiv.empty();

        var i;
        for(i=0; i<response.results.length; i++){
          outputDiv.append("<div>" + response.results[i].body + "<div>");
        }

      }
    });

  });

});
