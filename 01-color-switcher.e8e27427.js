!function(){const e=document.querySelector("body"),t=document.querySelector("button[data-start]"),d=document.querySelector("button[data-stop]");function o(){return`#${Math.floor(16777215*Math.random()).toString(16)}`}d.disabled=!0,t.addEventListener("click",(()=>{let n;n=setInterval((()=>e.style.backgroundColor=o()),1e3),t.disabled=!0,d.disabled=!1})),d.addEventListener("click",(()=>{clearInterval(changeBodyColorID),d.disabled=!0,t.disabled=!1}))}();
//# sourceMappingURL=01-color-switcher.e8e27427.js.map