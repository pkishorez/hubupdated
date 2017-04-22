import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as classNames from 'classnames';

interface IProps {
	width?: number|string,
	column?: boolean,
	wrap?: boolean,
	justify?: "center" | "start" | "end" | "space-between" | "space-around",
	align?: "center" | "start" | "end" | "stretch",
	gutter?: number,
	margin?: number,
	equalWidth?: boolean,
	style?: any
};
interface IState {};

export class Layout extends React.Component<IProps, IState> {

	public static defaultProps:IProps = {
		width: 'auto',
		column: false,
		wrap: false,
		justify: "center",
		align: "center",
		gutter: 0,
		margin: 0,
		equalWidth: false
	};

	render() {
		let cls = classNames("flexbox",
			"justify-"+this.props.justify,
			"align-"+this.props.align,
			{
				"eq-width": this.props.equalWidth,
				"column": this.props.column
		});
		let count = React.Children.count(this.props.children);
		let children = React.Children.map(this.props.children, (elem: React.ReactElement<any>, i)=>{
			let style: any = {};
			if (this.props.column){
				style.marginTop = (i==0)?this.props.margin:this.props.gutter;
			}
			else{
				style.marginLeft = (i==0)?this.props.margin: this.props.gutter;
			}
			if (i==count-1) {
				if (this.props.column)
					style.marginBottom = this.props.margin;
				else
					style.marginRight = this.props.margin;
			}
			return React.cloneElement(elem, {
				style: {
					...elem.props.style,
					...style
				}
			});
		});
		return <div style={{
			maxWidth: this.props.width,
			...this.props.style
		}} className={cls} >
			{
				children
			}
		</div>;
	}
}

interface SectionIProps {
	style?: any,
	width?: number|string,
	children?: any,
	nocard?:boolean,
	r?: any
};
export let Section = (props: SectionIProps)=>{
	return <div ref={(ref)=>{if (props.r){props.r(ref)};}} className={props.nocard?null:"card-1"} style={{
		width: props.width,
		...props.style
	}}>
		{props.children}
	</div>;
};