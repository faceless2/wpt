function test_computed_style_aspect_ratio(tag, attributes, expected) {
  test(function() {
    var elem = document.createElement(tag);
    for (name in attributes) {
      let val = attributes[name];
      if (val !== null)
        elem.setAttribute(name, val);
    }
    document.body.appendChild(elem);
    let aspectRatio = getComputedStyle(elem).aspectRatio;
    if (Array.isArray(expected)) {
      assert_in_array(aspectRatio, expected);
    } else {
      assert_equals(aspectRatio, expected);
    }
    elem.remove();
  }, `${tag} with ${JSON.stringify(attributes)}`);
}
