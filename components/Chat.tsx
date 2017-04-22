import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {Layout, Section} from 'classui/Components/Layout';
import {Form} from 'classui/Components/Form';
import {username, Socket} from './Socket';

interface IProps {};
interface IState {
	messages: any
};

class Chat extends React.Component<IProps, IState> {
	private input;
	private chatBox;
	private scroll;

	constructor() {
		super();
		this.sendMessage = this.sendMessage.bind(this);
		this.state = {messages: []};
		
		Socket.emit("chat", {action: "messages"});
		Socket.on("chat", (data)=>{
			switch(data.action) {
				case "messages": {
					this.setState({
						messages: data.messages
					});
					break;
				}
				case "message": {
					this.setState({
						messages: [
							...this.state.messages,
							data.message
						]
					});
					break;
				}
				case 'reset': {
					this.setState({
						messages: []
					});
				}
			}
		})
	}

	sendMessage() {
		let val = this.input.value;
		if (val.trim()==""){
			return;
		}
		this.input.value = "";
		Socket.emit("chat", {
			action: "message",
			from: username,
			message: val
		});
	}

	componentWillUpdate() {
		this.scroll = {
			top: this.chatBox.scrollTop+this.chatBox.clientHeight,
			height: this.chatBox.scrollHeight
		}
	}
	componentDidUpdate() {
		if (this.scroll.top==this.scroll.height){
			this.chatBox.scrollTop = this.chatBox.scrollHeight;
		}
	}

	render() {
		let messages = this.state.messages.map((msg)=>{
			return <div key={msg.key} style={{marginTop: 15}}>
				<div style={{marginBottom: 5}}><b>{msg.from} :</b></div>
				<div>{msg.message}</div>
			</div>;
		});
		return <Layout column width="100%" style={{height: "100%"}} justify="start">
			<Section nocard>
				<h4>Discussions</h4>
				<hr/>
			</Section>
			<Section nocard width="100%" r={(ref)=>{this.chatBox=ref;}} style={{padding: 10, flex: 1, overflow: 'auto'}}>
				{messages}
			</Section>
			<Section nocard width="100%">
				<Form onSubmit={this.sendMessage}>
					<input type='text' ref={(ref)=>{this.input=ref;}} style={{width: "100%"}}/>
				</Form>
			</Section>
		</Layout>;
	}
}

export default Chat;