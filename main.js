window.onload = function(){ 
    const dateElement = document.getElementById("date")
    const timeElement = document.getElementById("time")
    const textElement = document.getElementById("text")

    const saveButton = document.getElementById("save")
    const editButton = document.getElementById("edit")
    const deleteButton = document.getElementById("delete")
    const popupButton = document.getElementById("pop-up-button")

    const recordsElement = document.getElementById("records")

    const popupElement = document.getElementById("pop-up")

    let activeRecord = null

    function getRecords() {
        const keys = Object.keys(localStorage)
        const records = []
        for (let key of keys) {
            const record = JSON.parse(localStorage.getItem(key))
            records.push(record)
        }
        return records
    }

    function displayRecords() {
        const records = getRecords()
        for (let record of records) {
            recordsElement.innerHTML += `
                <div class="records__items">
                    <p class="records__item">Date: ${record.date}</p>
                    <p class="records__item">Time: ${record.time}</p>
                    <p class="records__item">Text: ${record.text}</p>
                </div>
            `
        }

        const recordItems = document.getElementsByClassName("records__items")
        
        for (let item of recordItems) {
            item.onclick = () => {
                if (activeRecord) {
                    activeRecord.classList.remove("records__item-active")
                }
                activeRecord = item
                item.classList.add("records__item-active")
            }
        }
    }

    function saveRecord(id, date, time, text) {
        localStorage.setItem(id, JSON.stringify({date, time, text}))
    }

    function editRecord(id, date, time, text) {
        localStorage.setItem(id, JSON.stringify({date, time, text}))
    }

    function deleteRecord(id) {
        localStorage.removeItem(id)
    }

    deleteButton.addEventListener('click', () => {
        if (activeRecord) {
            const id = activeRecord.children[0].innerText.split(' ')[1]
            deleteRecord(id)
            alert('Record deleted successfully')
        } else {
            alert('Please select a record to delete')
        }
    })

    editButton.addEventListener('click', () => {
        if (activeRecord) {
            const date = dateElement.value
            const time = timeElement.value
            const text = textElement.value

            if (date === '' || time === '' || text === '') {
                alert('Please fill in all fields')
                return
            }

            const id = activeRecord.children[0].innerText.split(' ')[1]

            editRecord(id, date, time, text)

            alert('Record edited successfully')
        } else {
            alert('Please select a record to edit')
        }
    })

    popupButton.addEventListener('click', () => {
        popupElement.style.display = "none"
    })

    dateElement.addEventListener('change', () => {
        popupElement.style.display = "flex"
    })

    saveButton.addEventListener('click', () => {
        const date = dateElement.value
        const time = timeElement.value
        const text = textElement.value

        const id = date
        
        if (date === '' || time === '' || text === '') {
            alert("Please fill in all fields")
            return
        }

        saveRecord(id, date, time, text)
        alert('Record saved')
    })

    displayRecords()
}