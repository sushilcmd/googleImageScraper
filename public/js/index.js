$(document).ready(function() {
    makeTemplates();
    initApp()
})


function initApp() {
    homeScreen.show();
}


function postExecute(data) {
    return new Promise((res, rej) => {
        execute('downloadImage', data).then(function(r) {
            if (r) {
                console.log(r);
                res(r);
            }
        })
    })
}

function getExecute(data) {
    return new Promise((res, rej) => {
        execute('getKeywords', data).then(function(r) {
            if (r) {
                console.log(r);
                res(r);
            }
        })
    })
}