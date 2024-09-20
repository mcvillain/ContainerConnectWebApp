// Data-related functions

function getData() {
    fetch('/api/data')
    .then(response => response.json())
    .then(data => {
        const dataList = document.getElementById('data-list');
        dataList.innerHTML = '';
        data.forEach(item => {
            const li = document.createElement('li');
            li.textContent = item.content;
            li.dataset.id = item.id;
            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Delete';
            deleteBtn.onclick = () => deleteData(item.id);
            li.appendChild(deleteBtn);
            dataList.appendChild(li);
        });
    })
    .catch(error => console.error('Error:', error));
}

function createData() {
    const content = document.getElementById('data-content').value;
    fetch('/api/data', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content }),
    })
    .then(response => response.json())
    .then(data => {
        alert('Data created successfully');
        getData();
    })
    .catch(error => console.error('Error:', error));
}

function deleteData(id) {
    fetch(`/api/data/${id}`, {
        method: 'DELETE',
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
        getData();
    })
    .catch(error => console.error('Error:', error));
}
