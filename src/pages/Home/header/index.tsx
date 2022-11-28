import React from "react";
import Container, { LogoIbav, BtnLink, DivBtn, BtnSign } from "./style";
interface Props {
  about?: boolean;
}

const Header = ({ about }: Props) => { 

  return (
    <Container>
      <a href="/"><LogoIbav src='../assets/radicaisbco.png'/></a>
      <DivBtn>
        <BtnLink href= "/about.html">
          Sobre a convenção Radicais Livres
        </BtnLink>
        <BtnLink href="/userlist.html">
          Lista de inscritos
        </BtnLink>
        {about == true && (
          <BtnSign onClick={ () => window.location.href ='/'}>
            Inscreva-se
          </BtnSign>
        )}
      </DivBtn>
    </Container>
  );
};

export default Header;
