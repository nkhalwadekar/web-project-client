$(document).ready(function(){
  console.log("App Started");

  $("#echo_button").click(function() {

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
    var city = $("#city_input").val();

    if(city.length > 3){
      $.ajax({
        type: "GET",
        url: "http://api.openweathermap.org/data/2.5/weather",
        data: {
          q:"Toronto",
          appid:"88d7d4fc0c72d4ccab9e859a9fc6e605"
        },
        success: function(response){
          $.ajax({
            type: "POST",
            url: "http://127.0.0.1:5000/messages",
            data: JSON.stringify({"username": username, "input":message, "coords": response.coords, "temp": response.main.temp}),
            success: function(response){
              var outputDiv = $("#output").html(response.input);
              console.log(response);
            }
          });
        }
      });
    }

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
          var msgUser = response.results[i].user.username;
          var msgBody = response.results[i].body;
          var msgID = response.results[i].id;
          var replies = response.results[i].replies;

          var msgs = $("<div id='message_" + msgID + "'><h4>"+msgUser+" said:</h4><p>" + msgBody + "</p><div><a class='reply_button' href='#'>Reply</a></div><div>");

          var replies_div = $("<div></div>");

          if(replies.length > 0){
            var k;
            for(k=0; k<replies.length; k++){
              replies_div.append("<p>"+replies[k].user.username+": "+replies[k].body+"</p>");
            }
          }

          msgs.append(replies_div);

          outputDiv.append(msgs);
        }

        $(".reply_button").click(function(){
          var username = prompt("Enter your name");
          var msg = prompt("Enter your message");
          console.log(msg);

          var msgID = $(this).parent().parent().attr("id").split("_")[1]

          $.ajax({
            type: "POST",
            url: "http://127.0.0.1:5000/messages/"+msgID+"/replies",
            data: JSON.stringify({"username": username, "input":msg}),
            success: function(response){
              var outputDiv = $("#output").html(response.input);
              console.log(response);
              $("#get_button").click();
            }
          });
        });

      }
    });

  });

});
