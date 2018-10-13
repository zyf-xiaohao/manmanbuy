$(function() {
    var odds = new ODDS();
    var title = odds.GetRequest(); //获取所属分类的id
    var num = title.titleid;
    odds.getOddsContent(num);
    odds.getTopMenuContent();
    odds.cutTopMenuShow();
    odds.goTop();
    odds.cutMainMenuContent();
    odds.getTitle(num);
})
var ODDS = function() {

}
ODDS.prototype = {
    baseURL: 'http://localhost:9090/api/',
    getOddsContent: function(num) {
        //console.log(this.baseURL + 'getbaicaijiaproduct');
        $.ajax({
            url: this.baseURL + 'getbaicaijiaproduct',
            data: {
                titleid: num
            },
            success: function(data) {
                var html = template('mainContpl', data);
                //console.log(html);
                $('#main>ul').html(html);
                var imgList = $('#main .cover img');
                //console.log(imgList);
                imgList.each(function(index, ele) {
                    var width = $(this).width(); // 图片实际宽度
                    var height = $(this).height(); // 图片实际高度
                    var url = ele.src;
                    //获取可视区域的距离
                    var wheight = $(window).height();
                    $(ele).attr('src', '//img2.bdstatic.com/static/searchresult/img/loading_circle_40b82ef.gif');
                    $(ele).css("height", 27);
                    $(ele).css("width", 25);
                    $(window).on('scroll', function() {
                        var wtop = $(window).scrollTop(); //获取滚动距离
                        if ($(ele).offset().top - wtop < wheight) {
                            $(ele).attr('src', url);
                            $(ele).css("height", height);
                            $(ele).css("width", width);
                        }
                    })
                })
            }
        })
    },
    getTopMenuContent: function() {
        $.ajax({
            url: this.baseURL + 'getbaicaijiatitle',
            success: function(data) {
                var html = template('tMContpl', data);
                //console.log(html);
                $('.top-menu .menu-content ul').html(html);
            }
        })
    },
    cutTopMenuShow: function() {
        $('.menu-detail .icon').on('tap', function() {
            if ($('.top-menu').hasClass('top-menu-show')) {
                $(this).removeClass('icon-jiantou-copy-copy-copy').addClass('icon-jiantouarrow483');
                $('.top-menu').removeClass('top-menu-show');
            } else {
                $(this).removeClass('icon-jiantouarrow483').addClass('icon-jiantou-copy-copy-copy');
                $('.top-menu').addClass('top-menu-show');
            }
        });
        $('.up-menu').on('tap', function() {
            $('.top-menu').removeClass('top-menu-show');
        })
    },
    goTop: function() {
        $(window).on('scroll', function() {
            var scroll = $(window).scrollTop(); //滚动距离
            var headerHeight = $('#header').height();
            var itemHeight = $('.item').height() * 2;
            var height = headerHeight + itemHeight;
            if (scroll > height) {
                $('#gotop').show();
            } else {
                $('#gotop').hide();
            }
        });
        $('#gotop').on('tap', function() {
            scroll('0px', 300);
        })

        function scroll(scrollTo, time) {
            var scrollFrom = parseInt(window.pageYOffset),
                i = 0,
                runEvery = 5; // run every 5ms
            scrollTo = parseInt(scrollTo);
            time /= runEvery;
            var interval = setInterval(function() {
                i++;
                document.documentElement.scrollTop = (scrollTo - scrollFrom) / time * i + scrollFrom;
                if (i >= time) {
                    clearInterval(interval);
                }
            }, runEvery);
        }
    },
    cutMainMenuContent: function() {
        $('.order-nav ul li').on('tap', function() {
            $('.order-nav ul li').removeClass('cur');
            $(this).addClass('cur');
        })
    },
    GetRequest: function() {
        var url = location.search; //获取url中"?"符后的字串  
        var theRequest = new Object();
        if (url.indexOf("?") != -1) {
            var str = url.substr(1);
            strs = str.split("&");
            for (var i = 0; i < strs.length; i++) {
                theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
            }
        }
        return theRequest;
    },
    getTitle: function(num) {
        $.ajax({
            url: this.baseURL + 'getbaicaijiatitle',
            success: function(data) {
                var list = data.result;
                for (var i = 0; i < list.length; i++) {
                    if (list[i].titleId == num) {
                        //console.log(1);
                        $('title').html(list[i].title + '专区');
                        $('#header .menu-detail span').html(list[i].title);
                    }
                }
            }
        })
    }
}
