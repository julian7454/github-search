import React from "react";
import styled from "styled-components";

const Container = styled.div`
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 3;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.2);
`;

const Loading = styled.span`
    position: relative;
    width: 12px;
    height: 12px;
    animation: rotate 1s ease-in-out infinite;

    @keyframes rotate {
        from {
        transform: rotate(0);
        }

        to {
        transform: rotate(360deg);
        }
    }
`;

const Point = styled.span`
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;

    &:nth-child(1) {
        transform: rotate(0deg) translate(200%, 0);
    }
    &:nth-child(2) {
        transform: rotate(72deg) translate(200%, 0);
    }
    &:nth-child(3) {
        transform: rotate(144deg) translate(200%, 0);
    }
    &:nth-child(4) {
        transform: rotate(216deg) translate(200%, 0);
    }
    &:nth-child(5) {
        transform: rotate(288deg) translate(200%, 0);
    }

    &::after {
        content: "";
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background: #ff0110;
        border-radius: 50%;
        animation: scale 0.5s ease infinite alternate;
    }

    @keyframes scale {
        from {
        transform: scale(0.5);
        }

        to {
        transform: scale(1);
        }
    }
`;

export default function LoadingCycle() {
    return (
        <Container>
        <Loading>
            <Point />
            <Point />
            <Point />
            <Point />
            <Point />
        </Loading>
        </Container>
    );
}
