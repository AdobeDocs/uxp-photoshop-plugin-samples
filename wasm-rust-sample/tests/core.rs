use wasm_bindgen_test::wasm_bindgen_test;

#[test]
fn rust() {
    assert_eq!(1, 1);
}

#[wasm_bindgen_test]
fn browser() {
    assert_eq!(1, 1);
}