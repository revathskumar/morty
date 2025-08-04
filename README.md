# morty

> CLI to manage custom emulated devices on Chromium-based browser devtools.

> [!CAUTION]
> Tested only in Vivaldi (7.5.3735.54 (Stable channel) stable (64-bit)) on Debian

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
