import {React} from 'react'

function Home() {
    return (
        <center>
        <div class='main'>
        <h1>Climate Chat</h1>
        <br />
        <div class='addChannel'>
            <input class='channelInput' placeholder='Enter the name of the channel.' />
            <button>Add Channel</button>
            <hr />
            <div class='channelList'>
            <h5>Test</h5>
            </div>
         </div>
        </div>
        </center>
    );
}

export default Home;