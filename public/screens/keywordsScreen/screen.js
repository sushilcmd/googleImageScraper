var keywordsScreen = new function() {
    this.show = function(data) {
        $('.keywordContainer').toggle();
        var localData = JSON.parse(JSON.stringify(data));
        render('.homeScreenContainer .header .keywordContainer', 'keywordsContainer', localData)
        bind('.keyWords .keyword', getKeywordImage)
    }
}

function getKeywordImage() {
    var dataItem = $(this).data;
    getExecute(dataItem).then(function(r) {
        if (r) {
            imageScreen.show(r);
        }
    })
}