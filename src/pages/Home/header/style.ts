import styled from 'styled-components'

const Container = styled.header`
    /* background: white; */
    height: 125px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0px 6%;

    @media (max-width : 800px){
        height: auto;
        display: flex;
        flex-direction: column;
        padding: 0px 69px;
    }
`;

export const LogoIbav = styled.img`
    height: auto;
    width: auto;
    margin-top: 40PX;
    cursor: pointer;
    @media(max-width: 800px){
        width: auto;
        margin-top: -20px;
    }
`;

export const BtnLink = styled.a`
    font-size: 16px;
    color: #FFF;
    background: none;
    border: none;
    text-transform: uppercase;
    font-weight: 600;
    cursor: pointer;
    margin: 0px 30px;
    @media(max-width:800px){
        margin: 10px 0;
        font-size:16px;
        text-decoration: underline;
        text-align: center;
        margin-bottom: 20px;
    }
`;

export const DivBtn = styled.div`
    @media(max-width: 800px){
        display: flex;
        flex-direction: column;
        margin-bottom: 20px;
    }
`;

export const BtnSign = styled.button`
    font-size: 16px;
    color: white;
    border: none;
    background: #4c1568;
    font-weight: bold;
    text-transform: uppercase;
    padding: 12px 12px;
    margin-top: 10px;
    cursor: pointer;

    @media(max-width: 800px) {
        margin-bottom: 10px;
        font-size: 18px;
    }
`;

export default Container;