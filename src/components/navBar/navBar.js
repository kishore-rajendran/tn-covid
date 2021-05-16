import React from 'react';
import './style.scss';
import Select from 'react-select'

function navBar(props) {
    return (
        <div className="nav-bar">
            <div className="nav-bar__logo">
                Covid Beds
            </div>
            <div className="nav-bar__content">
                <div className="nav-bar__district">
                    <Select
                        className="react-select"
                        classNamePrefix="react-select"
                        value={props.selectedDistrict}
                        onChange={selectedOption => {
                            window.scrollTo({
                                top: 0,
                                left: 0,
                                behavior: 'smooth'
                            });
                            props.setSelectedDistrict(selectedOption)
                        }}
                        options={props.districtOptions}
                        placeholder="Select District"
                    />
                </div>
            </div>
        </div>
    )
}

export default navBar
