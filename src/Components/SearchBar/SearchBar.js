import React, { Component } from 'react'
import Select from 'react-select';
import { Button } from 'react-bootstrap';
import { alignPropType } from 'react-bootstrap/esm/DropdownMenu';
import {Link} from 'react-router-dom';
const axios = require('axios');
const options = [
	{label : 'React', value:'react'},
	{label : 'Reactnative', value:'react-native'},
	{label : 'Javascript', value:'js'},
	{label : 'CSS', value:'css'},
]

const style = {
	height: '55px',
	width: '790px',
	left: '225px',
	top: '42px',
	borderRadius: '4px',
	position : 'absolute',
	// background: '#FFFFFF',
	// boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)'
}

const buttonStyle = {
	position : 'relative',
	borderRadius : '6px', 
	background: '#1286AB',
	width:'146px',
	height:'36px',
	top:'43px',
	left:'885px',
	// float : 'right',
	alignPropType : 'center'
}

const backgroundStyle = {
	height: '138px',
	width: '1201px',
	left: '120px',
	top: '100px',
	borderRadius: '8px',
	position : 'absolute',
	backgroundImage : "url(" + "https://www.orfonline.org/wp-content/uploads/2018/07/chicago.jpg" + ")",
	backgroundPosition : 'center',
	backgroundRepeat : 'repeat'
}
export default class SearchBar extends Component {
	constructor(props){
		super(props);
		this.state = {
			items : null,
			selectedJob : null,
			link : ''
		}
	}
	componentDidMount(){
		this.loadData();
	  }
	
	loadData = () => {
		axios.get('/positions.json', {
			withCredentials : true,
			headers: {"Access-Control-Allow-Origin": true,
			'Access-Control-Allow-Credentials' : true,
			'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
			crossorigin : true,
		},
			responseType : 'json'
		})
		.then((result) => {
			console.log(result.data);
			this.setState({
			items : result.data,
			})
		})
		.catch((error) => {
			console.log(error);
		})
	}
	customFilter = (option, searchText) => {
		if(
			option.data.company.toLowerCase().includes(searchText.toLowerCase()) ||
			option.data.title.toLowerCase().includes(searchText.toLowerCase()) ||
			option.data.location.toLowerCase().includes(searchText.toLowerCase()) ||
			option.data.type.toLowerCase().includes(searchText.toLowerCase())
		)
		return true;
		return false;
	}

	selectJob = (job) => {
		this.setState({
			selectedJob : job,
			link : "/jobDescription/" + job.id
		});
	}

	render() {
		return (
			<div classs="background" style={backgroundStyle}>
				<div style={style}>
					<Select 
					options={this.state.items}
					filterOption = {this.customFilter}
					autoFocus={true}
					search={true}
					onChange = {this.selectJob}
					placeholder={'Select Title, Company, Location'}
					getOptionLabel={option => `${option.company} ${option.title} ${option.location}`}
					></Select>
				</div>
				<Link to={this.state.link}><Button style={buttonStyle}>View</Button></Link>
			</div>
		)
	}
}

