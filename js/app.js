$(document).ready(function(){
  console.log("App Started");

  $("#done_button").click(function() {

    var echoString = $("#echo_input").val();

    $.ajax({
      type: "POST",
      url: "http://127.0.0.1:5000/echo",
      data: {
        "string": echoString
      },
      success: function(response){
        var outputDiv = $("#output").html(response);
        console.log(response);
      }
    });

  });

});
