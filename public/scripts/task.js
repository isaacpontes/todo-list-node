async function markDone(element, id) {
    event.preventDefault();
    try {
        const headers = new Headers({ 'Content-Type' : 'application/json' });
        const body = JSON.stringify({ task: { done: element.checked } });
        const task = await fetch(`/tasks/${id}?_method=put`, { headers: headers, body: body, method: 'PUT' })
            .then(res => res.json())
            .then(data => data.task);
        console.log(task);
        const parent = element.parentNode;

        if (task.done) {
            element.checked = true;
            parent.classList.add('is-done');
        } else {
            element.checked = false;
            parent.classList.remove('is-done');
        }
    } catch (error) {
        console.error(error);
    }
}