import { select, confirm } from "@inquirer/prompts";
import checkboxSearch from "inquirerjs-checkbox-search";
import PreferencesReader from "./src/PreferencesReader";
import PreferencesWriter from "./src/PreferencesWriter";
import DeviceDataFetcher from "./src/DeviceDataFetcher";

export async function run() {
  try {
    const selectedBrowser = await select({
      message: "Select a Browser",
      default: "google-chrome",
      choices: [
        {
          name: "Google Chrome",
          value: "google-chrome",
        },
        {
          name: "Google Chrome - Canary",
          value: "google-chrome-canary",
        },
        {
          name: "Chromium",
          value: "chromium",
        },
        {
          name: "Vivaldi",
          value: "vivaldi",
        },
      ],
    });

    const prefReader = new PreferencesReader(selectedBrowser);
    const prefWriter = new PreferencesWriter(selectedBrowser);

    const devtoolDevices = await prefReader.readDeviceList();

    const existingDeviceTitles = devtoolDevices.map((device) => device.title);

    const dataFetcher = new DeviceDataFetcher();

    const devicesJson: DataFile = await dataFetcher.read();
    const wholeDeviceList = devicesJson.devices.filter((device) => {
      return !existingDeviceTitles.includes(device.title);
    });

    const deviceChoices = wholeDeviceList.map((device) => {
      return {
        name: device.title,
        value: device.title,
      };
    });

    const selectedDevices = await checkboxSearch({
      message: "Select devices",
      choices: deviceChoices,
      required: true,
      loop: false,
      pageSize: 10,
    });

    const confirmAnswer = await confirm({
      message: `This will update your browser's (${selectedBrowser}) Preferences file.

  Preferences file: ${prefReader.getFilePath()}

  Please make sure to backup your Preferences file and close the browser before proceeding. 
  Are you sure you want to proceed?
`,
      default: false,
    });

    if (confirmAnswer) {
      await prefWriter.writeDevices(
        devicesJson.devices.filter((device) => {
          return selectedDevices.includes(device.title);
        })
      );
      console.log(`Preferences backup at ${prefWriter.getBackupFilePath()}`);
      console.log(`${selectedDevices.length} Device(s) added.`);
      console.log(`Devices Added : ${selectedDevices.join(",")}`);
    } else {
      console.log("Morty exiting!...");
      console.log(`Good Bye!!`);
    }
  } catch (err: unknown) {
    if (process.env.TEST_MODE) {
      console.error(err);
    }
    console.log("Morty exiting!...");
    console.log(`Good Bye!!`);
  }
}

await run();
