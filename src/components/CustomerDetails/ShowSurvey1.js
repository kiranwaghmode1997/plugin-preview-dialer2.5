import { useState, useEffect, useRef, Component } from "react";
import './ShowSurvey.css';
import axios from 'axios';
import { API_BASE_URL } from '../../api';

const axiosInstance = axios.create({
  baseURL: API_BASE_URL
});

class ShowSurvey1 extends Component{

    constructor(props){
        super(props)
        console.log("surveydata==>"+JSON.stringify(props) )
        this.state={
            name:'',
            status:'',
            surveyUrl:props.props.customerInfo.surveyUrl,

    }
        this.showModalPopUp = this.showModalPopUp.bind(this)
        this.updateData = this.updateData.bind(this)
        // this.updateTaskPayloads= {
        //       "CampaignDashboardTaskingStatusID": props.props.customerInfo.CampaignDashboardTaskingStatusID,
        //       "surveyUrl" : props.props.customerInfo.surveyUrl,
        //       "status" : this.state.status
        //   }
        
    }
    //var popUpObj;
    showModalPopUp(){
            //alert(this.state.surveyUrl);
     let surveyUrl =this.state.surveyUrl;
        if(surveyUrl && surveyUrl != null && surveyUrl != " " && surveyUrl != "undefined"){

             window.open(surveyUrl,"ModalPopUp","width=800," + "height=600");

            //popUpObj.focus();
        }else{
                alert("Survey link in not found!")

                }
        }


          updateData() {
              console.log("axios data" +JSON.stringify({
                "CampaignDashboardTaskingStatusID": this.props.props.customerInfo.CampaignDashboardTaskingStatusID,
                "surveyUrl" : this.props.props.customerInfo.surveyUrl,
                "status" : this.state.status
            }));
         let  headers = {'Content-Type': 'application/json', };

                const responseDB = axios.post('https://14a0-42-105-134-5.ngrok-free.app/vdl/previewSurveyStatus',
                {
                    
                  //  "surveyUrl" : this.props.props.customerInfo.surveyUrl,
                    "status" : this.state.status,
                    "campaignDashboardTaskingStatusID": this.props.props.customerInfo.CampaignDashboardTaskingStatusID,
                    
                },
               
                {headers:headers}
                ) .then(function (responseDB) {
                    if(responseDB.data.status=="success"){
                        alert("Survey Status Updated Successful!")
                    }else{
                        alert("Survey Status Not Updated")
                    }
                    console.log(responseDB);
                  })
                  .catch(function (error) {
                    alert("Survey Status Not Updated")
                    console.log(error);
                  });
              
        } 

render(){
    return(
        <div className="show-customer-data__container">
         {/* <h1>Hello survey..............</h1>
        <input type="text" name="name" 
        value={this.state.name} onChange={(e)=>{
            console.log(this.state.name)
            this.setState({
                name: e.target.value,
             
            })} }/> */}
        
     	<div className="col-sm-2">
				 <button type="button" id="Button1" className="btn btn-default application-text"  onClick={()=>{this.showModalPopUp()}} >Open Survey</button>
			</div>  
		  <div className="form-group col-sm-7" >
			 <label className="control-label col-sm-4 application-text" >Survey Status<span className="required">*</span></label>
			 
			 <div className="col-sm-8">
				<select className="form-control" value={this.state.status} id="srvysts" 
                onChange={(e)=>{this.state.status=e.target.value; console.log("status vakue is : "+this.state.status)}}>
				<option value="None">Select Survey Status</option>	
				<option value="Completed">Completed</option>
				<option value="Not Completed">Not Completed</option>						  
				</select>		
			 						
		   </div>

           </div>
			<div className="form-group col-sm-2">
			<button type="button"  className="btn btn-default application-text" onClick={()=>{this.updateData()}} >Update Status</button> 
			</div> 
        </div>
    )
}

}
export default ShowSurvey1