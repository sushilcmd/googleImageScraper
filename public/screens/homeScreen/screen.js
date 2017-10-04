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
    execute('getAllData', {}).then(function(r) {
        if (r) {
            var keywords = [];
            var temp = {};

            r.forEach(function(element) {
                if (temp[element.keyword] == undefined) {
                    temp[element.keyword] = [];
                }

                temp[element.keyword].push(element);
            });

            for (var key in temp) {
                keywords.push({
                    keyword: key,
                    data: temp[key]
                });
            }
            console.log(keywords);
            keywordsScreen.show(keywords);
        }
    })
}

function searchKeyword() {
    getValue('.searchContainer .searchBox .inputBox .inputText').then(function(res, rej) {
        $('.loading').show();
        if (res) {
            postExecute(res).then(function(r) {
                if (r) {
                    $('.loading').hide();
                    imageScreen.show(r, keywordMeta);
                }
            })
        } else if (rej) {
            console.log('hello');
        }
    })
}

function getValue(className) {
    return new Promise((res, rej) => {
        var keyword = $(className).val();
        if ($(className).val() != '') {
            keywordMeta = {
                id: keyword.split(' ').join(''),
                keyword: keyword.toLowerCase(),
            }
            res(keywordMeta)
        } else {
            rej()
        }
    })
}