import { readFile } from "node:fs/promises";
import { homedir } from "node:os";
import { join } from "node:path";

abstract class PreferencesManager {
  protected browser: string;
  protected deviceListKey: string;
  protected profile: string;

  constructor(browser: string, profile: string, deviceListKey: string) {
    this.browser = browser;
    this.profile = profile;
    this.deviceListKey = deviceListKey;
  }

  public getFilePath() {
    const homeDir = homedir();
    if (process.env.TEST_MODE) {
      return join("tmp", "Preferences");
    }
    return join(homeDir, ".config", this.browser, this.profile, "Preferences");
  }

  protected async readFileContent() {
    const preferences = await readFile(this.getFilePath());
    return JSON.parse(preferences.toString());
  }

  protected async getDevices() {
    const prefJson = await this.readFileContent();
    const devicesStr =
      prefJson?.devtools?.preferences?.[this.deviceListKey] || "[]";
    return JSON.parse(devicesStr);
  }
}

export default PreferencesManager;
