import { app, BrowserWindow } from "electron";
import path from "path";
import { isDev } from "./util.js";
import { pullResources } from "./resourcemanager.js";

app.on("ready", () => {
  const mainWindow = new BrowserWindow({});
  if (isDev()) { // Open live server while in dev mode
    mainWindow.loadURL('http://localhost:5123');
  } else {
    mainWindow.loadFile(path.join(app.getAppPath(), "/dist-react/index.html"));
  }

  pullResources();

});
