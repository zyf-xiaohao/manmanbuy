$(function () {
    var mmb = new Manmanbuy();
    mmb.getCoupon();
})

var Manmanbuy = function () {

}

Manmanbuy.prototype = {
    baseURL: 'http://localhost:9090/api/',
    // 获取优惠券功能页面
    getCoupon: function () {
        console.log(this.baseURL + 'getcoupon');

        //请求优惠券标题的api
        $.ajax({
            url: this.baseURL + 'getcoupon',
            success: function (data) {
                // console.log(data);
                var html = template('couponTpl', data);
                // console.log(html);               
                $('#main .plist').html(html);
            }
        })
    }
}