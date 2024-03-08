// import React, { useState } from 'react'
// import PropTypes from 'prop-types'
// import PatientShowDetails from './PatientShowDetails'
// import PatientAddNewRecord from './PatientAddNewRecord'

// const PatientInfoData = ({ patientSearch }) => {
//   const [selectedPatientId, setSelectedPatientId] = useState('')
//   const [addDiagnosisPatientId, setAddDiagnosisPatientId] = useState('')

//   const handleToggleDetails = (patientId) => {
//     setSelectedPatientId((prevState) => (prevState === patientId ? '' : patientId))
//     setAddDiagnosisPatientId('')
//   }

//   const handleAddDiagnosis = (patientId) => {
//     setAddDiagnosisPatientId(patientId)
//     setSelectedPatientId('')
//   }

//   return (
//     <div>
//       {patientSearch.map((patient) => {
//         const { name, crn, phone, age, sex, diagnosis, _id, desc } = patient
//         const isDetailsOpen = selectedPatientId === _id
//         const isAddDiagnosisOpen = addDiagnosisPatientId === _id

//         return (
//           <div key={_id} className="row">
//             <div style={{ marginTop: '2rem' }}>
//               <div className="card" style={{ width: '100%' }}>
//                 <div className="card-body">
//                   <h5 className="card-title">Patient Details:</h5>
//                   <h6 className="card-subtitle mb-2 text-muted">Name : {name}</h6>
//                   <div style={{ display: 'flex' }}>
//                     <p className="card-text">CRN No. {crn}</p>
//                     <p className="card-text" style={{ marginLeft: '3rem' }}>
//                       Phone No. {phone}
//                     </p>
//                     <p className="card-text" style={{ marginLeft: '3rem' }}>
//                       Age : {age}
//                     </p>
//                     <p className="card-text" style={{ marginLeft: '3rem' }}>
//                       Sex : {sex}
//                     </p>
//                   </div>
//                   <div style={{ textAlign: 'end' }}>
//                     <button
//                       type="button"
//                       className="btn btn-success"
//                       onClick={() => handleToggleDetails(_id)}
//                     >
//                       {isDetailsOpen ? 'Close Details' : 'Show Details'}
//                     </button>
//                     <button
//                       type="button"
//                       className="btn btn-warning"
//                       style={{ marginLeft: '2rem' }}
//                       onClick={() => handleAddDiagnosis(_id)}
//                       disabled={isDetailsOpen}
//                     >
//                       Add New Diagnosis
//                     </button>
//                   </div>
//                   {isDetailsOpen && (
//                     <div>
//                       <PatientShowDetails diagnosis={diagnosis} desc={desc} />
//                     </div>
//                   )}
//                   {isAddDiagnosisOpen && (
//                     <div>
//                       <PatientAddNewRecord _id={_id} />
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </div>
//         )
//       })}
//     </div>
//   )
// }

// PatientInfoData.propTypes = {
//   patientSearch: PropTypes.array.isRequired,
// }

// export default PatientInfoData

import React, { useState } from 'react'
import PropTypes from 'prop-types'
import PatientShowDetails from './PatientShowDetails'
import PatientAddNewRecord from './PatientAddNewRecord'

const PatientInfoData = ({ patientSearch, getSearchByPatient }) => {
  const [selectedPatientId, setSelectedPatientId] = useState('')
  const [addDiagnosisPatientId, setAddDiagnosisPatientId] = useState('')

  const handleToggleDetails = (patientId) => {
    setSelectedPatientId((prevState) => (prevState === patientId ? '' : patientId))
    setAddDiagnosisPatientId('')
  }

  const handleAddDiagnosis = (patientId) => {
    setAddDiagnosisPatientId(patientId)
    setSelectedPatientId('')
  }

  return (
    <div>
      {patientSearch.map((patient) => {
        const { name, crn, phone, age, sex, diagnosis, _id, desc, nextApointmentDate } = patient
        const isDetailsOpen = selectedPatientId === _id
        const isAddDiagnosisOpen = addDiagnosisPatientId === _id
        const inputDate = nextApointmentDate

        // Parsing input date
        const dateObject = new Date(inputDate)

        // Formatting the date
        let hours = dateObject.getHours()
        const amPm = hours >= 12 ? 'PM' : 'AM'
        hours = hours % 12 || 12 // Convert hours to 12-hour format
        const formattedDate = `${dateObject.getFullYear()}-${(dateObject.getMonth() + 1)
          .toString()
          .padStart(2, '0')}-${dateObject.getDate().toString().padStart(2, '0')} ${hours
          .toString()
          .padStart(2, '0')}:${dateObject.getMinutes().toString().padStart(2, '0')}:${dateObject
          .getSeconds()
          .toString()
          .padStart(2, '0')} ${amPm}`

        console.log(formattedDate)
        return (
          <div key={_id} className="row">
            <div style={{ marginTop: '2rem' }}>
              <div className="card" style={{ width: '100%' }}>
                <div className="card-body">
                  <h5 className="card-title">Patient Details:</h5>
                  <h6 className="card-subtitle mb-2 text-muted">Name : {name}</h6>
                  <div style={{ display: 'flex' }}>
                    <p className="card-text">CRN No. {crn}</p>
                    <p className="card-text" style={{ marginLeft: '3rem' }}>
                      Phone No. {phone}
                    </p>
                    <p className="card-text" style={{ marginLeft: '3rem' }}>
                      Age : {age}
                    </p>
                    <p className="card-text" style={{ marginLeft: '3rem' }}>
                      Sex : {sex}
                    </p>
                    <p className="card-text" style={{ marginLeft: '3rem' }}>
                      Next Appointment Date : {formattedDate}
                    </p>
                  </div>
                  <div style={{ textAlign: 'end' }}>
                    <button
                      type="button"
                      className="btn btn-success"
                      onClick={() => handleToggleDetails(_id)}
                    >
                      {isDetailsOpen ? 'Close Details' : 'Show Details'}
                    </button>
                    <button
                      type="button"
                      className="btn btn-warning"
                      style={{ marginLeft: '2rem' }}
                      onClick={() => handleAddDiagnosis(_id)}
                      disabled={isDetailsOpen}
                    >
                      Add New Diagnosis
                    </button>
                  </div>
                  {isDetailsOpen && (
                    <div>
                      <PatientShowDetails diagnosis={diagnosis} desc={desc} />
                    </div>
                  )}
                  {isAddDiagnosisOpen && (
                    <div>
                      <PatientAddNewRecord _id={_id} getSearchByPatient={getSearchByPatient} />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

PatientInfoData.propTypes = {
  patientSearch: PropTypes.array.isRequired,
  getSearchByPatient: PropTypes.array.isRequired,
}

export default PatientInfoData
