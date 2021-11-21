
import { Stats } from 'fs';
import { mkdir, stat } from 'fs/promises';
import { DATA_DIR } from '../lib/constants';

export async function checkDirExists(dirPath: string): Promise<boolean> {
  let dirExists: boolean, dirStats: Stats;
  try {
    dirStats = await stat(dirPath);
  } catch(e) {
    if(e?.code === 'ENOENT') {
      return false;
    } else {
      throw e;
    }
  }
  if(!dirStats.isDirectory()) {
    throw new Error(`File is not a directory: ${dirPath}`);
  }
  dirExists = true;
  return dirExists;
}

export async function checkFileExists(filePath: string): Promise<boolean> {
  let fileExists: boolean, fileStats: Stats;
  try {
    fileStats = await stat(filePath);
  } catch(e) {
    if(e?.code === 'ENOENT') {
      return false;
    } else {
      throw e;
    }
  }
  if(!fileStats.isFile()) {
    throw new Error(`Path is not a file: ${filePath}`);
  }
  fileExists = true;
  return fileExists;
}

export async function mkdirIfNotExist(dirPath: string) {
  let dirExists: boolean;
  dirExists = await checkDirExists(dirPath);
  if(dirExists === true) {
    return;
  }
  await mkdir(dirPath);
}

export async function initDataDir() {
  await mkdirIfNotExist(DATA_DIR);
}
