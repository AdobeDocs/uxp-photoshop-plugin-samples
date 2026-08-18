import { Buffer } from 'buffer';

export const decodeWebAssembly = (encodedWebAssembly) => {
  const buf = Buffer.from(encodedWebAssembly, 'base64');
  const bytes = Uint8Array.from(buf);

  return bytes.buffer;
};
