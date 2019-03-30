function ajaxify(uri, target, callback) {
    var res;
        $('.ajaxify-loader').css("display", "block");
        $('.loader-trans').css("display", "block");

    $.ajax({
        url: uri, success: function (result) {
            $('.ajaxify-loader').css("display", "none");
            if(callback){
                callback(result);
            }
            
            $("." + target).html(result);
            $('.loader-trans').css("display", "none");
        }, error: function (xhr) {
            $('.ajaxify-loader').html("Check your internet connection and please reload the page. Error code :  " + xhr.status + " ");
            //$("." + target).html("<p>Check your internet connection. Or , there could be an error, i.e. " + xhr.status + " </p>");
        }
    });


}

$(".ajaxify").click(function (event) {
    var uri = $(this).data("uri");
    var target = $("this").data("target");
    var loader = ($("this").data("loader"));
    ajaxify(uri, target, loader);

});

