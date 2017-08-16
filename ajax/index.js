var curIdx = 0,
    len = 5,
    isLoading = false;

let cl = document.querySelector("#contentList"),
    loadMore = documentquerySelector("#loadMore");

loadMore.addEventListener('click', function () {
    if (isLoading) {
        return
    }
    ajax('/loadMore', {
        idx: curIdx,
        len: len
    }, function (data) {
        appendData(data);
        isLoading = false;
        curIdx += len;
        isLoading = true;
    })
});

function ajax(url, json, success, error) {
    var dataArr = [],
        dataString;
    for (var key in json) {
        dataArr.push(encodeURIComponent(key) + '=' + encodeURIComponent(json[key]));
    }
    dataString = dataArr.join('&');

    var xhr = new XMLHttpRequest();

    xhr.open('GET', url + '?' + dataString, true);
    xhr.send();
    xhr.onload = function () {
        if (xhr.status === 200) {
            success(JSON.parse(xhr.response));
        } else {
            error();
        }
    }
}

function appendData(data) {
    for (var i = 0; i < data.length; i++) {
        var child = document.createElement('li');
        child.innerText = data[i];
        cl.appendChild(child);
    }
}