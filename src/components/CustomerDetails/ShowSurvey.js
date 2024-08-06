import { useState, useEffect, useRef } from "react";
import './ShowSurvey.css';
import axios from 'axios';
 
const ShowSurvey = () =>
{
const [name, setName] = useState('');
    // const updateTaskPayloads = {
    //   //  "CampaignDashboardTaskingStatusID": props.customerInfo.CampaignDashboardTaskingStatusID,
    //    // "surveyUrl" : props.customerInfo.surveyUrl,
    // }

   // const [optionValue, setOptionValue] = useState("");
    // const handleSelect = (e) => {
    //   console.log(e.target.value);
    //  /// updateTaskPayloads.surveyStatus=e.target.value;
    // };

    // console.log("Getting info :: "+JSON.stringify(props))
    // var popUpObj;

    // const showModalPopUp=()=>{
    //          alert(props)
    //          let surveyUrl =props.customerInfo.surveyUrl;
    //        if(surveyUrl != null && surveyUrl != " " && surveyUrl != "undefined"){

	// 		popUpObj=window.open(surveyUrl,"ModalPopUp","width=800," + "height=600");

	// 		popUpObj.focus();
	// 	}else{
    //       	 alert("Survey link in not found!")

	// 	}
    // }

    //   const updateData=() =>{

    //     const responseDB = axios.post('https://615d-42-105-128-66.in.ngrok.io/vdl/uData',
    //     updateTaskPayloads,
    //     {headers:{'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'}
    // })  
        

        // const responseDB = await fetch('https://615d-42-105-128-66.in.ngrok.io/vdl/uData', {
        //   method: 'POST',
        //   body: new URLSearchParams(updateTaskPayloads),
        //   headers: {
        //     'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        //     'Access-Control-Allow-Origin': '*'
        //   }
        // });

      //}
    return (
    <div className="row" >
        <h1>Hello survey..............</h1>
        <input type="text" name="name" value={name} onChange={(e)=>{
            console.log("name = "+name);
            setName(e.target.value);
}} />
	 {/* <input type="hidden" id="CampaignDashboardTaskingStatusID" value="" />	
     	<div className="col-sm-2">
				 <button type="button" id="Button1" className="btn btn-default application-text"  onClick={showModalPopUp} >Open Survey</button>
			</div>  
		  <div className="form-group col-sm-7" >
			 <label className="control-label col-sm-4 application-text" >Survey Status<span className="required">*</span></label>
			 
			 <div class="col-sm-8">
				<select className="form-control" id="srvysts" onChange={handleSelect}>
				<option value="None">Select Survey Status</option>	
				<option value="Completed">Completed</option>
				<option value="Not Completed">Not Completed</option>						  
				</select>		
			 						
		   </div>

           </div>
			<div className="form-group col-sm-2">
			<button type="button"  className="btn btn-default application-text" onClick={updateData} >Update Status</button> 
			</div> 
			 */}
		 </div>
  )
}
 
export default ShowSurvey;