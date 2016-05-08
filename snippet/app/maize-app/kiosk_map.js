/**
 * Created by jim on 2016/1/2.
 */
function initMAPCtrl($routeParams, $scope, $http,OPEN_ID, $location) {
    var self = this,
        setMap,
        data = JSON.parse($routeParams.geo);
    self.geo = {
        "user_geo": data["user_geo"],
        "kiosk_docs": data["kiosk_docs"],
        "default_kiosk": data["default_kiosk"],
        "company": data["company"]
    };

    //
    self.chosen_kiosk = "";
    self.exact_address = self.geo.kiosk_docs[self.geo.default_kiosk].exact_address;
    self.district = self.geo.kiosk_docs[self.geo.default_kiosk].district;
    self.is_default = true;

    //console.log(self.geo);
    (setMap = function () {
        var center = new qq.maps.LatLng(self.geo.user_geo["latitude"], self.geo.user_geo["longitude"]);
        var map = new qq.maps.Map(document.getElementById("container_kiosk_map"), {
            center: center,
            zoom: 14
        });
        var marker = new qq.maps.Marker({
            position: center,
            map: map
        });
        var infoWin = new qq.maps.InfoWindow({
            map: map
        });

        var anchor = new qq.maps.Point(6, 6),
            size = new qq.maps.Size(81.6, 102),
            origin = new qq.maps.Point(0, 0),
            sSize = new qq.maps.Size(81.6, 102),
            icon = new qq.maps.MarkerImage('img/cart/IconKiosk.png', size, origin, anchor, sSize);

        var kiosks = self.geo.kiosk_docs;
        console.log(kiosks);

        angular.forEach(kiosks, function (value, key) {
            //console.log(value);
            //console.log(key);
            var latlng = new qq.maps.LatLng(value.lat, value.lng);

            var marker = new qq.maps.Marker({
                icon: icon,
                position: latlng,
                map: map,
                anchor: qq.maps.Point(41, 51)
            });
            qq.maps.event.addListener(marker, 'click', function () {
                $scope.$apply(function () {
                    infoWin.open();
                    infoWin.setContent('<div style="text-align:center;white-space:' +
                        'nowrap;margin:10px;">' +
                        value.location + '</div>');
                    infoWin.setPosition(latlng);
                    console.log(self.geo.default_kiosk);
                    console.log(key);
                    if (key != self.geo.default_kiosk) {
                        self.is_default = false;
                        console.log(self.is_default);
                        //self.choose_info="更改取货机器"
                    }
                    else {
                        self.is_default = true;
                    }
                    self.chosen_kiosk = key;
                    self.exact_address = value.exact_address;
                    self.district = value.district;
                });
            });
        });
    })();

    self.chosen = function () {
        var params = JSON.stringify({"open_id":OPEN_ID,"company": data["company"], "chosen_kiosk": self.chosen_kiosk});
        //var params = JSON.stringify({"open_id":OPEN_ID,"company": data["company"], "chosen_kiosk": self.kiosk_id});
        console.log(params);
        $http.post(SERVER_URL + "/api/shopping_cart/set_default_kiosk?params=" + params).then(function successCallback(response) {
            console.log(response.data.data);
        }, function errorCallback(response) {
            console.log(response);
        })
    };
}