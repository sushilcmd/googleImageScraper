var imageScreen = new function() {
    this.show = function(data, keywordMeta) {
        getExecute(keywordMeta).then(function(r) {
            showImageScreen(r)
        });
    }
}

function closeScreen() {
    $('.mainContainer .imageContainer').hide();
    $('.searchBox .inputBox .inputText').val('');
}

function showImageScreen(data) {
    console.log(data);
    $('.keywordContainer').hide();
    $('.mainContainer .imageContainer').show();
    var localData = JSON.parse(JSON.stringify(data));
    render('.mainContainer .imageContainer', 'imageContainer', {});
    render('.mainContainer .imageContainer .contentContainer', 'keywordImages', localData);
    bind('.header .btn.close', closeScreen)
}