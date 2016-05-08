/**
 * Created by jim on 2016/4/20.
 */

'use strict';
function testApply() {
    var global_v = "global variable";
    var func = new function () {
        this.a = "func"
    };

    function closure() {
        return function (x) {
            var a = "myfunc";
            console.log(this.a);
            console.log(x);
        };
    }

    var a = closure();
    console.log("-> begin global");
    a.apply(window, [global_v]);
    console.log("-> begin func");
    a.apply(func, ['lalal']);
}

function testClosure() {
    var isFunc = [];
    var isClosure = [];
    var isClass = [];
    function noClosure() {
        console.log(item);
    }

    function hasClosure(item) {
        return function () {
            console.log(item)
        };
    }

    function addValue() {
        var i = 3;
        var testArray = [1, 2, 3];
        while (i--) {
            var item = testArray[i];
            // isFunc[2 - i] = function (item) {console.log(item)}; will console undefined
            //this will print 1 1 1, since var item are hoisted
            isFunc[2 - i] = function () {
                console.log(item)
            };
            //equal to testNo[2 - i]=noClosure
            isClosure[2 - i] = hasClosure(item);
            //isClass[2 - i] = (function (item) {
            //    this.item = item;
            //    console.log(this.item);
            //})(item);
        }
    }

    function print() {
        var i = 3;
        while (i--) {
            isFunc[i]();
            isClosure[i]();
            //isClass[i];
        }
    }
    addValue();
    print()

}
testClosure();
//testApply();