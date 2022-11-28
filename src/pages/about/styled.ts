import styled from 'styled-components'

const DivInfo = styled.div`
    display: flex;
    align-items: center;
    color: white;
    text-transform: uppercase;
    margin: 70px 0 20px 70px;
    @media (max-width: 768px) {        
        display: flex;
        margin-right: 10%;
        margin-top: 1%;
        margin-bottom: 20%;
        text-align: start;
        align-items: flex-start;
        margin: 0px 0px 40px 20px
    }
    h1 {
        margin: 0;
        color: #fff;    
    }

    h2 {
        margin: 0;
        color: #fff;    
    }
    .Icon {
        font-size: 60px;
        margin-right: 10px;
        color: #fff;    
    }
		@media(max-width: 800px) {
    :last-child{
        margin-bottom: 80px;
        margin-left: 10px;
    }
    :nth-child(2){
        margin-left: 16px;
    }
	}
`;

export const DivGeneral = styled.div`
    display: flex;
    flex-direction: column;
    @media(max-width: 800px){
        align-items: flex-start;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
        text-align: left;

    }
`;

export const Container = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 0px 50px;
    width: 100%;
    margin: 40px 0;
    @media(max-width: 800px){
        flex-direction: column;
        padding: 0px 0px;
    }
`;

export default DivInfo;