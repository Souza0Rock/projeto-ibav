import React from 'react'
import { ContainerRight } from '../Home/container/style'
import SignIn from '../../components/SignIn'
import Header from '../Home/header'
import DivInfo, { DivGeneral, Container } from './styled'
import { createGlobalStyle } from 'styled-components'
import { FaRegCalendarAlt } from 'react-icons/fa'
import { BiTime } from 'react-icons/bi'
import { VscLocation } from 'react-icons/vsc'

const About = () => {
	return (
		<>
			<Header about={true} />
			<Container>
				<DivGeneral>
					<DivInfo>
						<FaRegCalendarAlt className="Icon" />
						<div>
							<h1>Data</h1>
							<h2>30/07/2022</h2>
						</div>
					</DivInfo>
					<DivInfo>
						<BiTime className="Icon"/>
						<div>
							<h1>horário</h1>
							<h2>09:00 ás 22:00</h2>
						</div>
					</DivInfo>
					<DivInfo>
						<VscLocation className="Icon"/>
						<div>
							<h1>local</h1>
							<h2>Ibav Ribeirão Pires</h2>
							<h2>Sujeito a alteração</h2>
						</div>
					</DivInfo>
				</DivGeneral>
				<ContainerRight>
					<SignIn />
				</ContainerRight>
			</Container>
		</>
	)
}

export default About;