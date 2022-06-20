var url = 'https://desafiofinaljuliamr.herokuapp.com'

var categories = []
var products = []
var productToDelete = ''

const navProduct = document.getElementById('cadastrar_produto')
navProduct.style.display = 'none'

const newProduct = document.getElementById('novo-produto')
newProduct.style.display = 'none'

getCategories(url)
getAllProducts(url)
closeModal('deleteProduct')

function getCategories(url) {
    return axios.get(`${url}/categories`).then(response => {
        categories = response.data
        createButtons(categories)
    }) 
}

function getAllProducts(url) {
    return axios.get(`${url}/products`).then(response => {
        products = response.data
        createItems(products)
    })
}

function getProductsByCategoryName(name) {
    return axios.get(`${url}/products/category/${name}`).then(response => {
        products = response.data
        createItems(products)
    })
}

function createButtons(categories) {
    if (categories) {
        const nav = document.getElementsByClassName('categoria')[0]
        nav.innerHTML = ''

        const element = document.createElement('a')
        element.setAttribute('class','categoria-menu add-btn')
        element.addEventListener('click', function () {
            openModal('createCategory')
        }, false)
        element.append(document.createTextNode('+ Categoria'))
        nav.append(element)
        
        for(let category of categories) {
            nav.append(createCategoryButtom(category))
        }
    }
}

function createCategoryButtom(category){
    const element = document.createElement('a')
    element.setAttribute('class','categoria-menu')
    element.addEventListener('click', function () {
        getProductsByCategoryName(category.name)
    }, false)
    element.append(document.createTextNode(category.name))
    return element
}

function createItems(products) {
    const div = document.getElementsByClassName('conteiner_produtos')[0]
    div.innerHTML = ''
    if (products.length > 0) {
        for(let product of products) {
            const divItem = document.createElement('div')
            divItem.setAttribute('class', 'conteiner-item')

            const figure = document.createElement('figure')
            figure.setAttribute('class', 'product-figure')       
            const imagem = document.createElement('img')
            imagem.setAttribute('src', `${url}/products/img/${product.image}`)
            figure.append(imagem)

            const info_produtos = document.createElement('div')
            info_produtos.setAttribute('class', 'info_produtos')
            info_produtos.append(createTagP('titulo', product.name))
            info_produtos.append(createTagP('porcao', getPersonCount(product.personCount)))
            info_produtos.append(createTagP('descricao', product.description))
            info_produtos.append(createTagP('valor', `R$ ${Number(product.value).toFixed(2)}`))

            const divBtns = document.createElement('div')
            divBtns.setAttribute('class', 'botoes_produtos')
            
            const editBtn = createProductButton('edit', 'Editar')
            editBtn.addEventListener('click', function () {
                editProduct()
            }, false)

            const deleteBtn = createProductButton('delete', 'Excluir')
            deleteBtn.addEventListener('click', function () {
                deleteProductModal(product.id)
            }, false)

            divBtns.append(editBtn)
            divBtns.append(deleteBtn)

            divItem.append(figure)
            divItem.append(info_produtos)
            divItem.append(divBtns)
            div.append(divItem)
        }
        newProduct.style.display = 'flex'
        navProduct.style.display = 'none'
        div.style.display = 'grid'
    } else {
        newProduct.style.display = 'none'
        navProduct.style.display = 'grid'
        div.style.display = 'none'
        products = []
    }
}

function getPersonCount(value) {
    if (value == 1) {
        return 'Serve 1 pessoa'
    } else if (value == 2) {
        return 'Serve 2 pessoas'
    } else {
        return 'Família - até 4 pessoas'
    }
}

function createTagP(className, text) {
    const p = document.createElement('p')
    p.setAttribute('class', className)
    p.append(document.createTextNode(text))
    return p
}

function createProductButton(action, text) {
    const button = document.createElement('button')
    button.setAttribute('class', `${action}-btn`)

    const img = document.createElement('img')
    img.setAttribute('src', `img/ic_${action}.svg`)

    button.append(img)
    button.append(createTagP('', text))
    return button
}

function createCategory(modalName) {
    const categoryName = document.getElementById('categoryName').value
    return axios.post(`${url}/categories`, { name: categoryName }).then(() => {
        getCategories(url)
        closeModal(modalName)
    })
}

function deleteProduct() {
    return axios.delete(`${url}/products/${productToDelete}`).then(() => {
        getAllProducts(url)
        closeModal('deleteProduct')
    })
}

function editProduct() {}

function deleteProductModal(id) {
    productToDelete = id
    openModal('deleteProduct')
}


function openModal(id) {
    document.getElementById(id).style.display = 'flex'
}

function closeModal(id) {
    document.getElementById(id).style.display = 'none'
    if (id === 'deleteProduct') {
        productToDelete = ''
    }
}

function createProduct() {
    window.location.href = 'cadastro-produto/formulario-produto.html'
}

