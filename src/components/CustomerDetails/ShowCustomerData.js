import React from 'react';
import './ShowCustomerData.css';
import ShowSurvey from './ShowSurvey';
import ShowSurvey1 from './ShowSurvey1';

const ShowCustomerData = (props) => {
    console.log("Getting info :: "+JSON.stringify(props))
    return (
        <div>
            <div className='show-customer-data__container'>
                <div className='show-customer-data-record'>
                    <div className='data-header'>
                        <div>firstName</div>
                    </div>
                    <div className='data-value'>
                        <div>{props.customerInfo.firstName} {props.customerInfo.middleName} {props.customerInfo.lastName}</div>
                    </div>
                </div>
                {/* <div className='show-customer-data-record'>
                    <div className='data-header'>
                        <div>middleName</div>
                    </div>
                    <div className='data-value'>
                        <div>{props.customerInfo.middleName}</div>
                    </div>
                </div>
                <div className='show-customer-data-record'>
                    <div className='data-header'>
                        <div>lastName</div>
                    </div>
                    <div className='data-value'>
                        <div>{props.customerInfo.lastName}</div>
                    </div>
                </div> */}
                <div className='show-customer-data-record'>
                    <div className='data-header'>
                        <div>Phone</div>
                    </div>
                    <div className='data-value'>
                        <div>{props.customerInfo.phone1} ,{props.customerInfo.phone2} ,{props.customerInfo.landLine}</div>
                    </div>
                </div>
                {/* <div className='show-customer-data-record'>
                    <div className='data-header'>
                        <div>phone2</div>
                    </div>
                    <div className='data-value'>
                        <div>{props.customerInfo.phone2}</div>
                    </div>
                </div>
                <div className='show-customer-data-record'>
                    <div className='data-header'>
                        <div>landLine</div>
                    </div>
                    <div className='data-value'>
                        <div>{props.customerInfo.landLine}</div>
                    </div>
                </div> */}
                <div className='show-customer-data-record'>
                    <div className='data-header'>
                        <div>email</div>
                    </div>
                    <div className='data-value'>
                        <div>{props.customerInfo.email1}</div>
                    </div>
                </div>
                <div className='show-customer-data-record'>
                    <div className='data-header'>
                        <div>Address</div>
                    </div>
                    <div className='data-value'>
                        <div>{props.customerInfo.street} {props.customerInfo.zip} {props.customerInfo.city} {props.customerInfo.state} {props.customerInfo.country}</div>
                    </div>
                </div>
                {/* <div className='show-customer-data-record'>
                    <div className='data-header'>
                        <div>city</div>
                    </div>
                    <div className='data-value'>
                        <div>{props.customerInfo.city}</div>
                    </div>
                </div>
                <div className='show-customer-data-record'>
                    <div className='data-header'>
                        <div>state</div>
                    </div>
                    <div className='data-value'>
                        <div>{props.customerInfo.state}</div>
                    </div>
                </div>
                <div className='show-customer-data-record'>
                    <div className='data-header'>
                        <div>street</div>
                    </div>
                    <div className='data-value'>
                        <div>{props.customerInfo.street}</div>
                    </div>
                </div>
                <div className='show-customer-data-record'>
                    <div className='data-header'>
                        <div>zip</div>
                    </div> 
                    <div className='data-value'>
                        <div>{props.customerInfo.zip}</div>
                    </div>
                </div>*/}
                <div className='show-customer-data-record'>
                    <div className='data-header'>
                        <div>Custom 1</div>
                    </div>
                    <div className='data-value'>
                        <div>{props.customerInfo.matric1}</div>
                    </div>
                </div>
                <div className='show-customer-data-record'>
                    <div className='data-header'>
                        <div>Custom 2</div>
                    </div>
                    <div className='data-value'>
                        <div>{props.customerInfo.matric2}</div>
                    </div>
                </div>
                <div className='show-customer-data-record'>
                    <div className='data-header'>
                        <div>Custom 3</div>
                    </div>
                    <div className='data-value'>
                        <div>{props.customerInfo.matric3}</div>
                    </div>
                </div>

                <div className='show-customer-data-record'>
                    <div className='data-header'>
                        <div>Custom 4</div>
                    </div>
                    <div className='data-value'>
                        <div>{props.customerInfo.matric4}</div>
                    </div>
                </div>
                <ShowSurvey1 props={props}  />
            </div >
            
        </div>
    );

}

export default ShowCustomerData;