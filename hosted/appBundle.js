(()=>{var e={603:e=>{const t=e=>{document.getElementById("errorMessage").textContent=e,document.getElementById("errorArea").classList.remove("hidden")};e.exports={handleError:t,sendPost:async(e,r,o)=>{const n=await fetch(e,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(r)}),a=await n.json();document.getElementById("errorArea").classList.add("hidden"),a.error&&t(a.error),a.redirect&&(window.location=a.redirect),o&&o(a)},hideError:()=>{document.getElementById("errorArea").classList.add("hidden")}}}},t={};function r(o){var n=t[o];if(void 0!==n)return n.exports;var a=t[o]={exports:{}};return e[o](a,a.exports,r),a.exports}r(603),window.onload=async()=>{const e=await fetch("/getToken"),t=await e.json();ReactDOM.render(React.createElement("tierlistForm",{csrf:t.csrfToken}),document.getElementById("makeTierlist")),ReactDOM.render(React.createElement(PassChangeForm,{csrf:t.csrfToken}),document.getElementById("changePass")),ReactDOM.render(React.createElement(DomoList,{domos:[]}),document.getElementById("domos")),loadDomosFromServer()}})();