"use strict";
const pippyJS = `
(async () => {
  const sourcesArray = Array.from(document.querySelectorAll('video')).filter(video => video.readyState != 0).filter(video => video.disablePictureInPicture == false).sort((v1, v2) => {
    const v1Rect = v1.getClientRects()[0];
    const v2Rect = v1.getClientRects()[0];
    return ((v2Rect.width * v2Rect.height) - (v1Rect.width * v1Rect.height));
  });
  if (sourcesArray.length === 0)
    return;
  const video = sourcesArray[0];
  if (video.hasAttribute('pippystatus')) {
    await document.exitPictureInPicture();
  } else {
    await video.requestPictureInPicture();
    video.setAttribute('pippystatus', true);
    video.addEventListener('leavepictureinpicture', event => {
      video.removeAttribute('pippystatus');
    }, { once: true });
  }
})();
    `;
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
    browserName.tabs.executeScript({ code: pippyJS, allFrames: true });
  });
}

browserName.commands.onCommand.addListener(function(command) {
  browserName.tabs.executeScript({ code: pippyJS, allFrames: true });
});

browserName.contextMenus.create({
  title: "Force picture in picture",
  type: "normal",
  contexts: ["video", "page"]
});

browserName.contextMenus.onClicked.addListener(function(info, tab) {
  if (tab) {
    browserName.tabs.executeScript({ code: pippyJS, allFrames: true });
  }
});
