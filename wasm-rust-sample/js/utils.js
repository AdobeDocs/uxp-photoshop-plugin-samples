import { Buffer } from 'buffer';

/**
 * Decodes WebAssembly from base64 to binary
 * js-inline-wasm can serve this as decoded, however the decoding method is deprecated from the Node.js API
 */
export const decodeWebAssembly = async (encodedWebAssembly) => {
  let decodedRust = Buffer.from(encodedWebAssembly, 'base64').toString(
    'binary'
  );

  const len = decodedRust.length;
  const byteArray = new Uint8Array(len);

  for (var i = 0; i < len; i++) {
    byteArray[i] = decodedRust.charCodeAt(i);
  }

  return byteArray;
};
