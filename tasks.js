const tasks = [
 {id: 1, completed: false, text: 'Посмотреть новый урок по JavaScript'},
 {id: 2, completed: false, text: 'Выполнить тест после урока'},
 {id: 3, completed: false, text: 'Выполнить ДЗ после урока'},
]

addStyle()


tasks.forEach((task)=>{
    addNewTask(task)
})

function addNewTask(task) {
    
    const taskList = document.querySelector('.tasks-list')
    
    const taskItem = document.createElement('div')
    taskItem.className = 'task-item'
    taskItem.dataset.taskId = task.id
    
    const taskItemMainContainer = document.createElement('div')
    taskItemMainContainer.className ='task-item__main-container'
    
    const taskItemMainContent = document.createElement('div')
    taskItemMainContent.className = 'task-item__main-content'
    
    const form = document.createElement('form')
    form.className= 'checkbox-form'

    const input = document.createElement('input')
    input.className = 'checkbox-form__checkbox'
    input.type = 'checkbox'
    input.id = `task-${task.id}`
    
    const label = document.createElement('label')
    label.htmlFor = `task-${task.id}`
    
    const span = document.createElement('span')
    span.className = 'task-item__text'
    span.textContent = task.text
    
    const button = document.createElement('button')
    button.className = 'task-item__delete-button default-button delete-button'
    button.dataset.deleteTaskid = `${task.id}`
    button.textContent = 'Удалить'
    
    taskList.prepend(taskItem)
    taskItem.prepend(taskItemMainContainer)
    taskItemMainContainer.prepend(taskItemMainContent)
    taskItemMainContent.prepend(form)
    form.prepend(input)
    form.append(label)

    taskItemMainContent.append(span)
    taskItemMainContainer.append(button)
}

const createTaskBlock = document.querySelector('.create-task-block')
   
const errorBlock = document.createElement('span')

function addError (text){
    errorBlock.className = 'error-message-block'
    errorBlock.textContent = text
    createTaskBlock.prepend(errorBlock)
}

function removeError (){
errorBlock.remove()
}

const createBut = document.querySelector('.create-task-block')
createBut.addEventListener('submit', (event)=>{
    event.preventDefault()
    const{target}= event
    
    const textInput = target.taskName.value
    if(!textInput){
        addError('Название задачи не должно быть пустым')
    } else if(tasks.find((item)=>textInput=== item.text)){
        addError('Задача с таким названием уже существует')
    } 
     else {
        removeError()
        const newTask = {
            id: tasks.length+1,
            completed: false,
            text: textInput
           }
                tasks.unshift(newTask)
                addNewTask(newTask)
    }           
})

 function showModalMessage (){
 const bodyTag = document.body
       
    const modalOverlay = document.createElement('div')
    modalOverlay.className = `modal-overlay`
    const deleteModal = document.createElement('div')
    deleteModal.className = 'delete-modal'
    const h3DeleteModal = document.createElement('h3')
    h3DeleteModal.className = 'delete-modal_question'
    h3DeleteModal.textContent = 'Вы действительно хотите удалить эту задачу?'
    const divButtonDelete = document.createElement('div')
    divButtonDelete.className = 'delete-modal_buttons'
    const cancelButton = document.createElement('button')
    cancelButton.className = 'delete-modal_button delete-modal_cancel-button'
    cancelButton.textContent = 'Отмена'
    const deleteButton = document.createElement('button')
    deleteButton.className = 'delete-modal_button delete-modal_confirm-button'
    deleteButton.textContent = 'Удалить'

bodyTag.prepend(modalOverlay)
modalOverlay.prepend(deleteModal)
deleteModal.prepend(h3DeleteModal)
deleteModal.append(divButtonDelete)
divButtonDelete.prepend(cancelButton)
divButtonDelete.append(deleteButton)
 }  

const taskList = document.querySelector('.tasks-list')
taskList.addEventListener('click',(event)=>{
    const isButDelete = event.target.closest('.task-item__delete-button')
    console.log('ok',isButDelete)
    
    if(isButDelete){
        showModalMessage()
    }
    const butDelTask = document.querySelector('.delete-modal_buttons')
    butDelTask.addEventListener('click', (event)=>{
       const modalOverlay = document.querySelector('.modal-overlay')
        const isButFromModal = event.target.closest('.delete-modal_button')
        const taskItem = document.querySelector('.task-item')
        const idDeleteBut = document.querySelector('.task-item__delete-button')
        function removeObj (){
            const taskIndex = tasks.findIndex((item)=>item.id === Number(idDeleteBut.dataset.deleteTaskid))
            if(taskIndex > -1){
                tasks.splice(taskIndex, 1)
                return tasks
            }
            }

        if(isButFromModal.textContent === 'Отмена'){
            modalOverlay.classList.add('modal-overlay_hidden')
        } else if (isButFromModal.textContent === 'Удалить'){
            
            taskItem.dataset.taskId = Number(idDeleteBut.dataset.deleteTaskid)
            taskItem.remove()
            modalOverlay.classList.add('modal-overlay_hidden')
            
                removeObj()
        console.log( tasks)
        }
    })
})

let darkTheme = false

function addStyle (){
    const styleBody = document.body
    const styleForTaskItem = document.querySelectorAll('.task-item')
    const styleForButton = document.querySelectorAll('button')
    styleBody.addEventListener('keydown',(event)=>{
        if(event.key === 'Tab'){
            if(darkTheme){
                //делаюсветлую
                styleBody.style.background = 'initial'
                styleForTaskItem.forEach((item)=> item.style.color = 'initial')
                styleForButton.forEach((item)=>item.style.border = 'none')
            
                darkTheme= !darkTheme
            } else{
                // делаю темную
                styleBody.style.background = '#24292e'
                styleForTaskItem.forEach((item)=> item.style.color = '#ffffff')
                styleForButton.forEach((item)=>item.style.border = '1px solid #ffffff')
                
                darkTheme= !darkTheme
            }
            
        }
    })  
}
