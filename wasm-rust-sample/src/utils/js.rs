use wasm_bindgen::prelude::*;

/// Define a macro to mimic the functionality of JS console.log()
macro_rules! console_log {
    ($($t:tt)*) => (log(&format_args!($($t)*).to_string()))
}

/// Use 'extern' to import JS functions
#[wasm_bindgen]
extern "C" {
    #[wasm_bindgen(js_namespace = console)]
    pub fn log(s: &str);
}
