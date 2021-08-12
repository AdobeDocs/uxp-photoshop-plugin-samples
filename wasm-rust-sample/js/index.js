import { entrypoints } from 'uxp';
import { decodeWebAssembly } from './utils';

import encodedRust from './uxp.wasm';
import init, { run, add, multiply } from '../pkg/uxp_wasm.js';

entrypoints.setup({
  plugin: {
    create(plugin) {
      console.log('Plugin created successfully.', plugin);
    },
  },
});

const main = async () => {
  const decodedRust = decodeWebAssembly(encodedRust);

  // Manually pass WebAssembly to prevent `wasm-bindgen` from using `fetch()`
  await init(decodedRust);
  console.log(`2 + 2 = ${add(2, 2)}`);
  console.log(`2 * 2 = ${multiply(2, 2)}`);
};

await main().catch((err) => {
  console.log(err);
});
