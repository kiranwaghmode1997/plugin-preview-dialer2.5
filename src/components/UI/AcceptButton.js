import React from 'react'
import { Icon } from '@twilio/flex-ui';
import CustomerComponent from '../CustomerComponent/CustomerComponent';
import Button from "./Button";
import "./AcceptButton.css";
import axios from 'axios';
import { API_BASE_URL } from '../../api';

const axiosInstance = axios.create({
  baseURL: API_BASE_URL
});

const AcceptButton = (props) => {
  return (
    <div className="accept-container">
      <Button
        key="accept-task"
        type="button"
        category="accept"
        onClick={() => {
          console.log(`CampaignDashboardTaskingStatusID ======> ${props.task.attributes.info.CampaignDashboardTaskingStatusID}`);
          
          const updateDBPayload = {
            CampaignDashboardTaskingStatusID: props.task.attributes.info.CampaignDashboardTaskingStatusID,
            dialStatus: 'Dialed',
          };

          async function postSnooze() {
            try {
              const responseDB = await axiosInstance.post('/status/updateStatus', new URLSearchParams(updateDBPayload), {
                headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' }
              });
              console.log('Response:', responseDB.data);
            } catch (error) {
              console.error('Error:', error);
            }
          }

          postSnooze();

          props.flex.Actions.invokeAction("AcceptTask", {
            sid: props.task.sid
          });
        }}
      >
        <div className="accept-button">
          <Icon className="accept-button_Icon" icon="IncomingCall" key="IncomingCall" /> Dial
        </div>
      </Button>
    </div>
  );
}

export default AcceptButton;
