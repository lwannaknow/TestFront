/**
 * Created by max on 16-1-1.
 */
function initReserveCtrl($http, $routeParams) {
    var
        self = this,
        data = JSON.parse($routeParams.data),
        params = {
            "kiosk_id": data.kiosk_id,
            "products": {}
        },
        products = params.products;

    self.status = "支付成功";
    self.msg = "连接机器";
    angular.forEach(data.products, function (product) {
        products[product.upc] = product.purchase_num;
    });
    //alert(JSON.stringify(params));
    //var params = {"kiosk_id": "M2-B131", "products": {"upc": "", "quantity": ""}};
    $http.get(SERVER_URL + "/api/reserve/reserve_products?params=" + JSON.stringify(params))
        .success(function (data) {
            //alert(JSON.stringify(data));
            var
                status = data.status,
                result = data.data;
            if (status.toUpperCase() == "SUCCESS" && result == true) {
                self.msg = "预订成功！"
            }
            else {
                self.msg = "预订失败，稍后将自动退款。"
            }
        })
        .error(function () {
            self.msg = "网络错误，稍后将自动退款。";
        });
}