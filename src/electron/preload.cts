const electron = require('electron');

electron.contextBridge.exposeInMainWorld('electron', {
    subscribeStats: (callback: (stats: any) => void) => {
        electron.ipcRenderer.on("stats", (_:any, data:any) => {
            callback(data);
        })
        
},
    getStaticData: () => electron.ipcRenderer.invoke("getStaticData")
})