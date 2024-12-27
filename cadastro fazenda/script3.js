const modal = document.querySelector('.modal-container')
const tbody = document.querySelector('tbody')
const snome3 = document.querySelector('#m-nome3')
const rRACA = document.querySelector('#m-RACA')
const pPESO = document.querySelector('#m-PESO')
const btnSalvar3 = document.querySelector('#btnSalvar3')

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
    snome3.value = itens[index].nome3
    rRACA.value = itens[index].RACA
    pPESO.value = itens[index].PESO
    id = index 
  } else {
    snome3.value = ''
    rRACA.value = ''
    pPESO.value = ''
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
    <td>${item.nome3}</td>
    <td>${item.RACA}</td>
    <td>${item.PESO} kg</td>
    <td class="acao">
      <button onclick="editItem(${index})">Editar</button>
    </td>
    <td class="acao">
      <button onclick="deleteItem(${index})">Excluir</button>
    </td>
  `;
  tbody.appendChild(tr)
}

btnSalvar3.onclick = e => {
  if (snome3.value == '' || rRACA.value == '' || pPESO.value == '') {
    return 
  }

  e.preventDefault();

  if (id !== undefined) {
    itens[id].nome3 = snome3.value
    itens[id].RACA = rRACA.value
    itens[id].PESO = pPESO.value
  } else {
    itens.push({'nome3': snome3.value, 'RACA': rRACA.value, 'PESO': pPESO.value})
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
