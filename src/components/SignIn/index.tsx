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
	const [loading, setLoading] = useState<any>(true);

	const saveData = () => {
		if (name && tel && church && sheperd && office && city){
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
			.then(() => window.location.href = "/userlist.html")
		}
		catch (e) {
			throw new Error("Algo deu errado na conexão");
		}
	}else {
		alert("Preencha todos os campos")
	}
	}

	const qtdMax = 200
	const url = `https://ibav-culto-default-rtdb.firebaseio.com/data.json`

	useEffect(() => {
    axios.get(url).then((res) => {
		if (res.data) {
			setData(Object.entries(res.data))
			setLoading(false)
		}
    });
}, [])

	const map = data?.map((item: { sheperd: any; status: any; name: any; surname: any; office: any; email: any; city: any; church: any; tel: any; 
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

	useEffect(() => {
		axios.get(url)
			.then((res) => {
				if (res.data) {
					setData(Object.entries(res.data));
				}
			});
	}, []);

	console.log(noRepeat, 'no repeat');
	
	return (
		<>
			{
				<S.ContainerRight>
					{data ?
						<>
							<S.ModalSign>
								{qtdMax > data?.length ?
									<>
										<S.Title Fsize={30}>
											Faça sua <strong>inscrição</strong> agora
										</S.Title>
										{/* <S.Text>
											{whatLote}
										</S.Text> */}
										<S.Formulary>
											<div className="DivControl">
												<label>Nome:</label>
												<S.Input type="text" onChange={(e: any) => setName(e.target.value)} required={true} />
											</div>
											<div className="DivControl">
												<label>Sobrenome:</label>
												<S.Input type="text" onChange={(e: any) => setSurname(e.target.value)} required={true} />
											</div>
											<div className="DivControl">
												<label>Email:</label>
												<S.BoxInputText>
													<S.Input type="email" onChange={(e: any) => setEmail(e.target.value)} required={true} />
												</S.BoxInputText>
												{/* <S.DivTextEmail>
													<S.TextEmail>É extremamente importante usar o mesmo email que será usado no ato do </S.TextEmail>
													<S.TextEmail>pagamento para que seu pagamento seja confirmado</S.TextEmail>
												</S.DivTextEmail> */}
											</div>
											<S.DivInput>
												<div className="DivInput">
													<label>Telefone:</label>
													<S.Mask>
														<InputMask mask="(99)99999-9999" onChange={(e: any) => setTel(e.target.value)} required={true} className="Input-tel" />
													</S.Mask>
												</div>
												<div className="DivControl">
													<label>Cidade:</label>
													<S.Input
														type="text"
														onChange={(e: any) => setCity(e.target.value)}
														required={true}
														className="Input-width"
													/>
												</div>
											</S.DivInput>
											<div className="DivControl">
												<label>pastor responsavel:</label>
												<S.Input
													type="text"
													onChange={(e: any) => setSheperd(e.target.value)}
													required={true}
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
										<S.TextEnd>Restam {qtdMax - noRepeat.length} vagas</S.TextEnd>
										<S.ButtonSignUp
											onClick={() => saveData()}
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
