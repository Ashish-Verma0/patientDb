import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { getFetch, putFetchData } from 'src/api/Api'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const PatientAddNewRecord = ({ _id, getSearchByPatient }) => {
  PatientAddNewRecord.propTypes = {
    _id: PropTypes.string.isRequired,
    getSearchByPatient: PropTypes.string.isRequired,
  }
  const [startingDate, setStartingDate] = React.useState(null)
  const [patientById, setPatientById] = useState({})
  const [formData, setFormData] = useState({
    diagnosis: [],
    desc: '',
  })
  const [diagnosis, setDiagnosis] = useState([])
  const [problems] = useState([{ problem: 'pain' }, { problem: 'pain2' }])

  const handleCheckboxChange = (problemName, checked) => {
    if (checked) {
      setDiagnosis((prevDiagnosis) => [
        ...prevDiagnosis,
        {
          problem: {
            name: problemName,
            scale1: '',
            scale2: '',
            scale3: '',
          },
          date: Date.now(),
        },
      ])
    } else {
      setDiagnosis((prevDiagnosis) =>
        prevDiagnosis.filter((item) => item.problem.name !== problemName),
      )
    }
  }

  const handleInputChange = (problemName, key, value) => {
    setDiagnosis((prevDiagnosis) =>
      prevDiagnosis.map((item) => {
        if (item.problem.name === problemName) {
          return {
            ...item,
            problem: {
              ...item.problem,
              [key]: value,
            },
          }
        }
        return item
      }),
    )
  }

  const handleStartingDateChange = (date) => {
    setStartingDate(date)
  }

  const getPatientById = async () => {
    try {
      const data = await getFetch(`http://localhost:8090/api/patient/${_id}`)
      setPatientById(data.data.data)
    } catch (error) {
      console.log(error)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const updatedFormData = {
        ...formData,
        desc: formData.desc,
        diagnosis: diagnosis,
        nextApointmentDate: startingDate,
      }
      console.log('updatedFormData', updatedFormData)

      const data = await putFetchData(
        `http://localhost:8090/api/patient/update/${_id}`,
        updatedFormData,
      )

      console.log(data)
      if (data) {
        toast.success('Patient Updated Successfully')
        getSearchByPatient()
        // window.location.reload()
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (patientById.desc) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        desc: patientById.desc,
      }))
    }
  }, [patientById])

  useEffect(() => {
    getPatientById()
  }, [])

  return (
    <div style={{ margin: '1rem auto 1rem 1rem' }}>
      <div style={{ margin: '1rem auto 1rem 0' }}>
        <h4>Diagnosis</h4>
        <div className="row">
          <div className="row">
            <div className="col-md-4 alignCenterAndMiddle" style={{ border: '1px solid black' }}>
              <h5 style={{ marginTop: '0.5rem' }}>Problems</h5>
            </div>
            <div className="col-md-8">
              <div className="row" style={{ border: '1px solid black' }}>
                <div className="col-md-4 alignCenterAndMiddle">
                  <h5 style={{ marginTop: '0.5rem' }}>LAS</h5>
                </div>
                <div className="col-md-4 alignCenterAndMiddle">
                  <h5 style={{ marginTop: '0.5rem' }}>MPSJ</h5>
                </div>
                <div className="col-md-4 alignCenterAndMiddle">
                  <h5 style={{ marginTop: '0.5rem' }}>OPI</h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        {problems.map((problem, index) => (
          <div key={index} style={{ alignItems: 'center', marginBottom: '10px' }}>
            <div className="row">
              <div className="col-md-4">
                <input
                  type="checkbox"
                  value={problem.problem}
                  onChange={(e) => handleCheckboxChange(problem.problem, e.target.checked)}
                />
                <label>{problem.problem}</label>
              </div>
              <div className="col-sm-8">
                <div className="row">
                  <div className="col-sm-4">
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Scale 1"
                      value={
                        diagnosis.find((item) => item.problem.name === problem.problem)?.problem
                          .scale1 || ''
                      }
                      onChange={(e) => handleInputChange(problem.problem, 'scale1', e.target.value)}
                    />
                  </div>
                  <div className="col-sm-4">
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Scale 2"
                      value={
                        diagnosis.find((item) => item.problem.name === problem.problem)?.problem
                          .scale2 || ''
                      }
                      onChange={(e) => handleInputChange(problem.problem, 'scale2', e.target.value)}
                    />
                  </div>
                  <div className="col-sm-4">
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Scale 3"
                      value={
                        diagnosis.find((item) => item.problem.name === problem.problem)?.problem
                          .scale3 || ''
                      }
                      onChange={(e) => handleInputChange(problem.problem, 'scale3', e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
        <div>
          <textarea
            rows={4}
            className="form-control col-12"
            placeholder="description"
            name="desc"
            value={formData.desc}
            onChange={(e) => setFormData({ ...formData, desc: e.target.value })}
          ></textarea>
        </div>

        <div className="d-flex mt-2">
          <div className="w-50">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={['DateTimePicker']}>
                <DateTimePicker
                  label="Next Appointment Date"
                  value={startingDate}
                  onChange={handleStartingDateChange}
                />
              </DemoContainer>
            </LocalizationProvider>
          </div>
        </div>

        <button type="submit" className="btn btn-primary mt-4">
          Submit
        </button>
      </form>
      <ToastContainer />
    </div>
  )
}

export default PatientAddNewRecord
