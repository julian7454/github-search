import React from "react";
import ReactDOM from "react-dom";
import { store } from "./store";
import { Provider } from "react-redux";
import Items from "./Items";
import Search from "./Search";
import "./styles.css";

function App() {
    return (
        <Provider store={store}>
            <Search />
            <Items />
        </Provider>
    );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
