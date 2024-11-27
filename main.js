window.onload = function(){ 
    const dateElement = document.getElementById("date");
    const timeElement = document.getElementById("time");
    const textElement = document.getElementById("text");

    const saveButton = document.getElementById("save");
    const editButton = document.getElementById("edit");
    const deleteButton = document.getElementById("delete");

    const recordsElement = document.getElementById("records");

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
                <div>
                    <p>${record.date}</p>
                    <p>${record.time}</p>
                    <p>${record.text}</p>
                </div>
            `
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

    function buttonSave() {
        const date = dateElement.value
        const time = timeElement.value
        const text = textElement.value

        const id = date
        
        if (date === "" || time === "" || text === "") {
            alert("Please fill in all fields");
        }

        saveRecord(id, date, time, text);
    }

    displayRecords()

    saveButton.onclick = buttonSave;
}