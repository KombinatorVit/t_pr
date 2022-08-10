import './convertor.css'
import {useEffect, useState} from "react";

export  function Convertor() {
    const [curr, setCurr] = useState(0);
    const [input, setInput] = useState(0);
    const [currName, setCurrName] = useState("");
    const [items, setItems] = useState([]);

    useEffect(() => {
        fetch("https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json")
            .then((res) => res.json())
            .then((data) => setItems(data));
    }, []);

    function searchVal(name) {
        items.forEach((i) => {
            if (i.cc === name) {
                setCurr((input / i.rate).toFixed(1));
                setCurrName(i.cc);
            }
        });
    }

    function setInputValue({ target }) {
        const value = Number(target.value);
        setInput(value);
    }

    return (
        <div className="app">
            <div className="out">
                <div className="counter">
                    <input type="text" onChange={setInputValue} />
                    <span>UAN</span>
                </div>
                <div>=</div>
                <div className="counter">
                    {curr}
                    <span>{currName}</span>
                </div>
            </div>
            <div className="controls">
                <button onClick={() => searchVal("USD")}>USD</button>
                <button onClick={() => searchVal("EUR")}>EUR</button>
                <button onClick={() => searchVal("RUB")}>RUB</button>
                <button onClick={() => searchVal("DKK")}>DKK</button>
            </div>
        </div>
    );
}