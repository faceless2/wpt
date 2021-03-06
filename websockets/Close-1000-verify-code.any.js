// META: script=constants.sub.js
// META: variant=
// META: variant=?wss
// META: variant=?wpt_flags=h2

var testOpen = async_test("Create WebSocket - Close the Connection - close(1000, reason) - Connection should be opened");
var testClose = async_test("Create WebSocket - Close the Connection - close(1000, reason) - event.code == 1000 and event.reason = 'Clean Close'");

var wsocket = CreateWebSocket(false, false);
var isOpenCalled = false;

wsocket.addEventListener('open', testOpen.step_func(function(evt) {
  wsocket.close(1000, "Clean Close");
  isOpenCalled = true;
  testOpen.done();
}), true);

wsocket.addEventListener('close', testClose.step_func(function(evt) {
  assert_true(isOpenCalled, "WebSocket connection should be open");
  assert_equals(evt.code, 1000, "CloseEvent.code should be 1000");
  assert_equals(evt.reason, "Clean Close", "CloseEvent.reason should be the same as the reason sent in close");
  testClose.done();
}), true);
