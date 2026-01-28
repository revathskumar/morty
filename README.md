# morty

> CLI to manage custom emulated devices on Chromium-based browser devtools.

## Demo

[![morty demo](https://asciinema.org/a/ReNxY8dpGklHm0W4t0n9jGrGu.svg)](https://asciinema.org/a/ReNxY8dpGklHm0W4t0n9jGrGu)

 ## Usage
 
 * Node : `npx @revathskumar/morty`
 * Bun : `bunx --bun @revathskumar/morty`

### Dev setup

To install dependencies:

```bash
bun install
```

To run:

Copy the preferences file to `tmp/Preferences` and then run

```bash
TEST_MODE=true bun run index.ts
```

## Supported Browsers

| -                    | Linux | Mac |
| -------------------- | ----- | --- |
| Google Chrome        | ✔️    | ✔️  |
| Google Chrome Canary | ✔️    | ✔️  |
| Chromium             | ✔️    | ✔️  |
| Vivaldi              | ✔️    | ✔️  |

## Acknowledgement

- Data from [list-of-custom-emulated-devices-in-chrome](https://github.com/alxwndr/list-of-custom-emulated-devices-in-chrome) by [@alxwndr](https://github.com/alxwndr)
- Updated Data from [list-of-custom-emulated-devices-in-chrome #1](https://github.com/alxwndr/list-of-custom-emulated-devices-in-chrome/pull/1) by [@thelegend09](https://github.com/thelegend09)

## Similar Projects

- [vibranium](https://github.com/Pittan/vibranium)

## License

MIT
