import React from 'react'
import { Icon } from '@twilio/flex-ui';
import CustomerComponent from '../CustomerComponent/CustomerComponent';
import Button from "./Button";

import "./PreviewButton.css";
var something="";

const PreviewButton = (props) => {
    return <div className="preview-container">
        <Button key="preview-task" type="button" category="preview" onClick={() => {
            console.log(`CampaignDashboardTaskingStatusID ======> ${props.task.attributes.info.CampaignDashboardTaskingStatusID}`)
        }}>
            <div className="reject-button">
                <Icon className="preview-button_Icon" icon="Eye" key="Eye" />Preview
            </div>
        </Button>
    </div>
}

export default PreviewButton;
