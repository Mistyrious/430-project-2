const handleSearch = (e) => {

}

const SearchForm = (props) => {
    
}

const TrendingLists = (props) => {
    if(props.tierlists.length === 0){
        return(
            <div className="trendingLists">
                <h3 className="emptyLists">No Tierlists Yet!</h3>
            </div>
        );
    }

    const listNodes = props.tierlists.map(list => {
        return(
            <div key={domo._id} className="list">
                {/* <img src="/assets/img/domoface.jpeg" alt="domo face" className="domoFace" /> */}
                <h3 className="listTitle">Title: {list.title}</h3>
                <h3 className="listVotes">Votes: {list.votes}</h3>
                <h3 className="listCreator">Creator: {domo.level}</h3>
            </div>
        );
    });

    return(
        <div className="trendingLists">
            {listNodes}
        </div>
    );
}

const RecentLists = (props) => {
    if(props.tierlists.length === 0){
        return(
            <div className="recentLists">
                <h3 className="emptyLists">No Tierlists Yet!</h3>
            </div>
        );
    }

    const listNodes = props.tierlists.map(list => {
        return(
            <div key={domo._id} className="list">
                {/* <img src="/assets/img/domoface.jpeg" alt="domo face" className="domoFace" /> */}
                <h3 className="listTitle">Title: {list.title}</h3>
                <h3 className="listVotes">Votes: {list.votes}</h3>
                <h3 className="listCreator">Creator: {domo.level}</h3>
            </div>
        );
    });

    return(
        <div className="recentLists">
            {listNodes}
        </div>
    );
}

const loadListsFromServer = async() => {
    const response = await fetch('/getTierlists');
    const data = await response.json();
    ReactDOM.render(<TrendingLists lists={data.tierlists}/>, document.getElementById('trendingTierlists'));
    ReactDom.render(<RecentLists lists={data.tierlists}/>, document.getElementById('recentTierlists'));
}