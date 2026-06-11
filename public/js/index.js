var modulePlan = {
    Y1S1: new Set(),
    Y1S2: new Set(),
    Y2S2: new Set(),
    Y2S1: new Set(),
    Y3S2: new Set(),
    Y3S1: new Set(),
    Y4S2: new Set(),
    Y4S1: new Set(),
}

const modules = document.querySelectorAll('.module')
const modulesContainer = document.getElementById('all-modules')
const semestersContainers = document.querySelectorAll('.semester')
modules.forEach((module) => {
    module.addEventListener('dragstart', (event) => {
        event.target.classList.add('dragging')
        event.dataTransfer.setData('moduleCode', event.target.id)
        event.dataTransfer.setData('moduleParentId', event.target.parentElement.parentElement.id)
    })
    module.addEventListener('dragend', (event) => {
        event.target.classList.remove('dragging')
    })
})
// Container of all modules drag and drop functionality
modulesContainer.addEventListener('dragover', (event) => event.preventDefault())
modulesContainer.addEventListener('drop', (event) => {
    const moduleCode = event.dataTransfer.getData('moduleCode')
    const moduleElement = document.getElementById(moduleCode)

    if(moduleElement.parentElement === event.currentTarget) return ;

    const moduleParentId = event.dataTransfer.getData('moduleParentId')
    console.log(moduleCode, moduleParentId)
    try{
        modulePlan[moduleParentId].delete(moduleCode)
        modulesContainer.appendChild(moduleElement)
    }catch(error){
        alert("Failed to modify modules, Plese refresh and try again")
    }
})

// Semester Containers (e.g Y1S1) drag and drop functionality
semestersContainers.forEach((sc) => {
    sc.addEventListener('dragover', (event) => event.preventDefault())
    sc.addEventListener('drop', (event) => {
        const moduleCode = event.dataTransfer.getData('moduleCode')
        const moduleElement = document.getElementById(moduleCode)

        if(moduleElement.closest('.semester') === event.currentTarget) return ;

        try{
            modulePlan[sc.id].add(moduleCode)
            sc.lastElementChild.appendChild(moduleElement)
        }catch(error){
            alert("Failed to modify modules, Plese refresh and try again")
        }
    })

    let eachYearSemModules = sc.lastElementChild.children
    for(let i = 0; i < eachYearSemModules.length; i++){
        modulePlan[sc.id].add(eachYearSemModules[i].id)
    }
})

document.getElementById('submitBtn').addEventListener('click', (event) => {
    event.currentTarget.disabled = true
})