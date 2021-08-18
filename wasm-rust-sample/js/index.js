import { entrypoints } from 'uxp';
import { decodeWebAssembly } from './utils';

import encodedRust from '../wasm/uxp.wasm';
import init, { add, multiply, global_sys, Counter } from '../pkg/uxp_wasm.js';

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

const main = async () => {
  const decodedRust = decodeWebAssembly(encodedRust);

  // Manually pass WebAssembly to prevent `wasm-bindgen` from using `fetch()`
  await init(decodedRust);

  console.log(`Log 3: Sent from JavaScript! (2 + 2 = ${add(2, 2)})`);
  console.log(`Log 4: Sent from JavaScript! (12 * 12 = ${multiply(12, 12)})`);

  const counter = Counter.new();
  setInterval(() => {
    counter.increment();
    document.getElementById('timer').textContent = counter.get_count();
  }, 1000);
};

await main().catch((err) => {
  console.log(err);
});
