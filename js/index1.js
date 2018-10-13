$(function(){
    var sitenav = new Sitenav();
    sitenav.storeList();
})

var Sitenav = function(){ };

Sitenav.prototype = {
    sitenavURL:"http://localhost:9090/api/",
    storeList:function(){
        $.ajax({
            url: this.sitenavURL+"getsitenav",
            success:function(data){
                console.log(data);
                var html = template('sitenavTpl',data);
                $('#storelist > ul').html(html);
            }
        })
    }
}