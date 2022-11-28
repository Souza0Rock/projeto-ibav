import React from 'react'
import * as S from './style'
import SignIn from '../../../components/SignIn'

const Body = () => {

	return (
		<>
			<S.Container>
				<S.ContainerLeft>
					<S.DivImage>
						<S.LogoEvent src="../assets/convencao.png" />						
					</S.DivImage>
				</S.ContainerLeft>
				<S.ContainerRight>
					<SignIn />
				</S.ContainerRight>
			</S.Container>
		</>
	)
}

export default Body