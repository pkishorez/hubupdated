import * as React from 'react';
import * as ReactDOM from 'react-dom';

interface IProps {
	onSubmit?: Function
};
interface IState {};

export class Form extends React.Component<IProps, IState> {
	constructor() {
		super();
		this.submit = this.submit.bind(this);
	}
	submit(e) {
		e.preventDefault();
		if (this.props.onSubmit)
			this.props.onSubmit();
	}
	render() {
		return <form className="form" onSubmit={this.submit} style={{padding: 10}}>
			{this.props.children}
		</form>;
	}
}

export let Label = (props) => {
	return <div className="label">
		{props.children}
	</div>;
}

export class Checkbox extends React.Component<any, any> {
	render() {
		return <div className={this.props.inline?"inline-block":""}>
			<label className="checkbox">
				<input type='checkbox' onChange={(e)=>{this.props.checked=e.target.checked;}} checked={this.props.checked}/>
				<div className='fake'>✓</div>
				{this.props.children}
			</label>
		</div>;
	}
}

export let Radio = (props) => {
	return <div className={props.inline?"inline-block":""}>
		<label className="radio">
			<input type='radio' name={props.name} checked={props.checked}/>
			<div className='fake'>•</div>
			{props.children}
		</label>
	</div>;
}

export let RadioGroup = (p) => {
	let {children, ...props} = p;
	children = React.Children.map(children, (elem: React.ReactElement<any>, i)=>{
		return React.cloneElement(elem, props)
	});
	return <div>
		{children}
	</div>;
}

export let Submit = (props) => {
	return <div className="button">{props.children}</div>
}
