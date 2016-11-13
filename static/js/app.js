$(document).ready(function(){
  console.log("App Started");

  $("#echo_button").click(function() {

    var echoString = $("#echo_input").val();

    $.ajax({
      type: "POST",
      url: "http://127.0.0.1:5000/echo",
      data: JSON.stringify({"input":echoString}),
      success: function(response){
        var outputDiv = $("#output").html(response.input);
        console.log(response);
      }
    });

  });

  $("#done_button").click(function() {

    var echoString = $("#echo_input").val();

    $.ajax({
      type: "POST",
      url: "http://127.0.0.1:5000/messages",
      data: JSON.stringify({"input":echoString}),
      success: function(response){
        var outputDiv = $("#output").html(response.input);
        console.log(response);
      }
    });

  });

});
