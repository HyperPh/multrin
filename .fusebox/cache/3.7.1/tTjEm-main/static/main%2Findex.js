module.exports = { contents: "\"use strict\";\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst electron_1 = require(\"electron\");\r\nconst path_1 = require(\"path\");\r\nconst os_1 = require(\"os\");\r\nconst app_window_1 = require(\"./app-window\");\r\nconst electron_updater_1 = require(\"electron-updater\");\r\nelectron_1.ipcMain.setMaxListeners(0);\r\nelectron_1.app.setPath('userData', path_1.resolve(os_1.homedir(), '.wexond'));\r\nelectron_1.app.on('ready', () => {\r\n    // Create our menu entries so that we can use macOS shortcuts\r\n    electron_1.Menu.setApplicationMenu(electron_1.Menu.buildFromTemplate([\r\n        {\r\n            label: 'Edit',\r\n            submenu: [\r\n                { role: 'undo' },\r\n                { role: 'redo' },\r\n                { type: 'separator' },\r\n                { role: 'cut' },\r\n                { role: 'copy' },\r\n                { role: 'paste' },\r\n                { role: 'pasteandmatchstyle' },\r\n                { role: 'delete' },\r\n                { role: 'selectall' },\r\n                { role: 'quit' },\r\n                { role: 'reload' },\r\n                {\r\n                    type: 'normal',\r\n                    accelerator: 'CmdOrCtrl+Shift+R',\r\n                    label: 'Reload main process',\r\n                    click() {\r\n                        electron_1.app.relaunch();\r\n                        electron_1.app.exit();\r\n                    },\r\n                },\r\n            ],\r\n        },\r\n    ]));\r\n    electron_1.app.on('activate', () => {\r\n        if (exports.appWindow === null) {\r\n            exports.appWindow = new app_window_1.AppWindow();\r\n        }\r\n    });\r\n    exports.appWindow = new app_window_1.AppWindow();\r\n    electron_updater_1.autoUpdater.on('update-downloaded', ({ version }) => {\r\n        exports.appWindow.webContents.send('update-available', version);\r\n    });\r\n    electron_1.ipcMain.on('update-install', () => {\r\n        electron_updater_1.autoUpdater.quitAndInstall();\r\n    });\r\n    electron_1.ipcMain.on('update-check', () => {\r\n        if (process.env.ENV !== 'dev') {\r\n            electron_updater_1.autoUpdater.checkForUpdates();\r\n        }\r\n    });\r\n    electron_1.ipcMain.on('window-focus', () => {\r\n        exports.appWindow.webContents.focus();\r\n    });\r\n});\r\nelectron_1.app.on('window-all-closed', () => {\r\n    if (os_1.platform() !== 'darwin') {\r\n        electron_1.app.quit();\r\n    }\r\n});\r\n",
dependencies: ["electron","path","os","./app-window","electron-updater"],
sourceMap: {},
headerContent: undefined,
mtime: 1550866744805,
devLibsRequired : undefined,
ac : undefined,
_ : {}
}