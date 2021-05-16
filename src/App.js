import { useEffect, useState } from 'react';
import Papa from "papaparse";
import Card from './components/card/card';
import './app.scss';
import { ReactComponent as NoData } from './assets/svg/no-data.svg';
import NavBar from './components/navBar/navBar';
import Select from 'react-select';
import * as constants from './constants';

function App() {
  const [stateBedAvailability, setStateBedAvailability] = useState([]);
  const [hospitalBedAvailability, setHospitalBedAvailability] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [filterBy, setFilterBy] = useState(null);
  const [districtOptions, setDistrictOptions] = useState(['select'])
  const tableHeaders = ['Name', 'Normal', 'Oxygen', 'ICU', 'Ventilator', "contact", "updated"];
  const filterOptions = [
    {
      label: 'Normal',
      value: constants.NORMAL_BEDS_VACANT
    }, {
      label: 'Oxygen',
      value: constants.OXYGEN_BEDS_VACANT
    }, {
      label: 'ICU',
      value: constants.ICU_BEDS_VACANT
    }, {
      label: 'Ventilator',
      value: constants.VENTILATOR_BEDS_VACANT
    },
  ]

  useEffect(() => {
    const fetchData = () => {
      Papa.parse(
        "https://raw.githack.com/stopcoronatn/stopcoronatn.github.io/main/data/beds.csv",
        {
          download: true,
          complete: ({ data }) => {
            let date = new Date();
            date.setDate(date.getDate() - 7);
            let hospitalAvailabilitySince = data
              .filter(hospital => (new Date(hospital[constants.LAST_UPDATED]) - date) >= 0);
            let districtOptions = hospitalAvailabilitySince.map(hospital => hospital[constants.DISTRICT_NAME])
            setDistrictOptions([...new Set(districtOptions)].map(district => ({ value: district, label: district })));
            setStateBedAvailability(hospitalAvailabilitySince);
          },
          header: true,
        }
      )
    }
    fetchData();
    const timer = setInterval(fetchData, 60000);
    return () => clearInterval(timer)
  }, []);

  useEffect(() => {
    setHospitalBedAvailability(
      stateBedAvailability
        .filter((hospital) => {
          let district = (!selectedDistrict || hospital[constants.DISTRICT_NAME] === selectedDistrict.value)
          return district && (!filterBy || !(hospital[filterBy.value] === "0"));
        })
        .sort((a, b) => parseInt(b[constants.TOTAL_BEDS_VACANT]) - parseInt(a[constants.TOTAL_BEDS_VACANT]))
    );
  }, [selectedDistrict, stateBedAvailability, filterBy]);

  return (
    <div className="App">
      <NavBar
        districtOptions={districtOptions}
        setSelectedDistrict={setSelectedDistrict}
        selectedDistrict={selectedDistrict}
      />
      <section className="content">
        <div className="options">
          <Select
            className="react-select"
            classNamePrefix="react-select"
            options={filterOptions}
            value={filterBy}
            onChange={option => setFilterBy(option)}
          />
        </div>
        <div className="content__header-container">
          {
            tableHeaders.map((header, key) => (
              <div key={key} className="content__header">{header}</div>
            ))
          }
        </div>
        {
          hospitalBedAvailability.map(hospital => (
            <Card hospital={hospital} key={hospital["S.NO"]} />
          ))
        }
        {
          !hospitalBedAvailability.length
          && <div className="empty">
            <NoData className="empty__img" />
            <div className="empty__message">
              No hospitals found.
            </div>
          </div>
        }
      </section>
    </div>
  );
}

export default App;
