import { parse } from "jsonc-parser";
import { readFile } from "node:fs/promises";

class DeviceDataFetcher {
  async read(): Promise<DataFile> {
    const devicesBuf = await readFile(`data/devices.jsonc`);

    return parse(devicesBuf.toString());
  }
}

export default DeviceDataFetcher;
