const modules = document.querySelectorAll('.module')
const modulesContainer = document.getElementById('all-modules')
const semestersContainers = document.querySelectorAll('.semester')
modules.forEach((module) => {
    module.addEventListener('dragstart', (event) => {
        event.target.classList.add('dragging')
        event.dataTransfer.setData('moduleCode', event.target.id)
    })
    module.addEventListener('dragend', (event) => {
        event.target.classList.remove('dragging')
    })
})

modulesContainer.addEventListener('dragover', (event) => event.preventDefault())
modulesContainer.addEventListener('drop', (event) => {
    console.log('drop in module')
    const moduleCode = event.dataTransfer.getData('moduleCode')
    console.log(event)
    modulesContainer.appendChild(document.getElementById(moduleCode))
})

semestersContainers.forEach((sc) => {
    sc.addEventListener('dragover', (event) => event.preventDefault())
    sc.addEventListener('drop', (event) => {
        console.log('drop in semester')
        const moduleCode = event.dataTransfer.getData('moduleCode')
        console.log(moduleCode)
        sc.lastElementChild.appendChild(document.getElementById(moduleCode))
    })
})