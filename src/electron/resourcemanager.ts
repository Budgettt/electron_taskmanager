import osUtilts from "os-utils";
import disk from 'diskusage';
import os from 'os';
import { BrowserWindow } from "electron";

const PULL_INTERVAL = 500;

export function pullResources(mainWindow:BrowserWindow) {
  setInterval(async () => {
    const cpuUsage = await getCpuUsage();
    const ramUsage = getRamUsage();
    const storageUsage = await getStorageUsage();
    
    mainWindow.webContents.send('stats', {cpuUsage, ramUsage, storageUsage});
  }, PULL_INTERVAL);
}

export async function getStaticData() {
  const totalStorage = await getStorageTotal();
  const cpuModel = os.cpus()[0].model; // Name of first CPU, assuming 1 CPU
  const totalMemoryGB = Math.floor(osUtilts.totalmem() / 1024);

  return {
    totalStorage, cpuModel, totalMemoryGB
  }
}

function getCpuUsage() {
  return new Promise(resolve => {
    osUtilts.cpuUsage(resolve)
  })
}

function getRamUsage() {
  return 1 - osUtilts.freememPercentage();
}

async function getStorageUsage() {
  try {
    const storage = await disk.check(process.platform === 'win32' ? 'C://' : '/');
    const usage = 1 - storage.free / storage.total;
    return usage;
  } catch (err) {
    console.error(err)
  }
}

async function getStorageTotal() {
  try {
    const storage = await disk.check(process.platform === 'win32' ? 'C://' : '/');
    const total = storage.total / 1_000_000_000;
    return total;
  } catch (err) {
    console.error(err)
  }
}
