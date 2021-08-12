use wasm_bindgen::prelude::*;

/// Testing WASM functionality
#[wasm_bindgen]
pub fn add(a: u32, b: u32) -> u32 {
    a + b
}

#[wasm_bindgen]
pub fn multiply(a: u32, b: u32) -> u32 {
    a * b
}

/// WASM entrypoint, executed on render
#[wasm_bindgen(start)]
pub fn run() {
    console_logs();
}

fn console_logs() {
    use web_sys::console;
    console::log_1(&"Hello from Rust!".into());
}
