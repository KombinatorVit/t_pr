import {useState} from 'react';
import './App.css';
import {Slider} from "./slider/Slider";
import {Convertor} from "./convertor/Convertor";


const App = (props) => {
    const [counter, setCounter] = useState(props.counter);

    const incCounter = () => {
        if (counter < 50) {
            setCounter(counter => counter + 1)
        }
    }

    const decCounter = () => {
        if (counter > -50) {
            setCounter(counter => counter - 1)
        }
    }

    const rndCounter = () => {
        setCounter(+(Math.random() * (50 - -50) + -50).toFixed(0))
    }

    const resetCounter = () => {
        setCounter(props.counter)
    }

    return (
        <div className="app">
            <div className="counter">{counter}</div>
            <div className="controls">
                <button onClick={incCounter}>INC</button>
                <button onClick={decCounter}>DEC</button>
                <button onClick={rndCounter}>RND</button>
                <button onClick={resetCounter}>RESET</button>
            </div>
            <Slider/>
            <Convertor  />
        </div>
    )
}



export default App;


