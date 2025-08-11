import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import Navbar from '../components/Navbar';
import Loading from '../components/Loading'; 
import { assets, jobsData } from '../assets/assets'; 
import kconvert from 'k-convert';
import moment from 'moment';

const Applyjob = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null); 
  const { jobs } = useContext(AppContext);

  useEffect(() => {
    if (jobs && jobs.length > 0) {
    
      const found = jobs.find((j) => String(j._id) === String(id));
      if (found) {
        setJob(found);
        console.log(found);
      } else {
        setJob(null); 
      }
    }
  }, [id, jobs]);

  if (!job) {
    
    return <Loading />;
  }

  return (
    <>
      <Navbar />
      <div className="p-6">
        <div className="max-w-4xl mx-auto bg-white rounded shadow p-6">
          <div className="flex gap-4 items-start">
            <img
              src={job.companyId?.image || assets.company_icon}
              alt={job.companyId?.name || 'Company'}
              className="w-20 h-20 object-cover rounded"
            />
            <div>
              <h1 className="text-2xl font-bold">{job.title}</h1>

              <div className="flex flex-wrap gap-4 mt-2 text-gray-600">
                <span className="flex items-center gap-2">
                  <img src={assets.suitcase_icon} alt="company" className="w-4 h-4" />
                  {job.companyId?.name || '—'}
                </span>

                <span className="flex items-center gap-2">
                  <img src={assets.location_icon} alt="location" className="w-4 h-4" />
                  {job.location || '—'}
                </span>

                <span className="flex items-center gap-2">
                  <img src={assets.person_icon} alt="level" className="w-4 h-4" />
                  {job.level || '—'}
                </span>

                <span className="flex items-center gap-2">
                  <img src={assets.money_icon} alt="salary" className="w-4 h-4" />
                  CTC:{' '}
                  {job.salary
                    ? typeof kconvert?.convertTo === 'function'
                      ? kconvert.convertTo(job.salary)
                      : job.salary
                    : '—'}
                </span>
              </div>
            </div>
          </div>

          <div>
            <button>
              Apply Now
            </button>
            <p>posted{moment(jobsData.data).fromNow()}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Applyjob;
