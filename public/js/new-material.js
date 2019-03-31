$(document).on("click",".submit-new-material",function(){
    var input = $(".new-material-input").val()
    if(input.length>5&&input.length<32){
        showLoader()
        $.ajax(
            {
                method:"POST",
                url:'api/materials',
                data:{
                    name:input,
                    user:getCookie("name")
                },
                success:function(result){
                    hideLoader()
                    $(".loader-material").fadeOut();
                    if(result.error){
                        $(".default-modal-body").html("<b>Error ! Could not post your data<b>");
                    }else{
                        $(".default-modal-body").html("<b>Created material successfully. Refresh this page to add questions to it.</b><hr><a class='btn btn-success' onclick='location.reload()'>Reload</a>");
                    }
                },
                error:function(xhr){
                    alert("Error");
                    console.log(xhr);
                }
            }
        )
    }else{
        $(".default-modal-body").append("<hr><p class='text-danger'>LOG : Input must be more that 5 characters and less than 32 characters</p>")
    }
})