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
                        setTimeout(() => {
                            task.remove();
                            if (taskList.children.length === 0) {
                                actions.imitateEmpty(taskList);
                            }
                        }, 400)

                    }
                }
            },
            removeTask: async (task_id) => {
                const formData = new FormData(),
                    url = `../php/remove.php?id=${task_id}`;
                    formData.append('id', task_id);

                let response = await fetch(url);
                if (response.ok) {
                    actions.imitateRemoveTask(task_id)
                } else {
                    console.error(`Статус "${response.status}"`);
                }

            },
            imitateEmpty: (task_list) => {
                task_list.innerHTML =  `
                   <li class="empty show">
                        <div class="animation-background"></div>
                        <svg height="64pt" viewBox="-66 0 569 569.286" fill="#fff" xmlns="http://www.w3.org/2000/svg">
                        <path d="m.109375 66.382812v493.132813c0 5.238281 4.246094 9.484375 9.484375 9.484375h360.367188c5.234374 0 9.480468-4.246094 9.480468-9.484375v-398.296875c0-.210938-.101562-.390625-.121094-.597656-.046874-.832032-.210937-1.652344-.484374-2.4375-.105469-.304688-.179688-.597656-.3125-.894532-.460938-1.03125-1.101563-1.972656-1.898438-2.777343l-94.832031-94.832031c-.804688-.800782-1.75-1.441407-2.789063-1.898438-.285156-.121094-.574218-.222656-.871094-.3125-.792968-.273438-1.617187-.4375-2.457031-.492188-.160156.027344-.347656-.074218-.546875-.074218h-265.535156c-5.238281 0-9.484375 4.242187-9.484375 9.480468zm346.957031 85.351563h-62.457031v-62.457031zm-327.992187-75.867187h246.570312v85.351562c0 5.234375 4.246094 9.480469 9.480469 9.480469h85.351562v379.335937h-341.402343zm0 0"/><path d="m398.410156 493.132812v18.964844h28.449219c5.238281 0 9.484375-4.242187 9.484375-9.480468v-493.132813c0-5.238281-4.246094-9.484375-9.484375-9.484375h-360.367187c-5.238282 0-9.484376 4.246094-9.484376 9.484375v28.449219h18.96875v-18.96875h341.398438v474.167968zm0 0"/><path d="m75.976562 189.667969h227.597657v18.964843h-227.597657zm0 0"/><path d="m75.976562 132.765625h75.867188v18.96875h-75.867188zm0 0"/><path d="m75.976562 246.566406h151.734376v18.96875h-151.734376zm0 0"/><path d="m246.675781 246.566406h56.898438v18.96875h-56.898438zm0 0"/><path d="m75.976562 303.464844h227.597657v18.96875h-227.597657zm0 0"/><path d="m75.976562 417.265625h227.597657v18.96875h-227.597657zm0 0"/><path d="m161.324219 360.367188h142.25v18.964843h-142.25zm0 0"/><path d="m75.976562 360.367188h66.382813v18.964843h-66.382813zm0 0"/><path d="m75.976562 474.167969h37.933594v18.964843h-37.933594zm0 0"/><path d="m132.875 474.167969h170.699219v18.964843h-170.699219zm0 0"/>
                        </svg>
                        <div class="empty-phrase">Заданий нет</div>
                    </li>
                `;
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