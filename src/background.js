if (!document.pictureInPictureEnabled) {
  browserName.browserAction.setTitle({
    title: "This feature isn't supported in this version of Chrome."
  });
} else {
  browserName.browserAction.onClicked.addListener(tab => {
    browserName.tabs.executeScript({ file: "pippy.js" });
  });
}

function getClickHandler() {
  chrome.contextMenus.onClicked.addListener(function(info, tab) {
    alert("working");
    document.querySelector("video").requestPictureInPicture();
  });
}

browserName.contextMenus.create({
  title: "Force picture in picture",
  type: "normal",
  contexts: ["video", "page"],
  onclick: getClickHandler()
});
