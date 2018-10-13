$(function () {
    var Category = function () {

    }
    // 渲染分类标题
    Category.prototype.renderTitle = function () {
        $.get('http://localhost:9090/api/getcategorytitle',
            function (res) {
            	console.log(res);
                var html = template('category-title', res);
                $('.container .mui-table-view').html(html);
            })
    }
    Category.prototype.initTitleContent = function () {
        $('.category-content .mui-table-view').on('tap', 'li.mui-table-view-cell>a', function (e) {
            // e.stopPropagation();
            
            $.get('http://localhost:9090/api/getcategory', {
                    titleid: $(e.target).attr('data-title-id')
                },
                function (res) {
                    $('.mui-collapse-content>ul').html('');
                    for (var i = 0; i < res.result.length; i++) {
                        $('<li data-title-id='+ res.result[i].titleId+' data-category-id=' + res.result[i].categoryId + '><a href="products.html?categoryId='+ res.result[i].categoryId +'">' + res.result[i].category + '</a></li>').appendTo($('.mui-collapse-content>ul'));

                    }

                })
        })
    }



    // 实例化并调用
    var category = new Category();
    category.renderTitle();
    category.initTitleContent();
})