$(function(){
	var productid  =  location.search.substr(11);
	console.log(productid);
	var brandproductlistURL = "http://localhost:9090/api/";
	$.ajax({
		url: brandproductlistURL+"getproductcom",
		data:{ productid:productid},
		success:function(data){
			var html = template("productcomTpl",data);
			$('.comment-mian-text').html(html);
		}
	});

	$.ajax({
		url: brandproductlistURL+"getproduct",
		data:{ productid:productid},
		success:function(data){
			var html = template('detailTpl',data);
			$('.detail').html(html);
		}
	})
});