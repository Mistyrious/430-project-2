const handleError = (message) => {
    document.getElementById('errorMessage').textContent = message;
    document.getElementById('errorArea').classList.remove('is-hidden');
};

const sendPost = async (url, data, handler) => {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    const result = await response.json();
    document.getElementById('errorArea').classList.add('is-hidden');

    if(result.error){
        handleError(result.error);
    }

    if(result.redirect) {
        window.location = result.redirect;
    }

    if(handler) {
        handler(result);
    }
}

const hideError = () => {
    document.getElementById('errorArea').classList.add('hidden');
}

module.exports = {
    handleError,
    sendPost,
    hideError,
}