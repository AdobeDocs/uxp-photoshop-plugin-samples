use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub struct Counter {
    count: i32
}

#[wasm_bindgen]
impl Counter {
    pub fn new() -> Self {
        Self {
            count: 0
        }
    }

    pub fn increment(&mut self) -> i32 {
        self.count = self.count + 1;
        self.count
    }

    pub fn get_count(&self) -> i32 {
        self.count
    }
}
