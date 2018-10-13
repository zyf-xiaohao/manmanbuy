$(function () {
    var mmb = new Manmanbuy();
    mmb.getcouponproduct(couponid);
})

var Manmanbuy = function () {

}

var href =window.location.href;
// 获取下标
var idx = href.indexOf('?');
// 截取下标
var url = href.substring(idx+1);
console.log(url);
// 替换
var couponid = url.replace(/[^0-9]/ig,"");
console.log(couponid);



Manmanbuy.prototype = {
    baseURL: 'http://localhost:9090/api/',
    // 获取优惠券列表api
    getcouponproduct: function (couponid) {
        console.log(this.baseURL + 'getcouponproduct');
        // 请求
        $.ajax({
            url: this.baseURL + 'getcouponproduct',
            data: {'couponid': couponid},
            success: function (data) {
                console.log(data);
                var html = template('couponListTpl',data);
                $('#ul').html(html);
            }
        })
    }
}