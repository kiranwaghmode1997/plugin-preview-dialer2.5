import React from 'react';
import './ListCampaignData.css';

const ListCampaignData = ({data}) => {
    console.log("inside test component =======>> "+data);
  
    const {
        CampaignDashboardTaskingStatusID,
        firstName,
        middleName,
        lastName,
        to,
        email1,
        city,
        state,
        country,
        zip,
        matric1,
        matric2,
        matric3,
        matric4
      } = data;
    
      const name = `${firstName} ${middleName ? middleName + ' ' : ''}${lastName}`.trim();
      const address = `${city ? city + ', ' : ''}${state ? state + ', ' : ''}${country ? country + ', ' : ''}${zip || ''}`.trim();
    
      const customFields = [];
      if (matric1) customFields.push(`Matric1: ${matric1}`);
      if (matric2) customFields.push(`Matric2: ${matric2}`);
      if (matric3) customFields.push(`Matric3: ${matric3}`);
      if (matric4) customFields.push(`Matric4: ${matric4}`);
      const customFieldString = customFields.join(' | ');
    
      return (
        <div className="campaign-data-container">
          <table className="campaign-data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Address</th>
                <th>Custom</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{CampaignDashboardTaskingStatusID}</td>
                <td>{name}</td>
                <td>{to}</td>
                <td>{email1}</td>
                <td>{address || 'N/A'}</td>
                <td>{customFieldString || 'N/A'}</td>
              </tr>
            </tbody>
          </table>
        </div>
      );
    };
    
    export default ListCampaignData;