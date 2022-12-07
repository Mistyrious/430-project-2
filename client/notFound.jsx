const NoteForm = (props) => {
    return(
        <h2 className="title is-4">{props.path} could not be found.</h2>
    );
}

const init = async() => {
    const path = window.location.pathname;

    ReactDOM.render(<NoteForm path={path} />, document.getElementById('notFoundMessage'));
}

window.onload = init;