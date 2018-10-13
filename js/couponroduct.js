$(function () {
    var mmb = new Manmanbuy();
    mmb.getcouponproduct(couponid);
})

var Manmanbuy = function () {

}

var href = window.location.href;
// 获取下标
var idx = href.indexOf('?');
// 截取下标
var url = href.substring(idx + 1);
console.log(url);
// 替换
var couponid = url.replace(/[^0-9]/ig, "");
// console.log(couponid);


// 轮播图初始化代码
var swiper = new Swiper('.swiper-container', {
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    pagination: '.swiper-pagination',
    paginationClickable: true,
    nextButton: '.swiper-button-next',
    prevButton: '.swiper-button-prev',
    parallax: true,
    speed: 600,
    observer: true, //调完接口不能翻页解决方法，修改swiper自己或子元素时，自动初始化swiper           
    observeParents: true, //调完接口不能翻页解决方法，修改swiper的父元素时，自动初始化swiper          
    onSlideNextEnd: function (swiper) {
        sow()
    },
    onSlidePrevEnd: function (swiper) {
        sow()
    }
});

// 显示遮罩层和轮播图大盒子
function showClick() {
    $('.bigSwiper').show();
}
// 列表模板点击事件
$('.left').click(function () {
    $('.bigSwiper').show();
    $('.close').show();
})
//关闭按钮
function hideClick() {
    $('.close').hide();
    $('.bigSwiper').hide();
}

Manmanbuy.prototype = {
    baseURL: 'http://localhost:9090/api/',
    // 获取优惠券列表api
    getcouponproduct: function (couponid) {
        console.log(this.baseURL + 'getcouponproduct');
        // 请求
        $.ajax({
            url: this.baseURL + 'getcouponproduct',
            data: {
                'couponid': couponid
            },
            success: function (data) {
                // console.log(data);
                // 优惠券列表
                var html = template('couponListTpl', data);
                $('#ul').html(html);
                //轮播图
                var html1 = template('couponImgTpl', data);
                $('.swiper-wrapper').html(html1);
            }
        })
    }
}