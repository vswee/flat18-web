window.addEventListener("chatwoot:ready",function(){document.querySelectorAll(".chat-trigger").forEach(e=>{e.removeAttribute("href"),e.addEventListener("click",()=>{window.$chatwoot.toggle("open")}),e.classList.remove("chat-trigger")})});let themeButton=document.querySelector(".lightDark");if(themeButton.addEventListener("click",()=>{setTheme("light"===localStorage.getItem("theme")?"dark":"light")}),localStorage){let e="dark";setTheme(e=localStorage.getItem("theme")?localStorage.getItem("theme"):e)}else themeButton.style="display:none;";function setTheme(e){let t=document.querySelector(".lightDark").querySelector(".ico");e=e||"dark",t.setAttribute("class","light"===e?"ico icon-moon":"ico icon-sun"),document.body.setAttribute("class",e),setTimeout(()=>{t.classList.add("drop-in")},10),localStorage.setItem("theme",e)}document.querySelectorAll(".animate-rotate").forEach(e=>{let t=0;e.querySelectorAll(".target").forEach(e=>{e.classList.remove("playing-animation"),t=t<5?5:t,setTimeout(()=>{e.classList.add("playing-animation")},1e3*t),setTimeout(()=>{setInterval(()=>{e.classList.remove("playing-animation"),setTimeout(()=>{e.classList.add("playing-animation")},100)},2e3*t)},2e3*t),t++})});var saturatedContactFormArray={};function validateField(e,t){var r=e.value;e.getAttribute("id");function a(){e.classList.add("isValid"),e.classList.remove("isInvalid")}function o(){e.classList.add("isInvalid"),e.classList.remove("isValid")}if(!r||r.length<2)o();else{if("name"!==t&&"message"!==t||(a(),"name"===t&&(saturatedContactFormArray.name=r),"message"===t&&(saturatedContactFormArray.message=btoa(r))),"numb"===t){for(arrayOfDigits=[],i=0;i<r.length;i++)!1===isNaN(parseInt(r[i]))&&arrayOfDigits.push(r[i]);if(7<=arrayOfDigits.length){for(a(),arrayOfDigitsAsString="",j=0;j<arrayOfDigits.length;j++)arrayOfDigitsAsString+=arrayOfDigits[j];e.value=arrayOfDigitsAsString,saturatedContactFormArray.tel=arrayOfDigitsAsString}else o()}"email"===t&&(-1<r.indexOf("@")&&-1<r.indexOf(".")&&r.indexOf(".")!=r.length-1&&-1===r.indexOf(" ")?(a(),saturatedContactFormArray.email=r,window.$chatwoot.setCustomAttributes({email:r})):o())}}function infoTransformsToButton(e){document.querySelectorAll(".contact-form-input").forEach(e=>{var t=e.getAttribute("data-type");validateField(e,t)}),dataSetSendForm(e)}function dataSetSendForm(e){saturatedContactFormArray.name&&saturatedContactFormArray.message&&saturatedContactFormArray.tel&&saturatedContactFormArray.email?sendThisForm("contactForm",e):e.parentNode.querySelector(".errorHelpForm").innerHTML="You'll need to enter the information above to continue."}function sendThisForm(e,t){saturatedContactFormArray.typeOfForm=e,saturatedContactFormArray.token=window.psSes||"unavailable",t.style.display="none",t.parentNode.querySelector(".errorHelpForm").innerHTML="",t.parentNode.parentNode.querySelector(".workingForm").style.display="block",fetch("https://api.flat18.co.uk/contact-form-handler/v2/index.php",{method:"POST",headers:{"Content-Type":"multipart/form-data"},body:JSON.stringify(saturatedContactFormArray)}).then(e=>{e.json()}).then(e=>{console.log("Success:",e),t.parentNode.querySelector(".errorHelpForm").innerHTML="Thanks, "+saturatedContactFormArray.name+' <i class="em em-wink"></i>',t.style.display="",t.parentNode.parentNode.querySelector(".workingForm").style.display=""}).catch(e=>{console.error("Error:",e),t.parentNode.querySelector(".errorHelpForm").innerHTML="Oops. Something went wrong.",t.style.display="",t.parentNode.querySelector(".workingForm").style.display=""})}function pricingStrategy(e){return 100<e?100*Math.ceil(e/100)-1:10*Math.ceil(e/10)-1}function updateCurrencyUI(e){window.currency=e?e.target.innerHTML:"GBP";let o=window.currency.toUpperCase();document.querySelectorAll(".currency-options").forEach(e=>{for(const t of e.children)t.innerHTML!==o?t.classList.remove("selected"):t.classList.add("selected")});var n={BTC:"₿",TTD:"TT$",USD:"$",GBP:"£",EUR:"€"};document.querySelectorAll(".currency-bundle").forEach(e=>{var t=Number(e.getAttribute("baseValue")),r=e.getAttribute("baseCurrency"),t=t/window.currencyRates[r];let a="BTC"===o?t:t*window.currencyRates[o];e.querySelector(".currency-value").classList.contains("no-strategy")||(a="BTC"===o?a:pricingStrategy(a)),e.querySelector(".currency-value").innerHTML="BTC"===o?a.toFixed(8):Math.ceil(a).toLocaleString("gb"),e.querySelector(".currency-symbol").innerHTML=n[o]})}document.querySelectorAll(".contact-form-input").forEach(e=>{e.addEventListener("input",e=>{var t=e.target.getAttribute("data-type");validateField(e.target,t)})}),0<document.querySelectorAll(".currency-options").length&&(document.querySelectorAll(".currency-options").forEach(e=>{for(const t of e.children)t.addEventListener("click",updateCurrencyUI)}),0<document.querySelectorAll(".currency-bundle").length&&document.querySelectorAll(".currency-bundle").forEach(e=>{e.setAttribute("baseValue",e.querySelector(".currency-value").innerHTML.replace(",","").replace(" ","")),e.setAttribute("baseCurrency","GBP")}),fetch("https://api.flat18.co.uk/money/v2/exchange/",{method:"POST",headers:{"Content-Type":"multipart/form-data"},body:JSON.stringify([])}).then(e=>e.json()).then(e=>{window.currencyRates=e.currencyRates,updateCurrencyUI()}).catch(e=>{console.error("Error:",e)}));for(const V of document.querySelectorAll(".clickable-target"))V.addEventListener("click",e=>{e.target.classList.contains("clicked")||e.target.classList.add("clicked")}); 