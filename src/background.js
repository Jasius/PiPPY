if (!document.pictureInPictureEnabled) {
  browserName.browserAction.setTitle({
    title: "This feature isn't supported in this version of Chrome."
  });
} else {
  browserName.browserAction.onClicked.addListener(tab => {
    browserName.tabs.executeScript({ file: "pippy.js" });
  });
  function initPippy() {
    if (!document.pictureInPictureElement) {
      chrome.contextMenus.onClicked.addListener(function() {
        try {
          eval(video.requestPictureInPicture());
        } catch (error) {
          alert("Failed to enter picture in picture mode.");
}

browserName.commands.onCommand.addListener(function(command) {
  browserName.tabs.executeScript({ file: "pippy.js" });
});
    }
  }
}

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
