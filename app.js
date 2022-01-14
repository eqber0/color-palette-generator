let colors = ["#123151", "#13254a", "#123576", "#ff2313", "#f231f2"]

const randomBtn = document.querySelector(".random-btn")
const paletteHex = document.querySelector(".hex")
const template = document.querySelector("#template")
const paletteContainer = document.querySelector(".palette-container")
const paletteCards = [...document.querySelectorAll(".palette-card")]

randomBtn.addEventListener("click", async (e) => {
  await fetchColors()
  generateColor()
})

function generateColor() {
  paletteContainer.innerHTML = ""

  for (i = 0; i < 5; i++) {
    const paletteClone = template.content.cloneNode(true)
    const paletteCard = paletteClone.querySelector(".palette-card")
    const paletteColor = paletteClone.querySelector(".palette-color")
    const paletteHex = paletteClone.querySelector(".palette-hex")

    paletteCard.addEventListener("click", copyClipboard)
    paletteColor.style.background = colors[i]
    paletteHex.textContent = colors[i]
    paletteContainer.appendChild(paletteClone)
  }
}

async function fetchColors() {
  let hex = []
  const response = await fetch("http://colormind.io/api/", {
    method: "POST",
    body: JSON.stringify({
      model: "default",
    }),
  })

  const data = await response.json()
  data.result.forEach((e) => {
    let newHex = toHex(e[0], e[1], e[2])
    hex.push(newHex)
  })

  colors = hex
}
fetchColors()
function componentToHex(c) {
  var hex = c.toString(16)
  return hex.length == 1 ? "0" + hex : hex
}
function toHex(r, g, b) {
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b)
}

function copyClipboard() {
  console.log("i")
}

generateColor()

paletteCards.forEach((card) => {
  card.addEventListener("click", copyClipboard)
})
