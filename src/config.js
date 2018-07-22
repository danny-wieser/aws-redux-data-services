let _config = {};

export function configure(newConfig) {
  _config = { ...newConfig };
}

export const config = _config;
