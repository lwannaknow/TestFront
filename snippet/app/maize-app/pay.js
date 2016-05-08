/**
 * Created by max on 16-1-1.
 */
function initPayCtrl($routeParams) {
    var self = this;
    console.log($routeParams);
    var status = $routeParams.status;
    self.status = JSON.parse(status).kiosk_id;
}