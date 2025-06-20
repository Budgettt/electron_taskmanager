import osUtilts from "os-utils";
import disk from 'diskusage';

const PULL_INTERVAL = 500;

export function pullResources() {
  setInterval(async () => {
    const cpuUsage = await getCpuUsage();
    const ramUsage = getRamUsage();
    const storageUsage = await getStorageUsage();

    console.log({cpuUsage, ramUsage, storageUsage});
  }, PULL_INTERVAL);
}

export async function getStaticData() {
  const totalStorage = await getStorageTotal();
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
