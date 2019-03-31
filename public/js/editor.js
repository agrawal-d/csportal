$(document).ready(function () {
    var editor = ace.edit("editor");
    editor.session.setMode("ace/mode/c_cpp");
})

$(".lang").change(function () {
    var lang = $(".lang").val();
    var editor = ace.edit("editor");
    editor.session.setMode(`ace/mode/${lang}`);

})

$(".post-solution").on('click', function () {
    var editor = ace.edit("editor");
    var code = editor.getValue();
    var questionId = $(".questionId").text();
    var desc = $(".add-answer-descreption").val();
    if (desc.length < 10 || desc.length > 1000) {
        alert("Descreption must be beween 10 and 1000 characters");
    }else{
        $.ajax({
            method:"POST",
            url:"api/answer",
            data:{
                question:questionId,
                code:code,
                descreption:desc,
                user:getCookie(name),
                language:"Unknown"
            },
            success:function(result){
                if(result.error){
                    alert("Failed to add solution")
                }else{
                    alert("Solution added successfully! Close this alert to redirect.");
                    window.location.href="materials";
                }
            },
            error:function(xhr){
                alert("ERROR happened :( ");
                console.log(xhr);

            }
        })
    }
})