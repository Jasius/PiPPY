"use strict";
function appendTwitch() {
  Element.prototype.insertChildAtIndex = function(pipBtn, index) {
    if (!index) index = 0;
    if (index >= this.children.length) {
      this.appendChild(pipBtn);
    } else {
      this.insertBefore(pipBtn, this.children[index]);
    }
  };
  let parent = document.getElementsByClassName("player-buttons-right")[0];
  const pipBtn = document.createElement("button");
  pipBtn.className = "player-button pippy";
  pipBtn.type = "button";
  pipBtn.innerHTML =
    '<span><span class="player-tip" data-tip="Mini Player (Alt + Shift + S)"></span></span>';
  parent.insertChildAtIndex(pipBtn, 2);
  pipBtn.onclick = function() {
    if (!document.pictureInPictureElement) {
      try {
        eval(document.querySelector("video").requestPictureInPicture());
      } catch (error) {
        alert("Failed to enter picture in picture mode.");
      }
    } else {
      try {
        eval(document.exitPictureInPicture());
      } catch (error) {
        alert("Failed to exit picture in picture mode.");
      }
    }
  };
}
window.onload = appendTwitch;
