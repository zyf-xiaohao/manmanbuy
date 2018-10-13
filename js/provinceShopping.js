$(function () {

  var productList = new ProductList();


  //调用头部列表的初始化
  productList.indexTopSwiper();
  // 调用主体的初始化
  productList.indexmainSwiper();


});


var ProductList = function () {

};
ProductList.prototype = {


  // 头部列表的初始化
  indexTopSwiper: function () {
    var swiper = new Swiper('#nav .swiper-container', {
      direction: 'horizontal',
      slidesPerView: 'auto',
      freeMode: true,
      scrollbar: {
        el: '.swiper-scrollbar',
      },
      mousewheel: true,
    });
  },
  // 主体中间商品展示的初始化
  indexmainSwiper: function () {

    var swiper = new Swiper('#main .swiper-container', {
      direction: 'vertical',
      slidesPerView: 'auto',
      freeMode: true,
      scrollbar: {
        el: '.swiper-scrollbar',
      },
      mousewheel: true,
    });
  },
  // 
  //在原型对象上写一个baseURL API的前缀网址 本地 或者网络
  // baseURI: 'http://localhost:9090/api/',



};
// 入口函数结束



// 主体内容和分页函数

// 导航栏数据
// 创建一个变量存储跳转页面网址的前缀
var url2 ='commodityDetails.html?productid=';
// 创建一个变量存储网址的前缀
var url = "http://localhost:9090/api/";
// 定义一个变量存储当前页、默认是  第一页
var current = 1;
// 总页数
var totalPage;



$.ajax({
  type: 'get',
  url: url + 'getIndexmenu',
  success: function (obj) {
    console.log(obj);
    var arr = obj.result;
    for (var i = 0; i < arr.length; i++) {
      if (i == 7) {
        //什么都不做把更多这个tab去掉
      } else if (i == 1) {
        var html = $("<li class='active' ><a href="+ arr[i].titlehref+">" + arr[i].name + "</a></li>");
        $('#nav .clearfix').append(html);
      } else {
        var html = $("<li ><a href="+ arr[i].titlehref+ ">" + arr[i].name + "</a></li>");
        $('#nav .clearfix').append(html);
      }

    }

  }


});

getProductList();
// 商品区域内容的展示的函数
function getProductList() {
  // 每改变一次值就将上次内容清空；
  $('#main ul').html('');
  $('#selectPage').html('');
  $.ajax({
    type: 'get',
    url: url + 'getmoneyctrl',
    data: {
      pageid: current
    },
    success: function (obj) {
      // console.log(obj);
      

      totalPage = Math.floor(obj.totalCount / obj.pagesize);
      console.log(totalPage);
      // console.log(current);

      
      for (var j = 0; j < totalPage; j++) {
        if ( (j+1) == current )  {
          console.log(j+1);
          
          var html =
            $("<option value=" + 
              (j + 1) + 
              " selected='selected'>" +
              (j + 1) +
              '/' + totalPage +
              "</option>");
          $('#selectPage').append(html);
        } else {
          var html = $('<option value=' + (j + 1) + '>' + (j + 1) + '/' + totalPage + '</option>');
          $('#selectPage').append(html);
        }
  
  
      }
      var arr = obj.result;
      // console.log(arr);

      for (var i = 0; i < arr.length; i++) {
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
        $('#main ul').append(html);

      };


    }


  });
};






//拿到当前页

$('#selectPage').on('change', function () {
  current = +$('#selectPage').val();
  // 当值改变时调用函数，pageid改变了商品列表也就刷新了；
  getProductList();

});


// 点击上下页的函数
$('#page-previous').on('click', function () {

  current -= 1;
  //  find遍历的意思


  if (current == 0) {
    current = 1;
    $('.page .block').show();
    // console.log( $('.page .block'));
    

  }else{
    $('.page .block').hide();
  }
  getProductList();

});
$('#page-next').on('click', function () {

  current += 1;
  if (current == (totalPage+1)) {
    current = totalPage;
    // alert('已经是最后一页了');
    $('.page .block').show();
  }else{
    $('.page .block').hide();
  }

  getProductList();

});





// 获取下拉框的option;



  