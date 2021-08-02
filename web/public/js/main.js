document.addEventListener('DOMContentLoaded', () => {
    // Форма для внесения задания в список
    let btnAddTask = document.getElementById('add_task'),
        formDetails = document.getElementById('form-details'),
        inputTask = document.getElementById('input-task'),
        btnReset = document.getElementById('reset'),
        btnSend = document.getElementById('ready');

    btnAddTask.addEventListener('click', () => {
        formDetails.classList.toggle('dropdown');
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
    });

    //Само задание и его интерфейс: удалить, изменить, форма, название задания, id задания
    let namesList = document.getElementById('names_list'),
        tmpData = {},
        getData = (data = {}) => { return data; }

    if (namesList) {
        namesList.onclick = (e) => {
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
                let path = t.closest('a').getAttribute('href');
                if (confirm('Вы уверенны, что хотите удалить это задание?')) window.location.href = path;
            }
        }
    }

    // Удаление всех заданий
    let btnDeleteAll = document.getElementById('delete_all'),
        task_list_exist = document.getElementById('names_list');
    if (task_list_exist) {
        btnDeleteAll.removeAttribute('disabled');
    }
    btnDeleteAll.addEventListener('click', () => {
        (task_list_exist && confirm('Уверены, что хотите удалить все задания?')) ?
            window.location.href = '/php/remove-all.php' :
            alert('Заданий еще не создано');
    });
});