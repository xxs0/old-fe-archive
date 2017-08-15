//1：<li class="item hide"></li>
//2.load事件报错a.indexOf is not a function， jQuery 3.0后废除，该用on
var $content = $(".content"),
    itemWdith = $(".item").outerWidth(true),
    itemCol = parseInt($content.width() / itemWdith),
    itemHeightArr = [];
for (var i = 0; i < itemCol; i++) {
    itemHeightArr[i] = 0;
}

var isDataArrive = true;
start();

function start() {
    getNews(function (newsList) {
        isDataArrive = true
        $.each(newsList, function (idx, news) {
            var $node = createEle(news)
            $node.find('img').on("load", function () {
                $content.append($node)
                console.log($node, 'loaded...')
                waterFallPlace($node)
            })
        })
    });
    isDataArrive = false;
}
$(window).on("scroll", function () {
    if (!isDataArrive) return;
    if (check($('.load'))) {
        start()
    }
})

//瀑布流
function waterFallPlace($node) {

    var idx = 0,
        minsumHeight = itemHeightArr[0];
    for (var i = 0; i < itemHeightArr.length; i++) {
        if (itemHeightArr[i] < minsumHeight) {
            idx = i;
            minsumHeight = itemHeightArr[i];
        }
    }

    $node.css({
        left: itemWdith * idx,
        top: minsumHeight,
        opacity: 1
    })

    itemHeightArr[idx] += $node.outerHeight(true);

    $content.height(Math.max.apply(null, itemHeightArr));


};

// 懒加载
function check($el) {
    var windowHeight = $(window).height(),
        scrollTop = $(window).scrollTop(),
        nodeTop = $el.offset().top,
        nodeHeight = $el.outerHeight(true);

    if (windowHeight + scrollTop > nodeTop && scrollTop < nodeTop + nodeHeight) {
        return true;
    } else {
        return false;
    }
}

//创造新元素
function createEle(item) {
    var html = "";
    html += '<li class="item">' +
        '<a href="' + item.url + '">' +
        '<img src="' + item.img_url + '" alt="">' +
        '<h4>' + item.short_name + '</h4>' +
        '<p>' + item.short_intro + '</p>' +
        '</a></li>';
    return $(html);
};

var length = 10,
    pageIndex = 0;

// 发送ajax请求
function getNews(callback) {
    $.ajax({
            url: "http://platform.sina.com.cn/slide/album_tech",
            jsonp: "jsoncallback",
            dataType: "jsonp",
            data: {
                app_key: 1271687855,
                num: length,
                page: pageIndex
            }
        })
        .done(function (res) {
            if (res && res.status && res.status.code === "0") {
                callback(res.data);
                pageIndex++;
            } else {
                console.log("get error data");
            }
        })
        .fail(function () {
            console.log("系统错误");
        })
}