let dropArea = document.querySelector(".drag-area")
let dragText = dropArea.querySelector("header")
let dragButton = dropArea.querySelector("button")
let dragInput = dropArea.querySelector("input")
let dragFile;

dragButton.onclick = () =>{
  dragInput.click();
}

dragInput.addEventListener("change", function() {
  dragFile = this.files[0];
  dropArea.classList.add("active");
  showFile();
});

dropArea.addEventListener("dragover", (event) => {
  event.preventDefault();
  dropArea.classList.add("active");
});

dropArea.addEventListener("dragleave", () => {
  dropArea.classList.remove("active");
});

dropArea.addEventListener("drop", (event) => {
  event.preventDefault(); 
  dragFile = event.dataTransfer.files[0];
  showFile();
});

function showFile(){
  const fileType = dragFile.type;
  const validExtensions = ["image/jpeg", "image/jpg", "image/png"];
  if(validExtensions.includes(fileType)){
    const fileReader = new FileReader();
    fileReader.onload = ()=>{
      const fileURL = fileReader.result;
      const imgTag = `<img src="${fileURL}" alt="image">`;
      dropArea.innerHTML = imgTag;
    }
    fileReader.readAsDataURL(dragFile);
  }else{
    alert("O arquivo selecionado não é uma imagem!");
    dropArea.classList.remove("active");
  }
}