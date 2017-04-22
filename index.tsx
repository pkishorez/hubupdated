import * as React from 'react';
import * as ReactDOM from 'react-dom';
import ClassUI from 'classui/ClassUI';
import NavBar from 'classui/Components/Navbar';
import Content from 'classui/Components/Content';
import {Layout, Section} from 'classui/Components/Layout';
import {Form} from 'classui/Components/Form';
import Chat from './components/Chat';

ReactDOM.render(<ClassUI contentWidth={1200}>
		<NavBar logo="Alumnies">
		</NavBar>
		<Content style={{height: "100%"}}>
			<Layout style={{height: "100%"}} gutter={20} align="start" justify="start">
				<Section width="75%" style={{height: "100%"}}>
					<input type="button" value="fullscreen" onClick={
						(e) => {
							document.documentElement.webkitRequestFullscreen();
						}
					}/>
				</Section>
				<Section width="25%" style={{height: "100%"}}>
					<Chat />
				</Section>
			</Layout>
		</Content>
	</ClassUI>,
	document.getElementById('app')
);