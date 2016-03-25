"use strict";

//异步加载图片
/*function loadImageAsync(url){
    return new Promise(function(resolve,reject){
        var image = new Image();

        image.onload = function(){
            resolve(image);
        }

        image.onerror = function(){
            reject(new Error('Could not load image at' + url));
        };

        image.src = url;
    });
}*/

//Promise对象实现Ajax操作的例子
var getJson = function getJson(url) {
    var promise = new Promise(function (resolve, reject) {
        var client = new XMLHttpRequest();
        client.open("GET", url);
        client.onreadystatechange = handler;
        client.responseType = "json";
        client.setRequestHeader("Accept", "application/json");
        client.send();

        function handler() {
            if (this.readState !== 4) {
                return;
            }
            if (this.status === 200) {
                resolve(this.response);
            } else {
                reject(new Error(this.statusText));
            }
        };
        return promise;
    });
};

getJson("/posts/json").then(function (json) {
    console.log(json);
}).catch(function (error) {
    console.log("出错了", error);
});
//# sourceMappingURL=promise.js.map
