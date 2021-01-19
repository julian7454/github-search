import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import Loading from "./Loading";
import Skeleton from '@material-ui/lab/Skeleton';
import { getVideo } from './actions';

const Content = styled.main`
    padding: 60px 0 20px;
    margin: 0 auto;
    max-width: 720px;
    text-align: center;
    color: #555;
    background: #fff;
    min-height: 100%;
`;

const List = styled.ul`
    margin: 0 auto;
    padding: 0 10px;
    display: flex;
    list-style-type: none;
    flex-wrap: wrap;

    li {
        width: calc(100% / 2 - 20px);
        padding: 10px 5px;
        border-bottom: 1px solid rgb(233, 233, 233);

        a {
            display: flex;
            color: #555;
            text-decoration: none;
        }

        p {
            overflow: hidden;
            width: calc(100% - 165px);
            white-space: nowrap;
            text-overflow: ellipsis;
            padding-left: 15px;
            margin-top: 30px;
            text-align: left;
        }

        @media (max-width: 530px) {
            flex-basis: 100%;
        }


        img {
            width: 120px;
            object-fit: cover;
            border-radius: 6px;
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
    height: 50px;
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
        <>
            <Content>
                {!currentRepos?.length && <p>請輸入搜尋 repo 名稱</p>}
                <List>
                    {currentRepos?.map((item, index) => {
                        return (
                            <li key={index}>
                                <a href={item.html_url}
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    <img
                                        src={item.owner?.avatar_url}
                                        alt={item.full_name}
                                    />
                                    <p>{item.full_name}</p>
                                </a>
                            </li>
                        );
                    })}
                    {loading && <>
                        {[0, 1].map((item, index) => {
                            return (
                                <li key={index} style={{ display: 'flex' }}>
                                    <Skeleton variant="rect" width={120} height={120} />
                                    <p><Skeleton variant="text" width={100} height={20}/></p>
                                </li>
                            );
                        })}</>
                    }
                </List>
                <Flag ref={loadingRef} />
            </Content>
            {loading && <><Skeleton /><Loading /></>}
        </>
    );
};
