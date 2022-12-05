const helper = require('./helper.js');

const handlePassChange = (e) => {
    e.preventDefault();
    helper.hideError();

    const oldPass = e.target.querySelector('#oldPass').value;
    const pass = e.target.querySelector('#pass').value;
    const pass2 = e.target.querySelector('#pass2').value;
    const _csrf = e.target.querySelector('#_csrf').value;

    if(!oldPass || !pass || !pass2){
        helper.handleError('All fields are required!');
        return pass;
    }

    if(pass !== pass2){
        helper.handleError('New passwords do not match!');
    }

    helper.sendPost(e.target.action, {oldPass, pass, pass2, _csrf});
}

const PassChangeForm = (props) => {
    return(
        <form id="changePassForm"
            onSubmit={handlePassChange}
            name="changePassForm"
            action="/changePass"
            method="POST"
            className="passForm"
        >
            <label htmlFor="oldPass">Current Password: </label>
            <input id="oldPass" type="password" name="oldPass" placeholder="password" />
            <label htmlFor="pass">New Password: </label>
            <input id="pass" type="password" name="pass" placeholder="password" />
            <label htmlFor="pass2">Confirm New Password: </label>
            <input id="pass2" type="password" name="pass2" placeholder="password" />
            <input id="_csrf" type="hidden" name="_csrf" value={props.csrf} />
            <input className="makeListSubmit" type="submit" value="Update" />
        </form>
    );
}

const init = async () => {
    const response = await fetch('/getToken');
    const data = await response.json();

    ReactDOM.render(<PassChangeForm csrf={data.csrfToken}/>, document.getElementById('changePass'));
    const logoutButton = document.getElementById('logoutButton');

    logoutButton.addEventListener('click', (e) => {
        e.preventDefault();
        ReactDOM.render(<LoginWindow csrf={data.csrfToken} />, document.getElementById('content'));
        return false;
    });
}

window.onload = init;