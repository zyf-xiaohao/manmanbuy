$(function() {
    var baicaijia = new baiCaiJia();
    baicaijia.getSlider();
    baicaijia.initSwiper();
    baicaijia.getHotContent();
    baicaijia.getDisContent();
    baicaijia.getTime();
    baicaijia.cutTopMenuShow();
    baicaijia.getTopMenuContent();
    baicaijia.goTop();
});

var baiCaiJia = function() {

}
baiCaiJia.prototype = {
    baseURL: 'http://localhost:9090/api/',
    getSlider: function() {
        //获得slider插件对象
        var gallery = mui('.mui-slider');
        gallery.slider({
            interval: 1000 //自动轮播周期，若为0则不自动播放，默认为0；
        });
    },
    initSwiper: function() {
        var swiper = new Swiper('.swiper-container', {
            direction: 'horizontal', //水平滑动
            slidesPerView: 'auto', //根据内容自动显示页面内容(可以多滑动页面显示)
            freeMode: true, //是否有弹跳
            scrollbar: {
                el: '.swiper-scrollbar', //初始化类为.swiper-scrollbar的盒子为滚动条
            },
            mousewheel: true, //鼠标滑动(非移动端)
        });
    },
    getHotContent: function() {
        //console.log(this.baseURL + 'getbaicaijiaproduct');
        $.ajax({
            url: this.baseURL + 'getbaicaijiaproduct',
            data: {
                titleid: 1
            },
            success: function(data) {
                var html = template('titContpl', data);
                //console.log(html);
                $('.content .swiper-slide ul').html(html);
            }
        })
    },
    getDisContent: function() {
        $.ajax({
            url: this.baseURL + 'getbaicaijiaproduct',
            data: {
                titleid: 0
            },
            success: function(data) {
                var html = template('disContpl', data);
                //console.log(html);
                $('#discounts .content ul').html(html);
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
    getTime: function() {
        var date = new Date();
        var month = date.getMonth() + 1;
        var day = date.getDate();
        //console.log(month,day);
        $('#discounts .real-time').html(month + '.' + day);
    },
    cutTopMenuShow: function() {
        $('.main-cat').on('tap', function() {
            if ($('.top-menu').hasClass('top-menu-show')) {
                $('.top-menu').removeClass('top-menu-show');
            } else {
                $('.top-menu').addClass('top-menu-show');
            }
        });
        $('.up-menu').on('tap', function() {
            $('.top-menu').removeClass('top-menu-show');
        })
    },
    getTopMenuContent: function() {
        $.ajax({
            url: this.baseURL + 'getbaicaijiatitle',
            success: function(data) {
                //console.log(data);
                var html = template('tMContpl', data);
                //console.log(html);
                $('.top-menu .menu-content ul').html(html);
            }
        })
    },
    goTop: function() {
        $(window).on('scroll', function() {
            var scroll = $(window).scrollTop(); //滚动距离
            var headerHeight = $('#header').height();
            var slideHeight = $('#slide').height();
            var navHeight = $('#nav').height();
            var height = headerHeight + slideHeight + navHeight;
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
    }
}