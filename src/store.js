import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from 'redux-devtools-extension';

const initalState = {
    repos: { },
    current: "",
    loading: false,
    end: false,
};

function reducer (state = initalState, action) {

    switch (action.type) {
        case "UPDATE":
        return {
            ...state,
            repos: {
                ...state.repos,
                [action.payload.current]: {
                    items: [
                        ...(state.repos[action.payload.current]?.items || []),
                        ...(action.payload.repos[action.payload.current].items || [])
                    ],
                },
            },
            current: action.payload.current,
            end: action.payload.end,
        };
        case "GET":
        return {
            ...state,
            current: action.payload.current
        };
        case "LOADING":
        return {
            ...state,
            loading: action.payload.loading
        };
        default:
        return state;
    }
}

export const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));
