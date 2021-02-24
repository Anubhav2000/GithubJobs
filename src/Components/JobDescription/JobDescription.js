import React, { Component } from 'react';
import { useParams } from 'react-router';
import { Container, Row, Col, Button, Badge } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faLongArrowAltLeft, faGlobeEurope, faClock} from '@fortawesome/free-solid-svg-icons';
const axios = require('axios');

const jobStyle = {
	padding:'5px',
	
}

const backToSearch = {
	display:"inline-block" ,
	fontSize:'14px',
	fontFamily:'Poppins',
	fontType:'normal',
	color:'#1E86FF',
	paddingLeft:'15px'
}

const githubJobStyle = {
	fontFamily: 'Poppins',
	fontSize: '24px',
	fontStyle: 'normal',
	fontWeight: '300',
	lineHeight: '36px',
	letterSpacing: '0em',
	textAlign: 'left',
	display:'inline',
	fontColor: '#282538'

}

const githubJobStyleBold = {
	fontFamily: 'Poppins',
	fontSize: '24px',
	fontStyle: 'normal',
	fontWeight: '700',
	lineHeight: '36px',
	letterSpacing: '0em',
	textAlign: 'left',
	float : 'left',
	fontColor: '#282538'


}
export default class JobDescription extends Component {
	constructor(props){
		super(props);
		const jobId = this.props.match.params.id;
		this.state = {
			id : jobId,
			title : null,
			company : null,
			createdAt : '',
			location : '',
			type : '',
			description : '',
			company_logo : '',
		}
	}
	componentDidMount(){
		this.setJob();
	}

	setJob = () => {
		// console.log(this.state.id);
		axios.get('/positions/' + this.state.id + '.json', {
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
			title : result.data.title,
			company : result.data.company,
			createdAt : result.data.created_at,
			type : result.data.type,
			description : result.data.description,
			location : result.data.location,
			logo : result.data.company_logo
			})
		})
		.catch((error) => {
			console.log(error);
		})
		console.log(typeof(job));
	}

	render() {
		return (

			<Container style={{backgroundColor : '#F6F7FB', maxWidth:'100%'}}>
				<Row style={{width:'100%'}}>
					<Col sm={2} style={{float:'center', align:'left', padding:'20px'}}>
						<Container>
							<br/>
							<p style={githubJobStyleBold}>Github </p>
							<span style={githubJobStyle}> Jobs</span>
						</Container>
						<Container style={{float:'left', display: 'flex', alignItems: 'center'}}>
						<FontAwesomeIcon icon={faLongArrowAltLeft}></FontAwesomeIcon>
						<span style={backToSearch}>View Search</span>
						</Container>
						<Container style={{paddingTop:'60px'}}>
							<p style={{
								fontFamily: 'Poppins',
								fontStyle: 'normal',
								fontWeight: 'bold',
								fontSize: '14px',
								lineHeight: '21px',
								/* identical to box height */

								textTransform: 'uppercase',

								color: '#B9BDCF'}}
							>how to apply</p>
						</Container>
						<Container style={{paddingTop:'0px'}}>
							<p style={{
								fontFamily: 'Poppins',
								fontStyle: 'normal',
								fontWeight: 'bold',
								fontSize: '14px',
								lineHeight: '21px',
								color: '#334680'}}
							>Please email a copy of your resume and online portfolio to wes@kasisto.com and eric@kasisto.com</p>
						</Container>
					</Col>
					<Col sm={8}>
						<Container style={{padding:'40px', paddingTop:'120px'}}>
								<Container>
									<span style={{
										fontFamily: 'Roboto',
										fontStyle: 'normal',
										fontWeight: 'bold',
										fontSize: '24px',
										lineHeight: '28px',
										color: '#334680',
										paddingRight:'16px'}}
									>
									{this.state.title}</span>

									<Badge style={{borderStyle:'solid', borderColor:'#334680', borderWidth:'1px', color:'#334680', align:'top'}}>{this.state.type}</Badge>

								</Container>
								<Container style={{alignItems:'center'}}>
									<span><FontAwesomeIcon style={{color : '#B9BDCF'}} icon={faClock}></FontAwesomeIcon><Badge style={{color : '#B9BDCF', fontSize:'12px'}} >{this.state.createdAt}</Badge></span>
								</Container>

								<Container style={{paddingTop:'40px'}}>
									<span><img src={this.state.logo} style={{height:'42px', width:'42px', float:'left'}}></img>
									<Container style={{paddingLeft:'25px'}}>
										<Row style={{fontFamily: 'Roboto',
										fontStyle: 'normal',
										fontWeight: 'bold',
										fontSize: '18px',
										lineHeight: '21px',
										color : '#334680'
										}}>{this.state.company}</Row>
										<Row>
											<Container style={{alignItems:'left', padding:'0px'}}>
											<span><FontAwesomeIcon style={{color : '#B9BDCF'}} icon={faGlobeEurope}></FontAwesomeIcon><Badge style={{color : '#B9BDCF', fontSize:'12px'}} >{this.state.location}</Badge></span>
											</Container>
										</Row>
									</Container>
									</span>
								</Container>


						</Container></Col>
				</Row>
			</Container>
		)
	}
}
