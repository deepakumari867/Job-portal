import React from 'react';
import { assets } from '../assets/assets';
import {useNavigate} from 'react-router-dom'
const JobCard = ({ job }) => {

  const navigate=useNavigate()
  return (
    <div className="border p-6 shadow rounded">
      <div className="flex justify-between items-center">
        <img className='h-8' src={assets.company_icon} alt="Close Icon" />
      </div>
      <h4 className="text-xl font-medium mt-2">{job.title}</h4>
      <div className="flex gap-4 text-sm text-gray-600 mt-1 mb-2">
        <span className='text-black px-4 py-2 rounded border border-blue-200 bg-blue-50'>{job.location}</span>
        <span className='bg-red-50 border border-red-200  text-black px-4 py-2 rounded'>{job.level}</span>
      </div>
      <p
        className="text-gray-700 text-sm mb-4"
        dangerouslySetInnerHTML={{ __html: job.description.slice(0, 150) + '...' }}
      ></p>
      <div className="flex gap-4">
        <button onClick={()=>{navigate(`/apply-job/${job._id}`);scrollTo(0,0)}}className=" bg-blue-600 text-white px-4 py-2 rounded ">Apply Now</button>
        <button onClick={()=>{navigate(`/apply-job/${job._id}`);scrollTo(0,0)}}className="border border-blue-600 text-blue-600 px-4 py-2 rounded">Learn More</button>
      </div>
    </div>
  );
};

export default JobCard;
