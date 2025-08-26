import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import Navbar from "../components/Navbar";
import Loading from "../components/Loading";
import { assets } from "../assets/assets";
import kconvert from "k-convert";
import moment from "moment";

const Applyjob = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const { jobs } = useContext(AppContext);

  // ✅ Fetch job details based on ID
  useEffect(() => {
    if (jobs && jobs.length > 0) {
      const found = jobs.find((j) => String(j._id) === String(id));
      if (found) {
        setJob(found);
        console.log("Job Found:", found);
      } else {
        setJob(null);
      }
    }
  }, [id, jobs]);

  // ✅ Show loading while fetching job details
  if (!job) {
    return <Loading />;
  }

  // ✅ Handle Apply Now Button Click
  const handleApply = () => {
    alert(`You have applied for ${job.title} at ${job.companyId?.name || "Company"}`);
    // 🔹 You can replace alert with:
    // 1. Navigation to a job application form page
    // 2. API call to store applicant details
  };

  return (
    <>
      <Navbar />
      <div className="p-6">
        {/* Job Header Section */}
        <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg p-8">
          <div className="flex gap-6 items-start">
            {/* Company Logo */}
            <img
              src={job.companyId?.image || assets.company_icon}
              alt={job.companyId?.name || "Company"}
              className="w-24 h-24 object-cover rounded-xl border"
            />

            {/* Job Info */}
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{job.title}</h1>

              <div className="flex flex-wrap gap-6 mt-3 text-gray-600 text-sm">
                <span className="flex items-center gap-2">
                  <img src={assets.suitcase_icon} alt="company" className="w-4 h-4" />
                  {job.companyId?.name || "—"}
                </span>

                <span className="flex items-center gap-2">
                  <img src={assets.location_icon} alt="location" className="w-4 h-4" />
                  {job.location || "—"}
                </span>

                <span className="flex items-center gap-2">
                  <img src={assets.person_icon} alt="level" className="w-4 h-4" />
                  {job.level || "—"}
                </span>

                <span className="flex items-center gap-2">
                  <img src={assets.money_icon} alt="salary" className="w-4 h-4" />
                  <span>
                    CTC:{" "}
                    {job.salary
                      ? typeof kconvert?.convertTo === "function"
                        ? kconvert.convertTo(job.salary)
                        : job.salary
                      : "—"}
                  </span>
                </span>
              </div>
            </div>
          </div>

          {/* Apply Button & Posted Date */}
          <div className="flex flex-col items-end mt-8 space-y-2">
            <button
              onClick={handleApply}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md px-6 py-2 transition duration-300"
            >
              Apply Now
            </button>
            <p className="text-gray-500 text-xs">
              Posted {moment(job.createdAt).fromNow()}
            </p>
          </div>
        </div>

        {/* Job Description */}
        <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg p-8 mt-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">
            Job Description
          </h2>
          {job.description ? (
            <div
              className="prose max-w-none text-gray-700 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: job.description }}
            />
          ) : (
            <p className="text-gray-500">No description available.</p>
          )}
        </div>

        {/* Key Responsibilities */}
        {job.responsibilities && job.responsibilities.length > 0 && (
          <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg p-8 mt-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">
              Key Responsibilities
            </h2>
            <ul className="list-disc list-inside space-y-2 pl-4 text-gray-700">
              {job.responsibilities.map((resp, index) => (
                <li key={index} className="leading-relaxed">
                  {resp}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Skills Required */}
        {job.skills && job.skills.length > 0 && (
          <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg p-8 mt-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">
              Skills Required
            </h2>
            <ul className="list-disc list-inside space-y-2 pl-4 text-gray-700">
              {job.skills.map((skill, index) => (
                <li key={index} className="leading-relaxed">
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  );
};

export default Applyjob;
