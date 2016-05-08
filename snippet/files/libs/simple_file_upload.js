/**
 * Created by jim on 2015/12/16.
 */



(function () {
    var app = angular.module("commericalChannel", []);
    app.controller("commericalCtrl", function ($scope) {
        var commercial = this;
        commercial.src = "images/commercial/cmmcl_default.jpg";
        commercial.doThis=function(){
            console.log("lalal");
        };
        //commercial.img_name = "default.jpg";
    });
    app.directive('imageonload', function () {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                element.bind('load', function () {
                    //call the function that was passed
                    console.log("lalal");
                    scope.$apply(attrs.imageonload);
                });
            }
        };
    })
})();
