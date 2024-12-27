const modal = document.querySelector('.modal-container')
const tbody = document.querySelector('tbody')
const snome2 = document.querySelector('#m-nome2')
const rmatricula = document.querySelector('#m-matricula')
const pcargo = document.querySelector('#m-cargo')
const btnSalvar2 = document.querySelector('#btnSalvar2')

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
    snome2.value = itens[index].nome2
    rmatricula.value = itens[index].matricula
    pcargo.value = itens[index].cargo
    id = index 
  } else {
    snome2.value = ''
    rmatricula.value = ''
    pcargo.value = ''
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
    <td>${item.nome2}</td>
    <td>${item.matricula}</td>
    <td>${item.cargo}</td>
    <td class="acao">
      <button onclick="editItem(${index})">Editar</button>
    </td>
    <td class="acao">
      <button onclick="deleteItem(${index})">Excluir</button>
    </td>
  `;
  tbody.appendChild(tr)
}

btnSalvar2.onclick = e => {
  if (snome2.value == '' || rmatricula.value == '' || pcargo.value == '') {
    return 
  }

  e.preventDefault();

  if (id !== undefined) {
    itens[id].nome2 = snome2.value
    itens[id].matricula = rmatricula.value
    itens[id].cargo = pcargo.value
  } else {
    itens.push({'nome2': snome2.value, 'matricula': rmatricula.value, 'cargo': pcargo.value})
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
