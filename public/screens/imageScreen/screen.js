var imageScreen = new function() {
    this.show = function(data, keywordMeta) {
        getExecute(keywordMeta).then(function(r) {
            console.log(r);
            $('.mainContainer .imageContainer').show();
            var localData = JSON.parse(JSON.stringify(r));
            render('.mainContainer .imageContainer', 'imageContainer', {});
            render('.mainContainer .imageContainer .contentContainer', 'keywordImages', localData);
            bind('.header .btn.close', closeScreen)
        })
    }
}

function closeScreen() {
    $('.mainContainer .imageContainer').hide();
    $('.searchBox .inputBox .inputText').val('');
}