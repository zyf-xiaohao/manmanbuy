$(function() {
    var list = new LIST();
    list.getHotContent();
    list.goTop();
})

var LIST = function() {

}
LIST.prototype = {
    baseURL: 'http://localhost:9090/api/',
    getHotContent: function() {
        //console.log(this.baseURL + 'getbaicaijiaproduct');
        $.ajax({
            url: this.baseURL + 'getbaicaijiaproduct',
            data: {
                titleid: 1
            },
            success: function(data) {
                var html = template('mainContpl', data);
                //console.log(html);
                $('#main ul').html(html);

                //图片懒加载事件
                var lazyImage = function() {
                    //获取所有的图片元素
                    var imgs = $("img");

                    //定义一个数组存储所有需要加载出的图片
                    var lazyImgs = [];
                    imgs.each(function(index, ele) {
                        if (!$(ele).hasClass('lazyLoading')) {
                            lazyImgs.push($(ele));
                        }
                    })

                    //自定义一个滚动事件
                    var onScroll = function() {
                            //获取滚动距离
                            var wtop = $(window).scrollTop();
                            if (lazyImgs.length > 0) {
                                //获取可视区域的距离
                                var wheight = $(window).height();
                                for (var i = 0; i < lazyImgs.length; i++) {
                                    if (lazyImgs[i].offset().top - wtop < wheight) {
                                        lazyImgs[i].show();
                                        lazyImgs[i].next().hide();
                                        //添加待删除的数组的下标
                                        lazyImgs.splice(i, 1);
                                    }
                                }
                            }
                        }
                        //绑定滚动事件
                    $(window).on('scroll', onScroll);
                    //没有触发前先执行一次函数
                    //onScroll();
                }
                lazyImage();
            }
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
    }
}
