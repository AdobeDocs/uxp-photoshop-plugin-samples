import { entrypoints } from 'uxp';
import { Buffer } from 'buffer';
import encodedRust from './uxp-wasm';

entrypoints.setup({
  plugin: {
    create(plugin) {
      console.log('Plugin created successfully.', plugin);
    },
  },
});

// Decode from base64 to binary
// js-inline-wasm can serve this as decoded, however atob() is not accessible in UXP
let decodedRust = Buffer.from(encodedRust, 'base64').toString('binary');
const len = decodedRust.length;
const bytes = new Uint8Array(len);

// Collect byte array
for (var i = 0; i < len; i++) {
  bytes[i] = decodedRust.charCodeAt(i);
}

WebAssembly.instantiate(bytes, {})
  .then((obj) => {
    console.log(`1 + 1 = ${obj.instance.exports.add(1, 1)}`);
    console.log(`2 * 2 = ${obj.instance.exports.multiply(2, 2)}`);
  })
  .catch((e) => console.log(e));
