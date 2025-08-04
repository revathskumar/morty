import { readFile } from "node:fs/promises";
import { homedir } from "node:os";
import { join } from "node:path";

abstract class PreferencesManager {
  protected browser: string;
  protected deviceListKey: string;
  protected profile: string;

  protected macPath: Record<string, string> = {
    vivaldi: "Vivaldi",
    "google-chrome": "Google/Chrome",
    "google-chrome-canary": "Google/Chrome Canary",
    chromium: "Chromium",
  };

  constructor(browser: string, profile: string, deviceListKey: string) {
    this.browser = browser;
    this.profile = profile;
    this.deviceListKey = deviceListKey;
  }

  public getFilePath() {
    const homeDir = homedir();

    const osType =
      process.platform === "darwin"
        ? "mac"
        : process.platform === "win32"
        ? "windows"
        : "linux";
    if (process.env.TEST_MODE) {
      return join("tmp", "Preferences");
    }
    if (osType === "mac") {
      return join(
        homeDir,
        "Library",
        "Application Support",
        this.macPath[this.browser]!,
        this.profile,
        "Preferences"
      );
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
