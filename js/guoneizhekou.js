//zepto使用入口函数
$(function () {
    var mmb = new MMB();
    mmb.initNavSlide();
    mmb.navActive();
    mmb.getInlandDiscount();
    mmb.goTop();
})
var MMB = function () {

}
MMB.prototype = {
    // 网址前缀
    baseURL: 'http://localhost:9090/api/',
    getInlandDiscount: function () {
        // console.log(this.baseURL + 'getinlanddiscount');
        $.ajax({
            url: this.baseURL + 'getinlanddiscount',
            success: function (data) {
                // console.log(data);
                var html = template('zhekouTpl', data);
                // console.log(html);
                $('#main ul').html(html);
                // 懒加载
                var imgs=$('#main .img img');
                // console.log(imgs);
                imgs.each(function(index,value){
                    // console.log(index);
                    // console.log(value);
                    // 存储真实路径,替换懒加载
                    var imgUrl=value.src;
                    // console.log(url);
                    $(value).attr('src',"//img2.bdstatic.com/static/searchresult/img/loading_circle_40b82ef.gif");
                    // console.log(value);
                    $(value).attr('dataSrc',imgUrl);
                    $(window).on('scroll',function(){
                        // 判断加载区域
                        if($(window).height()>$(value).offset().top-$(window).scrollTop()){
                            // 加载真实的图片地址
                            $(value).attr('src',imgUrl);
                        }
                    })                    
                })
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
    goTop:function(){
        var goTop=$('#goTop');
        // console.log(goTop);
        $(goTop).on('Tap',function(e){
            e.scrollTop="0px";
        })
    }
    
    
}