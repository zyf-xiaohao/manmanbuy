$(function () {
	var top = new TOP();
	top.getTopContent();
})

var TOP = function () {
	
}
TOP.prototype = {
	baseURL: 'http://localhost:9090/api/',
    getTopContent: function() {
        //console.log(this.baseURL + 'getbaicaijiaproduct');
        $.ajax({
            url: this.baseURL + 'getbrandtitle',
            success: function(data) {
                var html = template('contpl', data);
                console.log(html);
                $('#main .content>ul').html(html);
            }
        })
    },
}