const params = new UrlSearchParams();
function updateFieldOfURL(event) {
    const checkedType = event.target.type === 'checkbox' || event.target.type === 'radio';
    if (checkedType || event.target.value) {
        if (checkedType) {
            params.hash.set(event.target.id, event.target.checked);
            if (event.target.type === 'radio') {
                const radioButtons = document.getElementsByName(event.target.name);
                for (let i=0; i < radioButtons.length; i++) {
                    const radio = radioButtons.item(i);
                    if (radio.id !== event.target.id) {
                        params.hash.delete(radio.id);
                    }
                }
            }
        } else {
            params.hash.set(event.target.id, event.target.value);
        }
    } else {
        params.hash.remove(event.target.id);
    }
    document.location.hash = params.toString();
}

window.onload = function() {
    // Load URL params
    for(const param of params.hash.entries()) {
        if(param[0] !== 'out') {
            let item = document.getElementById(param[0]);
            if (item) {
                if (param[0] === 'language' && param[1] === 'other') {
                    switchManualLanguage(param[1]);
                }

                if (item.type === 'checkbox' ||item.type === 'radio') {
                    item.checked = param[1] === 'true'
                } else {
                    item.value = param[1];
                }  
            }
        }
    }
    // Change URL to represent current status
    document.body.addEventListener('keyup', updateFieldOfURL);
    document.body.addEventListener('click', updateFieldOfURL);
}