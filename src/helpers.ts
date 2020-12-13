import { isObject } from "@xaro/extend";

export function initConfig(origin, user) {
  let config = {};
  for (const key in origin) {
    if (user.hasOwnProperty(key)) {
      if (isObject(origin[key]) && isObject(user[key])) {
        config[key] = this.initConfig(origin[key], user[key]);
      } else {
        config[key] = user[key];
      }
    } else {
      config[key] = origin[key];
    }
  }
  return config;
}