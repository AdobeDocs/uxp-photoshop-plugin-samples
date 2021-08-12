use wasm_bindgen_test::wasm_bindgen_test;

#[wasm_bindgen_test]
fn browser_api_test() {
    assert_eq!(1, 1);
    assert_ne!(2, 1);
}

#[test]
fn rust_api_test() {
    assert_eq!(1, 1);
    assert_ne!(2, 1);
}
