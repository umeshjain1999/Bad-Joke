import React , {useState , useEffect}from 'react';
import './App.css';



const App = () => {

const [joke , setjoke] = useState('');
const [change , setchange] = useState(false);
const [loading , setloading] = useState(false);
const [punchline , setpunchline] = useState(false);


useEffect(
    () => {
        setloading(false);
        let data = jokeApi('https://official-joke-api.appspot.com/jokes/random');
        data.then(
            (randomJoke) => {
                let badJoke = {
                    joke : randomJoke.setup,
                    punchline : randomJoke.punchline
                }
                setjoke(badJoke.joke)
                setpunchline(false);
                setTimeout(()=>{
                setjoke(badJoke.punchline)

                setpunchline(true)

                },4000)

                setloading(true);
                
            }
        ).catch((error) => {console.log(error)
        setjoke('Aww Sed some issue came up')}
        )
        
    },[change]
)


const jokeApi = async (endpoint) => {
    const response = await fetch(endpoint);
    const data = response.json();
    return data;
}


    return (
        <div className = 'main'>
            <div className = 'content'>

                {
                    (loading) ? (
                        <p className="text">
                        {joke}
                        </p>
                    ): (
                        /*<!-- By Sam Herbert (@sherb), for everyone. More @ http://goo.gl/7AJzbL -->*/
                        <svg width="38" height="38" viewBox="0 0 38 38" xmlns="http://www.w3.org/2000/svg">
                            <defs>
                                <linearGradient x1="8.042%" y1="0%" x2="65.682%" y2="23.865%" id="a">
                                    <stop stopColor="#192a56" stopOpacity="0" offset="0%"/>
                                    <stop stopColor="#192a56" stopOpacity=".631" offset="63.146%"/>
                                    <stop stopColor="#192a56" offset="100%"/>
                                </linearGradient>
                            </defs>
                            <g fill="none" fillRule="evenodd">
                                <g transform="translate(1 1)">
                                    <path d="M36 18c0-9.94-8.06-18-18-18" id="Oval-2" stroke="url(#a)" strokeWidth="2">
                                        <animateTransform
                                            attributeName="transform"
                                            type="rotate"
                                            from="0 18 18"
                                            to="360 18 18"
                                            dur="0.9s"
                                            repeatCount="indefinite" />
                                    </path>
                                    <circle fill="#fff" cx="36" cy="18" r="1">
                                        <animateTransform
                                            attributeName="transform"
                                            type="rotate"
                                            from="0 18 18"
                                            to="360 18 18"
                                            dur="0.9s"
                                            repeatCount="indefinite" />
                                    </circle>
                                </g>
                            </g>
                        </svg>
                    )
                }



                {(punchline)? ('') : (<p className="alert">Wait for the punchline</p>)}


                <button onClick = {() => setchange(change => !change)}>
                    One more?
                </button>

            </div>
            
        </div>
    )
}

export default App;


