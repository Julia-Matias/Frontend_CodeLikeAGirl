var url = 'https://desafiofinaljuliamr.herokuapp.com'

var categories = []
var etapaAtual = 1
var product = {}

var etapa1 = document.getElementById('etapa_1')
var etapa2 = document.getElementById('etapa_2')
etapa2.style.display = 'none'

const form = document.getElementById('formulario_cadastro')
form.addEventListener('submit', handleSubmit)

setStep(etapaAtual)

function handleSubmit(event) {
    event.preventDefault()
    if (etapaAtual == 1) {
      const formData = new FormData(event.target)
      product = Object.fromEntries(formData.entries())
  
      setStep(2)
      etapa1.style.display = 'none'
      etapa2.style.display =  'flex'

    } else if (etapaAtual == 2) {
      // file vem de ./drag-drop/script.js
      product.image = dragFile
      saveProduct(product).then((response) => {
        initialPage()
      }).catch((error) => {
        console.log(error);
        alert('Erro ao salvar produto.')
      })
    }
}

getCategories(url).then(response => {
    categories = response.data
    var select = document.getElementById('categories')
    select.innerHTML = ''
    if (categories.length > 0) {
        for (let category of categories) {
            const option = document.createElement('option')
            option.setAttribute('value', category.id)
            option.append(document.createTextNode(category.name))
            select.append(option)
        } 
    }
}) 

function getCategories(url) {
    return axios.get(`${url}/categories`)
}

function saveProduct(product) {
    return axios.post(`${url}/products`, product, {
        headers: {
            "Content-Type": "multipart/form-data",
          },
    })
}

function back() {
  if (etapaAtual == 2) {
    setStep(1)
    etapa1.style.display = 'grid'
    etapa2.style.display =  'none'
  } else {
    initialPage()
  }
}

function initialPage() {
  window.location.href = '../index.html'
}

function setStep(value) {
  etapaAtual = value
  document.getElementById('etapa').innerHTML = value
}