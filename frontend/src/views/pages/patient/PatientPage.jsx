import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { getFetch, postFetchData } from 'src/api/Api'
import PatientInfoData from './PatientInfoData'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Loader from '../loader/Loader'
const PatientPage = () => {
  let patientData = localStorage.getItem('patientRecord')
  let patientRecord = JSON.parse(patientData)
  const [loader, setLoader] = useState(false)
  const [startingDate, setStartingDate] = React.useState(null)
  const [data, setData] = useState(false)
  const [search, setSearch] = useState('')
  const [patientSearch, setPatientSearch] = useState([])
  const [problems, setProblems] = useState([
    {
      problem: 'pain',
    },
    {
      problem: 'pain2',
    },
  ])
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    sex: 'male',
    phone: '',
    crn: '',
    diagnosis: [],
    desc: '',
    doctor_id: patientRecord?._id,
  })
  const [diagnosis, setDiagnosis] = useState([])

  const handleStartingDateChange = (date) => {
    setStartingDate(date)
  }
  console.log('value date', startingDate)
  useEffect(() => {
    // Fetch problems from API
    setSearch('')
    fetchProblems()
  }, [])

  const fetchProblems = async () => {
    try {
      // Simulated data since API endpoint is not provided
      const data = [
        {
          problem: 'pain',
        },
        {
          problem: 'pain2',
        },
      ]
      setProblems(data)
    } catch (error) {
      console.error('Error fetching problems:', error)
    }
  }
  // <FontAwesomeIcon icon={faXmark} />

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

  const clearSearch = () => {
    try {
      setSearch('')
      setPatientSearch([])
      // getSearchByPatient()
    } catch (error) {
      console.log(error)
    }
  }

  const getSearchByPatient = async () => {
    try {
      setLoader(true)
      // if (search?.length === 0) {
      //   setSearch('')
      // }
      const data = await getFetch(
        `http://localhost:8090/api/patient/${search}/${patientRecord?._id}`,
      )

      setPatientSearch(data?.data?.data)
      setTimeout(() => {
        setLoader(false)
      }, 3000)
      // getSearchByPatient()
    } catch (error) {
      console.log(error)
    }
  }

  const handleSubmit = async () => {
    console.log('hello')
    if (diagnosis.length === 0) {
      return toast.warning('Please select at least one problem')
    }

    // Check if required fields are filled
    if (!formData.name || !formData.age || !formData.sex || !formData.phone || !formData.crn) {
      return toast.warning('Please fill all Patient details')
    }

    const updatedFormData = {
      ...formData,
      diagnosis: diagnosis,
      nextApointmentDate: startingDate,
    }

    // if (!updatedFormData.crn || !updatedFormData.phone) {
    //   return alert('Please fill all details')
    // }

    try {
      const data = await postFetchData('http://localhost:8090/api/patient/create', updatedFormData)
      if (data.success === true) {
        toast.success('Patient Created Successfully')
        setTimeout(() => {
          setData(false)
        }, 2000)
        setFormData({
          name: '',
          age: '',
          sex: 'male',
          phone: '',
          crn: '',
          diagnosis: [],
          desc: '',
          doctor_id: patientRecord?._id,
        })
      }
    } catch (error) {
      console.error('Error submitting data:', error)
    }
  }

  let [dateAndTime, setDateAndTime] = useState(new Date())

  // useEffect(() => {
  //   getSearchByPatient()
  // }, [search])
  return (
    <>
      <div>
        {!data ? (
          <div>
            <p style={{ fontWeight: 'bolder' }}>Search Patient</p>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div className="d-flex">
                <input
                  style={{ paddingLeft: '5px' }}
                  className="form-control"
                  placeholder="CRN or PhoneNumber"
                  type="text"
                  name="search"
                  value={search}
                  // autoComplete={false}
                  onChange={(e) => setSearch(e.target.value)}
                />
                {/* <button
                className="btn btn-primary"
                style={{
                  marginLeft: '1rem',
                  borderRadius: '5px',
                  position: 'absolute',
                  marginLeft: '200px',
                }}
                type="button"
                onClick={clearSearch}
              > */}
                {/* <MdCancel /> */}
                {search?.length ? (
                  <FontAwesomeIcon
                    icon={faXmark}
                    style={{
                      marginLeft: '1rem',
                      borderRadius: '5px',
                      position: 'absolute',
                      marginLeft: '240px',
                      marginTop: '10px',
                      cursor: 'pointer',
                    }}
                    onClick={clearSearch}
                  />
                ) : (
                  ''
                )}
                {/* </button> */}
                <button
                  className="btn btn-primary"
                  style={{ marginLeft: '1rem', borderRadius: '5px' }}
                  type="button"
                  onClick={getSearchByPatient}
                >
                  Search
                </button>
              </div>
              <div>
                <button
                  style={{ marginLeft: '1rem', borderRadius: '5px' }}
                  type="button"
                  onClick={() => setData(true)}
                  className="btn btn-outline-dark"
                >
                  Add a Patient
                </button>
              </div>
            </div>
          </div>
        ) : (
          ''
        )}

        {patientSearch?.length && !data ? (
          <PatientInfoData
            patientSearch={patientSearch}
            setData={setData}
            getSearchByPatient={getSearchByPatient}
          />
        ) : (
          <div>
            {data ? (
              <div style={{ marginTop: '1rem' }}>
                <div>
                  <hr />
                  <h4>Patient Details</h4>
                  <div className="row">
                    <div className="col-md-4">
                      <div className="row">
                        <label className="col-sm-2 mt-2 patientNamediv">Name</label>
                        <div className="col-sm-8">
                          <input
                            type="text"
                            className="form-control"
                            name="name"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="row">
                        <label className="col-sm-2 mt-2 patientNamediv">Age:</label>
                        <div className="col-sm-8">
                          <input
                            type="number"
                            className="form-control"
                            name="age"
                            value={formData.age}
                            onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="row">
                        <label className="col-sm-2 mt-2 patientNamediv">Sex:</label>
                        <div className="col-sm-8">
                          <select
                            className="form-control"
                            name="sex"
                            value={formData.sex}
                            onChange={(e) => setFormData({ ...formData, sex: e.target.value })}
                          >
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className="row mt-4">
                      <div className="col-md-5">
                        <div className="row">
                          <label className="col-sm-4 mt-2 patientNamediv">Phone Number:</label>
                          <div className="col-sm-7">
                            <input
                              className="form-control"
                              type="tel"
                              name="phone"
                              value={formData.phone}
                              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                              required={true}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-md-5">
                        <div className="row">
                          <label className="col-sm-4 mt-2 patientNamediv">CRN Number:</label>
                          <div className="col-sm-7">
                            <input
                              className="form-control"
                              type="tel"
                              name="crn"
                              value={formData.crn}
                              onChange={(e) => setFormData({ ...formData, crn: e.target.value })}
                              required={true}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <hr />
                  <div style={{ margin: '1rem auto 1rem 0' }}>
                    <h4>Diagnosis</h4>
                    <div className="row">
                      <div className="row">
                        <div
                          className="col-md-4 alignCenterAndMiddle"
                          style={{ border: '1px solid black' }}
                        >
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
                  <form>
                    {problems.map((problem, index) => (
                      <div key={index} style={{ alignItems: 'center', marginBottom: '10px' }}>
                        <div className="row">
                          <div className="col-md-4">
                            <input
                              type="checkbox"
                              value={problem.problem}
                              onChange={(e) =>
                                handleCheckboxChange(problem.problem, e.target.checked)
                              }
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
                                    diagnosis.find((item) => item.problem.name === problem.problem)
                                      ?.problem.scale1 || ''
                                  }
                                  onChange={(e) =>
                                    handleInputChange(problem.problem, 'scale1', e.target.value)
                                  }
                                  disabled={
                                    !diagnosis.some((item) => item.problem.name === problem.problem)
                                  }
                                />
                              </div>
                              <div className="col-sm-4">
                                <input
                                  className="form-control"
                                  type="text"
                                  placeholder="Scale 2"
                                  value={
                                    diagnosis.find((item) => item.problem.name === problem.problem)
                                      ?.problem.scale2 || ''
                                  }
                                  onChange={(e) =>
                                    handleInputChange(problem.problem, 'scale2', e.target.value)
                                  }
                                  disabled={
                                    !diagnosis.some((item) => item.problem.name === problem.problem)
                                  }
                                />
                              </div>
                              <div className="col-sm-4">
                                <input
                                  className="form-control"
                                  type="text"
                                  placeholder="Scale 3"
                                  value={
                                    diagnosis.find((item) => item.problem.name === problem.problem)
                                      ?.problem.scale3 || ''
                                  }
                                  onChange={(e) =>
                                    handleInputChange(problem.problem, 'scale3', e.target.value)
                                  }
                                  disabled={
                                    !diagnosis.some((item) => item.problem.name === problem.problem)
                                  }
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </form>
                  <div>
                    <textarea
                      rows={4}
                      className="form-control col-12"
                      placeholder="Prescription"
                      name="desc"
                      value={formData.desc}
                      onChange={(e) => setFormData({ ...formData, desc: e.target.value })}
                    ></textarea>
                  </div>
                </div>
                <div>
                  {/* <DateTimePicker /> */}
                  {/* <LocalizationProvider>
                    <DateTimePicker
                      label="DateTimePicker"
                      value={dateAndTime}
                      onChange={(newValue) => {
                        setDateAndTime(newValue)
                      }}
                    />
                  </LocalizationProvider> */}
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
                </div>
                <div className="text-end m-4">
                  <button
                    className="btn btn-info mt-3 mx-2"
                    style={{ width: '10%' }}
                    onClick={handleSubmit}
                  >
                    Submit
                  </button>
                  <button
                    className="btn btn-info mt-3"
                    style={{ width: '10%' }}
                    onClick={() => setData(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            ) : (
              <div
                style={{
                  width: '100%',
                  height: '20vh',
                  lineHeight: '20vh',
                  textAlign: 'center',
                  backgroundColor: 'white',
                  marginTop: '10px',
                }}
              >
                {loader ? <Loader /> : 'No Data'}
              </div>
            )}
          </div>
        )}
      </div>
      <ToastContainer />
    </>
  )
}

export default PatientPage
