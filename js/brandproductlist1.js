$(function(){
	var brandtitleid =  location.search.substr(14);
	var pagesize = 10;
	var brandproductlistURL = "http://localhost:9090/api/";
	$.ajax({
		url: brandproductlistURL+"getbrandproductlist",
		data:{ brandtitleid:brandtitleid,pagesize:pagesize},
		success:function(data){
			var html = template("brandproductlistTpl",data);
			$('.content>ul').html(html);
			console.log(data);
		}
	});
});

/*var Commodity = function(){};
Commodity.prototype = {

};*/