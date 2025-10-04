import React, { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import Navbar from "../components/Navbar";
import Loading from "../components/Loading";
import { assets } from "../assets/assets";
import kconvert from "k-convert";
import moment from "moment";
import Footer from "../components/Footer";

const Applyjob = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [levelFilter, setLevelFilter] = useState(null); // State or Senior
  const { jobs } = useContext(AppContext);

  useEffect(() => {
    if (jobs && jobs.length > 0) {
      const found = jobs.find((j) => String(j._id) === String(id));
      if (found) setJob(found);
      else setJob(null);
    }
  }, [id, jobs]);

  if (!job) return <Loading />;

  const handleApply = (selectedJob) => {
    alert(
      `You have applied for ${selectedJob.title} at ${
        selectedJob.companyId?.name || "Company"
      }`
    );
  };

  // Filter other jobs excluding current job and by level, limit 6
  const otherJobs = jobs
    .filter((j) => j._id !== job._id && (!levelFilter || j.level === levelFilter))
    .slice(0, 6);

  return (
    <>
      <Navbar />
      <div className="p-6 max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column: Job Details */}
          <div className="flex-1 space-y-6">
            {/* Job Header */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="flex gap-6 items-start">
                <img
                  src={job.companyId?.image || assets.company_icon}
                  alt={job.companyId?.name || "Company"}
                  className="w-24 h-24 object-cover rounded-xl border"
                />
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

              <div className="flex flex-col items-end mt-8 space-y-2">
                <button
                  onClick={() => handleApply(job)}
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
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">Job Description</h2>
              {job.description ? (
                <div
                  className="prose max-w-none text-gray-700 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: job.description }}
                />
              ) : (
                <p className="text-gray-500">No description available.</p>
              )}
            </div>
          </div>

          {/* Right Column: More Jobs */}
          <div className="w-full lg:w-1/3 space-y-4">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">More Jobs</h2>

            {/* Level Filter Buttons */}
            <div className="flex gap-2 mb-4">
              <button
                className={`px-4 py-1 rounded-lg border ${
                  levelFilter === "State" ? "bg-blue-600 text-white" : "bg-white text-gray-700"
                }`}
                onClick={() => setLevelFilter("State")}
              >
                State
              </button>
              <button
                className={`px-4 py-1 rounded-lg border ${
                  levelFilter === "Senior" ? "bg-blue-600 text-white" : "bg-white text-gray-700"
                }`}
                onClick={() => setLevelFilter("Senior")}
              >
                Senior
              </button>
              <button
                className="px-4 py-1 rounded-lg border bg-gray-100 text-gray-700"
                onClick={() => setLevelFilter(null)}
              >
                All
              </button>
            </div>

            {otherJobs.length > 0 ? (
              otherJobs.map((oj) => (
                <div
                  key={oj._id}
                  className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition duration-300"
                >
                  <h3 className="text-lg font-semibold text-gray-900">{oj.title}</h3>
                  <p className="text-gray-600 text-sm">
                    {oj.companyId?.name || "Company"} • {oj.location || "—"}
                  </p>

                  {/* Short description (2 lines) */}
                  <p className="text-gray-500 text-sm mt-1 line-clamp-2">
                    {oj.description ? oj.description.replace(/<[^>]+>/g, "") : "No description available."}
                  </p>

                  {/* Buttons */}
                  <div className="flex gap-2 mt-3">
                    <button
                      onClick={() => handleApply(oj)}
                      className="flex-1 bg-blue-600 text-white rounded-lg py-1 text-sm hover:bg-blue-700 transition"
                    >
                      Apply Now
                    </button>
                    <Link
                      to={`/applyjob/${oj._id}`}
                      className="flex-1 text-blue-600 border border-blue-600 rounded-lg py-1 text-sm text-center hover:bg-blue-50 transition"
                    >
                      Learn More
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No other jobs available.</p>
            )}
          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default Applyjob;
