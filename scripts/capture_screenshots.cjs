const { app, BrowserWindow, ipcMain } = require("electron");
const fs = require("node:fs");
const path = require("node:path");

const root = path.join(__dirname, "..");
const outputDir = path.join(root, "docs", "images");

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function makeWindow() {
  const win = new BrowserWindow({
    width: 430,
    height: 760,
    show: false,
    backgroundColor: "#0f0f10",
    webPreferences: {
      preload: path.join(root, "src", "preload.cjs"),
      contextIsolation: true,
      sandbox: false,
      nodeIntegration: false
    }
  });

  await win.loadFile(path.join(root, "src", "index.html"));
  await wait(500);
  return win;
}

async function saveScreenshot(win, name) {
  const image = await win.capturePage();
  fs.writeFileSync(path.join(outputDir, name), image.toPNG());
}

async function setBaseState(win) {
  await win.webContents.executeJavaScript(`
    document.documentElement.dataset.theme = "dark";
    document.querySelector("#detectorDot").dataset.state = "busy";
    document.querySelector("#detectorText").textContent = "Codex 运行中，匹配 1.00";
  `);
}

async function main() {
  fs.mkdirSync(outputDir, { recursive: true });
  await app.whenReady();

  ipcMain.handle("get-theme", () => "dark");
  ipcMain.handle("get-detector-status", () => ({ connected: true, busy: true, score: 1, message: "" }));
  ipcMain.handle("get-settings", () => ({
    contentMode: "mixed",
    unlockAfter: 3,
    rewardSeconds: 30,
    rewardUrl: "https://www.douyin.com"
  }));
  ipcMain.handle("save-settings", (_event, settings) => settings);
  ipcMain.handle("open-douyin-reward", () => ({ ok: true }));
  ipcMain.handle("focus-learning-window", () => ({ ok: true }));
  ipcMain.handle("hide-learning-window", () => ({ ok: true }));

  const win = await makeWindow();
  await setBaseState(win);

  await saveScreenshot(win, "01-phone-feed.png");

  await win.webContents.executeJavaScript(`
    document.querySelector("#answerPanel").hidden = false;
    document.querySelector("#card").dataset.unlocked = "true";
    document.querySelector("#rewardButton").disabled = false;
  `);
  await wait(250);
  await saveScreenshot(win, "02-reward-unlocked.png");

  await win.webContents.executeJavaScript(`
    document.querySelector("#settingsSheet").hidden = false;
  `);
  await wait(250);
  await saveScreenshot(win, "03-settings-sheet.png");

  win.destroy();
  app.quit();
}

main().catch((error) => {
  console.error(error);
  app.quit();
  process.exitCode = 1;
});
