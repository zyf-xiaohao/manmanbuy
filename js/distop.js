$(function() {
    var distop = new DIDTOP();
    var title = distop.GetRequest(); //获取所属分类的id
    var num = title.id;
    distop.getSortListContent(num);
    distop.getProListContent(num);
    distop.getPllListContent(num);
});

var DIDTOP = function() {

}
DIDTOP.prototype = {
    baseURL: 'http://localhost:9090/api/',
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
    getSortListContent: function(num) {
        $.ajax({
            url: this.baseURL + 'getbrand',
            data: {
                brandtitleid: num
            },
            success: function(data) {
                var html = template('sorttpl', data);
                //console.log(html);
                $('#main .sortlist>ul').html(html);
            }
        })
    },
    getProListContent: function(num) {
        $.ajax({
            url: this.baseURL + 'getbrandproductlist',
            data: {
                brandtitleid: num,
                pagesize: 4
            },
            success: function(data) {
                var html = template('portpl', data);
                $('#main .prolist>ul').html(html);
            }
        })
    },
    getPllListContent: function(num) {
        var taht = this;
        $.ajax({
            url: this.baseURL + 'getbrandproductlist',
            data: {
                brandtitleid: num,
                pagesize: 4
            },
            success: function(data) {

                var html = template('plltpl', data);
                $('#main .pllist>ul').html(html);
                taht.getProductcom();
            }
        });
    },
    getProductcom:function(){
        var index = $('#main .plbox').index();
        $.ajax({
            url: this.baseURL + 'getproductcom',
            data: {
                productid: index
            },
            success: function(data) {
         
                var html = template('pllcontpl', data);

                console.log($('#main .pllist li .plbox'));
                $('#main .pllist li .plbox').html(html);
            }
        })
    }
}
