document.addEventListener('DOMContentLoaded', () => {
    const btnAddTask = document.getElementById('add_task'),
        formDetails = document.getElementById('form-details'),
        inputTask = document.getElementById('input-task'),
        btnReset = document.getElementById('reset'),
        btnSend = document.getElementById('ready'),
        namesList = document.getElementById('names_list'),
        taskList = document.querySelectorAll('ol#names_list li');

    let actions = {
            imitateAddTask: (data) => {
                let task_id = data[data.length - 1].id,
                    task_name = data[data.length - 1].name,
                    li = document.createElement('li'),
                    new_task = `
                        <p id="row_${task_id}">${task_name}</p>
                        <a href="/php/remove.php?id=${task_id}">
                            <button type="button" id="delete_data_'.$num.'"></button>
                        </a>
                        <button type="button" id="update_data_${task_id}"></button>
                        <form class="form-update" action="/php/update.php" method="post">
                            <input type="text" name="name" id="update_name_${task_id}" autocomplete="off">
                            <input type="hidden" name="id" value="${task_id}">
                            <button type="button" class="btn" id="save_data_${task_id}">Сохранить</button>
                        </form>
                    `;
                li.setAttribute('class', 'task show');
                li.setAttribute('data-task', `${task_id}`);
                li.innerHTML = new_task;
                namesList.appendChild(li);
            },
            addTask: async () => {
                const formData = new FormData();
                formData.append('name', inputTask.value);

                let url = '../php/add.php',
                    response = await fetch(url, {
                        method: 'POST',
                        body: formData
                    }),
                    data = await response.json()

                if (!response.ok) {
                    throw new Error(`Не удалось получить ${url}, статус: ${response.status}`);
                }
                actions.imitateAddTask(data);
            },
            imitateRemoveTask: (task_data) => {
                taskList.map(task => {
                    let curr_task_id = task.getAttribute('data-task');
                    if (curr_task_id === task_data.id && confirm(`Вы уверенны, что хотите удалить задание ${task_data.name}?`)) {
                        task.classList.add('hide');
                    }
                })
            },
            removeTask: async () => {
                let formData = new FormData();
                formData.append('name', inputTask.value);

                let url = '../php/remove.php',
                    response = await fetch(url, {
                        method: 'POST',
                        body: formData
                    }),
                    data = await response.json()

                if (!response.ok) {
                    throw new Error(`Не удалось получить ${url}, статус: ${response.status}`);
                }
                actions.imitateRemoveTask(data);
            }
        }


    btnAddTask.addEventListener('click', () => {
        if (!formDetails.classList.contains('dropdown')) {
            formDetails.classList.add('dropdown');
            setTimeout(() => {
                inputTask.focus();
            }, 301)
        } else  {
            formDetails.classList.remove('dropdown');
            setTimeout(() => {
                inputTask.blur();
            }, 301)
        }

    });

    inputTask.addEventListener('input', () => {
        if (inputTask.value !== '') {
            btnSend.removeAttribute('disabled');
            inputTask.classList.add('active');
            btnReset.classList.add('appear')
        } else {
            btnSend.setAttribute('disabled', 'disabled');
            inputTask.removeAttribute('class');
            btnReset.classList.remove('appear');
        }
    });

    btnReset.addEventListener('click', () => {
        inputTask.classList.remove('active');
        btnReset.classList.remove('appear');
        btnSend.setAttribute('disabled', 'disabled');
    });

    btnSend.onclick = (e) => {
        e.preventDefault();
        actions.addTask();
    }
});