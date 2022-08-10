import './convertor.css'
import {useEffect, useState} from "react";

export  function Convertor(props) {
    const [dateCurrency, setDateCurrency] = useState();
    const [selectedCurrency, setCelectedCurrency] = useState("USD");
    const [exchangeRate, setExchangeRate] = useState();
    const [moneyForTransfer, setMoneyForTransfer] = useState(100);
    const [result, setResult] = useState();

    const getRequest = async (url) => {
        const respons = await fetch(url);
        const data = await respons.json();
        setDateCurrency(data.Valute);
    };

    useEffect(() => {
        getRequest("https://www.cbr-xml-daily.ru/daily_json.js");
    }, []);

    useEffect(() => {
        getCurrency(selectedCurrency);
    });

    const getCurrency = (key) => {
        for (const prop in dateCurrency) {
            if (prop === key) {
                setExchangeRate(dateCurrency[prop].Value);
            }
        }
        setCelectedCurrency(key);
        setResult((moneyForTransfer / exchangeRate).toFixed(2));
    };

    const getValueInput = (value) => {
        setMoneyForTransfer(value);
    };

    return (
        <div className="app">
            <div className="text">
                <div>У меня есть:</div>
                <input
                    className="value"
                    defaultValue={moneyForTransfer}
                    onChange={(e) => getValueInput(+e.target.value)}
                />
                <div className="text">РУБЛЕЙ</div>
            </div>
            <div className="text">Хочу приобрести:</div>
            <div className="controls">
                <button onClick={() => getCurrency("USD")}>USD</button>
                <button onClick={() => getCurrency("EUR")}>EUR</button>
                <button onClick={() => getCurrency("GBP")}>GBP</button>
                <button onClick={() => getCurrency("JPY")}>JPY</button>
            </div>
            <div className="counter">{result + " " + selectedCurrency}</div>
        </div>
    );
};

