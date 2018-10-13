$(function () {
  var swiper = new Swiper('.swiper-container', {
    direction: 'horizontal',
    slidesPerView: 'auto',
    freeMode: true,
    scrollbar: {
      el: '.swiper-scrollbar',
    },
    mousewheel: true,
  });

  //  初始化下拉框


});


// 拿到url地址
var href = window.location.href;
// console.log(href);
// var url = decodeURI(href);
// console.log(url);
// 找到拼接？的下标
var idx = href.indexOf("?");
// console.log(idx);
// 拿到拼接后面的转值Id
var params = href.substring(idx + 1);
// console.log(params);
// 通过正则表达式找id的数字
var id = params.replace(/[^0-9]/ig, "");
// console.log(id);


// 创建一个变量存储跳转页面网址的前缀
var url2 ='commodityDetails.html?productid=';

// 创建一个变量存储网址的前缀
var url = "http://localhost:9090/api/";
// 随机生成页面id
// var totalPage ;

 var current = Math.ceil(Math.random()*16);
// console.log(current);

// console.log(current);





getcommodityDatails();
// 商品详情信息
function getcommodityDatails() {

  $.ajax({
    url: url + 'getmoneyctrlproduct',
    type: 'get',
    data: {
      productid: id
    },
    dataType: 'json',
    success: function (obj) {
    
      var arr = obj.result;
      // console.log(arr);


     
// 商品详情信息
      var commodityInfo = $('<div class="pic">' +
        '<a href="#"> ' +
        arr[0].productImgSm +
        '</a>' +
        '</div>' +

        '<div class="info">' +
        '<span class="mall">' +
        arr[0].productFrom +
        '</span> |' +
        '<span class="addtime" style="margin-right: 4px;">' +
        arr[0].productTime +
        '</span>' +
        '| <span class="author">' +
        arr[0].productTips +
        '</span>' +

        '| <span class="author"><a href="#newcomment" style="color:#4682c5;">' +
        arr[0].productComCount +
        '</a></span>' +
        '</div>' +
        '<h3 class="title">' +
        arr[0].productName +
        '</h3>' +
        '<h3 class="subtitle">' +
        arr[0].productPinkage +
        '</h3>' +
        '<div class="golink">' +
        '<a href="#">直达链接</a>' +
        '</div>' +
        '<div class="particulars">' +
        '<p>' +
        arr[0].productInfo2 +
        '</p>' +
        '<p>' +
        '<br>' +
        '</p>' +
        '<p>' +
        '<a href="https://s.click.taobao.com/bXs54Mw" target="_blank">10元优惠券</a>，' +
        arr[0].productInfo +
        '</p>' +
        '<p style="text-align:center;">' +
        arr[0].productImg2 +
        '</p>' +
        '</div>');

        $('#commodityInfo').append(commodityInfo);





        // 商品评论信息
        var comment = arr[0].productComment+
          '<div class="app"><a href="http://m.manmanbuy.com/app.html?type=cuxiaopl_396149&amp;value=wap">打开APP</a> 查看更多评论</div>';
         
        // console.log(comment);
        $('#conmment').append(comment);
    }




  });


}

getProductList();

// 随机生成的商品区域内容的展示的函数

function getProductList() {
  // 每改变一次值就将上次内容清空；
  $('#container').html('');
  $.ajax({
    type: 'get',
    url: url + 'getmoneyctrl',
    data: {
      pageid: current
    },
    success: function (obj) {
   
     
     
    

      var arr = obj.result;
      // console.log(arr);

      for (var i = 0; i < 5; i++) {
        // 把'有$人评论中'的中去掉；只要数字
        // 将除了0~9的数字外，替换成空字符串，只留下评论数量
        var pinglunNum = arr[i].productComCount.replace(/[^0-9]/ig, "");
        var html =
          $("<li>" +
            '<a href='+
             url2 + 
            arr[i].productId +
            '>'+
            '<div class="pic">' +
            arr[i].productImgSm +
            '</div>' +
            '<div class="introduce">' +
            '<div class="title">' +
            arr[i].productName +
            '<span>' + arr[i].productPinkage + '元包邮</span>' +
            '</div>' +
            '<div class="info">' +
            "<span class='mall'>" + arr[i].productFrom + '|' + arr[i].productTime + "</span>" +

            '<span class="comment">' +
            '<i class="fa fa-commenting-o"></i>' +
            pinglunNum +
            '</span>' +
            '</div>' +
            '</div>' +

            '</a>' +
            '</li>');
        $('#hot .container').append(html);

      };


    }


  });
};