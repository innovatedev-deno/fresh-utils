// example twind.config.ts
// to use directly, update ~/main.ts to use this:
//
// import twindConfig from "fresh-utils/twind.config.ts";
//
// be sure to make a copy of fresh-utils/twind/theme.ts and adjust colors
//
// or copy this to ~/twind.config.ts and adjust to your preferences

import { Options } from "$fresh/plugins/twind.ts";
import { customColors } from "~/twind/theme.ts";

export default {
  selfURL: import.meta.url,
  theme: {
    extend: {
      colors: {
        primary: {
          ...customColors.primary,
        },
        secondary: {
          ...customColors.secondary,
        },
      },
    },
  },
} as Options;
