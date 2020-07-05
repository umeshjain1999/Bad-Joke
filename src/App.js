import React , {useEffect , useReducer}from 'react';
import './App.css';

const initialState = {
    joke : '',
    buttonClick : false,
    loading : false,
    punchline : true
}

const App = () => {


/*useReducer here.......*/


const reducer = (state , action) => {
 switch (action.type) {
     case 'FETCHING_JOKE' :
         return {...state , joke : action.joke ,
                punchline : !state.punchline }
        
     case 'FETCH_ONE_MORE':
         return {...state ,buttonClick : !state.buttonClick}

     case 'LOADING':
         return {...state ,loading : !state.loading}
    default :
        return state
     
 }
}
const [jokeState , dispatch] = useReducer(reducer,initialState);


useEffect(
    () => {
        
        
        dispatch({type : 'LOADING'})
        let data = jokeApi('https://official-joke-api.appspot.com/jokes/random');
        data.then(
            (randomJoke) => {
                let badJoke = {
                    joke : randomJoke.setup,
                    punchline : randomJoke.punchline
                }
                dispatch({type : 'FETCHING_JOKE' , joke : badJoke.joke})

                setTimeout(()=>{    
                dispatch({type : 'FETCHING_JOKE' , joke : badJoke.punchline})
                },4000)

                dispatch({type : 'LOADING'})
                
                console.log(jokeState); 
            }
           
        ).catch((error) => {console.log(error)
        dispatch({type : 'LOADING'})
        dispatch({type : 'FETCHING_JOKE' , joke: 'Aww Sed some issue came up'})
        }
        )
   
        
        
    },[jokeState.buttonClick]
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
                    (jokeState.loading) ?  (
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
                    ):(
                        <p className="text">
                        {jokeState.joke}
                        </p>
                    )
                }



                {(jokeState.punchline)? ('') : (<p className="alert">Wait for the punchline</p>)}


                <button onClick = {() => {dispatch({type : 'FETCH_ONE_MORE'}) }}>
                    One more?
                </button>

            </div>
            
        </div>
    )
}

export default App;


