function modalify(title,uri,target){
       $('.ajaxify-loader').css("display","block");
        $('.loader-trans').css("display","block"); 
    if(title==null||title=="undefined"||title==""){
        title="";
    }/*
    var uri = $(this).data("uri");*/
    if(target==""||target==null||target=="null"){
        target='default-modal';
    }    
        event.preventDefault();
        $.ajax({url: uri, success: function(result){
                        $('.ajaxify-loader').css("display","none");
            $('.loader-trans').css("display","none");
            $(".default-modal-body").html(result);
            $('.default-modal-title').html(title);
            $('.default-modal').modal('show');
            //alert(result);
        }, error: function(xhr){
$('.ajaxify-loader').html("Check your internet connection and please reload the page. Error code :  " + xhr.status + " ");
            //$("." + target).html("<p>Check your internet connection. Or , there could be an error, i.e. " + xhr.status + " </p>");
        
        }});
}

$('.show-modal').on('click',function(event){
    event.preventDefault();
	var target = $(this).data('target');
	var title = $(this).data('title');
    var uri = $(this).data('uri');
    modalify(title,uri,target);


    });


