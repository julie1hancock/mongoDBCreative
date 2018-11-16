$(document).ready(function(){
  $("#postComment").click(function(){
      var myobj = {Name:$("#name").val(),Comment:$("#comment").val()};
      jobj = JSON.stringify(myobj);
      $("#json").text(jobj);
      
      var url = "comment";
        $.ajax({
        url:url,
        type: "POST",
        data: jobj,
        contentType: "application/json; charset=utf-8",
        success: function(data,textStatus) {
            $("#done").html(textStatus);
        }
        })
        $("#comments").html("");
  });
  
   $("#getComments").click(function() {
    $.getJSON('comment', function(data) {
      console.log(data);
      var everything = "no comments :-(";
      if(data[0]){
          var everything = "<ul>";
          for(var comment in data) {
            com = data[comment];
            everything += "<li> Name: " + com.Name + " -- Comment: " + com.Comment + "</li>";
          }
          everything += "</ul>";
      }
      $("#comments").html(everything);
      $("#json").text("");
      $("#done").text("");
    })
  })
  
  
    $("#deleteComments").click(function() {
        console.log("trying to delete comments");
        
        var myobj = {Name:$("#name").val(),Comment:$("#comment").val()};
          jobj = JSON.stringify(myobj);
          $("#json").text(jobj);
      
      var url = "delete";
        $.ajax({
        url:url,
        type: "POST",
        data: jobj,
        contentType: "application/json; charset=utf-8",
        success: function(data,textStatus) {
            $("#done").html(textStatus);
        }
        })
        
        $("#json").text("");
        $("#comments").text("");
    })

});