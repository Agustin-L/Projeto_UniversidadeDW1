const modal = document.querySelector('.modal-container')
const tbody = document.querySelector('tbody')
const snome1 = document.querySelector('#m-nome1')
const rmaquinario = document.querySelector('#m-maquinario')
const pmarca = document.querySelector('#m-marca')
const btnSalvar1 = document.querySelector('#btnSalvar1')

let itens
let id

function openModal(edit = false, index = 0) {
  modal.classList.add('active')

  modal.onclick = e => {
    if (e.target.className.indexOf('modal-container') !== -1) {
      modal.classList.remove('active')
    }
  }

  if (edit) {
    snome1.value = itens[index].nome1
    rmaquinario.value = itens[index].maquinario
    pmarca.value = itens[index].marca
    id = index
  } else {
    snome1.value = ''
    rmaquinario.value = ''
    pmarca.value = ''
  }
}

function editItem(index) {
  openModal(true, index)
}

function deleteItem(index) {
  itens.splice(index, 1)
  setItensBD()
  loadItens()
}

function insertItem(item, index) {
  let tr = document.createElement('tr')

  tr.innerHTML = `
    <td>${item.nome1}</td>
    <td>${item.maquinario}</td>
    <td>${item.marca}</td>
    <td class="acao">
      <button onclick="editItem(${index})">Editar</button>
    </td>
    <td class="acao">
      <button onclick="deleteItem(${index})">Excluir</button>
    </td>
  `;
  tbody.appendChild(tr)
}

btnSalvar1.onclick = e => {
  if (snome1.value == '' || rmaquinario.value == '' || pmarca.value == '') {
    return
  }

  e.preventDefault();

  if (id !== undefined) {
    itens[id].nome1 = snome1.value
    itens[id].maquinario = rmaquinario.value
    itens[id].marca = pmarca.value
  } else {
    itens.push({ 'nome1': snome1.value, 'maquinario': rmaquinario.value, 'marca': pmarca.value })
  }

  setItensBD()

  modal.classList.remove('active')
  loadItens()
  id = undefined
}

function loadItens() {
  itens = getItensBD()
  tbody.innerHTML = ''
  itens.forEach((item, index) => {
    insertItem(item, index)
  })
}

const getItensBD = () => JSON.parse(localStorage.getItem('dbfunc')) ?? []
const setItensBD = () => localStorage.setItem('dbfunc', JSON.stringify(itens))

loadItens()
