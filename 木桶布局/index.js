function Barrel($ct) {
    this.$ct = $ct;
    this.baseHeigh = 100;
    this.imgNum = 50;
    this.rowList = [];
    this.loadImg();
}

Barrel.prototype = {
    // 随机生成图片地址
    getImgUrls: function (num) {
        var width, height, color, urls = [];

        for (var i = 0; i < num; i++) {
            width = Math.floor(Math.random() * 100 + 50);
            height = Math.floor(Math.random() * 30 + 50);
            color = Math.random().toString(16).substring(2, 8);
            urls.push("http://via.placeholder.com/" + width + 'x' + height + '/' + color);
            // urls.push("https://unsplash.it/" + width +"/" + height)
        }
        return urls;
    },

    //加载图片

    loadImg: function () {

        var _this = this,
            imgs = this.getImgUrls(_this.imgNum);
        console.log("这是", imgs);
        $.each(imgs, function (idx, url) {
            console.log(url);
            var img = new Image();
            img.src = url;
            img.onload = function () {

                var imgInfo = {
                    target: $(img),
                    height: _this.baseHeigh,
                    width: _this.baseHeigh * img.width / img.height
                }
                _this.render(imgInfo);
            }
        });
    },

    render: function (imgInfo) {
        var _this = this;
        var clientWidth = this.$ct.width(),
            rowWidth = 0,
            rowHeight = 0;
        this.rowList.push(imgInfo);
        for (var i = 0; i < this.rowList.length; i++) {
            rowWidth += this.rowList[i].width;
        }
        if (rowWidth > clientWidth) {
            this.rowList.pop();
            rowWidth = rowWidth - imgInfo.width;
            rowHeight = _this.baseHeigh * clientWidth / rowWidth;
            this.createRow(rowHeight);
            this.rowList = [];
            this.rowList.push(imgInfo);
        }
    },

    createRow: function (rowHeight) {
        console.log('createRow');
        var $rowCt = $('<div class="img-row"></div>')
        $.each(this.rowList, function (idx, imgInfo) {
            var $imgCt = $('<div class="img-box"></div>'),
                $img = imgInfo.target;
            $img.height(rowHeight);
            $imgCt.append($img);
            $rowCt.append($imgCt);
        })
        console.log('这是', $rowCt);
        this.$ct.append($rowCt);
    }
}
new Barrel($('.img-preview'));