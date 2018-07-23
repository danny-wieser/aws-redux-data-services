let theconfig = {};

export function configure(newConfig) {
  theconfig = { ...newConfig };
}

export const config = theconfig;
