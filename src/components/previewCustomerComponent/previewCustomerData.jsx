import React from 'react';
import PropTypes from 'prop-types';
import './CustomerDataPreview.css';

const CustomerDataPreview = ({ attributes }) => {
  console.log ("===============================")
  return (
    <div className="customer-data-preview">
      <p><strong>CampaignDashboardTaskingStatusID:</strong> {attributes.CampaignDashboardTaskingStatusID}</p>
      <p><strong>ContactID:</strong> {attributes.contactID}</p>
      <p><strong>FirstName:</strong> {attributes.firstName}</p>
      <p><strong>MiddleName:</strong> {attributes.middleName}</p>
      <p><strong>LastName:</strong> {attributes.lastName}</p>
      <p><strong>Phone:</strong> {attributes.phone1}</p>
      <p><strong>LandLine:</strong> {attributes.landLine}</p>
      <p><strong>Email:</strong> {attributes.email1}</p>
      <p><strong>Country:</strong> {attributes.country}</p>
      <p><strong>City:</strong> {attributes.city}</p>
      <p><strong>State:</strong> {attributes.state}</p>
      <p><strong>Street:</strong> {attributes.street}</p>
      <p><strong>Zip:</strong> {attributes.zip}</p>
      <p><strong>Matric1:</strong> {attributes.matric1}</p>
      <p><strong>Matric2:</strong> {attributes.matric2}</p>
      <p><strong>Matric3:</strong> {attributes.matric3}</p>
      <p><strong>Matric4:</strong> {attributes.matric4}</p>
      <p><strong>SurveyUrl:</strong> {attributes.surveyUrl}</p>
    </div>
  );
};

CustomerDataPreview.propTypes = {
  attributes: PropTypes.object.isRequired
};

export default CustomerDataPreview;
