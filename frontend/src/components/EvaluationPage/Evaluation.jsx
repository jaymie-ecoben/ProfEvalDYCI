import React, { useState, useEffect } from 'react';
import './Evaluation.css';
import './QuestionControls.css';
import { 
  Clipboard, 
  Star, 
  Info, 
  Check, 
  PenTool, 
  Calendar, 
  Clock, 
  User, 
  FileText, 
  Save, 
  AlertTriangle,
  ChevronUp,
  ChevronDown,
  HelpCircle,
  Trash2,
  BarChart,
  BookOpen,
  Settings,
  CheckCircle,
  Copy,
  Edit,
  Filter,
  Eye,
  Users,
  Grid,
  List,
  Sliders,
  Plus
} from 'lucide-react';

const Evaluation = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [previewMode, setPreviewMode] = useState(false);
  const [saved, setSaved] = useState(false);
  const [publishStatus, setPublishStatus] = useState('draft');
  const [bulkCreationMode, setBulkCreationMode] = useState(false);
  const [selectedProfessors, setSelectedProfessors] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [departmentOptions, setDepartmentOptions] = useState([
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
  ]);

  const [professorOptions, setProfessorOptions] = useState([
    { id: 1, name: 'Dr. Sarah Johnson, Ph.D.', departmentId: 1 },
    { id: 2, name: 'Prof. Michael Chen, Ph.D.', departmentId: 1 },
    { id: 3, name: 'Dr. Emily Rodriguez, Ph.D.', departmentId: 2 },
    { id: 4, name: 'Prof. David Thompson, Ed.D.', departmentId: 3 },
    { id: 5, name: 'Dr. Maria Garcia, Ph.D.', departmentId: 4 },
    { id: 6, name: 'Prof. John Williams, Ph.D.', departmentId: 5 },
    { id: 7, name: 'Dr. Robert Brown, Ph.D.', departmentId: 6 },
    { id: 8, name: 'Prof. Jennifer Lee, Ed.D.', departmentId: 7 },
    { id: 9, name: 'Dr. James Wilson, Ph.D.', departmentId: 8 },
    { id: 10, name: 'Prof. Patricia Moore, Ph.D.', departmentId: 9 },
    { id: 11, name: 'Dr. Thomas Anderson, Ph.D.', departmentId: 10 },
    { id: 12, name: 'Prof. Jessica Martinez, Ed.D.', departmentId: 1 }
  ]);

  const [evaluationData, setEvaluationData] = useState({
    title: '',
    description: '',
    courseCode: '',
    professorId: '',
    departmentId: '',
    semester: 'First Semester',
    academicYear: '2024-2025',
    startDate: '',
    endDate: '',
    reminderEnabled: true,
    anonymousResponses: true,
    allowMultipleSubmissions: false,
    notifyProfessor: true,
    questions: [
      { id: 1, text: 'The professor demonstrated a thorough knowledge of the subject matter.', type: 'rating', required: true, category: 'Knowledge' },
      { id: 2, text: 'The professor communicated complex concepts effectively and clearly.', type: 'rating', required: true, category: 'Communication' },
      { id: 3, text: 'The professor was responsive to student inquiries and provided helpful assistance.', type: 'rating', required: true, category: 'Accessibility' },
      { id: 4, text: 'What specific aspects of this course contributed most significantly to your learning experience?', type: 'text', required: false, category: 'Overall Experience' },
      { id: 5, text: 'How would you rate the overall quality of learning materials provided in this course?', type: 'scale', required: true, category: 'Resources', min: 1, max: 10, minLabel: 'Poor', maxLabel: 'Excellent' },
      { id: 6, text: 'Which teaching method did you find most effective in this course?', type: 'multiple_choice', required: true, category: 'Teaching Methods', options: ['Lectures', 'Group discussions', 'Practical demonstrations', 'Individual assignments'] }
    ],
    questionCategories: ['Knowledge', 'Communication', 'Accessibility', 'Resources', 'Teaching Methods', 'Overall Experience', 'Improvement'],
    templates: []
  });

  const [errors, setErrors] = useState({});
  
  // Simulate loading templates
  useEffect(() => {
    // This would normally be an API call
    setTimeout(() => {
      setEvaluationData(prev => ({
        ...prev,
        templates: [
          { id: 1, name: 'Standard Course Evaluation' },
          { id: 2, name: 'Graduate Seminar Evaluation' },
          { id: 3, name: 'Laboratory Course Evaluation' },
          { id: 4, name: 'Online Course Evaluation' },
          { id: 5, name: 'Question Types Example Template' }
        ]
      }));
    }, 1000);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEvaluationData({
      ...evaluationData,
      [name]: value
    });
    
    // Clear error for this field if it exists
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      });
    }
    
    // Reset saved state when changes are made
    setSaved(false);
  };

  const handleToggleChange = (name) => {
    setEvaluationData({
      ...evaluationData,
      [name]: !evaluationData[name]
    });
    
    setSaved(false);
  };

  const handleQuestionChange = (id, field, value) => {
    const updatedQuestions = evaluationData.questions.map(question => {
      if (question.id === id) {
        return { ...question, [field]: value };
      }
      return question;
    });

    setEvaluationData({
      ...evaluationData,
      questions: updatedQuestions
    });
    
    setSaved(false);
  };

  const addQuestion = (type) => {
    const newId = evaluationData.questions.length > 0 
      ? Math.max(...evaluationData.questions.map(q => q.id)) + 1 
      : 1;
    
    const newQuestion = {
      id: newId,
      text: '',
      type: type,
      required: false,
      category: evaluationData.questionCategories[0]
    };

    // Add type-specific properties
    if (type === 'multiple_choice') {
      newQuestion.options = ['Option 1', 'Option 2', 'Option 3'];
    } else if (type === 'scale') {
      newQuestion.min = 1;
      newQuestion.max = 10;
      newQuestion.minLabel = 'Poor';
      newQuestion.maxLabel = 'Excellent';
    }

    setEvaluationData({
      ...evaluationData,
      questions: [...evaluationData.questions, newQuestion]
    });
    
    setSaved(false);
  };

  const addCategory = (category) => {
    if (category.trim() === '') return;
    
    if (!evaluationData.questionCategories.includes(category)) {
      setEvaluationData({
        ...evaluationData,
        questionCategories: [...evaluationData.questionCategories, category]
      });
    }
    
    setSaved(false);
  };

  const removeQuestion = (id) => {
    setEvaluationData({
      ...evaluationData,
      questions: evaluationData.questions.filter(question => question.id !== id)
    });
    
    setSaved(false);
  };

  const moveQuestion = (id, direction) => {
    const currentIndex = evaluationData.questions.findIndex(q => q.id === id);
    if (
      (direction === 'up' && currentIndex === 0) || 
      (direction === 'down' && currentIndex === evaluationData.questions.length - 1)
    ) {
      return;
    }

    const newIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
    const questions = [...evaluationData.questions];
    const temp = questions[currentIndex];
    questions[currentIndex] = questions[newIndex];
    questions[newIndex] = temp;

    setEvaluationData({
      ...evaluationData,
      questions
    });
    
    setSaved(false);
  };

  const loadTemplate = (templateId) => {
    // This would normally fetch a template from an API
    console.log(`Loading template #${templateId}`);
    
    // For now, we'll just simulate loading a template
    if (templateId === 5) { // Question Types Example Template
      const confirmed = window.confirm("Loading a template will overwrite your current questions. Do you want to continue?");
      if (confirmed) {
        const exampleQuestions = [
          { id: 1, text: 'The professor demonstrated a thorough knowledge of the subject matter.', type: 'rating', required: true, category: 'Rating Questions' },
          { id: 2, text: 'The professor was available for consultation during office hours.', type: 'rating', required: true, category: 'Rating Questions' },
          { id: 3, text: 'What specific aspects of this course contributed most significantly to your learning experience?', type: 'text', required: false, category: 'Text Questions' },
          { id: 4, text: 'Please provide constructive suggestions for enhancing the effectiveness of this course.', type: 'text', required: false, category: 'Text Questions' },
          { id: 5, text: 'How would you rate the overall quality of learning materials provided in this course?', type: 'scale', required: true, category: 'Scale Questions', min: 1, max: 10, minLabel: 'Poor', maxLabel: 'Excellent' },
          { id: 6, text: 'Rate your satisfaction with the professor\'s accessibility outside of class.', type: 'scale', required: true, category: 'Scale Questions', min: 1, max: 5, minLabel: 'Very Dissatisfied', maxLabel: 'Very Satisfied' },
          { id: 7, text: 'Which teaching method did you find most effective in this course?', type: 'multiple_choice', required: true, category: 'Multiple Choice Questions', options: ['Lectures', 'Group discussions', 'Practical demonstrations', 'Individual assignments'] },
          { id: 8, text: 'What was the primary reason you took this course?', type: 'multiple_choice', required: true, category: 'Multiple Choice Questions', options: ['Required for major', 'Personal interest', 'Reputation of professor', 'Fit my schedule', 'Recommended by advisor'] }
        ];
        
        const exampleCategories = ['Rating Questions', 'Text Questions', 'Scale Questions', 'Multiple Choice Questions'];
        
        setEvaluationData(prev => ({
      ...prev,
          questions: exampleQuestions,
          questionCategories: [...new Set([...prev.questionCategories, ...exampleCategories])]
        }));
        
        alert('Question Types Example Template loaded successfully!');
      }
    } else if (templateId === 1) { // Standard Course Evaluation
      const confirmed = window.confirm("Loading a template will overwrite your current questions. Do you want to continue?");
      if (confirmed) {
        // Simulate loading the standard template
        // In a real app, this would come from the server
      }
    }
  };

  const duplicateQuestion = (id) => {
    const questionToDuplicate = evaluationData.questions.find(q => q.id === id);
    if (!questionToDuplicate) return;
    
    const newId = Math.max(...evaluationData.questions.map(q => q.id)) + 1;
    const newQuestion = {
      ...questionToDuplicate,
      id: newId,
      text: `${questionToDuplicate.text} (Copy)`
    };
    
    setEvaluationData({
      ...evaluationData,
      questions: [...evaluationData.questions, newQuestion]
    });
    
    setSaved(false);
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!evaluationData.title.trim()) {
      newErrors.title = 'Evaluation title is required';
    }
    
    if (!evaluationData.courseCode.trim()) {
      newErrors.courseCode = 'Course code is required';
    }
    
    if (!bulkCreationMode && !evaluationData.professorId.trim()) {
      newErrors.professorId = 'Professor selection is required';
    }
    
    if (bulkCreationMode && selectedProfessors.length === 0) {
      newErrors.selectedProfessors = 'Please select at least one professor';
    }
    
    if (!evaluationData.departmentId) {
      newErrors.departmentId = 'Department selection is required';
    }
    
    if (!evaluationData.startDate) {
      newErrors.startDate = 'Start date is required';
    }
    
    if (!evaluationData.endDate) {
      newErrors.endDate = 'End date is required';
    }
    
    if (new Date(evaluationData.startDate) >= new Date(evaluationData.endDate)) {
      newErrors.endDate = 'End date must be after start date';
    }
    
    if (evaluationData.questions.some(q => !q.text.trim())) {
      newErrors.questions = 'All questions must have text';
    }
    
    if (evaluationData.questions.filter(q => q.required).length === 0) {
      newErrors.requiredQuestions = 'At least one question must be required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // In a real app, this would save to the backend
      console.log('Form saved:', bulkCreationMode ? 'Bulk Creation' : 'Single Creation');
      
      if (bulkCreationMode) {
        console.log('Creating evaluations for professors:', selectedProfessors);
        // Here you would create multiple evaluations, one for each selected professor
      } else {
        console.log('Creating evaluation for professor:', evaluationData.professorId);
      }
      
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } else {
      console.log('Form has errors');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // In a real app, this would send to backend and publish
      console.log('Form submitted and published:', bulkCreationMode ? 'Bulk Creation' : 'Single Creation');
      
      if (bulkCreationMode) {
        console.log('Publishing evaluations for professors:', selectedProfessors);
        const message = `Successfully created and published evaluations for ${selectedProfessors.length} professors!`;
        setPublishStatus('published');
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
        alert(message);
      } else {
        console.log('Publishing evaluation for professor:', evaluationData.professorId);
        setPublishStatus('published');
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
        alert('Evaluation published successfully!');
      }
    } else {
      console.log('Form has errors');
    }
  };
  
  const filterQuestionsByCategory = (category) => {
    if (category === 'all') return evaluationData.questions;
    return evaluationData.questions.filter(q => q.category === category);
  };
  
  const togglePreviewMode = () => {
    setPreviewMode(!previewMode);
  };

  // Filter professors by department
  const getFilteredProfessors = (departmentId) => {
    if (!departmentId || departmentId === "0") return professorOptions;
    return professorOptions.filter(professor => professor.departmentId === parseInt(departmentId));
  };

  // Toggle professor selection for bulk creation
  const toggleProfessorSelection = (professorId) => {
    setSelectedProfessors(prev => {
      if (prev.includes(professorId)) {
        return prev.filter(id => id !== professorId);
      } else {
        return [...prev, professorId];
      }
    });
  };

  // Toggle bulk creation mode
  const toggleBulkCreationMode = () => {
    setBulkCreationMode(!bulkCreationMode);
    // Reset selected professors when toggling mode
    if (!bulkCreationMode) {
      setSelectedProfessors([]);
    }
  };

  return (
    <div className="evaluation-container">
      {saved && (
        <div className="save-notification">
          <CheckCircle size={18} /> Changes saved successfully
        </div>
      )}
      
      <div className="evaluation-header">
        <div className="header-content">
          <h1><Clipboard size={28} /> Create Professor Evaluation</h1>
          <p>Design a comprehensive evaluation form for students to assess their professors in Dr. Yanga's Colleges Inc.</p>
        </div>
      </div>

      <div className="tab-navigation">
        <button 
          className={`tab-button ${activeTab === 'general' ? 'active' : ''}`}
          onClick={() => setActiveTab('general')}
        >
          <Info size={18} /> General Information
        </button>
        <button 
          className={`tab-button ${activeTab === 'questions' ? 'active' : ''}`}
          onClick={() => setActiveTab('questions')}
        >
          <Star size={18} /> Evaluation Questions
        </button>
        <button 
          className={`tab-button ${activeTab === 'settings' ? 'active' : ''}`}
          onClick={() => setActiveTab('settings')}
        >
          <Settings size={18} /> Settings
        </button>
        <button 
          className={`tab-button ${activeTab === 'preview' ? 'active' : ''}`}
          onClick={() => {setActiveTab('preview'); setPreviewMode(true);}}
        >
          <Eye size={18} /> Preview
        </button>
        </div>

        <form onSubmit={handleSubmit}>
        {activeTab === 'general' && (
          <div className="form-tab-content">
            <div className="form-section">
              <div className="section-header-with-help">
                <h2><FileText size={20} /> Basic Information</h2>
              </div>
              
              <div className="form-row">
          <div className="form-group">
                  <label htmlFor="title">
                    Evaluation Title <span className="required-mark">*</span>
                  </label>
            <input
              type="text"
              id="title"
              name="title"
                    value={evaluationData.title}
                    onChange={handleInputChange}
                    placeholder="Enter evaluation title"
                    className={`evaluation-input ${errors.title ? "error" : ""}`}
                  />
                  {errors.title && <div className="error-message">{errors.title}</div>}
                </div>
                
                <div className="form-group">
                  <label htmlFor="courseCode">
                    Course Code <span className="required-mark">*</span>
                  </label>
                  <input
                    type="text"
                    id="courseCode"
                    name="courseCode"
                    value={evaluationData.courseCode}
              onChange={handleInputChange}
                    placeholder="Enter course code"
                    className={`evaluation-input ${errors.courseCode ? "error" : ""}`}
                  />
                  {errors.courseCode && <div className="error-message">{errors.courseCode}</div>}
                </div>
              </div>

              <div className="toggle-option">
                <label className="toggle-label">
                  <span>Bulk Creation Mode</span>
                  <div className="toggle-wrapper">
                    <input
                      type="checkbox"
                      checked={bulkCreationMode}
                      onChange={toggleBulkCreationMode}
                    />
                    <span className="toggle-slider"></span>
                  </div>
                </label>
                <p className="option-description">
                  Enable to create the same evaluation for multiple professors at once
                </p>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="departmentId">
                    Department <span className="required-mark">*</span>
                  </label>
                  <select
                    id="departmentId"
                    name="departmentId"
                    value={evaluationData.departmentId}
                    onChange={handleInputChange}
                    className={`evaluation-input ${errors.departmentId ? "error" : ""}`}
                  >
                    <option value="">Select Department</option>
                    {departmentOptions.map(dept => (
                      <option key={dept.id} value={dept.id}>{dept.name}</option>
                    ))}
                  </select>
                  {errors.departmentId && <div className="error-message">{errors.departmentId}</div>}
                </div>
                
                {!bulkCreationMode && (
                  <div className="form-group">
                    <label htmlFor="professorId">
                      Professor <span className="required-mark">*</span>
                    </label>
                    <select
                      id="professorId"
                      name="professorId"
                      value={evaluationData.professorId}
                      onChange={handleInputChange}
                      className={`evaluation-input ${errors.professorId ? "error" : ""}`}
                    >
                      <option value="">Select Professor</option>
                      {getFilteredProfessors(evaluationData.departmentId).map(professor => (
                        <option key={professor.id} value={professor.id}>{professor.name}</option>
                      ))}
                    </select>
                    {errors.professorId && <div className="error-message">{errors.professorId}</div>}
                  </div>
                )}
              </div>

              {bulkCreationMode && (
                <div className="form-section bulk-professor-selection">
                  <h3><Users size={18} /> Select Multiple Professors</h3>
                  <p className="field-note">The evaluation will be created for all selected professors</p>
                  
                  <div className="professor-grid">
                    {getFilteredProfessors(evaluationData.departmentId).map(professor => (
                      <div 
                        key={professor.id} 
                        className={`professor-card ${selectedProfessors.includes(professor.id) ? 'selected' : ''}`}
                        onClick={() => toggleProfessorSelection(professor.id)}
                      >
                        <div className="professor-info">
                          <div className="professor-name">{professor.name}</div>
                          <div className="professor-dept">
                            {departmentOptions.find(d => d.id === professor.departmentId)?.name}
                          </div>
                        </div>
                        <div className={`selection-indicator ${selectedProfessors.includes(professor.id) ? 'selected' : ''}`}>
                          {selectedProfessors.includes(professor.id) && <Check size={16} />}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="bulk-selection-summary">
                    <p><strong>{selectedProfessors.length}</strong> professors selected for bulk evaluation</p>
                  </div>
                  {errors.selectedProfessors && (
                    <div className="error-message questions-error">
                      <AlertTriangle size={16} /> {errors.selectedProfessors}
                    </div>
                  )}
                </div>
              )}
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="semester">Academic Semester</label>
                  <select
                    id="semester"
                    name="semester"
                    value={evaluationData.semester}
                    onChange={handleInputChange}
                    className="evaluation-input"
                  >
                    <option value="First Semester">First Semester</option>
                    <option value="Second Semester">Second Semester</option>
                    <option value="Summer Class">Summer Class</option>
                  </select>
          </div>

          <div className="form-group">
                  <label htmlFor="academicYear">Academic Year</label>
                  <select
                    id="academicYear"
                    name="academicYear"
                    value={evaluationData.academicYear}
                    onChange={handleInputChange}
                    className="evaluation-input"
                  >
                    <option value="2024-2025">2024-2025</option>
                    <option value="2025-2026">2025-2026</option>
                  </select>
                </div>
              </div>

              <div className="form-group full-width">
                <label htmlFor="description">Description (Optional)</label>
            <textarea
              id="description"
              name="description"
                  value={evaluationData.description}
              onChange={handleInputChange}
                  placeholder="Enter a detailed description of the evaluation's purpose and objectives"
                  rows="3"
                  className="evaluation-input"
                ></textarea>
                <div className="character-counter">
                  {evaluationData.description.length}/500 characters
                </div>
              </div>
          </div>

            <div className="form-section">
              <h2><Calendar size={20} /> Evaluation Schedule</h2>
          <div className="form-row">
            <div className="form-group">
                  <label htmlFor="startDate">
                    Start Date <span className="required-mark">*</span>
                  </label>
              <input
                type="date"
                id="startDate"
                name="startDate"
                    value={evaluationData.startDate}
                onChange={handleInputChange}
                    className={`evaluation-input ${errors.startDate ? "error" : ""}`}
              />
                  {errors.startDate && <div className="error-message">{errors.startDate}</div>}
            </div>

            <div className="form-group">
                  <label htmlFor="endDate">
                    End Date <span className="required-mark">*</span>
                  </label>
              <input
                type="date"
                id="endDate"
                name="endDate"
                    value={evaluationData.endDate}
                onChange={handleInputChange}
                    className={`evaluation-input ${errors.endDate ? "error" : ""}`}
              />
                  {errors.endDate && <div className="error-message">{errors.endDate}</div>}
                </div>
              </div>
            </div>
          </div>
        )}
        {activeTab === 'questions' && (
          <div className="form-tab-content">
            <div className="form-section">
              <div className="section-header">
                <h2><Star size={20} /> Evaluation Questions</h2>
                <div className="question-actions">
                  <select 
                    className="category-filter"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                  >
                    <option value="all">All Categories</option>
                    {evaluationData.questionCategories.map((category, index) => (
                      <option key={index} value={category}>{category}</option>
                    ))}
                  </select>
                  <div className="action-buttons">
                    <button type="button" className="add-question" onClick={() => addQuestion('rating')}>
                      <Star size={16} /> Add Rating Question
                    </button>
                    <button type="button" className="add-question" onClick={() => addQuestion('text')}>
                      <PenTool size={16} /> Add Text Question
                    </button>
                    <div className="dropdown">
                      <button type="button" className="dropdown-button">
                        <Filter size={16} /> More <ChevronDown size={14} />
                      </button>
                      <div className="dropdown-content">
                        <button type="button" onClick={() => addQuestion('multiple_choice')}>
                          Add Multiple Choice
                        </button>
                        <button type="button" onClick={() => addQuestion('scale')}>
                          Add Scale Question
                        </button>
                        <button type="button" onClick={() => {
                          const templateName = prompt("Enter a name for this template:");
                          if (templateName) {
                            const newTemplate = {
                              id: evaluationData.templates.length + 1,
                              name: templateName,
                              questions: [...evaluationData.questions]
                            };
                            
                            setEvaluationData({
                              ...evaluationData,
                              templates: [...evaluationData.templates, newTemplate]
                            });
                            
                            alert(`Template "${templateName}" saved successfully!`);
                          }
                        }}>
                          Save as Template
                        </button>
                        <button type="button" onClick={() => {
                          const fileInput = document.createElement('input');
                          fileInput.type = 'file';
                          fileInput.accept = '.json';
                          fileInput.addEventListener('change', (e) => {
                            const file = e.target.files[0];
                            if (file) {
                              const reader = new FileReader();
                              reader.onload = (event) => {
                                try {
                                  const imported = JSON.parse(event.target.result);
                                  if (Array.isArray(imported.questions)) {
                                    setEvaluationData({
                                      ...evaluationData,
                                      questions: imported.questions
                                    });
                                    alert('Questions imported successfully!');
                                  } else {
                                    alert('Invalid question format in file.');
                                  }
                                } catch (error) {
                                  alert('Error parsing the import file.');
                                }
                              };
                              reader.readAsText(file);
                            }
                          });
                          fileInput.click();
                        }}>
                          Import Questions
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Template Section */}
              <div className="template-selector">
                <h3><BookOpen size={16} /> Load Question Templates</h3>
                <p className="field-note">Select a template to quickly add pre-defined questions to your evaluation.</p>
                <div className="template-selection-row">
                  <select className="evaluation-input template-select">
                    <option value="">Select a Template</option>
                    {evaluationData.templates.map(template => (
                      <option key={template.id} value={template.id}>{template.name}</option>
                    ))}
                  </select>
                  <button
                    type="button"
                    className="secondary-button"
                    onClick={() => {
                      const select = document.querySelector('.template-select');
                      if (select.value) {
                        loadTemplate(parseInt(select.value));
                      } else {
                        alert('Please select a template first.');
                      }
                    }}
                  >
                    <FileText size={16} /> Load Template
                  </button>
                </div>
                {evaluationData.templates.length === 0 && (
                  <p className="field-note">Loading templates...</p>
                )}
              </div>

              {errors.questions && <div className="error-message questions-error"><AlertTriangle size={16} /> {errors.questions}</div>}
              {errors.requiredQuestions && <div className="error-message questions-error"><AlertTriangle size={16} /> {errors.requiredQuestions}</div>}
              
              <div className="questions-list">
                {filterQuestionsByCategory(selectedCategory).map((question, index) => (
                  <div className="question-item" key={question.id}>
                    <div className="question-number">{index + 1}</div>
                    <div className="question-content">
                      <div className="question-header">
                        <div className="question-metadata">
                          <div className="question-type">
                            {question.type === 'rating' ? (
                              <span className="badge rating-badge">
                                <Star size={14} /> Rating Question
                              </span>
                            ) : question.type === 'text' ? (
                              <span className="badge text-badge">
                                <PenTool size={14} /> Text Question
                              </span>
                            ) : question.type === 'multiple_choice' ? (
                              <span className="badge multiple-choice-badge">
                                <List size={14} /> Multiple Choice
                              </span>
                            ) : (
                              <span className="badge scale-badge">
                                <Sliders size={14} /> Scale Question
                              </span>
                            )}
                          </div>
                          <div className="question-category">
                            <select 
                              value={question.category} 
                              onChange={(e) => handleQuestionChange(question.id, 'category', e.target.value)}
                            >
                              {evaluationData.questionCategories.map((category, index) => (
                                <option key={index} value={category}>{category}</option>
                              ))}
                            </select>
                          </div>
          </div>
                        <div className="question-controls">
                          <div className="toggle-option sm">
                            <label className="toggle-label sm">
                              <span>Required</span>
                              <div className="toggle-wrapper sm">
                                <input
                                  type="checkbox"
                                  checked={question.required}
                                  onChange={() => handleQuestionChange(question.id, 'required', !question.required)}
                                />
                                <span className="toggle-slider sm"></span>
          </div>
                            </label>
      </div>
          <button
                            type="button" 
                            className="icon-button" 
                            onClick={() => duplicateQuestion(question.id)}
                            title="Duplicate Question"
                          >
                            <Copy size={14} />
          </button>
          <button
                            type="button" 
                            className="icon-button" 
                            onClick={() => moveQuestion(question.id, 'up')}
                            disabled={index === 0}
                            title="Move Up"
                          >
                            <ChevronUp size={16} />
          </button>
          <button
                            type="button"
                            className="icon-button"
                            onClick={() => moveQuestion(question.id, 'down')}
                            disabled={index === evaluationData.questions.length - 1}
                            title="Move Down"
                          >
                            <ChevronDown size={16} />
          </button>
          <button
                            type="button"
                            className="icon-button danger"
                            onClick={() => removeQuestion(question.id)}
                            title="Delete Question"
                          >
                            <Trash2 size={16} />
          </button>
                        </div>
                      </div>
                      
                      <input
                        type="text"
                        value={question.text}
                        onChange={(e) => handleQuestionChange(question.id, 'text', e.target.value)}
                        placeholder={
                          question.type === 'rating' 
                            ? "Enter a professional rating statement" 
                            : question.type === 'text'
                            ? "Enter a clear, concise question"
                            : question.type === 'multiple_choice'
                            ? "Enter a multiple choice question"
                            : "Enter a scale rating question (e.g., 'Rate the professor's teaching effectiveness')"
                        }
                        className="question-text-input"
                      />
                      
                      {question.type === 'rating' && (
                        <div className="rating-preview">
                          <div>Preview:</div>
                          <div className="stars-container">
                            <div className="star-label">Strongly Disagree</div>
                            <div className="stars">
                              <span className="star">1</span>
                              <span className="star">2</span>
                              <span className="star">3</span>
                              <span className="star">4</span>
                              <span className="star">5</span>
                            </div>
                            <div className="star-label">Strongly Agree</div>
                          </div>
                        </div>
                      )}
                      
                      {question.type === 'text' && (
                        <div className="text-preview">
                          <div className="text-area-placeholder">
                            [Text response area]
                          </div>
                        </div>
                      )}
                      
                      {question.type === 'multiple_choice' && (
                        <div className="multiple-choice-preview">
                          <div>Preview:</div>
                          <div className="options-container">
                            {question.options.map((option, idx) => (
                              <div key={idx} className="option-item">
                                <input type="radio" disabled />
                                <input 
                                  type="text" 
                                  value={option}
                                  onChange={(e) => {
                                    const newOptions = [...question.options];
                                    newOptions[idx] = e.target.value;
                                    handleQuestionChange(question.id, 'options', newOptions);
                                  }}
                                  placeholder={`Option ${idx + 1}`}
                                  className="option-text"
                                />
                                <button 
                                  type="button" 
                                  className="icon-button" 
                                  onClick={() => {
                                    const newOptions = question.options.filter((_, i) => i !== idx);
                                    handleQuestionChange(question.id, 'options', newOptions);
                                  }}
                                  disabled={question.options.length <= 2}
                                  title={question.options.length <= 2 ? "Minimum 2 options required" : "Remove option"}
                                >
                                  <Trash2 size={16} />
                                </button>
                              </div>
                            ))}
                            <button 
                              type="button" 
                              className="add-option-button"
                              onClick={() => {
                                const newOptions = [...question.options, `Option ${question.options.length + 1}`];
                                handleQuestionChange(question.id, 'options', newOptions);
                              }}
                            >
                              <Plus size={16} /> Add Option
                            </button>
                          </div>
                        </div>
                      )}
                      
                      {question.type === 'scale' && (
                        <div className="scale-preview">
                          <div className="scale-settings-header">Scale Question Settings</div>
                          <div className="scale-settings-container">
                            <div className="scale-setting-row">
                              <div className="scale-setting-label">Min Value:</div>
                              <input 
                                type="number" 
                                value={question.min}
                                onChange={(e) => handleQuestionChange(question.id, 'min', parseInt(e.target.value) || 1)}
                                min="1"
                                max="99"
                                className="scale-setting-input"
                              />
                            </div>
                            
                            <div className="scale-setting-row">
                              <div className="scale-setting-label">Max Value:</div>
                              <input 
                                type="number" 
                                value={question.max}
                                onChange={(e) => handleQuestionChange(question.id, 'max', parseInt(e.target.value) || 2)}
                                min={question.min + 1 || 2}
                                max="100"
                                className="scale-setting-input"
                              />
                            </div>
                            
                            <div className="scale-setting-row">
                              <div className="scale-setting-label">Min Label:</div>
                              <input 
                                type="text" 
                                value={question.minLabel || ""}
                                onChange={(e) => handleQuestionChange(question.id, 'minLabel', e.target.value)}
                                placeholder="Poor"
                                className="scale-setting-input"
                              />
                            </div>
                            
                            <div className="scale-setting-row">
                              <div className="scale-setting-label">Max Label:</div>
                              <input 
                                type="text" 
                                value={question.maxLabel || ""}
                                onChange={(e) => handleQuestionChange(question.id, 'maxLabel', e.target.value)}
                                placeholder="Excellent"
                                className="scale-setting-input"
                              />
                            </div>
                          </div>
                          
                          <div className="scale-preview-header">Scale Preview:</div>
                          <div className="scale-preview-display">
                            <span className="scale-label">{question.minLabel || 'Poor'}</span>
                            <div className="scale-numbers">
                              {Array.from({length: Math.min(question.max - question.min + 1, 10)}, (_, i) => (
                                <span key={i} className="scale-number">{question.min + i}</span>
                              ))}
                            </div>
                            <span className="scale-label">{question.maxLabel || 'Excellent'}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'settings' && (
          <div className="form-tab-content">
            <div className="form-section">
              <h2><Settings size={20} /> Evaluation Settings</h2>
              
              <div className="settings-group">
                <h3>Response Settings</h3>
                <div className="toggle-option">
                  <label className="toggle-label">
                    <span>Anonymous Responses</span>
                    <div className="toggle-wrapper">
                      <input
                        type="checkbox"
                        checked={evaluationData.anonymousResponses}
                        onChange={() => handleToggleChange('anonymousResponses')}
                      />
                      <span className="toggle-slider"></span>
                    </div>
                  </label>
                  <p className="option-description">
                    Student identities will not be associated with their responses.
                  </p>
                </div>
                
                <div className="toggle-option">
                  <label className="toggle-label">
                    <span>Allow Multiple Submissions</span>
                    <div className="toggle-wrapper">
                      <input
                        type="checkbox"
                        checked={evaluationData.allowMultipleSubmissions}
                        onChange={() => handleToggleChange('allowMultipleSubmissions')}
                      />
                      <span className="toggle-slider"></span>
                    </div>
                  </label>
                  <p className="option-description">
                    Students can submit more than one evaluation response.
                  </p>
                </div>
              </div>
              
              <div className="settings-group">
                <h3>Notifications</h3>
                <div className="toggle-option">
                  <label className="toggle-label">
                    <span>Notify Professor When Published</span>
                    <div className="toggle-wrapper">
                      <input
                        type="checkbox"
                        checked={evaluationData.notifyProfessor}
                        onChange={() => handleToggleChange('notifyProfessor')}
                      />
                      <span className="toggle-slider"></span>
                    </div>
                  </label>
                  <p className="option-description">
                    Send an email notification to the professor when this evaluation is published.
                  </p>
                </div>
              </div>
              
              <div className="settings-group">
                <h3>Results & Access</h3>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="resultsVisibility">Results Visibility</label>
                    <select id="resultsVisibility" name="resultsVisibility">
                      <option value="admin">Administrators Only</option>
                      <option value="department">Department Heads & Administrators</option>
                      <option value="professor">Professor, Department Heads & Administrators</option>
                    </select>
                  </div>
        </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="resultsRelease">Results Release Date</label>
                    <input type="date" id="resultsRelease" name="resultsRelease" />
                    <p className="field-note">
                      Leave blank to release results immediately after the evaluation ends.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'preview' && (
          <div className="form-tab-content">
            <div className="form-section preview-section">
              <div className="preview-header">
                <h2><Eye size={20} /> Student View Preview</h2>
                <p>This is how students will see your evaluation form</p>
              </div>
              
              <div className="preview-container">
                <div className="preview-form">
                  <div className="preview-title">
                    <h3>{evaluationData.title || 'Untitled Evaluation'}</h3>
                    <p className="preview-course">
                      {evaluationData.courseCode ? `Course: ${evaluationData.courseCode}` : 'Course: Not specified'}
                    </p>
                    <p className="preview-description">
                      {evaluationData.description || 'No description provided.'}
                    </p>
                  </div>
                  
                  <div className="preview-questions">
                    {evaluationData.questions.map((question, index) => (
                      <div className="preview-question" key={index}>
                        <p className="preview-question-text">
                          {index + 1}. {question.text || 'Question text not provided'}
                          {question.required && <span className="preview-required">*</span>}
                        </p>
                        
                        {question.type === 'rating' && (
                          <div className="preview-rating">
                            <div className="preview-scale">
                              <div className="preview-scale-label">Strongly Disagree</div>
                              <div className="preview-scale-options">
                                <label className="preview-scale-option">
                                  <input type="radio" name={`preview-q-${index}`} disabled />
                                  <span>1</span>
                                </label>
                                <label className="preview-scale-option">
                                  <input type="radio" name={`preview-q-${index}`} disabled />
                                  <span>2</span>
                                </label>
                                <label className="preview-scale-option">
                                  <input type="radio" name={`preview-q-${index}`} disabled />
                                  <span>3</span>
                                </label>
                                <label className="preview-scale-option">
                                  <input type="radio" name={`preview-q-${index}`} disabled />
                                  <span>4</span>
                                </label>
                                <label className="preview-scale-option">
                                  <input type="radio" name={`preview-q-${index}`} disabled />
                                  <span>5</span>
                                </label>
                              </div>
                              <div className="preview-scale-label">Strongly Agree</div>
                            </div>
                          </div>
                        )}
                        
                        {question.type === 'text' && (
                          <div className="preview-text">
                            <textarea 
                              rows="3" 
                              placeholder="Enter your response here..." 
                              disabled
                            ></textarea>
                          </div>
                        )}
                        
                        {question.type === 'multiple_choice' && (
                          <div className="preview-multiple-choice">
                            {question.options.map((option, idx) => (
                              <label key={idx} className="preview-option">
                                <input type="radio" name={`preview-q-${index}`} disabled />
                                <span>{option}</span>
                              </label>
                            ))}
                          </div>
                        )}
                        
                        {question.type === 'scale' && (
                          <div className="preview-scale-question">
                            <div className="preview-scale-display">
                              <span className="preview-scale-label">{question.minLabel || 'Poor'}</span>
                              <div className="preview-scale-numbers">
                                {Array.from({length: Math.min(question.max - question.min + 1, 10)}, (_, i) => (
                                  <label key={i} className="preview-scale-option">
                                    <input type="radio" name={`preview-q-${index}`} disabled />
                                    <span>{question.min + i}</span>
                                  </label>
                                ))}
                              </div>
                              <span className="preview-scale-label">{question.maxLabel || 'Excellent'}</span>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                  
                  <div className="preview-footer">
                    <button type="button" className="preview-submit-button" disabled>
                      Submit Evaluation
                </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        <div className="form-actions">
          <div className="action-left">
            <button type="button" className="danger-button">
              <Trash2 size={16} /> Delete Draft
            </button>
          </div>
          <div className="action-right">
            <button type="button" className="secondary-button" onClick={handleSave}>
              <Save size={16} /> Save as Draft
            </button>
            <button type="submit" className="primary-button">
              <Check size={16} /> Publish Evaluation
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Evaluation; 