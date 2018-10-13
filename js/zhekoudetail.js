//zepto使用入口函数
$(function () {
    var mmb = new MMB();
    mmb.initNavSlide();
    mmb.navActive();
    mmb.goTop();
    var id=mmb.getUrl().id;
    // console.log(id);
    mmb.getdiscountproduct(id);
})
var MMB = function () {

}
var urlData = {};
MMB.prototype = {
    
    getUrl: function (value) {
        var url = decodeURI(location.search);
        console.log(url);
        if (url.indexOf("?") != -1) {
            var str = url.substr(1);
            var strs = str.split("&");
            console.log(strs);
            console.log(str);
            for (var i = 0; i < strs.length; i++) {
                urlData[strs[i].split("=")[0]] = strs[i].split("=")[1]
            }
            return urlData; 
        }
    },
    // 网址前缀
    baseURL: 'http://localhost:9090/api/',
    getdiscountproduct: function (num) {
        // console.log(this.baseURL + 'getdiscountproduct?productid=0');
        $.ajax({
            url: this.baseURL + 'getdiscountproduct',
            data:{
                productid:num
            },
            success: function (data) {
                // console.log(data);
                var html = template('detailTpl', data);
                // console.log(html);
                $('#main').html(html);
            }
        })
    },
    // 初始化导航栏弹簧滑动
    initNavSlide: function () {
        var swiper = new Swiper('.swiper-container', {
            direction: 'horizontal',
            slidesPerView: 'auto',
            freeMode: true,
            scrollbar: {
                el: '.swiper-scrollbar',
            },
            mousewheel: true,
        });
    },
    // 导航栏点击高亮效果
    navActive: function () {
        var ul = $('#header .swiper-slide ul');
        var lis = ul.children();
        // console.log(ul);
        // console.log(lis);
        lis.each(function (index, value) {
            $(value).attr('index', index)
        })
        ul.on('tap', function (e) {
            // console.log(e);
            var li = $(e.target).parent(); //拿到点击的li,在此之前给每个li加索引
            // console.dir(li);
            // console.log(li.index);
            var index = li.attr('index');
            // console.log(index);
            lis.removeClass('active');
            li.addClass('active');
        })
    },
    // 返回顶部
    goTop: function () {
        var goTop = $('#goTop');
        // console.log(goTop);
        $(goTop).on('Tap', function (e) {
            e.scrollTop = "0px";
        })
    }


}

