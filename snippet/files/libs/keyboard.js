/**
 * Created by max on 15-11-23.
 */

function on_press_key(key) {
    var text = $(key).attr("data-keyboard");
    var current = "";
    var $pick_up_cod = $("#code");
    var old = $pick_up_cod.val();
    if (text == "×") {
        current = old.substring(0, old.length - 1);
        $pick_up_cod.val(current);
        return 0;
    }
    if (text == "√") {
        current = old;
        var id = $(key).closest('#keyboard').attr('id');
        var event_name = "pickup_click";
        var reference_data = current;
        console.log("on_press_key code is " + $.md5(current));
        if ($.md5(current) == SCODE) {
            //clear_shopping_cart();
            check_gate_controler("CLOSE",undefined);
            window.location.href = 'A0.html';
            $("#keyboard").popup("close");
        }
        else {
            $("#keyboard").popup("close");
            unload_start_msg.data = $.md5(current);
            send_and_backup(unload_start_msg);
        }
        record_click(id, event_name, reference_data,"SEND");
        return 0;
    }
    current = old + text;
    $pick_up_cod.val(current);
}
