import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { assets, JobCategories, JobLocations } from '../assets/assets';
import JobCard from './JobCard';

const JobListing = () => {
  const { isSearched, searchFilter, setSearchFilter, jobs } = useContext(AppContext);
  const [showFilter, setShowFilter] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState(jobs);

  const jobsPerPage = 6;

  const handleCategoryChange = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
    );
  };

  const handleLocationChange = (location) => {
    setSelectedLocations((prev) =>
      prev.includes(location) ? prev.filter((c) => c !== location) : [...prev, location]
    );
  };

  useEffect(() => {
    const matchesCategory = (job) =>
      selectedCategories.length === 0 || selectedCategories.includes(job.category);

    const matchesLocation = (job) =>
      selectedLocations.length === 0 || selectedLocations.includes(job.location);

    const matchesTitle = (job) =>
      searchFilter.title === '' || job.title.toLowerCase().includes(searchFilter.title.toLowerCase());

    const matchesSearchLocation = (job) =>
      searchFilter.location === '' || job.location.toLowerCase().includes(searchFilter.location.toLowerCase());

    const newFilteredJobs = jobs
      .slice()
      .reverse()
      .filter(
        (job) =>
          matchesCategory(job) &&
          matchesLocation(job) &&
          matchesTitle(job) &&
          matchesSearchLocation(job)
      );

    setFilteredJobs(newFilteredJobs);
    setCurrentPage(1); // reset to first page whenever filters change
  }, [jobs, selectedCategories, selectedLocations, searchFilter]);

  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);
  const paginatedJobs = filteredJobs.slice((currentPage - 1) * jobsPerPage, currentPage * jobsPerPage);

  // Scroll to top of job list when page changes
  useEffect(() => {
    const listEl = document.getElementById('job-list');
    if (listEl) {
      listEl.scrollIntoView({ behavior: 'smooth' });
    }
  }, [currentPage]);

  return (
    <div className='container 2xl:px-20 mx-auto flex flex-col lg:flex-row lg:gap-12 max-lg:space-y-12 py-12'>
      {/* Sidebar */}
      <div className='w-full lg:w-1/4 px-4'>
        {/* Current Search Filter */}
        {isSearched && (searchFilter.title || searchFilter.location) && (
          <>
            <h3 className='font-semibold text-xl mb-6'>Current Search</h3>
            <div className='mb-8 text-gray-700 flex flex-wrap gap-4'>
              {searchFilter.title && (
                <span className='inline-flex items-center gap-2 bg-blue-100 border border-blue-300 px-4 py-2 rounded-full text-base'>
                  Title: {searchFilter.title}
                  <img
                    onClick={() => setSearchFilter((prev) => ({ ...prev, title: '' }))}
                    className='cursor-pointer w-5 h-5'
                    src={assets.cross_icon}
                    alt='Clear Title'
                  />
                </span>
              )}
              {searchFilter.location && (
                <span className='inline-flex items-center gap-2 bg-red-100 border border-red-300 px-4 py-2 rounded-full text-base'>
                  Location: {searchFilter.location}
                  <img
                    onClick={() => setSearchFilter((prev) => ({ ...prev, location: '' }))}
                    className='cursor-pointer w-5 h-5'
                    src={assets.cross_icon}
                    alt='Clear Location'
                  />
                </span>
              )}
            </div>
          </>
        )}

        {/* Filter Toggle Button (Mobile only) */}
        <button
          onClick={() => setShowFilter((prev) => !prev)}
          className='px-6 py-1.5 rounded border border-gray-400 lg:hidden mb-6'
        >
          {showFilter ? 'Close Filters' : 'Show Filters'}
        </button>

        {/* Filters Section */}
        <div className={`${showFilter ? 'block' : 'hidden'} lg:block`}>
          {/* Category Filter */}
          <div className='mb-12 p-6 border border-gray-300 rounded-2xl shadow-md bg-white'>
            <h4 className='text-2xl font-bold mb-6 text-purple-800'>Search by Categories</h4>
            <ul className='space-y-6'>
              {JobCategories.map((category, index) => (
                <li key={index} className='flex items-center gap-4 text-xl text-gray-800'>
                  <input
                    type='checkbox'
                    checked={selectedCategories.includes(category)}
                    onChange={() => handleCategoryChange(category)}
                  />
                  <label className='cursor-pointer'>{category}</label>
                </li>
              ))}
            </ul>
          </div>

          {/* Location Filter */}
          <div className='p-6 border border-gray-300 rounded-2xl shadow-md bg-white'>
            <h4 className='text-2xl font-bold mb-6 text-purple-800'>Search by Locations</h4>
            <ul className='space-y-6'>
              {JobLocations.map((location, index) => (
                <li key={index} className='flex items-center gap-4 text-xl text-gray-800'>
                  <input
                    type='checkbox'
                    checked={selectedLocations.includes(location)}
                    onChange={() => handleLocationChange(location)}
                  />
                  <label className='cursor-pointer'>{location}</label>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Job Listings */}
      <section id="job-list" className='w-full lg:w-3/4 text-gray-900 max-lg:px-4'>
        <h3 className='font-bold text-4xl py-4 ml-4 text-purple-900'>Latest Jobs</h3>
        <p className='mb-12 ml-4 text-lg text-gray-600'>Get your desired job from top companies</p>

        <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-10'>
          {paginatedJobs.length > 0 ? (
            paginatedJobs.map((job, index) => (
              <JobCard key={index} job={job} />
            ))
          ) : (
            <p className='col-span-full text-center text-gray-500'>No jobs found.</p>
          )}
        </div>

        {/* Pagination */}
        {filteredJobs.length > jobsPerPage && (
          <div className='flex items-center justify-center space-x-2 mt-10'>
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              <img src={assets.left_arrow_icon} alt='Previous' />
            </button>

            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index + 1)}
                className={`w-10 h-10 flex items-center justify-center border border-gray-300 rounded ${
                  currentPage === index + 1
                    ? 'bg-blue-100 text-blue-500'
                    : 'text-gray-500'
                }`}
              >
                {index + 1}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              <img src={assets.right_arrow_icon} alt='Next' />
            </button>
          </div>
        )}
      </section>
    </div>
  );
};

export default JobListing;
