﻿var eventToUse = "click";

function makeTemplates() {
    var templateName = '';
    $('script[type="text/x-jsrender"]').each(function(index, item) {
        templateName = $(item).attr("id");
        $(item).attr('id', templateName.replace("Template", ""));
    });
}

function render(element, template, data, cb) {
    var temp = $.templates("#" + template);
    temp.link(element, data);
    if (cb)
        cb();
}

function bind(element, func) {
    $(element).bind(eventToUse, func);
}

function execute(serviceName, request) {
    return new Promise((res, rej) => {
        executeInternal(serviceUrl, serviceName, 'POST', request, res, rej, 100000000)
    })
}

function executeInternal(serviceUrl, serviceName, request_path, requestData, success, fail, timeout) {
    fail = ((fail == undefined) ? function() {} : fail);
    $.ajax({
        type: request_path,
        url: serviceUrl + serviceName,
        data: JSON.stringify(requestData),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        timeout: timeout == undefined ? 30000 : timeout, // in milliseconds
        success: success,
        error: fail
    });
}