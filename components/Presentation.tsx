import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {Socket} from './Socket';

interface IProps {};
interface IState {
	image: number
};

class Presentation extends React.Component<IProps, IState> {
	constructor() {
		super();
		this.state = {
			image: 1
		};
		Socket.on("presentation", (num)=>{
			this.setState({
				image: num
			});
		});
		window.setPresentation = (num) => {
			Socket.emit("presentation", num);
		}
	}

	render() {
		return <div style={{width: "100%", height: "100%", textAlign: "center"}}>
			<img style={{
				height: "100%",
				maxWidth: "100%",
			}} src={"images/"+this.state.image+".png"} />
		</div>;
	}
}

export default Presentation;