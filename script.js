const clearbtn = document.getElementById("clearData")
const addDataBtn = document.getElementById("addData")
const listDataInp = document.getElementById("todoListInput")
const listData = document.getElementById("listData")

const date = new Date()
console.log(date.getDate(), date.getFullYear(), date.getHours() - 12, "|", date.getMinutes());
window.onload = displayData()
clearbtn.addEventListener('click', () => {
    listDataInp.value = ""
})
function addTask() {
    if (listDataInp.value == "") {
        alert("Message Can't Be Empty")
    }
    else {
        createFragement(listDataInp.value)
        const tasks = JSON.parse(localStorage.getItem("tasks")) || []
        tasks.push(listDataInp.value)
        localStorage.setItem("tasks", JSON.stringify(tasks))
        listDataInp.value = ""
    }
}
function displayData() {
    if (localStorage.length > 0) {
        const tasks = JSON.parse(localStorage.getItem("tasks"))
        tasks.forEach(element => {
            createFragement(element)
        });
    }
}

function createFragement(listDataInp) {
    let dateLatest = date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear()
    const fragement = document.createDocumentFragment();
    const div = fragement.appendChild(document.createElement("div"))
    div.className = "to-do-listData"
    const dustBinIcon = document.createElement("span")
    const dateTime = document.createElement("span")
    dustBinIcon.className = "dustBin"
    dateTime.className = "dateTime"
    dateTime.innerHTML = `<p>${dateLatest}</p>`
    dustBinIcon.innerHTML = "<i class='fa-solid fa-trash-can' onclick='deleteSpecList(this)'></i>"
    div.appendChild(dustBinIcon)
    div.appendChild(dateTime)
    const p = div.appendChild(document.createElement("p"))
    p.id = "listData"
    const textNode = document.createTextNode(listDataInp)
    p.appendChild(textNode)
    listData.appendChild(fragement)
}
function clearAllList() {
    localStorage.clear()
    listData.innerHTML = ""
}
function deleteSpecList(element) {
    const parentChild = element.parentElement.parentElement
    const data = parentChild.querySelector("#listData").textContent.trim()
    const tasks = JSON.parse(localStorage.getItem("tasks"))
    const index = tasks.indexOf(data)
    tasks.splice(index, 1)
    localStorage.setItem("tasks", JSON.stringify(tasks))
    parentChild.remove()
}