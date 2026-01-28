import data from "../data/devices.jsonc" with { type: "jsonc" };

class DeviceDataFetcher {
  async read(): DataFile {
    return data;
  }
}

export default DeviceDataFetcher;
