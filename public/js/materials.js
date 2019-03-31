function renderQuestions(questions){
    // alert(questions);
    // alert("OK")
    var questionHolder = "<ul class></ul>"
    var qs = ``;
    for(var i=0;i<questions.length;++i){
        qs+=`<li class="list-group-item show-modal" data-title="${questions[i].question}" data-uri="/render/answers/${questions[i]._id}">${questions[i].question}</li>`
    }
    if(questions.length<1){
        qs = "<b>No questions added yet.</b>"
    }
    $(".playground").html(`<ul class="list-group">${qs}</ul>`);
    var addQuestion = `<hr><a href="#" class="btn btn-primary show-modal" data-uri="/render/addQuestion">Add a question</a>`
    $(".playground").append(addQuestion)
}


function fetchQuestions(material) {
    // alert(material)
    ajaxify(`/api/questions?material=${material}`,"test",renderQuestions);
    
}



$(document).on("change", ".materials", function () {
    var id = $(".materials option:selected").data("material");
    fetchQuestions(id);
})


function getMaterials(materials) {
    var content = `<option>Choose a document</option>`
    for (var i = 0; i < materials.length; i++) {
        console.log(materials[i].name)
        content += `<option data-material=${materials[i]._id}>${materials[i].name}</option>`;
    }
    var select = `<select class="materials form-control">${content}</select>`;
    $(".material-list").html(select);
}

ajaxify("/api/materials", "test", getMaterials);