const t=document.querySelector("body"),e=document.querySelector("button[data-start]"),o=document.querySelector("button[data-stop]");let r=null;isActive=()=>!!r,e.addEventListener("click",(()=>{isActive()||(r=setInterval((()=>{t.style.backgroundColor=`#${Math.floor(16777215*Math.random()).toString(16).padStart(6,0)}`}),1e3))})),o.addEventListener("click",(()=>{clearInterval(r),r=null}));
//# sourceMappingURL=01-color-switcher.785c555e.js.map