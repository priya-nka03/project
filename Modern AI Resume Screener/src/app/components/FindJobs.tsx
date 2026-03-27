import React, { useState } from 'react';
import { Briefcase, MapPin, DollarSign, Clock, Search, Filter, MoreVertical, X, Award } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface FindJobsProps {
  onNavigate?: (view: string, jobData?: any) => void;
}

const availableJobs = [
  { id: 1, title: 'Senior Frontend Developer', company: 'InnovateTech', location: 'San Francisco, CA', salary: '$140k - $180k', salaryMin: 140000, salaryMax: 180000, type: 'Full-time', posted: '2h ago', experience: '5-7', matchScore: 92 },
  { id: 2, title: 'Product Designer', company: 'CreativePulse', location: 'Remote', salary: '$120k - $160k', salaryMin: 120000, salaryMax: 160000, type: 'Contract', posted: '5h ago', experience: '3-5', matchScore: 78 },
  { id: 3, title: 'Backend Engineer (Node.js)', company: 'DataStream', location: 'New York, NY', salary: '$150k - $190k', salaryMin: 150000, salaryMax: 190000, type: 'Full-time', posted: '1d ago', experience: '5-7', matchScore: 95 },
  { id: 4, title: 'Marketing Specialist', company: 'GrowthScale', location: 'Austin, TX', salary: '$80k - $110k', salaryMin: 80000, salaryMax: 110000, type: 'Hybrid', posted: '2d ago', experience: '1-3', matchScore: 65 },
  { id: 5, title: 'QA Automation Engineer', company: 'SafeGuard', location: 'Remote', salary: '$110k - $140k', salaryMin: 110000, salaryMax: 140000, type: 'Full-time', posted: '3d ago', experience: '3-5', matchScore: 88 },
  { id: 6, title: 'Full Stack Developer', company: 'TechFlow', location: 'Seattle, WA', salary: '$130k - $170k', salaryMin: 130000, salaryMax: 170000, type: 'Full-time', posted: '1d ago', experience: '5-7', matchScore: 91 },
  { id: 7, title: 'DevOps Engineer', company: 'CloudBase', location: 'Remote', salary: '$145k - $185k', salaryMin: 145000, salaryMax: 185000, type: 'Full-time', posted: '4h ago', experience: '7-10', matchScore: 85 },
  { id: 8, title: 'UI/UX Designer', company: 'DesignCo', location: 'Los Angeles, CA', salary: '$95k - $125k', salaryMin: 95000, salaryMax: 125000, type: 'Hybrid', posted: '6h ago', experience: '3-5', matchScore: 72 },
];

const recentJobs = [
  { id: 101, title: 'Senior Product Designer', applicants: 48, status: 'Active', posted: '2 days ago', company: 'TechFlow', location: 'Remote', salary: '$135k - $175k', type: 'Full-time', experience: '5-7', matchScore: 94 },
  { id: 102, title: 'Fullstack Engineer (React)', applicants: 124, status: 'Active', posted: '5 days ago', company: 'DesignCo', location: 'New York, NY', salary: '$140k - $180k', type: 'Full-time', experience: '5-7', matchScore: 96 },
  { id: 103, title: 'Growth Marketing Manager', applicants: 32, status: 'Active', posted: '1 week ago', company: 'SaaSify', location: 'San Francisco, CA', salary: '$115k - $145k', type: 'Hybrid', experience: '3-5', matchScore: 89 },
  { id: 104, title: 'Customer Success Lead', applicants: 15, status: 'Active', posted: '2 weeks ago', company: 'CloudBase', location: 'Austin, TX', salary: '$90k - $120k', type: 'Remote', experience: '3-5', matchScore: 87 },
];

export const FindJobs: React.FC<FindJobsProps> = ({ onNavigate }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [pendingSearchTerm, setPendingSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(true);
  const [filters, setFilters] = useState({
    experience: '',
    location: '',
    salaryMin: 0,
    salaryMax: 500000,
  });
  const [filteredJobs, setFilteredJobs] = useState(availableJobs);
  const [hasActiveFilters, setHasActiveFilters] = useState(false);
  const [sortedRecentJobs, setSortedRecentJobs] = useState(
    [...recentJobs].sort((a, b) => b.matchScore - a.matchScore)
  );

  const handleSearchInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPendingSearchTerm(event.target.value);
  };

  const executeSearch = () => {
    setSearchTerm(pendingSearchTerm);
    applyFilters(pendingSearchTerm, filters);
  };

  const handleSearchKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      executeSearch();
    }
  };

  const handleFilterChange = (filterName: string, value: string | number) => {
    const newFilters = { ...filters, [filterName]: value };
    setFilters(newFilters);
    applyFilters(searchTerm, newFilters);
  };

  const applyFilters = (term: string, currentFilters: typeof filters) => {
    let filtered = availableJobs;
    let hasFilters = false;

    // Search filter
    if (term) {
      filtered = filtered.filter(job => 
        job.title.toLowerCase().includes(term.toLowerCase()) ||
        job.company.toLowerCase().includes(term.toLowerCase()) ||
        job.location.toLowerCase().includes(term.toLowerCase())
      );
      hasFilters = true;
    }

    // Experience filter
    if (currentFilters.experience) {
      filtered = filtered.filter(job => job.experience === currentFilters.experience);
      hasFilters = true;
    }

    // Location filter
    if (currentFilters.location) {
      filtered = filtered.filter(job => 
        job.location.toLowerCase().includes(currentFilters.location.toLowerCase())
      );
      hasFilters = true;
    }

    // Salary filter
    if (currentFilters.salaryMin > 0 || currentFilters.salaryMax < 500000) {
      filtered = filtered.filter(job => 
        job.salaryMax >= currentFilters.salaryMin && 
        job.salaryMin <= currentFilters.salaryMax
      );
      hasFilters = true;
    }

    setFilteredJobs(filtered);
    setHasActiveFilters(hasFilters);
  };

  const clearFilters = () => {
    setFilters({
      experience: '',
      location: '',
      salaryMin: 0,
      salaryMax: 500000,
    });
    setSearchTerm('');
    setPendingSearchTerm('');
    setFilteredJobs(availableJobs);
    setHasActiveFilters(false);
  };

  const handleApplyNow = (job: any) => {
    if (onNavigate) {
      onNavigate('application-form', {
        jobTitle: job.title,
        companyName: job.company,
        jobId: job.id,
      });
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Find Your Next Role</h1>
          <p className="font-medium text-slate-600 dark:text-slate-400">Discover opportunities that match your expertise.</p>
        </div>
        <div className="flex gap-3">
          <div className="relative flex-1 md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
            <input 
              type="text" 
              placeholder="Search jobs, companies, roles..." 
              className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm font-medium focus:ring-2 focus:ring-primary dark:border-slate-800 dark:bg-slate-900 dark:text-white"
              value={pendingSearchTerm}
              onChange={handleSearchInput}
              onKeyPress={handleSearchKeyPress}
            />
          </div>
          <button 
            onClick={executeSearch}
            className="flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-bold text-white shadow-lg transition-all hover:bg-primary-dark hover:shadow-xl"
          >
            <Search size={18} />
            Search
          </button>

        </div>
      </div>

      {/* Filters Section - Always Visible */}
      <div className="rounded-2xl border border-slate-200 bg-white/80 backdrop-blur-sm p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/80">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">Filter Jobs</h3>
          <button
            onClick={clearFilters}
            className="text-sm font-semibold text-primary hover:underline"
          >
            Clear All
          </button>
        </div>
        
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              {/* Years of Experience Filter */}
              <div>
                <label className="mb-2 block text-sm font-bold text-slate-700 dark:text-slate-300">
                  Years of Experience
                </label>
                <select
                  value={filters.experience}
                  onChange={(e) => handleFilterChange('experience', e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-slate-900 focus:ring-2 focus:ring-primary dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                >
                  <option value="">All Levels</option>
                  <option value="0-1">0-1 years</option>
                  <option value="1-3">1-3 years</option>
                  <option value="3-5">3-5 years</option>
                  <option value="5-7">5-7 years</option>
                  <option value="7-10">7-10 years</option>
                  <option value="10+">10+ years</option>
                </select>
              </div>

              {/* Location Filter */}
              <div>
                <label className="mb-2 block text-sm font-bold text-slate-700 dark:text-slate-300">
                  Location
                </label>
                <select
                  value={filters.location}
                  onChange={(e) => handleFilterChange('location', e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-slate-900 focus:ring-2 focus:ring-primary dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                >
                  <option value="">All Locations</option>
                  <option value="Remote">Remote</option>
                  <option value="San Francisco">San Francisco, CA</option>
                  <option value="New York">New York, NY</option>
                  <option value="Austin">Austin, TX</option>
                  <option value="Seattle">Seattle, WA</option>
                  <option value="Los Angeles">Los Angeles, CA</option>
                </select>
              </div>

              {/* Salary Range Filter */}
              <div>
                <label className="mb-2 block text-sm font-bold text-slate-700 dark:text-slate-300">
                  Salary Range
                </label>
                <select
                  value={`${filters.salaryMin}-${filters.salaryMax}`}
                  onChange={(e) => {
                    const [min, max] = e.target.value.split('-').map(Number);
                    handleFilterChange('salaryMin', min);
                    handleFilterChange('salaryMax', max);
                  }}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-slate-900 focus:ring-2 focus:ring-primary dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                >
                  <option value="0-500000">All Salaries</option>
                  <option value="0-80000">Up to $80k</option>
                  <option value="80000-120000">$80k - $120k</option>
                  <option value="120000-150000">$120k - $150k</option>
                  <option value="150000-180000">$150k - $180k</option>
                  <option value="180000-500000">$180k+</option>
                </select>
              </div>
            </div>

            {/* Active Filters Display */}
            {(filters.experience || filters.location || filters.salaryMin > 0 || filters.salaryMax < 500000) && (
              <div className="mt-4 flex flex-wrap gap-2">
                {filters.experience && (
                  <span className="flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary">
                    {filters.experience} years
                    <button onClick={() => handleFilterChange('experience', '')}>
                      <X size={14} />
                    </button>
                  </span>
                )}
                {filters.location && (
                  <span className="flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary">
                    {filters.location}
                    <button onClick={() => handleFilterChange('location', '')}>
                      <X size={14} />
                    </button>
                  </span>
                )}
                {(filters.salaryMin > 0 || filters.salaryMax < 500000) && (
                  <span className="flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary">
                    ${filters.salaryMin/1000}k - ${filters.salaryMax/1000}k
                    <button onClick={() => {
                      handleFilterChange('salaryMin', 0);
                      handleFilterChange('salaryMax', 500000);
                    }}>
                      <X size={14} />
                    </button>
                  </span>
                )}
              </div>
            )}
      </div>

      {/* Filtered Jobs Results - Show only when filters are active */}
      {hasActiveFilters && (
        <div>
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Filtered Results</h2>
              <p className="mt-1 text-sm font-medium text-slate-600 dark:text-slate-400">
                Showing {filteredJobs.length} {filteredJobs.length === 1 ? 'result' : 'results'}
                {searchTerm && <span className="text-primary"> for "{searchTerm}"</span>}
              </p>
            </div>
            {filteredJobs.length === 0 && (
              <button 
                onClick={clearFilters}
                className="text-sm font-semibold text-primary hover:underline"
              >
                Clear all filters
              </button>
            )}
          </div>
          
          {filteredJobs.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-2xl border border-slate-200 bg-white p-12 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900"
            >
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 dark:bg-slate-800">
                <Search size={32} className="text-slate-400" />
              </div>
              <h3 className="mb-2 text-xl font-bold text-slate-900 dark:text-white">No jobs found</h3>
              <p className="mb-6 text-sm font-medium text-slate-600 dark:text-slate-400">
                We couldn't find any jobs matching your search criteria.<br />
                Try adjusting your filters or search terms.
              </p>
              <button 
                onClick={clearFilters}
                className="rounded-xl bg-primary px-6 py-3 font-bold text-white shadow-lg hover:bg-primary-dark"
              >
                Clear All Filters
              </button>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <AnimatePresence>
                {filteredJobs.map((job, i) => (
                  <motion.div
                    key={job.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="group relative flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:border-primary/50 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900"
                  >
                    <div className="mb-4 flex items-start justify-between">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-primary dark:bg-slate-800">
                        <Briefcase size={24} />
                      </div>
                      <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary">
                        {job.type}
                      </span>
                    </div>
                    
                    <h3 className="mb-1 text-lg font-bold text-slate-900 dark:text-white group-hover:text-primary transition-colors">
                      {job.title}
                    </h3>
                    <p className="mb-4 font-semibold text-slate-700 dark:text-slate-400">{job.company}</p>
                    
                    <div className="mb-6 grid grid-cols-2 gap-y-3 gap-x-4 border-t border-slate-100 pt-4 dark:border-slate-800">
                      <div className="flex items-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-500">
                        <MapPin size={16} />
                        {job.location}
                      </div>
                      <div className="flex items-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-500">
                        <DollarSign size={16} />
                        {job.salary}
                      </div>
                      <div className="flex items-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-500">
                        <Clock size={16} />
                        Posted {job.posted}
                      </div>
                    </div>
                    
                    <button 
                      onClick={() => handleApplyNow(job)}
                      className="w-full rounded-xl bg-slate-900 py-3 font-bold text-white transition-all hover:bg-primary dark:bg-slate-800 dark:hover:bg-primary"
                    >
                      Apply Now
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      )}

      {/* Recent Job Postings Section */}
      <div className="rounded-2xl border border-slate-200 bg-white shadow-md dark:border-slate-800 dark:bg-slate-900 overflow-hidden">
        <div className="flex items-center justify-between border-b border-slate-200 p-6 bg-gradient-to-r from-slate-50/50 to-transparent dark:from-slate-800/50 dark:border-slate-700">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">
              Recent Job Postings
            </h2>
            <p className="text-base font-semibold text-slate-600 dark:text-slate-300">
              Sorted by skill match score
            </p>
          </div>
          <button className="text-sm font-bold text-primary hover:underline">View All</button>
        </div>
        <div className="divide-y divide-slate-200 dark:divide-slate-800">
          {sortedRecentJobs.map((job) => (
            <div key={job.id} className="flex items-center justify-between p-6 transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/50">
              <div className="flex items-center gap-4">
                <div className="hidden h-10 w-10 items-center justify-center rounded-lg bg-slate-100 text-slate-500 dark:bg-slate-800 sm:flex">
                  <Briefcase size={20} />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-semibold text-slate-900 dark:text-white">{job.title}</h4>
                    <span className="flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 text-xs font-bold text-emerald-500">
                      <Award size={12} />
                      {job.matchScore}% Match
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-slate-500 dark:text-slate-400">
                    <span className="font-medium text-primary">{job.company}</span>
                    <span className="h-1 w-1 rounded-full bg-slate-300" />
                    <span>{job.posted}</span>
                    <span className="h-1 w-1 rounded-full bg-slate-300" />
                    <span className={`font-medium ${job.status === 'Active' ? 'text-emerald-500' : 'text-slate-400'}`}>
                      {job.status}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right hidden sm:block">
                  <button 
                    onClick={() => handleApplyNow(job)}
                    className="rounded-xl gradient-primary px-4 py-2 text-sm font-bold text-white shadow-md hover:shadow-lg transition-shadow"
                  >
                    Apply Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};