import React, { useState, useRef } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
let timer = null;
import githubImg from './github-1.svg';
import { getVideo } from './actions';

const Nav = styled.nav`
    background-color: rgb(0, 106, 166);
    background-image: url(${githubImg});
    background-size: 30px;
    background-repeat: no-repeat;
    background-position: 15px center;
    padding: 5px 0;
    text-align: center;
    height: 48px;
    position: fixed;
    width: 100%;
    top: 0;
    z-index: 1;
`;

const Search = styled.input.attrs({
  type: "search"
})`
    background: transparent;
    border: 0;
    color: #fff;
    border-bottom: 1px solid rgba(255, 255, 255, .5);
    height: 35px;
    width: 40%;
    background: rgb(0, 88, 138);
`;

const Button = styled.button`
    padding: 0 15px;
    background: transparent;
    border: 0;
    color: #fff;
    border: 1px solid rgb(0, 88, 138);
    border-radius: 0px 4px 4px 0px;
    height: 35px;
`;

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
                dispatch(getVideo(word, 30, inputEl));
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
