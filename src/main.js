const { invoke } = window.__TAURI__.tauri;


let folderPathInputEl;
let scriptZoneEl;

const $ = document.querySelector.bind(document);


window.addEventListener("DOMContentLoaded", () => {

  folderPathInputEl = $("#top-input");
  scriptZoneEl = $("#script-zone");

  // default value
  folderPathInputEl.value = "C:\\Users\\naive\\Desktop\\"

  folderPathInputEl.addEventListener("keydown", async function(event) {
    if (event.keyCode === 13){
      let scriptList = await invoke("scan_folder", {folderPath: folderPathInputEl.value});
      // Remove all child elements
      while (scriptZoneEl.firstChild) {
        scriptZoneEl.removeChild(scriptZoneEl.firstChild);
      }

      for (const i in scriptList) {

        const childEl = document.createElement("div");

        const childEl2 = document.createElement("p");
        childEl.appendChild(childEl2)

        childEl2.className = "script-instance";

        
        childEl2.innerText = scriptList[i];

        childEl.setAttribute("data-is-running", 'false')

        childEl.addEventListener("click", async function() {
          if (this.getAttribute("data-is-running") === 'false') {
            await invoke("run_script", {filePath: this.innerText});
            this.setAttribute("data-is-running", 'true')
            this.firstChild.className = "script-instance-running"
          } else {
            await invoke("shutdowm_script", {filePath: this.innerText});
            this.setAttribute("data-is-running", 'false')
            this.firstChild.className = "script-instance"
          }
          

        }.bind(childEl))

        

        scriptZoneEl.appendChild(childEl);


      }

      
    }
  })
});

