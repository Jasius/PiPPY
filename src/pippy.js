(async () => {
  const targetDiv = document.querySelector("video");
  const attributeName = "pippystatus";
  if (targetDiv) {
    targetDiv.addEventListener("leavepictureinpicture", function() {
      targetDiv.removeAttribute(attributeName);
    });
    targetDiv.addEventListener("enterpictureinpicture", function() {
      targetDiv.setAttribute(attributeName, "active");
    });
    if (targetDiv.hasAttribute(attributeName)) {
      try {
        eval(await document.exitPictureInPicture());
      } catch (error) {
        alert("Failed to exit picture in picture mode.");
      }
    } else {
      await targetDiv.requestPictureInPicture().catch(error => {
        alert("Failed to enter picture in picture mode.");
      });
    }
  } else {
    if (
      confirm(
        "There's no video elements or it didn't load yet, if that's not the case please fill a bug report by clicking 'Ok' in the prompt."
      )
    ) {
      if (confirm("Are you sure you want to be redirected?")) {
        window.location.replace("https://github.com/Jasius/PiPPY/issues/");
      }
    }
  }
})();
