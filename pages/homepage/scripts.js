function showcaseYScrollManipulation() {
  let transition = (window.scrollY - document.querySelector(".showcase").clientTop) / window.outerHeight * .5
  document.querySelector(".showcase-slider > input").value = 100 * transition
  let showcaseTranslateBy = (document.querySelector(".showcase").scrollWidth - document.querySelector(".showcase-parent").getBoundingClientRect().width) * transition
  document.querySelector(".showcase").scrollLeft = showcaseTranslateBy
  let dots = document.querySelector(".slider-ui").querySelectorAll(".dot")
  let breakPoint = 1 / dots.length
  let nearest = Math.ceil(transition / breakPoint)
  let scale = nearest - (transition / breakPoint)
  dots.forEach((ele) => ele.style.transform = "scale(1)")
  try { dots[nearest].style.transform = "scale(" + (1.1 + (scale)) + ")" }catch(e){}
  // try { dots[nearest + 1].style.transform = "scale("+ (1+(1-scale)) +")" }catch(e){}
  // try { dots[nearest - 1].style.transform = "scale("+ (1+(1-scale)) +")" }catch(e){}
  try { dots[nearest - 1].style.transform = "scale("+ (1+(scale*.5)) +")" }catch(e){}
  try { dots[nearest + 1].style.transform = "scale("+ (1+(scale*.5)) +")" }catch(e){}
}

function manipulateElements(transition) {
  showcaseTranslateBy = (document.querySelector(".showcase").scrollWidth - document.querySelector(".showcase-parent").getBoundingClientRect().width) * transition,
    document.querySelector(".showcase").scrollLeft = showcaseTranslateBy
    let dots = document.querySelector(".slider-ui").querySelectorAll(".dot")
  dots.forEach((ele) => ele.style.transform = "scale(1)")
  // document.querySelector(".slider-ui").querySelector(".blob").style.transform="translateX(calc(" + transition*document.querySelector(".slider-ui").getBoundingClientRect().width + "px - 1rem))"
}

window.addEventListener("scroll", showcaseYScrollManipulation)

document.querySelector(".showcase").addEventListener("scroll", e => {
  let t = document.querySelector(".showcase").scrollLeft / (document.querySelector(".showcase").scrollWidth - document.querySelector(".showcase-parent").getBoundingClientRect().width);
  document.querySelector(".showcase-slider > input").value = t * 100
  // document.querySelector(".slider-ui").querySelector(".blob").style.transform="translateX(calc(" + t*document.querySelector(".slider-ui").getBoundingClientRect().width + "px - 1rem))"
})

document.querySelector(".showcase-slider > input").value = 50, document.querySelector(".showcase-slider > input").addEventListener("input", e => {
  if ("INPUT" === e.target.nodeName) {
      window.removeEventListener("scroll", showcaseYScrollManipulation);
      let t = Number(e.target.value) / 100;
      manipulateElements(t)
  }
})

if (document.querySelectorAll(".showcase").length > 0 && document.querySelectorAll(".slider-ui").length > 0) {
  let items = document.querySelector(".showcase").querySelectorAll(".item")
  for (i = 0; i < items.length; i++){
      let dot = document.createElement("span")
      dot.classList.add("dot")
      document.querySelector(".slider-ui").append(dot)
  }
}
