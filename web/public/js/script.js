document.addEventListener('DOMContentLoaded', () => {
    const btnAddTask = document.getElementById('add_task'),
        formDetails = document.getElementById('form-details'),
        inputTask = document.getElementById('input-task'),
        btnReset = document.getElementById('reset'),
        btnSend = document.getElementById('ready'),
        taskList = document.getElementById('names_list'),
        tasks = document.querySelectorAll('ol#names_list li');

    let actions = {
            imitateAddTask: (data) => {
                let task_id = data[data.length - 1].id,
                    task_name = data[data.length - 1].name,
                    li = document.createElement('li'),
                    new_task = `
                        <p id="row_${task_id}">${task_name}</p>
                        <button type="button" id="delete_data_'.$num.'" class="btn-delete"></button>
                        <button type="button" id="update_data_${task_id}" class="btn-update"></button>
                        <form class="form-update" action="/php/update.php" method="post">
                            <input type="text" name="name" id="update_name_${task_id}" autocomplete="off">
                            <input type="hidden" name="id" value="${task_id}">
                            <button type="button" class="btn" id="save_data_${task_id}">Сохранить</button>
                        </form>
                    `;
                li.setAttribute('class', 'task show');
                li.setAttribute('data-task', `${task_id}`);
                li.innerHTML = new_task;
                taskList.appendChild(li);
            },
            addTask: async () => {
                const form_data = new FormData();
                form_data.append('name', inputTask.value);

                let url = '../php/add.php',
                    response = await fetch(url, {
                        method: 'POST',
                        body: form_data
                    }),
                    data = await response.json()

                if (!response.ok) {
                    throw new Error(`Не удалось получить ${url}, статус: ${response.status}`);
                }
                actions.imitateAddTask(data);
            },
            imitateRemoveTask: (task_id) => {
                if (task_id) {
                    let task = document.querySelectorAll(`li[data-task="${task_id}"]`)[0],
                        task_name = task.children[0].innerHTML;

                    if (confirm(`Вы уверенны, что хотите удалить задание "${task_name}"?`)) {
                        if (task.classList.contains('show')) {
                            task.classList.remove('show');
                        }
                        task.classList.add('hide');
                    }
                }
            },
            removeTask: async (task_id) => {
                const formData = new FormData(),
                    url = `../php/remove.php?id=${task_id}`;
                    formData.append('id', task_id);

                let response = await fetch(url);
                response.ok ?
                    actions.imitateRemoveTask(task_id) :
                    console.error(`Статус "${response.status}"`);
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
        inputTask.value = '';
        inputTask.focus();
    }



    if (taskList) {
        let tmpData = {},
            getData = (data = {}) => {
                return data;
            }
        taskList.onclick = (e) => {
            let t = e.target;
            if (t.id.startsWith('update_data_')) {
                let form = t.nextElementSibling,
                    idValue = t.nextElementSibling.children[1],
                    nameValue = t.nextElementSibling.children[0],
                    saveData = t.nextElementSibling.children[2],
                    row = t.previousElementSibling.previousElementSibling,
                    data = {
                        'row': row,
                        'target': t,
                        'form': form,
                        'nameValue': nameValue,
                        'idValue': idValue,
                        'saveData': saveData
                    };
                form.classList.toggle('update');
                data.nameValue.value = data.row.innerHTML;
                tmpData = getData(data);
            }

            if (t.id.startsWith('save_data_')) {
                e.preventDefault();
                let form = t.closest('form'),
                    idValue = t.previousElementSibling,
                    nameValue = idValue.previousElementSibling,
                    data = {
                        'target': t,
                        'form': form,
                        'nameValue': nameValue,
                        'idValue': idValue
                    };
                tmpData = getData(data);
                tmpData.nameValue.value ?
                    form.submit() :
                    alert('Поле не должно быть пустым!');
            }

            if (t.id.startsWith('delete_data_')) {
                e.preventDefault();
                let task_id = t.closest('li').getAttribute('data-task');
                actions.removeTask(task_id);
            }
        }
    }
});