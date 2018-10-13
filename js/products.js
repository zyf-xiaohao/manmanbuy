$(function () {
    var Products = function () {
        this.pageId = 1;
    }
    // 实现三级分类功能
    Products.prototype.initCategory = function (pageId) {
        console.log(location.search.substr(1).split('='));
        var categoryId = location.search.substr(1).split('=')[1];
        $.get('http://localhost:9090/api/getproductlist', {
                categoryid: categoryId,
                pageid: this.pageId
            },
            function (res) {
                console.log(res);
                var html = template('products-tpl', res);
                $('.content-display ul').html(html);
            })
    }



    // 实例化并调用
    var products = new Products();
    products.initCategory(products.pageId);
    // 实现上一页,下一页功能
    $('#preBtn').on('tap',function () { 
        products.pageId--;
        products.initCategory(products.pageId);
     })
    $('#nextBtn').on('tap',function () { 
        products.pageId++;
        products.initCategory(products.pageId);
     })
})