$(document).ready(function(){

  var commentList = "COMMENTS:<ul>";
  function comment(){
    var c = "<li>" + $("#name").val() + ": \"" + $("#comment").val() + "\"" + "</li>";
    commentList+= c;
    $("#comments").html(commentList + "</ul>");
  }

  $("#register").click(function(){
      var myobj = {Name:$("#name").val(),Password:$("#password").val()};
      var jobj = JSON.stringify(myobj);
      var url = "register";
        $.ajax({
        url:url,
        type: "POST",
        data: jobj,
        contentType: "application/json; charset=utf-8",
        success: function(data,textStatus) {
          if (data === "username taken")
            $("#success").text("sorry user already registered");
          else if (data === "registering user"){
            $("#success").text("successfully registered!");
            comment();
          }
          else if (data === "empty"){// || $("#comment").val === ""){
            $("#success").text("please don't leave any space empty");
          }
        }
        })//end ajax
  });//end #register


  $("#login").click(function(){
      var myobj = {Name:$("#name").val(),Password:$("#password").val()};
      var jobj = JSON.stringify(myobj);
      var url = "login";
        $.ajax({
        url:url,
        type: "POST",
        data: jobj,
        contentType: "application/json; charset=utf-8",
        success: function(data,textStatus) {
          if (data === "logged in"){
            $("#success").text("successfully logged in!");
            comment();
          }
          else if (data === "username doesn't exist"){
            $("#success").text("entered username doesn't match any in database");
          }
          else if (data === "empty"){// || $("#comment").val === ""){
            $("#success").text("please don't leave any space empty");
          }
        }
        })//end ajax
  });//end #register















 $("#users").click(function() {
  /*    var myobj = {Name:$("#name").val(),Comment:$("#comment").val()};
      var jobj = JSON.stringify(myobj);
      $("#json").text(jobj);
    */  
      var url = "users";
        $.ajax({
        url:url,
        type: "GET",
//        data
          contentType: "application/json; charset=utf-8",
          success: function(data,textStatus) {
            var every = "USERS:<ul>";
            for(var i = 0; i < data.length; i++){
            //  console.log("NAME:" + data[0].Name);
              every = every + "<li>" + data[i].Name + "</li>";
            }
            every += "</ul>";
            $("#success").html(every);
          }
        })
})






 $("#clear").click(function() {
      var myobj = {Name:$("#name").val(),Comment:$("#comment").val()};
      var jobj = JSON.stringify(myobj);
          $("#json").text(jobj);
      
      var url = "delete";
        $.ajax({
        url:url,
        type: "POST",
        data: jobj,
        contentType: "application/json; charset=utf-8",
        success: function(data,textStatus) {
        }
        })
       $("#comments").html("COMMENTS:");
 
   
 })




/*  $("#postComment").click(function(){
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
*/
});