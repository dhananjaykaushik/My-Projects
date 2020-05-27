const formContainer = document.getElementById('form-container');

function initControlElements() {
    const draggableControlElements = document.querySelectorAll('.control.draggable');
    draggableControlElements.forEach(
        draggableControlElement => {
            // Handling Drag start event
            draggableControlElement.addEventListener('dragstart', _ => {
                draggableControlElement.classList.add('controlBeingDragged');
            });

            // Handling Drag end event
            draggableControlElement.addEventListener('dragend', _ => {
                draggableControlElement.classList.remove('controlBeingDragged');
            });
        }
    );
}

function refreshFieldControls() {
    const draggableFormElements = document.querySelectorAll('form .draggable');
    draggableFormElements.forEach(
        draggableFormElement => {
            // Handling Drag start event
            draggableFormElement.addEventListener('dragstart', _ => {
                draggableFormElement.classList.add('fieldBeingDragged');
            });

            // Handling Drag end event
            draggableFormElement.addEventListener('dragend', _ => {
                draggableFormElement.classList.remove('fieldBeingDragged');
            });
        }
    );
}

formContainer.addEventListener('dragover', event => {
    event.preventDefault();
    const afterElement = getNextElement(formContainer, event.clientY);
    const fieldBeingDragged = document.querySelector('.fieldBeingDragged');
    if (fieldBeingDragged) {
        if (afterElement === null) {
            formContainer.appendChild(fieldBeingDragged);
        } else {
            formContainer.insertBefore(fieldBeingDragged, afterElement);
        }
    }
});

formContainer.addEventListener('drop', event => {
    event.preventDefault();
    const afterElement = getNextElement(formContainer, event.clientY);
    const controlBeingDragged = document.querySelector('.controlBeingDragged');

    if (controlBeingDragged) {
        const type = controlBeingDragged.getAttribute('data-type');
        document.getElementById(type).classList.remove('d-none');

        if (document.getElementById(`${type}Form`).getAttribute('listener') !== 'true') {
            document.getElementById(`${type}Form`).addEventListener('submit', event => {
                event.preventDefault();
                const formData = new FormData(event.target);

                let elementToAdd = null;
                const fieldContainerDiv = document.createElement('div');
                fieldContainerDiv.classList.add('form-group');
                const fieldLabel = document.createElement('label');
                fieldLabel.htmlFor = formData.get('label');
                fieldLabel.innerHTML = formData.get('label') ? formData.get('label') : 'label';
                let addLabelAfter = false;
                let disableAfterAddition = false;
                let noLabel = false;
                switch (type) {
                    case 'textField':
                        elementToAdd = document.createElement('input')
                        elementToAdd.type = 'text';
                        elementToAdd.placeholder = `Enter ${formData.get('label')}`;
                        elementToAdd.classList.add('form-control');
                        break;
                    case 'radioButton':
                        elementToAdd = document.createElement('input')
                        elementToAdd = document.createElement('input')
                        elementToAdd.type = 'radio';
                        elementToAdd.name = formData.get('groupName');
                        elementToAdd.value = formData.get('name');
                        elementToAdd.classList.add('form-control');
                        addLabelAfter = true;
                        break;
                    case 'checkBox':
                        elementToAdd = document.createElement('input')
                        elementToAdd.type = 'checkbox';
                        elementToAdd.name = formData.get('name');
                        elementToAdd.value = formData.get('value');
                        elementToAdd.classList.add('form-control');
                        addLabelAfter = true;
                        break;
                    case 'fileInput':
                        elementToAdd = document.createElement('input')
                        elementToAdd.type = 'file';
                        elementToAdd.name = formData.get('name');
                        elementToAdd.classList.add('form-control');
                        break;
                    case 'submitButton':
                        elementToAdd = document.createElement('button')
                        elementToAdd.type = 'submit';
                        elementToAdd.classList.add('btn');
                        elementToAdd.classList.add('btn-success');
                        elementToAdd.name = formData.get('name');
                        elementToAdd.innerHTML = formData.get('name');
                        elementToAdd.classList.add('form-control');
                        disableAfterAddition = true;
                        noLabel = true;
                        break;
                }

                if (elementToAdd) {
                    fieldContainerDiv.setAttribute('draggable', true);
                    fieldContainerDiv.classList.add('draggable');
                    fieldContainerDiv.appendChild(elementToAdd);
                    if (!noLabel) {
                        if (addLabelAfter) {
                            fieldContainerDiv.appendChild(fieldLabel);
                        } else {
                            fieldContainerDiv.prepend(fieldLabel);
                        }
                    }
                }

                if (disableAfterAddition) {
                    controlBeingDragged.classList.add('disabled');
                    controlBeingDragged.classList.remove('draggable');
                    controlBeingDragged.setAttribute('draggable', false);
                }
                if (afterElement === null) {
                    formContainer.appendChild(fieldContainerDiv);
                } else {
                    formContainer.insertBefore(fieldContainerDiv, afterElement);
                }

                document.getElementById(`${type}Form`).setAttribute('listener', true);
                document.getElementById(type).classList.add('d-none');
                $('#addFieldModal').modal('toggle');
                refreshFieldControls();
            });
        }


        $('#addFieldModal').modal('toggle');
    }
});

function getNextElement(container, posY) {
    const draggableElements = [...container.querySelectorAll('.draggable:not(.fieldBeingDragged)')];
    return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = posY - box.top - box.height / 2;
        if (offset < 0 && offset > closest.offset) {
            return {
                offset: offset,
                element: child
            };
        } else {
            return closest;
        }

    }, { offset: Number.NEGATIVE_INFINITY }).element;
}

document.getElementById('generate-html').addEventListener('click', () => {
    document.getElementById('html-code').innerText = `
    <form>
        ${formContainer.innerHTML}
    </form>
    `;
});

initControlElements();