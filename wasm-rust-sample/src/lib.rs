/// Use 'wasm_bindgen' to target Rust functions to JS
use wasm_bindgen::prelude::*;
use utils::js::log;

#[macro_use] pub mod utils;
pub mod counter;

/// WASM entrypoint, executed on render
#[wasm_bindgen(start)]
pub fn run() -> Result<(), JsValue> {
    console_log!("Log 1: Sent from Rust! (2 + 2 = {:?})", utils::math::add(2, 2));
    console_log!("Log 2: Sent from Rust! (12 * 12 = {:?})", utils::math::multiply(12, 12));

    Ok(())
}
