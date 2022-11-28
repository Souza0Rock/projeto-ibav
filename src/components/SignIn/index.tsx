import React, { useState, useEffect } from "react";
import * as S from './styled'
import { Input } from "./styled";
import axios from "axios";
import InputMask from "react-input-mask";


const SignIn = () => {
	const [name, setName] = useState("")
	const [surname, setSurname] = useState("")
	const [tel, setTel] = useState("")
	const [church, setChurch] = useState("")
	const [sheperd, setSheperd] = useState("")
	const [email, setEmail] = useState("")
	const [city, setCity] = useState("")
	const [office, setOffice] = useState("")
	const [data, setData] = useState<any>([])
	const [whatLote, setWhatLote] = useState("")
	const [loading, setLoading] = useState<any>(true);
	const [dataPayment, setDataPayment] = useState<any>()
	const [validator, setValidator] = useState<any>([])
	const [listValid, setListValid] = useState<any>([])

	const saveData = () => {
		try {
			axios.post(url, {
				name,
				surname,
				tel,
				church,
				sheperd,
				city,
				office,
				email,
				status: 'ok'
			})
				.then(() => {
					if (whatLote === '1° Lote R$ 40,00') {
						window.location.href = 'https://mpago.la/1GuyTRq';
					}
					else if (whatLote === '2° Lote R$ 50,00') {
						window.location.href = 'https://mpago.la/29CTH6z';
					}
					else if (whatLote === '3° Lote R$ 60,00') {
						window.location.href = 'https://mpago.la/14bcJRV';
					}
					{
						alert("Sua inscrição será concluída após a confirmação do pagamento")
					}
				})
				.catch((error) => {
					alert("Preencha todos os campos para concluir a sua inscrição")
				})
		}
		catch (e) {
			throw new Error("Algo deu errado na conexão");
		}
	}

	const qtdMax = 190
	const url = `https://conferencia-radicais-default-rtdb.firebaseio.com/inscritos.json`

	useEffect(() => {
    axios.get(url).then((res) => {
      if (res.data) {
        setData(Object.entries(res.data))
        setLoading(false)
      }
    });
  }, [])

  const uri = 'https://api.mercadopago.com/v1/payments/search?sort=date_created&criteria=desc&description=Convenção Radicais Livres 2022&limit=50&status=approved'
  const uri2 = 'https://api.mercadopago.com/v1/payments/search?sort=date_created&criteria=desc&description=Convenção Radicais Livres 2022&limit=50&status=approved&offset=50'
  const uri3 = 'https://api.mercadopago.com/v1/payments/search?sort=date_created&criteria=desc&description=Convenção Radicais Livres 2022&limit=50&status=approved&offset=100'
  const uri4 = 'https://api.mercadopago.com/v1/payments/search?sort=date_created&criteria=desc&description=Convenção Radicais Livres 2022&limit=50&status=approved&offset=150'
  const encoded = encodeURI(uri)
  const encoded2 = encodeURI(uri2)
  const encoded3 = encodeURI(uri3)
  const encoded4 = encodeURI(uri4)

  const limit = 50
  useEffect(() => {
    axios.get(encoded, {
      headers: {
        Authorization: 'Bearer APP_USR-1739479935263753-060921-ebd0e354a27881d9c2444a96b0bdbb80-127832490'
      }
    })
      .then((response) => {
        setDataPayment(response.data.results)

        if (response.data.results.length === limit) {
          axios.get(encoded2, {
            headers: {
              Authorization: 'Bearer APP_USR-1739479935263753-060921-ebd0e354a27881d9c2444a96b0bdbb80-127832490'
            }
          })
            .then((response2) => {
              setDataPayment([...response.data.results, ...response2.data.results])

              if (response.data.results.length === limit) {
                axios.get(encoded3, {
                  headers: {
                    Authorization: 'Bearer APP_USR-1739479935263753-060921-ebd0e354a27881d9c2444a96b0bdbb80-127832490'
                  }
                })
                  .then((response3) => {
                    setDataPayment([...response.data.results, ...response2.data.results, ...response3.data.results])

                    if (response.data.results.length === limit) {
                      axios.get(encoded4, {
                        headers: {
                          Authorization: 'Bearer APP_USR-1739479935263753-060921-ebd0e354a27881d9c2444a96b0bdbb80-127832490'
                        }
                      })
                        .then((response4) => {
                          setDataPayment([...response.data.results, ...response2.data.results, ...response3.data.results, ...response4.data.results])
                        });
                    }
                  });
              }
            });
        }
      });

  }, [])

	useEffect(() => {
		const arrayEmailsAproved = dataPayment && dataPayment.map(item => {
			if (item.status === 'approved') {
				return item.payer.email.toLowerCase()
			}
			return ''
		})

		const filtrado = arrayEmailsAproved && arrayEmailsAproved.filter(item => {
			return item !== ''
		})

		const valid = dataPayment && dataPayment.map(item => {
			return item.payer.email
		})

		setValidator(filtrado)
		setListValid(valid)
	}, [dataPayment])

	const firstLote = new Date('June 25, 2022 23:59:59')
	const secondLote = new Date('July 24, 2022 23:59:59')
	const thirdLote = new Date('July 31, 2022 23:59:59')
	const today = new Date()

	useEffect(() => {
		axios.get(url)
			.then((res) => {
				if (res.data) {
					setData(Object.entries(res.data));
				}
			});
		if (firstLote >= today) {
			setWhatLote('1° Lote R$ 40,00')
		}
		else if (secondLote >= today) {
			setWhatLote('2° Lote R$ 50,00')
		}
		else if (thirdLote >= today) {
			setWhatLote('3° Lote R$ 60,00')
		}
		else {
			setWhatLote('Inscrições encerradas')
		}
	}, []);

	const Count = data.map((item: { name: any }[]) => item[1].name);

	return (
		<>
			{
				<S.ContainerRight>
					{validator ?
						<>
							<S.ModalSign>
								{qtdMax > validator?.length ?
									<>
										<S.Title Fsize={30}>
											Faça sua <strong>inscrição</strong> agora
										</S.Title>
										<S.Text>
											{whatLote}
										</S.Text>
										<S.Formulary>
											<div className="DivControl">
												<label>Nome:</label>
												<S.Input type="text" onChange={(e: any) => setName(e.target.value)} />
											</div>
											<div className="DivControl">
												<label>Sobrenome:</label>
												<S.Input type="text" onChange={(e: any) => setSurname(e.target.value)} />
											</div>
											<div className="DivControl">
												<label>Email:</label>
												<S.BoxInputText>
													<S.Input type="email" onChange={(e: any) => setEmail(e.target.value)} required />
												</S.BoxInputText>
												<S.DivTextEmail>
													<S.TextEmail>É extremamente importante usar o mesmo email que será usado no ato do </S.TextEmail>
													<S.TextEmail>pagamento para que seu pagamento seja confirmado</S.TextEmail>
												</S.DivTextEmail>
											</div>
											<S.DivInput>
												<div className="DivInput">
													<label>Telefone:</label>
													<S.Mask>
														<InputMask mask="(99)99999-9999" onChange={(e: any) => setTel(e.target.value)} />
													</S.Mask>
												</div>
												<div className="DivControl">
													<label>Cidade:</label>
													<S.Input
														type="text"
														onChange={(e: any) => setCity(e.target.value)}
														style={{width: '18rem'}}
													/>
												</div>
											</S.DivInput>
											<div className="DivControl">
												<label>pastor responsavel:</label>
												<S.Input
													type="text"
													onChange={(e: any) => setSheperd(e.target.value)}
												/>
											</div>
											<S.DivInput>
												<div className="DivInput">
													<label>igreja:</label>
													<S.Input
														required={true}
														type="text"
														onChange={(e: any) => setChurch(e.target.value)}
													/>
												</div>
												<div className="Select">
													<label>cargo:</label>
													<S.Select onChange={(e: any) => setOffice(e.target.value)}>
														<option>Selecione</option>
														<option value="Pastor">Pastor</option>
														<option value="Discipulador">Discipulador</option>
														<option value="Lider">Líder</option>
														<option value="Membro de celula">Membro de célula</option>
													</S.Select>
												</div>
											</S.DivInput>
										</S.Formulary>
										<S.TextEnd>Restam {qtdMax - validator.length} vagas</S.TextEnd>
										<S.ButtonSignUp
											onClick={() => {
												name && tel && church && sheperd && office && city
													? saveData()
													: alert("Preencha todos os campos para concluir a sua inscrição")
											}}
										>
											Inscreva-se
										</S.ButtonSignUp>
									</>
									: <S.TextFinal>Inscrições Encerradas</S.TextFinal>
								}
							</S.ModalSign>
						</>
						:
						<>
							<S.Loading >
								<img src="../assets/abc.gif" />
							</S.Loading >
						</>
					}
				</S.ContainerRight>
			}
		</>
	);
};

export default SignIn;
