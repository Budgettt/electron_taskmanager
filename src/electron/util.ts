import { ipcMain, webContents } from "electron";

export function isDev(): boolean {
  return process.env.NODE_ENV === "development";
}

// bro what does ths thing do
export function ipcHandle<Key extends keyof EventPayloadMapping>(
  key: Key,
  handler: () => Promise<EventPayloadMapping[Key]> // wtf is going on here
) {
  ipcMain.handle(key, () => handler());
}
