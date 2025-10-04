import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import { assets, jobsApplied } from '../assets/assets'

const Applications = () => {
  const [isEdit, setIsEdit] = useState(false)
  const [resume, setResume] = useState(null)

  return (
    <>
      <Navbar />
      <div className='container px-4 min-h-[100vh] 2xl:px-20 mx-auto my-10'>

        {/* Resume Section */}
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Your Resume</h2>
        {
          isEdit ? (
            <div className='flex items-center gap-4 mb-6'>
              <label 
                className='flex items-center gap-2 cursor-pointer bg-blue-100 hover:bg-blue-200 
                text-blue-600 px-4 py-2 rounded-lg shadow-sm transition'
                htmlFor="resumeUpload">
                <span>Select Resume</span>
                <input 
                  id='resumeUpload' 
                  onChange={e => setResume(e.target.files[0])} 
                  accept='application/pdf' 
                  type="file" 
                  hidden 
                />
                <img src={assets.profile_upload_icon} alt="upload" className="w-6 h-6"/>
              </label>
              <button 
                onClick={() => setIsEdit(false)} 
                className='bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg shadow-md transition'>
                Save
              </button>
            </div>
          ) : (
            <div className='flex gap-4 mb-6'>
              <a 
                className='bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md transition'
                href={resume ? URL.createObjectURL(resume) : "#"} 
                target='_blank' 
                rel='noopener noreferrer'>
                View Resume
              </a>
              <button 
                onClick={() => setIsEdit(true)} 
                className='text-gray-600 border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-100 transition'>
                Edit
              </button>
            </div>
          )
        }

        {/* Jobs Applied Section */}
        <h2 className='text-2xl font-bold mb-4 text-gray-800'>Jobs Applied</h2>
        <div className="overflow-x-auto shadow-lg rounded-lg border border-gray-200 max-w-4xl mx-auto">
          <table className='w-full bg-white rounded-lg overflow-hidden'>
            <thead>
              <tr className="bg-gray-100 text-gray-700 uppercase text-sm">
                <th className="py-3 px-6 text-left">Company</th>
                <th className="py-3 px-6 text-left">Job Title</th>
                <th className="py-3 px-6 text-left">Location</th>
                <th className="py-3 px-6 text-left">Date</th>
                <th className="py-3 px-6 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {jobsApplied.map((job, index) => (
                <tr 
                  key={index} 
                  className="border-b hover:bg-gray-50 transition">
                  <td className="py-3 px-6 flex items-center gap-2">
                    <img src={job.logo} alt="" className="w-6 h-6" />
                    {job.company}
                  </td>
                  <td className="py-3 px-6">{job.title}</td>
                  <td className="py-3 px-6">{job.location}</td>
                  <td className="py-3 px-6">{new Date(job.date).toLocaleDateString()}</td>
                  <td className="py-3 px-6">
                    <button
                      className={`px-4 py-1.5 rounded-lg text-sm font-medium shadow-sm
                        ${job.status === "Accepted" ? "bg-green-100 text-green-700 border border-green-300" :
                          job.status === "Rejected" ? "bg-red-100 text-red-700 border border-red-300" :
                          job.status === "Pending" ? "bg-yellow-100 text-yellow-700 border border-yellow-300" :
                          "bg-blue-100 text-blue-700 border border-blue-300"}`}
                    >
                      {job.status}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </>
  )
}

export default Applications
