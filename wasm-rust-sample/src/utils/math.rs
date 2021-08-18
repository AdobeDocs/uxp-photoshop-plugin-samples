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