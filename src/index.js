import './styles/style.scss'

let select = function() {
  let selectHeaders = document.querySelectorAll('.select__header')
  let selectItems = document.querySelectorAll('.select__item')

  function toggle() {
    this.parentElement.classList.toggle('active')
  }

  function selectChoose() {
    let text = this.innerText
    let select = this.closest('.select')
    let currentText = select.querySelector('.select__current')
    currentText.innerText = text
    currentText.dataset.value = this.dataset.value
    select.classList.remove('active')
  }

  selectHeaders.forEach(header => header.addEventListener('click', toggle))
  selectItems.forEach(item => item.addEventListener('click', selectChoose))
}

select()
