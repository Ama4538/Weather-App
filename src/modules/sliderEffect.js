import { hourlyElement, hourlyWrapperElement } from "./domSelector";

let downAt = 0;
let currentLocation = 0;

hourlyWrapperElement.addEventListener('mousedown', (e) => {
  downAt = e.clientX;
})

window.onmouseup = () => {
  downAt = 0;
}

hourlyWrapperElement.addEventListener('mousemove', (e) => {
  if (downAt === 0) return;
  let delta = e.clientX - downAt;
  let maxDelta = hourlyWrapperElement.offsetWidth * 3;
  let percent = delta / maxDelta;
  let changeLocation = (hourlyElement.scrollWidth - hourlyWrapperElement.offsetWidth) * percent;
  if ((currentLocation + changeLocation) < 0 && (currentLocation + changeLocation) > (hourlyElement.scrollWidth * -1 * 0.615)) {
    currentLocation += changeLocation;
  } else if ((currentLocation + changeLocation) < (hourlyElement.scrollWidth * -1 * 0.615)) {
    currentLocation = hourlyElement.scrollWidth * -1 * 0.615;
    console.log("top");
  } else if ((currentLocation + changeLocation) > 0) {
    currentLocation = 0
    console.log("bot");
  }
  movehourlyElement(currentLocation);

})

const movehourlyElement = (changeLocation) => {
  hourlyElement.animate([
    { translate: `${changeLocation}px 0` }
  ], { duration: 2000, fill: "forwards" })

}