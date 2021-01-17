import React, { useState, useRef } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
let timer = null;

const Nav = styled.nav`
    background: #ff0110;
    padding: 5px;
    text-align: center;
`;

const Search = styled.input.attrs({
  type: "search"
})`
    background: transparent;
    border: 0;
    color: #fff;
    border-bottom: 2px solid #fff;
`;

const Button = styled.button`
    background: transparent;
    border: 0;
    color: #fff;
`;

export const getVideo = (word, limit, ref = "", page = 1) => {
    return (dispatch) => {
        if (!word) return
        dispatch({ type: "LOADING", payload: { loading: true } });

        return fetch(
            `https://api.github.com/search/repositories?q=${word}&page=${page}&per_page=${limit}`
        )
        .then((res) => res.json())
        .then((json) => {
            dispatch({ type: "LOADING", payload: { loading: false } });
            if (!word) return;
            if (ref && ref.current.value !== word) return;

            dispatch({
                type: "UPDATE",
                payload: {
                    repos: {
                        [word]: { items: json.items },
                    },
                    current: word,
                    end: json?.items.length ? false : true,
                }
            });
        });
    };
};

export default () => {
    const dispatch = useDispatch();
    const { repos } = useSelector((state) => ({
        repos: state.repos
    }));
    const [data, setData] = useState("");
    const inputEl = useRef(null);
    const search = (word) => {
        return (dispatch) => {
            if (timer) {
                clearTimeout(timer);
            }

            if (word in repos) {
                dispatch({
                    type: "GET",
                    payload: {
                        current: word
                    }
                });

                return;
            }

            timer = setTimeout(() => {
                dispatch(getVideo(word, 10, inputEl));
            }, 1000);
        };
    };

    return (
        <Nav>
        <Search
            ref={inputEl}
            value={data}
            onChange={(e) => setData(e.target.value)}
            onInput={(e) => dispatch(search(e.target.value))}
        />
        <Button onClick={() => dispatch(search(data))}>search</Button>
        </Nav>
    );
};
