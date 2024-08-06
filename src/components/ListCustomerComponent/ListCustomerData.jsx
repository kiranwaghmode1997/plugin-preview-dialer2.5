import React from 'react';
import PropTypes from 'prop-types';
import './ListCustomerData.css';

const ListCustomerData = ({ taskAttributes }) => {
  console.log("================== inside list customer data ===============");
  console.log("taskAttributes ================= ",taskAttributes)
 

  return (
    <div className="customer-data-preview">
      <p><strong>CampaignDashboardTaskingStatusID:</strong> {taskAttributes.CampaignDashboardTaskingStatusID}</p>
      <p><strong>ContactID:</strong> {taskAttributes.contactID}</p>
      <p><strong>FirstName:</strong> {taskAttributes.firstName}</p>
      <p><strong>MiddleName:</strong> {taskAttributes.middleName}</p>
      <p><strong>LastName:</strong> {taskAttributes.lastName}</p>
      <p><strong>Phone:</strong> {taskAttributes.phone1}</p>
      <p><strong>LandLine:</strong> {taskAttributes.landLine}</p>
      <p><strong>Email:</strong> {taskAttributes.email1}</p>
      <p><strong>Country:</strong> {taskAttributes.country}</p>
      <p><strong>City:</strong> {taskAttributes.city}</p>
      <p><strong>State:</strong> {taskAttributes.state}</p>
      <p><strong>Street:</strong> {taskAttributes.street}</p>
      <p><strong>Zip:</strong> {taskAttributes.zip}</p>
      <p><strong>Matric1:</strong> {taskAttributes.matric1}</p>
      <p><strong>Matric2:</strong> {taskAttributes.matric2}</p>
      <p><strong>Matric3:</strong> {taskAttributes.matric3}</p>
      <p><strong>Matric4:</strong> {taskAttributes.matric4}</p>
      <p><strong>SurveyUrl:</strong> {taskAttributes.surveyUrl}</p>
    </div>
  );
};

ListCustomerData.propTypes = {
  taskAttributes: PropTypes.object.isRequired
};

export default ListCustomerData;
