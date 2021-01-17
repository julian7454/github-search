import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { getVideo } from "./Search";
import Loading from "./Loading";

const Content = styled.main`
    padding: 0 20px;
    display: flex;
    margin: 0 auto;
    max-width: 520px;
    min-height: 300px;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;

const List = styled.ul`
    margin: 0 auto;
    padding-left: 0;
    display: flex;
    list-style-type: none;
    flex-wrap: wrap;

    li {
        padding: 5px;
        flex-basis: 250px;

        p {
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            width: 200px;
        }
        @media (max-width: 530px) {
            flex-basis: 45%;
            p {
                width: 150px;
            }
        }
        @media (max-width: 375px) {
            flex-basis: 80%;
            p {
                width: 300px;
            }
        }

        img {
            width: 100%;
            object-fit: cover;
        }
    }
`;

const Button = styled.button`
    border: none;
    background: transparent;
    color: #555;

    &.active {
        background: #ff0110;
        color: #fff;
        border-radius: 50%;
    }
`;

const Flag = styled.div`
    height: 300px;
`;

export default () => {
    const dispatch = useDispatch();
    const loadingRef = useRef(null);
    const [inView, setInView] = useState(false);
    const [scrolled, setScrolled] = useState(0);
    const { repos, current, loading, end } = useSelector((state) => ({
        repos: state.repos,
        current: state.current,
        loading: state.loading,
        end: state.end,
    }));

    const limit = 10;
    let currentRepos = repos[current]?.items;

    useEffect(() => {
        const options = {
            rootMargin: "0px 0px 200px 0px",
            threshold: 1.0
        };

        let observer = new IntersectionObserver(
            (entry) => {
                if (entry[0].isIntersecting) {
                    setInView(true);
                }
            },
            options
        );

        observer.observe(loadingRef.current);
    }, []);

    useEffect(() => {
        if (inView) {
            setScrolled(scrolled + 1);
        }
        setInView(false);
    }, [inView]);

    useEffect(() => {
        //console.log(end)
        if (end) return;
        dispatch(getVideo(current, 10, '', scrolled));
    }, [scrolled, end]);

    return (
        <div>
            <Content>
                <List>
                    {currentRepos?.map((item, index) => {
                        return (
                        <li key={index}>
                            <a href={item?.html_url}>
                                <img src={item?.owner?.avatar_url} />
                                <p>{item?.full_name}</p>
                            </a>
                        </li>
                        );
                    })}
                </List>
                {!currentRepos?.length && <p>請輸入搜尋 repo 名稱</p>}
            </Content>
            <Flag ref={loadingRef} />
            {loading && <Loading />}
        </div>
    );
};
