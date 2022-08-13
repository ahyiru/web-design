const {DEV_ROOT_DIR, PRD_ROOT_DIR} = require('@configs');

export const browserRouter = !process.env.isDev;

export const basepath = browserRouter ? PRD_ROOT_DIR : DEV_ROOT_DIR;
