function fetchQuestions(material) {
    ajaxify(`/render/questions?material=${material}`,".playground");
}



$(document).on("change", ".materials", function () {
    var id = $(".materials option:selected").data("material");
    fetchQuestions(id);
})


function getMaterials(materials) {
    var content = ``
    for (var i = 0; i < materials.length; i++) {
        console.log(materials[i].name)
        content += `<option data-material=${materials[i]._id}>${materials[i].name}</option>`;
    }
    var select = `<select class="materials form-control">${content}</select>`;
    $(".material-list").html(select);
}

ajaxify("/api/materials", "test", getMaterials);