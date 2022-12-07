const helper = require('./helper.js');

const handleNote = (e) => {
    e.preventDefault();
    helper.hideError();

    const title = e.target.querySelector('#noteTitle').value;
    const location = e.target.querySelector('#noteLocation').value;
    const body = e.target.querySelector('#noteBody').value;
    const finishDate = e.target.querySelector('#noteFinishDate').value;
    const _csrf = e.target.querySelector('#_csrf').value;

    if(!title){
        helper.handleError('Note title is required!');
        return false;
    }

    helper.sendPost(e.target.action, {title, location, body, finishDate, _csrf}, loadNotesFromServer);

    return false;
}

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
        <div className="modal" id="passChangeModal">
            <div className="modal-background"></div>
            <div className="modal-card">
                <div className="modal-card-body">
                    <form id="changePassForm"
                        onSubmit={handlePassChange}
                        name="changePassForm"
                        action="/changePass"
                        method="POST"
                        className="passForm"
                    >
                        <div className="field">
                            <label className="label" htmlFor="oldPass">Current Password: </label>
                            <div className="control">
                                <input className="input"id="oldPass" type="password" name="oldPass" placeholder="password" />
                            </div>
                        </div>
                        <div className="field">
                            <label className="label" htmlFor="pass">New Password: </label>
                            <div className="control">
                                <input className="input" id="pass" type="password" name="pass" placeholder="password" />
                            </div>
                        </div>
                        <div className="field">
                            <label className="label" htmlFor="pass2">Confirm New Password: </label>
                            <div className="control">
                                <input className="input" id="pass2" type="password" name="pass2" placeholder="password" />
                            </div>
                        </div>
                        <input id="_csrf" type="hidden" name="_csrf" value={props.csrf} />
                        <div className="field has-addons has-addons-right">
                            <div className="control">
                                <input className="button makeNoteSubmit" type="submit" value="Update" />
                            </div>
                        </div>
                    </form>    
                </div>
            </div>
            <button className="modal-close is-large" id="modalCloser"></button>
        </div>
    );
}

const NoteForm = (props) => {
    return(
        <form id="noteForm"
            onSubmit={handleNote}
            name="noteForm"
            action="/makeNote"
            method="POST"
            className="form noteForm"
        >
            <div className="field">
                <label className="label is-medium" htmlFor="title">Title: </label>
                <div className="control">
                    <input className="input is-medium" id="noteTitle" type="text" name="title" maxLength="25" placeholder="Note Title" required/>
                </div>
            </div>
            <div className="field is-grouped">
                <label className="label" htmlFor="location">Location: </label>
                <div className="control">
                    <input className="input" id="noteLocation" type="text" name="location" placeholder="Location" />
                </div>
                <label className="label" htmlFor="finishDate">Finish Date: </label>
                <div className="control">
                    <input className="input" id="noteFinishDate" type="datetime-local" name="finishDate" />
                </div>
            </div>
            <div className="field">
                <label className="label" htmlFor="body">Note Body: </label>
                <div className="control">
                    <textarea className="textarea" id="noteBody" name="body" rows="5" cols="25" placeholder="Note Body"/>
                </div>
            </div>
            <input id="_csrf" type="hidden" name="_csrf" value={props.csrf} />
            <div className="field has-addons has-addons-right">
                <div className="control">
                    <input className="button makeNoteSubmit" type="submit" value="Create Note" />
                </div>
            </div>
        </form>
    );
}

const NoteList = (props) => {
    if(props.notes.length === 0){
        return(
            <div className="noteList">
                <h3 className="title is-4 has-text-centered emptyNote">No Notes Yet!</h3>
            </div>
        );
    }

    const noteNodes = props.notes.map(note => {
        let date = new Date(note.finishDate).toTimeString();
        return(
            <div key={note._id} className="note block has-background-warning-light">
                <div className="noteHeader is-flex is-flex-direction-row is-justify-content-space-between">
                    <h2 className="noteTitle title is-4 is-underlined">{note.title}</h2>
                    <button className="button is-success deleteNoteButton">
                    <span> ✔ </span>
                    </button>
                </div>
                <div className="noteSubheader is-flex is-flex-direction-row is-justify-content-space-between">
                    <h3 className="noteLocation m-1"><b>Location:</b> {note.location}</h3>
                    <h3 className="noteFinishDate m-1"><b>Finish Date:</b> {date}</h3>
                </div>
                <p className="noteBody"><b>Body:</b> {note.body}</p>
            </div>
        );
    });

    return(
        <div className="noteList is-flex is-flex-direction-row is-flex-wrap-wrap">
            {noteNodes}
        </div>
    );
}

const deleteNote = async(e) => {
    let title = e.target.querySelector('.noteTitle').innerText;

    await helper.sendPost('/deleteNote', {title});

    loadNotesFromServer();
}

const loadNotesFromServer = async() => {
    const response = await fetch('/getNotes');
    const data = await response.json();
    ReactDOM.render(<NoteList notes={data.notes}/>, document.getElementById('notes'));

    const deleteButtons = document.querySelectorAll('.deleteNoteButton');

    //this is not the right way to do this but it's one of the last things
    //i progressed to before running out of time so i shoved it here unfinished
    deleteButtons.forEach( (button) => {
        button.addEventListener('click', (e) => {
            deleteNote(e);
        });
    } )
}

const init = async() => {
    const response = await fetch('/getToken');
    const data = await response.json();

    const changePassButton = document.getElementById('changePassButton');
    const createListButton = document.getElementById('createListButton');

    changePassButton.addEventListener('click', () => {
        document.getElementById('passChangeModal').classList.add('is-active');
    });

    createListButton.addEventListener('click', () => {
        ReactDOM.render(<NoteForm csrf={data.csrfToken} />, document.getElementById('makeNote'));
    });

    ReactDOM.render(<PassChangeForm csrf={data.csrfToken} />, document.getElementById('changePass'));

    const closeModal = document.getElementById('modalCloser');
    closeModal.addEventListener('click', () => {
        document.getElementById('passChangeModal').classList.remove('is-active');
    })

    ReactDOM.render(<NoteList notes={[]} />, document.getElementById('notes'));

    loadNotesFromServer();
}

window.onload = init;