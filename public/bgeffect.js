"use strict";

const blob = document.querySelector(".blob");

document.body.onpointermove = (event) => {
  const { clientX, clientY } = event;

  if (navigator.userAgent.indexOf("AppleWebKit") != -1) {
    blob.style.left = `${clientX}px`;
    blob.style.top = `${clientY}px`;
  }
  blob.animate(
    {
      left: `${clientX}px`,
      top: `${clientY}px`,
    },
    { duration: 3000, fill: "forwards" },
  );
};
