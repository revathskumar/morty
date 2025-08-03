interface DevtoolDevice {
  title: string;
  "user-agent": string;
  type: string;
  capabilities: string[];
  screen: Screen;
  modes: Mode[];

  "show-by-default": boolean;
  "dual-screen": boolean;
  "foldable-screen": boolean;
  show: string;
  "user-agent-metadata": UserAgentMetadata;
}

interface UserAgentMetadata {
  brands: Brand[];
  fullVersionList: Brand[];

  fullVersion: string;
  platform: string;
  platformVersion: string;
  architecture: string;
  model: string;
  mobile: boolean;
}

interface Brand {
  brand: string;
  version: string;
}

interface DataDevice {
  title: string;
  width: number;
  height: number;
  dpr: number;
  user_agent: string;
}

interface Dimension {
  width: number;
  height: number;
}

interface Screen {
  "device-pixel-ratio": number;
  vertical: Dimension;
  horizontal: Dimension;
}

interface Insets {
  left: number;
  top: number;
  right: number;
  bottom: number;
}

interface Mode {
  title: string;
  orientation: "vertical" | "horizontal";
  insets: Insets;
}

interface DataFile {
  devices: DataDevice[];
}
