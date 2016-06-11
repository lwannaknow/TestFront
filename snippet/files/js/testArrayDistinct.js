/**
 * Created by Jim on 2016/6/10.
 */

function unique(arr){
    var ret=[];
    var hash={};
    for(var i=arr.length;i;i--){
        var item=arr[i-1];
        var key=typeof (item)+item;
        if(!hash[key]){
            hash[key]=true;
            ret.push(item);
        }
    }
    console.log(ret);
    return ret;
}

//var a = [1, 1, 3, 2, '4', 1, 2, 4, '1'];
//var b = [{name: "hanzichi"}, {age: 30}, new String(1), new Number(1)];