$(document).ready(function(){

  commentFirst();
  
  
  
  function commentFirst(){
       var url = "commentFirst";
        $.ajax({
        url:url,
        type: "GET",
          contentType: "application/json; charset=utf-8",
          success: function(data,textStatus) {
             var everything = "COMMENTS:<ul>"
          for(var i = 0; i < data.length; i++){
            everything += "<li>" + data[i].Name + ": " + data[i].Comment + "</li>";
          }
          everything += "</ul>"
          $("#comments").html(everything);
          }
        })
  }
  
  
  function comment(){
    var myobj = {Name:$("#name").val(),Comment:$("#comment").val()};
      var jobj = JSON.stringify(myobj);
      var url = "comment";
        $.ajax({
        url:url,
        type: "POST",
        data: jobj,
        contentType: "application/json; charset=utf-8",
        success: function(data,textStatus) {
          var everything = "COMMENTS:<ul>"
          for(var i = 0; i < data.length; i++){
            everything += "<li>" + data[i].Name + ": " + data[i].Comment + "</li>";
          }
          everything += "</ul>"
          $("#comments").html(everything);
        }//end success
      })
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
  });//end #login











 $("#users").click(function() {
      var url = "users";
        $.ajax({
        url:url,
        type: "GET",
          contentType: "application/json; charset=utf-8",
          success: function(data,textStatus) {
            var every = "USERS: no users found";
            if(data.length != 0){
              every = "USERS:<ul>"
        
            for(var i = 0; i < data.length; i++){
              every = every + "<li>" + data[i].Name + "</li>";
            }
            every += "</ul>";
              
            }
            $("#comments").html(every);
          }
        })
})


 $("#clear").click(function() {
      var myobj = {Name:$("#name").val(),Comment:$("#comment").val()};
      var jobj = JSON.stringify(myobj);

      var url = "delete";
        $.ajax({
        url:url,
        type: "POST",
        data: jobj,
        contentType: "application/json; charset=utf-8",
        success: function(data,textStatus) {
          $("#success").text("you deleted all users and comments");          
        }
        })
       $("#comments").html("COMMENTS:");
 
   
 })
});