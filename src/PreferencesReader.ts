import PreferencesManager from "./PreferencesManager";

class PreferencesReader extends PreferencesManager {
  constructor(
    browser: string,
    profile = "Default",
    deviceListKey = "custom-emulated-device-list"
  ) {
    super(browser, profile, deviceListKey);
  }

  async readDeviceList(): Promise<DevtoolDevice[]> {
    return await this.getDevices();
  }
}

export default PreferencesReader;
