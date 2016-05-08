/**
 * Created by jim on 16-1-1.
 */
(function() {
    var app = angular.module('my_cart', ['ngAnimate']);
    app.controller('cartController', function ($http, $location,$uibModalInstance, APP_ID, OPEN_ID) {
        var self = this,
            default_kiosk_params = {"open_id": OPEN_ID, "company": ""};
        console.log(default_kiosk_params);
        // self.attributes

        self.show_alert = false;
        self.alert_msg = "";
        self.alert_success = true;
        default_kiosk_params["company"] = "麦泽";

        self.alter_kiosk=function(){
            $uibModal.dismiss('cancel');
            $http.get(SERVER_URL + "/api/shopping_cart/alter_kiosk?params=" + JSON.stringify(default_kiosk_params)).
                then(function successCallback(response) {
                    var geo=response.data.data;
                    angular.forEach(geo["kiosk_docs"],function(value){
                        var location_array=value["location"].split("区");
                        value["district"] =location_array[0]+"区";
                        value["exact_address"] =location_array[1];
                    });
                    $location.path("/kiosk_map" + JSON.stringify({
                            "user_geo": geo["user_geo"],
                            "kiosk_docs": geo["kiosk_docs"],
                            "default_kiosk":self.kiosk_info.kiosk_id,
                            "company":default_kiosk_params["company"]
                        }));
                },function errorCallback(){
                    self.alert_success = false;
                    self.alert_msg = "网络错误，请稍后重试";
                    self.show_alert = true;
                });
        }
    });
})();
