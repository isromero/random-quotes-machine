function App(){

    const [quotes, setQuotes] = React.useState([]);
    const [randomQuotes, setRandomQuotes] = React.useState([]);

    React.useEffect(() => {
        async function fetchData(){
            const response = await fetch("https://type.fit/api/quotes");
            const data = await response.json();
            setQuotes(data);
            let randomNum = Math.floor(Math.random() * data.length);
            setRandomQuotes(data[randomNum]);
        }
        fetchData();
    }, []);
    function getRandomColor() {
        // Generar valores RGB aleatorios entre 0 y 255
        var r = Math.floor(Math.random() * 256);
        var g = Math.floor(Math.random() * 256);
        var b = Math.floor(Math.random() * 256);
  
        // Crear el string del color en formato RGB
        var color = 'rgb(' + r + ',' + g + ',' + b + ')';
  
        return color;
    }
    return(
        <div className="container">
            <div id="quote-box" className="card">
                <div className="card-body">
                    {randomQuotes ? (
                        <div>
                            <p id="text">{randomQuotes.text}</p>
                            <p id="author">- {randomQuotes.author || "Unknown"}</p>
                        </div>
                    ) : (
                        "Loading..."
                    )}
                    <div className="row">
                        <a href={`https://twitter.com/intent/tweet?text=${randomQuotes.text}`} target="_blank" id="tweet-quote" className="btn">
                            <i className="fab fa-twitter"></i>
                        </a>
                        <a href={`https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=quotes&caption=${randomQuotes.author}&content=${randomQuotes.text}&canonicalUrl=https%3A%2F%2Fwww.tumblr.com%2Fbuttons&shareSource=tumblr_share_button`} target="_blank" id="tumblr-quote" className="btn">
                            <i className="fab fa-tumblr"></i>
                        </a>
                        <button className="btn" id="new-quote" onClick={() => {
                            let randomNum = Math.floor(Math.random() * quotes.length);
                            let randomColor = getRandomColor();
                            document.body.style.backgroundColor = randomColor;
                            document.getElementById("text").style.color = randomColor;
                            document.getElementById("author").style.color = randomColor;
                            document.getElementById("new-quote").style.backgroundColor = randomColor;
                            document.getElementById("tweet-quote").style.backgroundColor = randomColor;
                            document.getElementById("tumblr-quote").style.backgroundColor = randomColor;
                            setRandomQuotes(quotes[randomNum]);
                        }}>New Quote</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

ReactDOM.render(<App />, document.getElementById('root'));