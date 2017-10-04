var keywordsScreen = new function() {
    this.show = function(data) {
        $('.keywordContainer').toggle();
        var localData = JSON.parse(JSON.stringify(data));
        render('.homeScreenContainer .header .keywordContainer', 'keywordsContainer', {})
        render('.homeScreenContainer .header .keywordContainer .keyWords', 'keywords', localData)
        bind('.keyWords .keyword', getKeywordImage)
    }
}

function getKeywordImage() {
    var dataItem = $.view(this).data;
    var newData = dataItem.data
    var keyword = {};
    showImageScreen(dataItem.data)
}