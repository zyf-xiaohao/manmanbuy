$(function() {
	var Products = function() {
		this.pageId = 1;
	}
	var mmb = new Manmanbuy();
	mmb.getIndexNav();
	mmb.getMoneyctrl();
	mmb.getClassfiy();
	// 实现三级分类功能
	Products.prototype.initCategory = function(pageId) {
		
		console.log(location.search.substr(1).split('='));
		var productId = location.search.substr(1).split('=')[0];
		$.get('http://localhost:9090/api/getmoneyctrl', {
				productId: productId,
				pageid: this.pageId
				
			},
			function(res) {
//				res.result[categoryId]=9;
				console.log(res);
				var html = template('mainTmp', res);
				$('#main .media').html(html);
			})
	}

	// 实例化并调用
	var products = new Products();
	products.initCategory(products.pageId);
	// 实现上一页,下一页功能
	$('#preBtn').on('tap', function() {
		products.pageId--;
		products.initCategory(products.pageId);
		console.log(products.initCategory(products.pageId));
	})
	$('#nextBtn').on('tap', function() {
		products.pageId++;
		products.initCategory(products.pageId);
	})
})

var Manmanbuy = function() {

}


Manmanbuy.prototype = {
	//获取首页导航数据
	getIndexNav: function() {
		// 1. 请求获取首页导航数据的API
		$.ajax({
			url:'http://localhost:9090/api/getindexmenu',
			success: function(obj) {
				              console.log(obj);
				var html = template('indexNavTmp', obj);
				$('#nav .row').html(html);
			}
		})
	},
	getMoneyctrl: function() {
		// 1. 请求首页折扣商品列表数据
		$.ajax({
			url: 'http://localhost:9090/api/getmoneyctrl',
			success: function(obj) {
				//				totalPage = Math.floor(obj.totalCount / obj.pagesize);
				//				console.log(totalPage);
//				var html = template('mainTmp', obj);
//				$('#main .media').html(html);
				//				for(var j = 0; j < totalPage; j++) {
				//					if((j + 1) == current) {
				//						console.log(j + 1);
				//
				//						var html =
				//							$("<option value=" +
				//								(j + 1) +
				//								" selected='selected'>" +
				//								(j + 1) +
				//								'/' + totalPage +
				//								"</option>");
				//						$('#selectPage').append(html);
				//					} else {
				//						var html = $('<option value=' + (j + 1) + '>' + (j + 1) + '/' + totalPage + '</option>');
				//						$('#selectPage').append(html);
				//					}
				//
				//				}

			}
		})
		//拿到当前页

		$('#selectPage').on('change', function() {
			current = +$('#selectPage').val();
			// 当值改变时调用函数，pageid改变了商品列表也就刷新了；
			//		getProductList();

		});

		// 点击上下页的函数
		$('#page-previous').on('click', function() {

			current -= 1;
			//  find遍历的意思

			if(current == 0) {
				current = 1;
				$('.page .block').show();
				// console.log( $('.page .block'));

			} else {
				$('.page .block').hide();
			}
			//		getProductList();

		});
		$('#page-next').on('click', function() {

			current += 1;
			if(current == (totalPage + 1)) {
				current = totalPage;
				// alert('已经是最后一页了');
				$('.page .block').show();
			} else {
				$('.page .block').hide();
			}

			//		getProductList();

		});
	},

	getClassfiy: function() {
		$.ajax({
			url: 'http://localhost:9090/api/getcategorytitle',
			success: function(obj) {
				  			console.log(obj);
				var html = template('classfiyTitle', obj);
				$('.panel-title a').html(html);
			}
		})
	}
}