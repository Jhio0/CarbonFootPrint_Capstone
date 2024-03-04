import {React, useState, useEffect} from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import './HomeStyles.css';

function Home() {

    const [input, setInput] = useState('');
    const [channelNames, setChannelNames] = useState(['test1', 'test2']);

    const addChannel = () => {
        setChannelNames([...channelNames]);
        setInput('');
    }

    return (
        <center>
        <div class='mainDiv'>
        <h1>Climate Chat</h1>
        <br />
        
        <div class='addChannel'>
            <input value ={input} onChange={event => setInput(event.target.value)} class='channelInput' placeholder= 'Enter the name'/>
            <button onClick = {addChannel}>Add Channel</button>
            <hr />
            <div class='channelList'>
        {/* {channelNames.map(channelName =>(<h5>{channelName}</h5>))} */

        //Figuring out how react routing works.
        <Router>
            <ul>
                <li>
                    {"/channelName"}
                </li>
            </ul>
        </Router>
        }
            </div>
         </div>
        </div>
        </center>
    );
}

export default Home;