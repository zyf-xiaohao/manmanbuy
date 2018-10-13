

//获取两个下拉框
var name1 = document.getElementById('name1');
var area = document.getElementById('area');
var one = document.getElementsByClassName('one')[0];
var li = one.children; //所有的li




//值改变事件发请求
name1.onchange = function(){
    // console.log(name1.value)
    
    //发送请求
    var xhr = new XMLHttpRequest();
    xhr.open('get','http://localhost:9090/api/getgsproduct?shopid='+name1.value+'&areaid='+area.value );
    xhr.onload=function(){
        var obj = JSON.parse(xhr.responseText);
        // console.log(obj)
        var html = template('tpl',obj);
        // console.log(html)
        one.innerHTML=html;

        //发请求之前先清除localstorage
        // localStorage.clear();
        // localStorage.setItem(xhr.responseText,json);
        for(var i=0;i<li.length;i++){
            li[i].children[0].onclick = function(){
                var src = this.children[0].src;
                // console.log(src)
                var productName = this.children[1].children[0].innerText;
                // console.log(productName)
                var productPrice = this.children[1].children[1].innerText;

                //存进localstorage
                var obj = {src:src,productName:productName,productPrice:productPrice};
                var json = JSON.stringify(obj);
                // console.log(json)
                localStorage.setItem('obj',json);
            }
        }
        
        

        


    }
    xhr.send();
}
area.onchange = function(){
    //发送请求
    var xhr = new XMLHttpRequest();
    xhr.open('get','http://localhost:9090/api/getgsproduct?shopid='+name1.value+'&areaid='+area.value );
    xhr.onload=function(){
        var obj = JSON.parse(xhr.responseText);
        console.log(obj)
        var html = template('tpl',obj);
        // console.log(html)
        one.innerHTML=html;

        //发请求之前先清除localstorage
        // localStorage.clear();
        // localStorage.setItem(xhr.responseText,json);
        for(var i=0;i<li.length;i++){
            li[i].children[0].onclick = function(){
                var src = this.children[0].src;
                // console.log(src)
                var productName = this.children[1].children[0].innerText;
                // console.log(productName)
                var productPrice = this.children[1].children[1].innerText;

                //存进localstorage
                var obj = {src:src,productName:productName,productPrice:productPrice};
                var json = JSON.stringify(obj);
                // console.log(json)
                localStorage.setItem('obj',json);
            }
        }
    }
    xhr.send();
}
name1.onchange();





