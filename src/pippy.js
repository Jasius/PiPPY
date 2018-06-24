"use strict";
(async () => {
  const video = document.querySelector("video");
  const attributeName = "pippystatus";
  if (video) {
    video.addEventListener("leavepictureinpicture", function() {
      video.removeAttribute(attributeName);
    });
    video.addEventListener("enterpictureinpicture", function() {
      video.setAttribute(attributeName, "active");
    });
    if (video.hasAttribute(attributeName)) {
      try {
        eval(await document.exitPictureInPicture());
      } catch (error) {
        alert("Failed to exit picture in picture mode.");
      }
    } else {
      await video.requestPictureInPicture().catch(error => {
        alert("Failed to enter picture in picture mode.");
      });
    }
  } else {
    if (
      confirm(
        "There's no video elements or video didn't load yet, if that's not the case please fill a bug report by clicking 'Ok' in the prompt."
      )
    ) {
      if (confirm("Are you sure you want to be redirected?")) {
        window.location.replace("https://github.com/Jasius/PiPPY/issues/");
      }
    }
  }
})();
