const helper = require('./helper.js');

const handleLogin = (e) => {
    e.preventDefault();
    helper.hideError();

    const username = e.target.querySelector('#user').value;
    const pass = e.target.querySelector('#pass').value;
    const _csrf = e.target.querySelector('#_csrf').value;

    if(!username || !pass){
        helper.handleError('Username or password is empty!');
        return false;
    }

    helper.sendPost(e.target.action, {username, pass, _csrf});

    return false;
}

const handleSignup = (e) => {
    e.preventDefault();
    helper.hideError();

    const username = e.target.querySelector('#user').value;
    const pass = e.target.querySelector('#pass').value;
    const pass2 = e.target.querySelector('#pass2').value;
    const _csrf = e.target.querySelector('#_csrf').value;

    if(!username || !pass || !pass2){
        helper.handleError('All fields are required!');
        return false;
    }

    if(pass != pass2){
        helper.handleError('Passwords do not match!');
        return false;
    }

    helper.sendPost(e.target.action, {username, pass, pass2, _csrf});

    return false;
}

const LoginWindow = (props) => {
    return (
        <form id="loginForm"
            name="loginForm"
            onSubmit={handleLogin}
            action="/login"
            method="POST"
            className="form mainForm"
        >
            <div className="field">
                <label className="label is-medium" htmlFor="username">Username: </label>
                <div className="control">
                    <input className="input" id="user" type="text" name="username" placeholder="username" />
                </div>
            </div>
            <div className="field">
                <label className="label is-medium" htmlFor="pass">Password: </label>
                <div className="control">
                    <input className="input" id="pass" type="password" name="pass" placeholder="password" />
                </div>
            </div>
            <input id="_csrf" type="hidden" name="_csrf" value={props.csrf} />
            <div className="field has-addons has-addons-right">
                <div className="control">
                    <input className="button formSubmit" type="submit" value="Sign In" />
                </div>
            </div>
        </form>
    );
}

const SignupWindow = (props) => {
    return (
        <form id="signupForm"
        name="signupForm"
        onSubmit={handleSignup}
        action="/signup"
        method="POST"
        className="form mainForm"
    >
        <div className="field">
            <label className="label is-medium" htmlFor="username">Username: </label>
            <div className="control">
                <input className="input" id="user" type="text" name="username" placeholder="username" />
            </div>
        </div>
        <div className="field">
            <label className="label is-medium" htmlFor="pass">Password: </label>
            <div className="control">
                <input className="input" id="pass" type="password" name="pass" placeholder="password" />
            </div>
        </div>
        <div className="field">
            <label className="label is-medium" htmlFor="pass2">Confirm Password: </label>
            <div className="control">
                <input className="input" id="pass2" type="password" name="pass2" placeholder="retype password" />
            </div>
        </div>
        <input id="_csrf" type="hidden" name="_csrf" value={props.csrf} />
        <div className="field has-addons has-addons-right">
            <div className="control">
            <input className="button formSubmit" type="submit" value="Sign Up" />
            </div>
        </div>
    </form>
    );
}

const init = async () => {
    const response = await fetch('/getToken');
    const data = await response.json();

    const loginButton = document.getElementById('loginButton');
    const signupButton = document.getElementById('signupButton');

    loginButton.addEventListener('click', (e) => {
        e.preventDefault();
        ReactDOM.render(<LoginWindow csrf={data.csrfToken} />, document.getElementById('content'));
        return false;
    });

    signupButton.addEventListener('click', (e) => {
        e.preventDefault();
        ReactDOM.render(<SignupWindow csrf={data.csrfToken} />, document.getElementById('content'));
        return false;
    });

    ReactDOM.render(<LoginWindow csrf={data.csrfToken} />, document.getElementById('content'));
}

window.onload = init;