/*
 * This is the definition file for the UXP environment.
 * The file is not comprehensive, so you can temporarily add the missing parts yourself
 * according to Adobe's documentation.
 */

interface File {
  write: (data: string | ArrayBuffer, options?: {
    format?: string
    append?: boolean
  }) => Promise<number>
}

interface Folder {
  isFolder: true
  createFile: (name: string, options: {
    overwrite?: boolean
  }) => Promise<File>
  createFolder: (name: string) => Promise<Folder>
  getEntry: (filePath: string) => Promise<File | Folder>
}

type Entry = File | Folder

interface IHost {
  name: string
  version: string
  uiLocale: string
}

interface IShell {
  /**
   * Open url in external browser.
   *
   * @param url
   */
  openExternal: (url: string) => Promise<string>
}

interface IStorage {
  /**
   * Provides access to files and folders on a file system.
   * You'll typically not instantiate this directly; instead you'll use an
   * instance of one that has already been created for you by UXP.
   */
  localFileSystem: {
    /**
     * Returns a temporary folder.
     * The contents of the folder will be removed when the extension is disposed.
     */
    getTemporaryFolder: () => Promise<Folder>

    /**
     * Returns a token suitable for use with certain host-specific APIs (such as Photoshop).
     * This token is valid only for the current plugin session.
     * As such, it is of no use if you serialize the token to persistent storage, as the token will be invalid in the future.
     */
    createSessionToken: (entry: Entry) => string
  }

  /**
   * SecureStorage provides a protected storage which can be used to store sensitive data per plugin.
   * SecureStorage takes a key-value pair and encrypts the value before being stored.
   * After encryption, it stores the key and the encrypted value pair.
   * When the value is requested with an associated key, it's retrieved after being decrypted.
   * Please note that the key is not encrypted thus it's not protected by the cryptographic operation.
   */
  secureStorage: {
    /**
     * Returns number of items stored in the secure storage.
     */
    readonly length: number

    /**
     * Retrieve a value associated with a provided key after the value is being decrypted
     * from a secure storage.
     *
     * @param key
     */
    getItem: (key: string) => Promise<Uint8Array>

    /**
     * Store a key and value pair after the value is encrypted in a secure storage
     *
     * @param key
     * @param value
     */
    setItem: (key: string, value: string | ArrayBuffer | Uint8Array) => Promise<void>

    /**
     * Remove a value associated with a provided key.
     *
     * @param key
     */
    removeItem: (key: string) => Promise<void>
  }
}

/**
 * UXP Module.
 *
 * @link https://developer.adobe.com/photoshop/uxp/2022/uxp-api/reference-js/Modules/uxp/
 */
declare module 'uxp' {
  export const host: IHost
  export const shell: IShell
  export const storage: IStorage
}
