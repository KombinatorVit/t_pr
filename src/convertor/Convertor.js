import './convertor.css'
import {useEffect, useState} from "react";

export  function Convertor(props) {
    const [apiData, setApiData] = useState('');
    const [count, setCount] = useState(props.start);
    const [result, setResult] = useState(0);
    const [currentSign, setCurrentSign] = useState(null);

    const getResource = async (url) => {
        let res = await fetch(url);

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, received ${res.status}`);
        }

        return await res.json();
    };
    const getCharacter = async () => {
        const res = await getResource(
            "https://bank.gov.ua/NBUStatService/v1/statdirectory/exchangenew?json"
        );
        setApiData(res);

    };

    useEffect(() => {
        getCharacter();
    }, []);

    const updateCounterState = (e) => {
        setCount(e.target.value);
    };
    const resetCounter = () => {
        setResult(null);
        setCurrentSign(null);
    };

    const resultValue = (currency) => {
        const currentCurrency = apiData.filter((item) => item.cc === currency);

        const currentRate = currentCurrency[0].rate;

        const currentSign = () => {
            switch (currentCurrency[0].cc) {
                case "USD":
                    return "$";
                case "EUR":
                    return "€";
            }
        };

        const calculated = count / currentRate;

        setCurrentSign(currentSign);
        setResult(calculated.toFixed(2));
    };

    return (
        <div className="app">
            <div className="count">
                <span>Введите количество UAH:</span>
                <input type="text" onChange={updateCounterState} />
                <span>Введённое количество: {count}</span>
            </div>
            <div className="counter">
                {result} {currentSign}
            </div>
            <div className="controls">
                <button onClick={() => resultValue("USD")}>USD</button>
                <button onClick={() => resultValue("EUR")}>EUR</button>
                <button onClick={resetCounter}>Reset</button>
            </div>
        </div>
    );
};