// import React from 'react'
// import PropTypes from 'prop-types'
// const PatientShowDetails = ({ diagnosis, desc }) => {
//   PatientShowDetails.propTypes = {
//     diagnosis: PropTypes.func.isRequired,
//     desc: PropTypes.func.isRequired,
//   }
//   let LAS = 3
//   let MPSJ = 4
//   let OPI = 6

//   return (
//     <div>
//       {diagnosis?.map((elem) => {
//         const { problem, date } = elem
//         let dateData = Number(date)
//         const timestamp = dateData
//         const datee = new Date(timestamp)
//         const formattedDate = `${datee.getFullYear()}-${(datee.getMonth() + 1)
//           .toString()
//           .padStart(2, '0')}-${datee.getDate().toString().padStart(2, '0')} ${datee
//           .getHours()
//           .toString()
//           .padStart(2, '0')}:${datee.getMinutes().toString().padStart(2, '0')}:${datee
//           .getSeconds()
//           .toString()
//           .padStart(2, '0')}`
//         console.log(formattedDate)
//         return (
//           <>
//             <div className="row">
//               <div style={{ margin: '1rem auto 1rem 1rem' }}>
//                 <h5>Diagnose Date : {formattedDate}</h5>
//                 <div className="row">
//                   <div className="col-md-4">
//                     <h6>Problems :</h6>
//                   </div>
//                   <div className="col-md-8">
//                     <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
//                       <p>{problem?.name}</p>
//                       <div style={{ display: 'flex' }}>
//                         <p>LAS &nbsp;&nbsp;</p>
//                         <p>{problem?.scale1}</p>
//                       </div>
//                       <div style={{ display: 'flex' }}>
//                         <p>MPSJ &nbsp;&nbsp;</p>
//                         <p>{problem?.scale2}</p>
//                       </div>
//                       <div style={{ display: 'flex' }}>
//                         <p>OPI &nbsp;&nbsp;</p>
//                         <p>{problem?.scale3}</p>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//                 {/* <div className="row" style={{ marginTop: '1rem' }}>
//                   <div className="col-md-4">
//                     <h6>Discription :</h6>{' '}
//                   </div>
//                   <div className="col-md-8">
//                     <p>safdkjshfjaisdfjidsajfdjdk dnfjjdsan</p>
//                   </div>
//                 </div> */}
//               </div>
//               <hr />
//             </div>
//           </>
//         )
//       })}
//       <div className="row">
//         <div style={{ margin: '1rem auto 1rem 1rem' }}>
//           <div className="row" style={{ marginTop: '1rem' }}>
//             <div className="col-md-5">
//               <h6>Discription :</h6>{' '}
//             </div>
//             <div className="col-md-7">
//               <p>{desc}</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default PatientShowDetails

import React from 'react'
import PropTypes from 'prop-types'
const PatientShowDetails = ({ diagnosis, desc }) => {
  PatientShowDetails.propTypes = {
    diagnosis: PropTypes.func.isRequired,
    desc: PropTypes.func.isRequired,
  }
  console.log('dia', diagnosis)
  return (
    <div
      style={{
        maxHeight: '300px',
        overflowY: 'scroll',
        overflowX: 'hidden',
        marginTop: '20px',
      }}
    >
      {diagnosis?.reverse()?.map((elem) => {
        const { problem, date } = elem
        // let dateData = Number(date)
        // const timestamp = dateData
        // const datee = new Date(timestamp)
        // const formattedDate = `${datee.getFullYear()}-${(datee.getMonth() + 1)
        //   .toString()
        //   .padStart(2, '0')}-${datee.getDate().toString().padStart(2, '0')} ${datee
        //   .getHours()
        //   .toString()
        //   .padStart(2, '0')}:${datee.getMinutes().toString().padStart(2, '0')}:${datee
        //   .getSeconds()
        //   .toString()
        //   .padStart(2, '0')}`
        let dateData = Number(date)
        const timestamp = dateData
        const datee = new Date(timestamp)

        // Adjusting for Indian time zone (UTC+5:30)
        datee.setHours(datee.getHours() + 5)
        datee.setMinutes(datee.getMinutes() + 30)

        const hours = datee.getHours()
        const am_pm = hours >= 12 ? 'PM' : 'AM'
        const formattedHours = hours % 12 || 12 // Convert 24-hour to 12-hour format

        const formattedDate = `${datee.getFullYear()}-${(datee.getMonth() + 1)
          .toString()
          .padStart(2, '0')}-${datee.getDate().toString().padStart(2, '0')} ${formattedHours
          .toString()
          .padStart(2, '0')}:${datee.getMinutes().toString().padStart(2, '0')}:${datee
          .getSeconds()
          .toString()
          .padStart(2, '0')} ${am_pm}`

        console.log(formattedDate)
        return (
          <>
            <div className="row">
              <div style={{ margin: '1rem auto 1rem 1rem' }}>
                <h5>Diagnose Date : {formattedDate}</h5>
                {/* <div className="row">
                  <div className="col-md-4">
                    <h6>Problems :</h6>
                  </div>
                  <div className="col-md-8">
                    <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                      <p>{problem?.name}</p>
                      <div style={{ display: 'flex' }}>
                        <p>LAS &nbsp;&nbsp;</p>
                        <p>{problem?.scale1}</p>
                      </div>
                      <div style={{ display: 'flex' }}>
                        <p>MPSJ &nbsp;&nbsp;</p>
                        <p>{problem?.scale2}</p>
                      </div>
                      <div style={{ display: 'flex' }}>
                        <p>OPI &nbsp;&nbsp;</p>
                        <p>{problem?.scale3}</p>
                      </div>
                    </div>
                  </div>
                </div> */}
                <table
                  className="table"
                  style={{
                    width: '90%',
                    border: '1px solid',
                    fontFamily: 'ui-rounded',
                    borderRadius: '10px',
                  }}
                >
                  <thead>
                    <tr>
                      <th scope="col" style={{ background: '#FBF295' }}>
                        Problems
                      </th>
                      <th scope="col" style={{ background: '#FBF295' }}>
                        LAS
                      </th>
                      <th scope="col" style={{ background: '#FBF295' }}>
                        MPSJ
                      </th>
                      <th scope="col" style={{ background: '#FBF295' }}>
                        OPI
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td style={{ fontWeight: 'bolder' }}>{problem?.name}</td>
                      <td style={{ fontWeight: 'bolder' }}>{problem?.scale1}</td>
                      <td style={{ fontWeight: 'bolder' }}>{problem?.scale2}</td>
                      <td style={{ fontWeight: 'bolder' }}>{problem?.scale3}</td>
                    </tr>
                  </tbody>
                </table>
                {/* <div className="row" style={{ marginTop: '1rem' }}>
                  <div className="col-md-4">
                    <h6>Discription :</h6>{' '}
                  </div>
                  <div className="col-md-8">
                    <p>safdkjshfjaisdfjidsajfdjdk dnfjjdsan</p>
                  </div>
                </div> */}
              </div>
              <hr />
            </div>
          </>
        )
      })}
      {/* <div className="row">
        <div style={{ margin: '1rem auto 1rem 1rem' }}>
          <div className="row" style={{ marginTop: '1rem' }}>
            <div className="col-md-5">
              <h6>Discription :</h6>{' '}
            </div>
            <div className="col-md-7">
              <p>{desc}</p>
            </div>
            <div className="col-md-2" style={{ paddingTop: '1rem' }}>
              <h5>Discription:</h5>
            </div>
            <div className="col-md-10">
              <div className="card" style={{ width: '87%', padding: '1rem 2rem 1rem 2rem' }}>
                <p>{desc}</p>
              </div>
            </div>
          </div>
        </div>
      </div> */}
      <div className="row">
        <div style={{ margin: '1rem auto 1rem 1rem' }}>
          <div className="row" style={{ marginTop: '1rem' }}>
            <div className="col-md-2 d-flex align-items-center">
              <h5>Discription:</h5>
            </div>
            <div className="col-md-10 d-flex align-items-center">
              <div className="card" style={{ width: '87%', padding: '1rem 2rem' }}>
                <p style={{ margin: '0' }}>{desc}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PatientShowDetails
