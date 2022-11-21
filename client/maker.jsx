const helper = require('./helper.js');

const handleTierlist = (e) => {
    e.preventDefault();
    helper.hideError();

    const title = e.target.querySelector('#tierlistTitle').value;
    const items = e.target.querySelector('#tierlistItems');
    const _csrf = e.target.querySelector('#_csrf').value;

    if(!title || items.children.length < 5){
        helper.handleError('List title, and at least 5 items are required!');
        return false;
    }

    const itemObjects = [];
    [...items.children].forEach(item => {
        if(!item.querySelector('input').value || !item.querySelector('select').value){
            helper.handleError('Each item must have a name and score!');
            return false;
        } else{
            let obj = {
                name: item.querySelector('input').value,
                score: item.querySelector('select').value
            }
            itemObjects.push(obj);
        }
    });

    helper.sendPost(e.target.action, {title, itemObjects, level, _csrf}, loadDomosFromServer);

    return false;
}

const createScoreSelect = () => {
    const select = document.createElement('select');
    select.id = `item${idNum}Score`;
    select.innerHTML = `
        <option value="">Item Score</option>
        <option value="6">S</option>
        <option value="5">A</option>
        <option value="4">B</option>
        <option value="3">C</option>
        <option value="2">D</option>
        <option value="1">F</option>
    `;

    return select;
}

const addItemInput = (e) => {
    const itemArea = e.target.querySelector('#items');
    let item = document.createElement('div');
    const name = document.createElement('input');
    name.type = "text";
    name.name = "name";
    name.placeholder = "Item Name";

    const score = createScoreSelect();

    item.appendChild(name);
    item.appendChild(score);
    itemArea.appendChild(item);
}

const tierlistForm = (props) => {
    return(
        <form id="tierlistForm"
            onSubmit={handleTierlist}
            name="tierlistForm"
            action="/makeList"
            method="POST"
            className="tierlistForm"
        >
            <label htmlFor="title">Title: </label>
            <input id="title" type="text" name="title" placeholder="List Name" />
            <div id="items">

            </div>
            <button id="addItem" onClick={addItemInput}>Add Item</button>
            <input className="makeDomoSubmit" type="submit" value="Update" />
        </form>
    );
}

const init = async() => {
    const response = await fetch('/getToken');
    const data = await response.json();

    ReactDOM.render(<tierlistForm csrf={data.csrfToken} />, document.getElementById('makeTierlist'));

    ReactDOM.render(<PassChangeForm csrf={data.csrfToken} />, document.getElementById('changePass'));

    ReactDOM.render(<DomoList domos={[]} />, document.getElementById('domos'));

    loadDomosFromServer();
}

window.onload = init;