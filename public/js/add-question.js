
$(".new-question-submit").on("click", function () {
    var question = $(".new-question").val();
    var user = getCookie("name");
    var material = $(".materialId").text();
    if (question.length > 5 && question.length < 100) {
        showLoader();
        $.ajax({
            method: "POST",
            url: "/api/question",
            data: {
                user: user,
                question: question,
                material:material
            },
            success: function (result) {
                $(".default-modal-body").html(`
                    <h1>Question Added Successfully</h1>
                    <hr>
                    <a class="btn btn-secondary" href="/materials">Reload page</a>
                `);
                hideLoader();
            },
            error: function (xhr) {
                alert("Error!")
                console.log(xhr)
                hideLoader();
            }
        })
    }else{
        $(".default-modal-body").append(`<b>Question must be between 5 and 100 characters long.</b>`);
    }
})
