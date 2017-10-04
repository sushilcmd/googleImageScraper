var homeScreen = new function() {
    var keyWordMeta = {};
    this.show = function() {
        render('.mainContainer .homeScreenContainer', 'homeScreenContainer', {});
        allBinds();
    }
}

function allBinds() {
    bind('.btn.search', searchKeyword)
    bind('.header .keyWordIcon', getAllkeywords)
}

function getAllkeywords() {
    getExecute({}).then(function(r) {
        if (r) {
            keywordsScreen.show(r);
        }
    })
}

function searchKeyword() {
    getValue('.searchContainer .searchBox .inputBox .inputText').then(function(res) {
        postExecute(res).then(function(r) {
            if (r) {
                imageScreen.show(r, keywordMeta);
            }
        })
    })
}

function getValue(className) {
    return new Promise((res, rej) => {
        var keyword = $(className).val();
        keywordMeta = {
            id: keyword.split(' ').join(''),
            keyword: keyword.toLowerCase(),
        }
        res(keywordMeta)
    })
}