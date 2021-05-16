import React from 'react';
import './style.scss';
import * as constants from '../../constants';

function card({ hospital }) {
    const hospitalName = hospital[constants.HOSPITAL_NAME]
        .split(',')[0];
    const hospitalAddress = hospital[constants.HOSPITAL_NAME]
        .split(',')
        .filter(Boolean)
        .slice(1);
    const date = new Date(hospital[constants.LAST_UPDATED]);
    const formattedDate = date.getDate()
        + '-' + (date.getMonth() + 1)
        + '-' + date.getFullYear();
    let hospitalColor = constants.NORMAL_BEDS_CODE;
    if (hospital[constants.VENTILATOR_BEDS_VACANT] !== "0") {
        hospitalColor = constants.VENTILATOR_BEDS_CODE;
    } else if (hospital[constants.ICU_BEDS_VACANT] !== "0") {
        hospitalColor = constants.ICU_BEDS_CODE;
    } else if (hospital[constants.OXYGEN_BEDS_VACANT] !== "0") {
        hospitalColor = constants.OXYGEN_BEDS_CODE;
    }

    return (
        <div className={"hospital " + (`hospital--${hospitalColor}`) + (hospital[constants.TOTAL_BEDS_VACANT] === "0" ? " hospital--no-beds" : "")}>
            <div className="hospital__header">
                <div className="hospital__details">
                    <div className="hospital__name">
                        {hospitalName}
                    </div>
                    {hospitalAddress.map((address, key) => (
                        <div
                            className="hospital__address"
                            key={key}
                        >
                            {address},
                        </div>
                    ))}
                    <div
                        className="hospital__address"
                    >
                        {hospital[constants.DISTRICT_NAME]}
                    </div>
                    <div className="hospital__contact">
                        {hospital["Contact Number"].split('.')[0] || "Nil"}
                    </div>
                </div>
                <div className="hospital__last-updated">
                    {formattedDate}
                </div>
            </div>
            <div className="hospital__beds">
                <div className="hospital__beds--label">Normal</div>
                <div>{hospital[constants.NORMAL_BEDS_VACANT]}</div>
            </div>
            <div className="hospital__beds">
                <div className="hospital__beds--label">oxygen</div>
                <div>{hospital[constants.OXYGEN_BEDS_VACANT]}</div>
            </div>
            <div className="hospital__beds">
                <div className="hospital__beds--label">ICU</div>
                <div>{hospital[constants.ICU_BEDS_VACANT]}</div>
            </div>
            <div className="hospital__beds">
                <div className="hospital__beds--label">ventilator</div>
                <div>{hospital[constants.VENTILATOR_BEDS_VACANT]}</div>
            </div>
            <div className="hospital__contact-row">
                {hospital[constants.CONTACT_NUMBER].split('.')[0] || "Nil"}
            </div>
            <div className="hospital__last-updated-row">
                {formattedDate}
            </div>
        </div>
    )
}

export default card;
