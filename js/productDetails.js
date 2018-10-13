$(function () {
    var ProductDetails = function () {}
    // 渲染商品详情页面
    ProductDetails.prototype.renderPage = function (productId) {
        $.get('http://localhost:9090/api/getproduct', {
                productid: productId
            },
            function (res) {
                var html = template('productDetail-tpl', res);
                $('.product-content .display').html(html);
            })
    }
    // 渲染商品详情页面的评论
    ProductDetails.prototype.renderCom = function (productId) {
        $.get('http://localhost:9090/api/getproductcom', {
                productid: productId
            },
            function (res) {
                console.log(res);
                var html = template('productCom-tpl',res);
                $('#item3>ul').html(html);
            })
    }


    // 实例化并调用
    var productDetails = new ProductDetails();
    productId = location.search.substr(1).split('=')[1];
    productDetails.renderPage(productId);
    productDetails.renderCom(productId);
})