import { writeFile, copyFile } from "node:fs/promises";
import PreferencesManager from "./PreferencesManager";

class PreferencesWriter extends PreferencesManager {
  constructor(
    browser: string,
    profile = "Default",
    deviceListKey = "custom-emulated-device-list"
  ) {
    super(browser, profile, deviceListKey);
  }

  #convertToDevtoolDevice(dataDevice: DataDevice): DevtoolDevice {
    return {
      title: dataDevice.title,
      type: "phone",
      "user-agent": dataDevice.user_agent,
      capabilities: ["touch", "mobile"],
      screen: {
        "device-pixel-ratio": dataDevice.dpr,
        vertical: {
          width: dataDevice.width,
          height: dataDevice.height,
        },
        horizontal: {
          width: dataDevice.height,
          height: dataDevice.width,
        },
      },
      modes: [
        {
          title: "default",
          orientation: "vertical",
          insets: {
            left: 0,
            top: 0,
            right: 0,
            bottom: 0,
          },
        },
        {
          title: "default",
          orientation: "horizontal",
          insets: {
            left: 0,
            top: 0,
            right: 0,
            bottom: 0,
          },
        },
      ],
      "show-by-default": true,
      "dual-screen": false,
      "foldable-screen": false,
      show: "Default",
      "user-agent-metadata": {
        brands: [
          {
            brand: "",
            version: "",
          },
        ],
        fullVersionList: [
          {
            brand: "",
            version: "",
          },
        ],
        fullVersion: "",
        platform: "",
        platformVersion: "",
        architecture: "",
        model: "",
        mobile: true,
      },
    };
  }

  #getCurrentDateTime() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const day = String(now.getDate()).padStart(2, "0");
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");

    return `${year}${month}${day}${hours}${minutes}${seconds}`;
  }

  async #writeToFile(devices: DevtoolDevice[]) {
    const prefJson = await this.readFileContent();

    // Wy not use JSON.stringify?
    //
    // using JSON.stringify here will lead to double stringify when we write to file.
    // This will lead to writing the value with extra escape. eg: "[{\\\"hello\\\": \\\"world\\\"}]"
    // instead of the acceptable value '"[{\"hello\": \"world\"}]"'
    prefJson["devtools"]["preferences"][this.deviceListKey] = `[${devices
      .map((obj) => JSON.stringify(obj))
      .join(", ")}]`;
    await writeFile(this.getFilePath(), JSON.stringify(prefJson));
  }

  getBackupFilePath() {
    return `/tmp/Preferences-${this.browser}-${
      this.profile
    }-${this.#getCurrentDateTime()}.bak`;
  }

  async #createBackup() {
    await copyFile(this.getFilePath(), this.getBackupFilePath());
  }

  async writeDevices(devices: DataDevice[]) {
    const devicesFromPreferences = await this.getDevices();

    const devicesToAdd = devices.map(this.#convertToDevtoolDevice);

    const devicesToWrite = [...devicesToAdd, ...devicesFromPreferences];

    await this.#createBackup();

    await this.#writeToFile(devicesToWrite);
  }
}

export default PreferencesWriter;
