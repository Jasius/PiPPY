(async () => {
  const targetDiv = document.querySelector("video");
  const attributeName = "pippyStatus";
  if (targetDiv) {
    if (targetDiv.hasAttribute(attributeName)) {
      await document.exitPictureInPicture().catch(error => {
        // alert("Failed to exit picture in picture mode.");
        alert(
          "Unfortunately current API doesn't allow to exit picture in picture mode this way, hover over floating video and click 'x' button at the top right."
        );
      });
      targetDiv.removeAttribute(attributeName);
    } else {
      await targetDiv.requestPictureInPicture().catch(error => {
        alert("Failed to enter picture in picture mode.");
      });
    }
    targetDiv.addEventListener("leavepictureinpicture", function() {
      targetDiv.removeAttribute(attributeName);
    });
    targetDiv.addEventListener("enterpictureinpicture", function() {
      targetDiv.setAttribute(attributeName, "active");
    });
  } else {
    if (
      confirm(
        "There's no video elements on this page, if that's not the case please fill a bug report by clicking 'Ok' in the prompt."
      )
    ) {
      if (confirm("Are you sure you want to be redirected?")) {
        window.location.replace("https://github.com/Jasius/PiPPY/issues/");
      }
    }
  }
})();
