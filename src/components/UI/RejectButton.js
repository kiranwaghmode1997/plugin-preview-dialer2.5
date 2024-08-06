import React from 'react';
import { Icon } from '@twilio/flex-ui';
import Button from "./Button";
import axios from 'axios';
import { API_BASE_URL } from '../../api';
import "./RejectButton.css";

const axiosInstance = axios.create({
  baseURL: API_BASE_URL
});

const RejectButton = (props) => {
  return (
    <div className="reject-container">
      <Button
        key="reject-task"
        type="button"
        category="reject"
        onClick={() => {
          console.log(`CampaignDashboardTaskingStatusID ======> ${props.task.attributes.info.CampaignDashboardTaskingStatusID}`);
          
          const updateDBPayload = {
            CampaignDashboardTaskingStatusID: props.task.attributes.info.CampaignDashboardTaskingStatusID,
            dialStatus: 'Snooze',
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

          props.flex.Actions.invokeAction("RejectTask", {
            sid: props.task.sid
          });
        }}
      >
        <div className="reject-button">
          <Icon className="reject-button_Icon" icon="Loading" key="Loading" /> Snooze
        </div>
      </Button>
    </div>
  );
}

export default RejectButton;
