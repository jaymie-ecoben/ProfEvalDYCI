import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Masterlist.css';
import './ActionButtons.css';
import { 
  Search, 
  Filter, 
  User, 
  Star, 
  Users, 
  ChevronDown, 
  ChevronUp, 
  FileText, 
  Edit,
  Clipboard,
  Plus,
  BarChart,
  Download,
  Mail,
  MoreHorizontal,
  MapPin,
  Phone,
  Calendar,
  CheckCircle,
  XCircle,
  Grid,
  List,
  RefreshCw,
  Eye,
  Sliders,
  BookOpen,
  Award,
  PieChart,
  Book,
  AlignLeft,
  Coffee,
  HelpCircle,
  ExternalLink,
  Bell,
  Settings,
  ChevronLeft,
  ChevronRight,
  UserPlus,
  BarChart2
} from 'lucide-react';

const sampleProfessors = [
  {
    id: 1,
    name: "Dr. Sarah Johnson, Ph.D.",
    department: "College of Computer Studies",
    rating: 4.8,
    totalEvaluations: 156,
    specialization: "Artificial Intelligence",
    email: "sjohnson@example.com",
    phone: "+63 912 345 6789",
    office: "CCS Building, Room 305",
    status: "Active",
    joinDate: "2019-08-15",
    lastEvaluation: "2025-04-10",
    courses: ["Advanced AI", "Machine Learning", "Neural Networks"],
    availability: "BSCS-3A, BSIT-4B, BSIT-3C"
  },
  {
    id: 2,
    name: "Prof. Michael Chen, Ph.D.",
    department: "College of Computer Studies",
    rating: 4.5,
    totalEvaluations: 203,
    specialization: "Web Development",
    email: "mchen@example.com",
    phone: "+63 917 234 5678",
    office: "CCS Building, Room 210",
    status: "Active",
    joinDate: "2018-06-22",
    lastEvaluation: "2025-04-05",
    courses: ["Web Technologies", "Front-end Development", "JavaScript Frameworks"],
    availability: "BSCS-2B, BSIT-2A, BSCS-1C"
  },
  {
    id: 3,
    name: "Dr. Emily Rodriguez, Ph.D.",
    department: "College of Accountancy",
    rating: 4.9,
    totalEvaluations: 178,
    specialization: "Financial Accounting",
    email: "erodriguez@example.com",
    phone: "+63 919 876 5432",
    office: "Accountancy Building, Room 105",
    status: "Active",
    joinDate: "2020-01-10",
    lastEvaluation: "2025-03-28",
    courses: ["Financial Accounting", "Auditing Principles", "Tax Accounting"],
    availability: "BSA-3A, BSA-3B, BSA-2C"
  },
  {
    id: 4,
    name: "Prof. David Thompson, Ed.D.",
    department: "College of Business Administration",
    rating: 4.6,
    totalEvaluations: 145,
    specialization: "Marketing Strategy",
    email: "dthompson@example.com",
    phone: "+63 915 654 3210",
    office: "Business Building, Room 412",
    status: "Active",
    joinDate: "2017-11-05",
    lastEvaluation: "2025-04-15",
    courses: ["Marketing Management", "Strategic Planning", "Consumer Behavior"],
    availability: "BSBA-4A, BSBA-3B, BSBA-2C"
  },
  {
    id: 5,
    name: "Dr. Maria Garcia, Ph.D.",
    department: "College of Art and Sciences",
    rating: 4.7,
    totalEvaluations: 189,
    specialization: "Literature",
    email: "mgarcia@example.com",
    phone: "+63 918 765 4321",
    office: "Arts Building, Room 205",
    status: "Active",
    joinDate: "2019-03-18",
    lastEvaluation: "2025-03-25",
    courses: ["Contemporary Literature", "Creative Writing", "Literary Analysis"],
    availability: "BSED-2A, BSED-2B, AB-LIT-3A"
  },
  {
    id: 6,
    name: "Prof. John Williams, Ph.D.",
    department: "College of Education",
    rating: 4.4,
    totalEvaluations: 167,
    specialization: "Educational Psychology",
    email: "jwilliams@example.com",
    phone: "+63 916 543 2109",
    office: "Education Building, Room 310",
    status: "Active",
    joinDate: "2018-08-30",
    lastEvaluation: "2025-04-02",
    courses: ["Educational Psychology", "Learning Theories", "Classroom Management"],
    availability: "BSED-3A, BSED-4B, BSED-2C"
  },
  {
    id: 7,
    name: "Dr. Robert Brown, Ph.D.",
    department: "College of Health and Sciences",
    rating: 4.8,
    totalEvaluations: 198,
    specialization: "Anatomy",
    email: "rbrown@example.com",
    phone: "+63 923 456 7890",
    office: "Health Sciences Building, Room 401",
    status: "Active",
    joinDate: "2017-05-12",
    lastEvaluation: "2025-03-30",
    courses: ["Human Anatomy", "Physiology", "Medical Terminology"],
    availability: "BSN-2A, BSN-3B, BSPT-2C"
  },
  {
    id: 8,
    name: "Prof. Jennifer Lee, Ed.D.",
    department: "College of Hospitality Management and Tourism",
    rating: 4.6,
    totalEvaluations: 176,
    specialization: "Hospitality Management",
    email: "jlee@example.com",
    phone: "+63 922 345 6789",
    office: "Hospitality Building, Room 208",
    status: "Active",
    joinDate: "2019-07-23",
    lastEvaluation: "2025-04-08",
    courses: ["Hospitality Operations", "Tourism Planning", "Event Management"],
    availability: "BSHM-3A, BSHM-4B, BSTM-2C"
  },
  {
    id: 9,
    name: "Dr. James Wilson, Ph.D.",
    department: "College of Maritime Education",
    rating: 4.5,
    totalEvaluations: 142,
    specialization: "Naval Engineering",
    email: "jwilson@example.com",
    phone: "+63 927 654 3210",
    office: "Maritime Building, Room 115",
    status: "Active",
    joinDate: "2020-02-28",
    lastEvaluation: "2025-03-20",
    courses: ["Naval Architecture", "Maritime Safety", "Ship Operations"],
    availability: "BSMT-3A, BSMT-2B, BSMT-4C"
  },
  {
    id: 10,
    name: "Prof. Patricia Moore, Ph.D.",
    department: "School of Mechanical Engineering",
    rating: 4.7,
    totalEvaluations: 165,
    specialization: "Thermodynamics",
    email: "pmoore@example.com",
    phone: "+63 925 876 5432",
    office: "Engineering Building, Room 305",
    status: "Active",
    joinDate: "2018-04-17",
    lastEvaluation: "2025-04-05",
    courses: ["Thermodynamics", "Fluid Mechanics", "Heat Transfer"],
    availability: "BSME-3A, BSME-4B, BSME-2C"
  },
  {
    id: 11,
    name: "Dr. Thomas Anderson, Ph.D.",
    department: "School of Psychology",
    rating: 4.9,
    totalEvaluations: 210,
    specialization: "Clinical Psychology",
    email: "tanderson@example.com",
    phone: "+63 929 765 4321",
    office: "Psychology Building, Room 212",
    status: "Active",
    joinDate: "2017-08-05",
    lastEvaluation: "2025-04-12",
    courses: ["Clinical Psychology", "Abnormal Psychology", "Psychological Assessment"],
    availability: "BSPSYCH-3A, BSPSYCH-4B, BSPSYCH-2C"
  },
  {
    id: 12,
    name: "Prof. Jessica Martinez, Ed.D.",
    department: "College of Computer Studies",
    rating: 4.3,
    totalEvaluations: 134,
    specialization: "Cybersecurity",
    email: "jmartinez@example.com",
    phone: "+63 914 567 8901",
    office: "CCS Building, Room 318",
    status: "Active",
    joinDate: "2020-06-15",
    lastEvaluation: "2025-03-15",
    courses: ["Cybersecurity Fundamentals", "Network Security", "Ethical Hacking"],
    availability: "BSIT-3A, BSCS-4B, BSCS-2C"
  }
];

const departmentOptions = [
  { id: 0, name: 'All Departments' },
  { id: 1, name: 'College of Computer Studies' },
  { id: 2, name: 'College of Accountancy' },
  { id: 3, name: 'College of Business Administration' },
  { id: 4, name: 'College of Art and Sciences' },
  { id: 5, name: 'College of Education' },
  { id: 6, name: 'College of Health and Sciences' },
  { id: 7, name: 'College of Hospitality Management and Tourism' },
  { id: 8, name: 'College of Maritime Education' },
  { id: 9, name: 'School of Mechanical Engineering' },
  { id: 10, name: 'School of Psychology' }
];

const Masterlist = () => {
  const [professors, setProfessors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedRating, setSelectedRating] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'table'
  const [selectedProfessor, setSelectedProfessor] = useState(null);
  const [showQuickView, setShowQuickView] = useState(false);
  const [showSidebar, setShowSidebar] = useState(true);
  const [pageSize, setPageSize] = useState(12);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    // Simulate API call with timeout
    setTimeout(() => {
      setProfessors(sampleProfessors);
      setLoading(false);
    }, 800);
  }, []);

  const handleSortChange = (newSortBy) => {
    if (sortBy === newSortBy) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(newSortBy);
      setSortOrder('asc');
    }
  };

  const filteredProfessors = professors
    .filter(professor => 
      (professor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      professor.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
      professor.specialization.toLowerCase().includes(searchQuery.toLowerCase()) ||
      professor.email.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (selectedDepartment === '' || professor.department === selectedDepartment) &&
      (selectedRating === '' || professor.rating >= parseFloat(selectedRating))
    )
    .sort((a, b) => {
      let comparison = 0;
      
      if (sortBy === 'name') {
        comparison = a.name.localeCompare(b.name);
      } else if (sortBy === 'rating') {
        comparison = a.rating - b.rating;
      } else if (sortBy === 'evaluations') {
        comparison = a.totalEvaluations - b.totalEvaluations;
      } else if (sortBy === 'department') {
        comparison = a.department.localeCompare(b.department);
      } else if (sortBy === 'lastEvaluation') {
        comparison = new Date(a.lastEvaluation) - new Date(b.lastEvaluation);
      }
      
      return sortOrder === 'asc' ? comparison : -comparison;
    });

  // Pagination
  const totalPages = Math.ceil(filteredProfessors.length / pageSize);
  const paginatedProfessors = filteredProfessors.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleCreateEvaluation = (professorId) => {
    // Navigate to evaluation creation with professor pre-selected
    console.log(`Creating evaluation for professor ID: ${professorId}`);
    // In a real app, this would use router navigation
    alert(`Redirecting to create evaluation for ${professors.find(p => p.id === professorId).name}`);
  };

  const handleQuickView = (professor) => {
    setSelectedProfessor(professor);
    setShowQuickView(true);
  };

  const handleCloseQuickView = () => {
    setShowQuickView(false);
    setSelectedProfessor(null);
  };

  const getSortIndicator = (column) => {
    if (sortBy !== column) return null;
    return sortOrder === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />;
  };

  if (loading) {
    return (
      <div className="masterlist-container">
        <div className="masterlist-loading">
          <div className="loading-spinner"></div>
          <p>Loading professor data...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className={`app-container ${showSidebar ? '' : 'sidebar-collapsed'}`}>
      {/* Admin Header */}
      <header className="admin-header">
        <div className="header-left">
          <div className="brand">
            <BookOpen className="brand-icon" />
            <h1>DYC Admin</h1>
          </div>
          <button className="toggle-sidebar" onClick={() => setShowSidebar(!showSidebar)}>
            {showSidebar ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
          </button>
        </div>
        <div className="header-right">
          <button className="header-button">
            <Bell size={20} />
            <span className="notification-badge">3</span>
          </button>
          <button className="header-button">
            <Settings size={20} />
          </button>
          <div className="admin-profile">
            <div className="admin-avatar">JD</div>
            <span>John Doe</span>
          </div>
        </div>
      </header>
      
      {/* Admin Sidebar */}
      <aside className={`admin-sidebar ${showSidebar ? 'expanded' : 'collapsed'}`}>
        <nav className="sidebar-nav">
          <ul>
            <li className="nav-item">
              <Link to="/dashboard" className="nav-link">
                <PieChart size={20} />
                <span className="nav-text">Dashboard</span>
              </Link>
            </li>
            <li className="nav-item active">
              <Link to="/professors" className="nav-link">
                <Users size={20} />
                <span className="nav-text">Professors</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/evaluations" className="nav-link">
                <Clipboard size={20} />
                <span className="nav-text">Evaluations</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/courses" className="nav-link">
                <Book size={20} />
                <span className="nav-text">Courses</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/departments" className="nav-link">
                <AlignLeft size={20} />
                <span className="nav-text">Departments</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/reports" className="nav-link">
                <BarChart size={20} />
                <span className="nav-text">Reports</span>
              </Link>
            </li>
            <li className="nav-divider"></li>
            <li className="nav-item">
              <Link to="/settings" className="nav-link">
                <Settings size={20} />
                <span className="nav-text">Settings</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/help" className="nav-link">
                <HelpCircle size={20} />
                <span className="nav-text">Help & Support</span>
              </Link>
            </li>
          </ul>
        </nav>
      </aside>
      
      {/* Main Content */}
      <main className="main-content">
        <div className="masterlist-container">
          <div className="page-header">
            <div className="header-content">
              <h1><Users size={28} /> Professor Masterlist</h1>
            </div>
            <button className="add-professor-button">
              <Plus size={16} />
              Add New Professor
            </button>
          </div>

          {/* Search and Filter Section */}
          <div className="card masterlist-controls">
            <div className="masterlist-search-container">
              <div className="masterlist-search-bar">
                <Search size={18} className="search-icon" />
                <input
                  type="text"
                  placeholder="Search professors by name, department, specialization, or email..."
                  className="masterlist-search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <div className="view-toggle">
                <button 
                  className={`view-button ${viewMode === 'grid' ? 'active' : ''}`} 
                  onClick={() => setViewMode('grid')}
                  title="Grid View"
                >
                  <Grid size={16} />
                </button>
                <button 
                  className={`view-button ${viewMode === 'table' ? 'active' : ''}`} 
                  onClick={() => setViewMode('table')}
                  title="Table View"
                >
                  <List size={16} />
                </button>
              </div>
              
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="filter-button"
              >
                <Sliders size={16} />
                Filters
                {showFilters ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>
            </div>

            {/* Filter Options */}
            {showFilters && (
              <div className="filter-panel">
                <div className="filter-options">
                  <div className="filter-group">
                    <label>Department</label>
                    <select 
                      value={selectedDepartment} 
                      onChange={(e) => setSelectedDepartment(e.target.value)}
                    >
                      <option value="">All Departments</option>
                      {departmentOptions.slice(1).map(dept => (
                        <option key={dept.id} value={dept.name}>{dept.name}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="filter-group">
                    <label>Rating</label>
                    <select 
                      value={selectedRating} 
                      onChange={(e) => setSelectedRating(e.target.value)}
                    >
                      <option value="">All Ratings</option>
                      <option value="4.5">4.5+ Stars</option>
                      <option value="4.0">4.0+ Stars</option>
                      <option value="3.5">3.5+ Stars</option>
                    </select>
                  </div>
                  
                  <div className="filter-group">
                    <label>Sort By</label>
                    <select 
                      value={sortBy} 
                      onChange={(e) => setSortBy(e.target.value)}
                    >
                      <option value="name">Name</option>
                      <option value="department">Department</option>
                      <option value="rating">Rating</option>
                      <option value="evaluations">Number of Evaluations</option>
                      <option value="lastEvaluation">Last Evaluation Date</option>
                    </select>
                  </div>
                  
                  <div className="filter-group">
                    <label>Sort Order</label>
                    <select 
                      value={sortOrder} 
                      onChange={(e) => setSortOrder(e.target.value)}
                    >
                      <option value="asc">Ascending</option>
                      <option value="desc">Descending</option>
                    </select>
                  </div>
                </div>
                
                <div className="filter-summary">
                  <p>Showing {filteredProfessors.length} of {professors.length} professors</p>
                  {(selectedDepartment || selectedRating) && (
                    <button className="clear-filters-button" onClick={() => {
                      setSelectedDepartment('');
                      setSelectedRating('');
                    }}>
                      Clear Filters
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Actions Bar */}
          <div className="masterlist-actions">
            <div className="left-actions">
              <button className="action-button-primary">
                <RefreshCw size={16} />
                Refresh Data
              </button>
              <button className="action-button-primary">
                <Download size={16} />
                Export List
              </button>
            </div>
            <div className="right-actions">
              <select 
                className="page-size-selector"
                value={pageSize}
                onChange={(e) => {
                  setPageSize(Number(e.target.value));
                  setCurrentPage(1);
                }}
              >
                <option value={6}>6 per page</option>
                <option value={12}>12 per page</option>
                <option value={24}>24 per page</option>
                <option value={48}>48 per page</option>
              </select>
            </div>
          </div>
          
          {/* Grid View */}
          {viewMode === 'grid' && (
            <>
              <div className="professors-grid">
                {paginatedProfessors.map((professor) => (
                  <div key={professor.id} className="professor-card">
                    <div className="professor-card-header">
                      <div 
                        className="professor-avatar" 
                        style={{ 
                          backgroundColor: `hsl(${(professor.id * 40) % 360}, 70%, 45%)` 
                        }}
                      >
                        {professor.name.split(' ').slice(0, 2).map(name => name.charAt(0)).join('')}
                      </div>
                    </div>
                    
                    <div className="professor-card-body">
                      <h2 className="professor-name">{professor.name}</h2>
                      <p className="professor-department">{professor.department}</p>
                      <p className="professor-specialization">{professor.specialization}</p>
                      
                      <div className="professor-courses">
                        <h4>Courses</h4>
                        <ul>
                          {professor.courses.slice(0, 2).map((course, index) => (
                            <li key={index}>{course}</li>
                          ))}
                          {professor.courses.length > 2 && (
                            <li className="more-courses">+{professor.courses.length - 2} more</li>
                          )}
                        </ul>
                      </div>
                      
                      <div className="professor-stats">
                        <div className="stat">
                          <Clipboard size={16} />
                          <span>{professor.totalEvaluations} evaluations</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="professor-card-actions">
                      <button 
                        className="action-button-primary"
                        onClick={() => handleQuickView(professor)}
                      >
                        <Eye size={16} />
                        View Profile
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Pagination */}
              {totalPages > 1 && (
                <div className="pagination">
                  <button 
                    className="pagination-arrow" 
                    disabled={currentPage === 1}
                    onClick={() => handlePageChange(currentPage - 1)}
                  >
                    &laquo;
                  </button>
                  
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                    <button
                      key={page}
                      className={`pagination-number ${currentPage === page ? 'active' : ''}`}
                      onClick={() => handlePageChange(page)}
                    >
                      {page}
                    </button>
                  ))}
                  
                  <button 
                    className="pagination-arrow" 
                    disabled={currentPage === totalPages}
                    onClick={() => handlePageChange(currentPage + 1)}
                  >
                    &raquo;
                  </button>
                </div>
              )}
            </>
          )}
          
          {/* Table View */}
          {viewMode === 'table' && (
            <>
              <div className="professors-table-container">
                <table className="professors-table">
                  <thead>
                    <tr>
                      <th>
                        <div className="th-content">
                          Name
                        </div>
                      </th>
                      <th className="sortable" onClick={() => handleSortChange('department')}>
                        <div className="th-content">
                          Department {getSortIndicator('department')}
                        </div>
                      </th>
                      <th className="sortable" onClick={() => handleSortChange('rating')}>
                        <div className="th-content">
                          Rating {getSortIndicator('rating')}
                        </div>
                      </th>
                      <th className="sortable" onClick={() => handleSortChange('evaluations')}>
                        <div className="th-content">
                          Evaluations {getSortIndicator('evaluations')}
                        </div>
                      </th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedProfessors.map((professor) => (
                      <tr key={professor.id}>
                        <td className="name-cell">
                          {professor.name}
                        </td>
                        <td>{professor.department}</td>
                        <td>
                          <div className="rating-cell">
                            <Star size={16} className="star-icon" />
                            <span>{professor.rating.toFixed(1)}</span>
                          </div>
                        </td>
                        <td>{professor.totalEvaluations}</td>
                        <td>
                          <div className="table-actions">
                            <button className="action-button-primary" title="View Profile" onClick={() => handleQuickView(professor)}>
                              <Eye size={16} />
                              <span>View Profile</span>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              {/* Pagination for Table View */}
              {totalPages > 1 && (
                <div className="pagination">
                  <button 
                    className="pagination-arrow" 
                    disabled={currentPage === 1}
                    onClick={() => handlePageChange(currentPage - 1)}
                  >
                    &laquo;
                  </button>
                  
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                    <button
                      key={page}
                      className={`pagination-number ${currentPage === page ? 'active' : ''}`}
                      onClick={() => handlePageChange(page)}
                    >
                      {page}
                    </button>
                  ))}
                  
                  <button 
                    className="pagination-arrow" 
                    disabled={currentPage === totalPages}
                    onClick={() => handlePageChange(currentPage + 1)}
                  >
                    &raquo;
                  </button>
                </div>
              )}
            </>
          )}

          {filteredProfessors.length === 0 && (
            <div className="no-results">
              <div className="no-results-icon">
                <Search size={48} />
              </div>
              <h3>No professors found</h3>
              <p>Try adjusting your search or filter criteria</p>
              <button className="add-professor-button no-results-action">
                <Plus size={16} />
                Add New Professor
              </button>
            </div>
          )}
          
          {/* Quick View Modal */}
          {showQuickView && selectedProfessor && (
            <div className="modal-overlay">
              <div className="quick-view-modal">
                <div className="modal-header">
                  <h2>Professor Profile</h2>
                  <button className="close-modal" onClick={handleCloseQuickView}>×</button>
                </div>
                
                <div className="modal-body">
                  <div className="profile-header">
                    <div className="large-avatar" style={{ backgroundColor: `hsl(${(selectedProfessor.id * 40) % 360}, 70%, 45%)` }}>
                      {selectedProfessor.name.split(' ').slice(0, 2).map(name => name.charAt(0)).join('')}
                    </div>
                    <div className="profile-header-content">
                      <h3>{selectedProfessor.name}</h3>
                      <p className="profile-department">{selectedProfessor.department}</p>
                      <p className="profile-specialization">{selectedProfessor.specialization}</p>
                    </div>
                  </div>
                  
                  <div className="profile-details">
                    <div className="detail-section">
                      <h4>Contact Information</h4>
                      <div className="detail-item">
                        <Mail size={16} />
                        <span>{selectedProfessor.email}</span>
                        <button className="action-link">
                          <ExternalLink size={14} />
                        </button>
                      </div>
                      <div className="detail-item">
                        <Phone size={16} />
                        <span>{selectedProfessor.phone}</span>
                      </div>
                      <div className="detail-item">
                        <MapPin size={16} />
                        <span>{selectedProfessor.office}</span>
                      </div>
                    </div>
                    
                    <div className="detail-section">
                      <h4>Courses</h4>
                      <div className="course-list">
                        {selectedProfessor.courses.map((course, index) => (
                          <div key={index} className="course-item">
                            <Book size={16} />
                            <span>{course}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="detail-section">
                      <h4>Sections Handled</h4>
                      <div className="course-list">
                        {selectedProfessor.availability.split(', ').map((section, index) => (
                          <div key={index} className="course-item">
                            <Users size={16} />
                            <span>{section}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="detail-section">
                      <h4>Additional Information</h4>
                      <div className="detail-item">
                        <Calendar size={16} />
                        <span>Joined on {new Date(selectedProfessor.joinDate).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}</span>
                      </div>
                      <div className="detail-item">
                        <Clipboard size={16} />
                        <span>Last evaluated on {new Date(selectedProfessor.lastEvaluation).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}</span>
                      </div>
                      <div className="detail-item">
                        <Star size={16} className="star-icon" />
                        <span>Rating: {selectedProfessor.rating.toFixed(1)}/5.0 ({selectedProfessor.totalEvaluations} evaluations)</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="modal-footer">
                  <div className="modal-actions">
                    <button className="action-button-secondary" onClick={handleCloseQuickView}>
                      Close
                    </button>
                    <button className="action-button-primary" title="Edit Professor">
                      <Edit size={16} />
                      Edit Profile
                    </button>
                    <button className="action-button-primary" onClick={() => handleCreateEvaluation(selectedProfessor.id)}>
                      <Clipboard size={16} />
                      Create Evaluation
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Masterlist;