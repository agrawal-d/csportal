$(document).ready(function(){
    $(".ajx").click(function(event){
    	event.preventDefault();
        $.ajax({url: "dsemo.txt", success: function(result){
            $(".demo").html(result);
        }, error: function(xhr){
        	alert(xhr.status);
        }});
    });
});