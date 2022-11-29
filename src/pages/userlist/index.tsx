import React, { useState, useEffect } from "react";
import axios from "axios";
import DivGeneral, {
  ModalSignUp,
  DivName,
  List,
  DivList,
  // TextInformation,
  DivTextInformation,
  Loading,
  Describe,
  ListDescribe,
  TextList
} from "./userlist.styled";
import Header from "../Home/header";
// import { normalizeRepeatedSlashes } from "next/dist/shared/lib/utils";

const UserList = (Data) => {
  const [loading, setLoading] = useState<any>(true);
  const [data, setData] = useState<any>([]);
  // const [dataPayment, setDataPayment] = useState<any>([])
  // const [validator, setValidator] = useState<any>([])
  // const [listValid, setListValid] = useState<any>([])

  const url = `https://ibav-culto-default-rtdb.firebaseio.com/data.json`

  useEffect(() => {
    axios.get(url).then((res) => {
      if (res.data) {
        setData(Object.entries(res.data))
        setLoading(false)
      }
    });
  }, [])

  // useEffect(() => {
  //   const arrayEmailsAproved = dataPayment && dataPayment.map(item => {
  //     if (item.status === 'approved') {
  //       return item.payer.email.toLowerCase()
  //     }
  //     return ''
  //   })
  //   const filtrado = arrayEmailsAproved && arrayEmailsAproved.filter(item => {
  //     return item !== ''
  //   })

  //   const valid = dataPayment && dataPayment.map(item => {
  //     return item.payer.email
  //   })

  //   setValidator(filtrado)
  //   setListValid(valid)
  // }, [dataPayment])

  const Count = data.map((item: { name: any }[]) => item[1].name);let listaDeInscritos = data.filter((item: any) => {
    return item[1].status === 'ok'
  })

  // const listaDeEspera = data.filter((item: any) => {
  //   return item[1].status === 'lista-espera'
  // })

  // Função que transforma a lista em ordem alfabética
  
  listaDeInscritos?.sort(function (a, b) {
    if (a[1].name < b[1].name) {
      return -1;
    } else {
      return 1;
    }
  });

  // Função que valida se a pessoa se cadastrou com o mesmo número de telefone e não deixa exibir em tela
  // const validatePayment = listaDeInscritos.filter(function (a) {
  //   return !this[JSON.stringify(a[1].tel)] && (this[JSON.stringify(a[1].tel)] = true)
  // }, Object.create(null))


  let teste1 = listaDeInscritos.filter((item: { name: any; }[]) => {
    listaDeInscritos = listaDeInscritos?.find((item2: { tel: any; }[]) =>{
if(item2[1].tel && item[1].name){
// console.log('dsajdklasdlkaj')
}
    })
  })


// Função que oculta "lista de incritos do header"

  const teste = false

  return (
    <>
      <Header about={true} teste={teste} />
      <DivGeneral>
        {loading ? (
          <Loading>
            <img src="../assets/abc.gif" />
          </Loading>
        ) : (
          <>
            <ModalSignUp>
              <DivTextInformation>
                <TextList>Lista de inscritos ( {data && data.length} )</TextList>
                {/* <TextInformation>Para pagamentos em boleto, espere até 3 dias úteis para a confirmação do pagamento</TextInformation> */}
              </DivTextInformation>
              <DivList>
                <DivName>
                  <Describe>Nome</Describe>
                  <Describe>Telefone</Describe>
                  <Describe display="none">Cargo</Describe>
                  <Describe display="none">Pastor</Describe>
                  <Describe display="none">Igreja</Describe>
                  <Describe display="none">Cidade</Describe>
                </DivName>
                {data?.map((item: any) => {

                  return (
                    <>
                      <List>
                        <ListDescribe>{item[1].name} {item[1].surname}</ListDescribe>
                        <ListDescribe>{item[1].tel}</ListDescribe>
                        <ListDescribe display="none">
                          {item[1].office}
                        </ListDescribe>
                        <ListDescribe display="none">
                          {item[1].sheperd}
                        </ListDescribe>
                        <ListDescribe display="none">{item[1].church}</ListDescribe>
                        <ListDescribe display="none">{item[1].city}</ListDescribe>
                      </List>
                    </>
                  );
                })}
              </DivList>
            </ModalSignUp>
          </>
        )}
      </DivGeneral>
    </>
  );
};

export default UserList;
