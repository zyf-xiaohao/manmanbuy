$(function(){
    var url = decodeURI(location.href);
    if(url.indexOf('productid')==-1||url.indexOf('category')==-1){
        var productid = 20;
        var categoryid = 1;
    }else {
        var str = url.substr(url.indexOf("=")+1);
        var categoryid = str.substr((str.indexOf('=')+1));
        var place = str.indexOf('&');
        var productid = str.substr(0,place);
   
        console.log(categoryid);
        console.log(productid);
        
    }
    $.ajax({
        url:"http://localhost:9090/api/getcategorybyid",
        data:{'categoryid':categoryid},
        dataType:'json',
        success:function(obj){
            console.log(obj);
           var category = obj.result[0].category;
            $('#details a').eq(1).html(category);
        }
    })
    $.ajax({
        url:"http://localhost:9090/api/getproduct",
        dataType: "json",
        data:{'productid':productid},
        success:function(obj){
            console.log(obj);
            $(".info").html(obj.result[0].productName);
            var info = obj.result[0].productName;
            var name = info.substr(0,info.indexOf(" "));
            $('#details a').eq(2).html(name);
            $('.pic').html(obj.result[0].productImg);
            $('#price').html(obj.result[0].bjShop);
            $('.lostestPrice').html($('.red').html());
            var categoryId = obj.result[0].categoryId;
            $('#details a').eq(1).attr('href','shangpinliebiao.html?categoryId='+categoryId);
            
        }
    });
    $.ajax({
        url:"http://localhost:9090/api/getproductcom",
        dataType:"json",
        data:{'productid':productid},
        success:function(obj){
            console.log(obj);
            var html=template('tpl-comment',obj);
            $('.comment-box').html(html);
            $('.commentsNum').html(obj.result.length);
        }
    })

})