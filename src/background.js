if (!document.pictureInPictureEnabled) {
  browserName.browserAction.setTitle({
    title: "This feature isn't supported in this version of Chrome."
  });
  browserName.browserAction.setBadgeText({ text: "Off" });
  browserName.browserAction.setBadgeBackgroundColor({
    color: [255, 8, 0, 255]
  });
} else {
  browserName.browserAction.onClicked.addListener(tab => {
    browserName.tabs.executeScript({ file: "pippy.js" });
  });
}

browserName.commands.onCommand.addListener(function(command) {
  browserName.tabs.executeScript({ file: "pippy.js" });
});

browserName.contextMenus.create({
  title: "Force picture in picture",
  type: "normal",
  contexts: ["video", "page"]
});

browserName.contextMenus.onClicked.addListener(function(info, tab) {
  if (tab) {
    browserName.tabs.executeScript(tab.id, { file: "pippy.js" });
  }
});
