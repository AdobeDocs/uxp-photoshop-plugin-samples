/*
 * This is a definition file for the FS module made for the UXP environment.
 * The file is not comprehensive, so you can temporarily add the missing parts yourself
 * according to Adobe's documentation.
 */

declare module 'fs' {
  export function lstat (path: string): Promise<unknown>

  export function readFile (path: string, options: { encoding: 'utf-8' }): Promise<string>

  export function writeFile (path: string, content: string, options: { encoding: string }): Promise<void>
  export function writeFile (path: string, content: Uint8Array): Promise<void>

  export function unlink (path: string): Promise<number>
}
