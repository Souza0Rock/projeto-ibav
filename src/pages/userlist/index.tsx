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

if (typeof window !== 'undefined') {
  document.title = 'IBAV RP - Lista de inscritos'
}

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
    if (a[1].name.toLowerCase() < b[1].name.toLowerCase()) {
      return -1;
    } else {
      return 1;
    }
  });
  

  // Função que valida se a pessoa se cadastrou com o mesmo número de telefone e não deixa exibir em tela
  
  const map = listaDeInscritos?.map((item: { sheperd: any; status: any; name: any; surname: any; office: any; email: any; city: any; church: any; tel: any; 
  }[]) => {
    return {
    name:`${item[1]?.name} ${item[1].surname}`,
    tel: item[1].tel,
    office: item[1].office,
    sheperd: item[1].sheperd,
    church: item[1].church,
    city: item[1].city,
    email: item[1].email,
    status: item[1].status,
  }
})

  const noRepeat = map.filter(function (a: { name: any; }) {
    return !this[JSON.stringify(a.name).toLowerCase()] && (this[JSON.stringify(a.name).toLowerCase()] = true) 
  }, Object.create(null));
  
  // Função que não exibe lista de inscritos no header

  const teste = false
  console.log(noRepeat, 'teste');

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
                <TextList>Lista de inscritos ( {noRepeat && noRepeat.length} )</TextList>
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
                {noRepeat && noRepeat?.map((item: any) => {
                  return (
                    <>
                      <List>
                        <ListDescribe>{item?.name} </ListDescribe>
                        <ListDescribe>{item?.tel}</ListDescribe>
                        <ListDescribe display="none">
                          {item?.office}
                        </ListDescribe>
                        <ListDescribe display="none">
                          {item?.sheperd}
                        </ListDescribe>
                        <ListDescribe display="none">{item?.church}</ListDescribe>
                        <ListDescribe display="none">{item?.city}</ListDescribe>
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
