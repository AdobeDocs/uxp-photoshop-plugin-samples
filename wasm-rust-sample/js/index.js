import { entrypoints } from 'uxp';
import encodedRust from '../wasm/uxp.wasm';
import { decodeWebAssembly } from './utils';
import { initSync, add, multiply, Counter } from '../pkg/uxp_wasm.js';

entrypoints.setup({
  plugin: {
    create(plugin) {
      console.log('Plugin created successfully.', plugin);
    },
    panels: {
      plugin: this,
    },
  },
});

// Synchronous init - no async callbacks, so no pending tasks survive reload.
const wasmBytes = decodeWebAssembly(encodedRust);
initSync(wasmBytes);

console.log(`Log 3: Sent from JavaScript! (2 + 2 = ${add(2, 2)})`);
console.log(`Log 4: Sent from JavaScript! (12 * 12 = ${multiply(12, 12)})`);

const counter = Counter.new();
setInterval(() => {
  counter.increment();
  document.getElementById('timer').textContent = counter.get_count();
}, 1000);
