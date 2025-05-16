import React, { useState, useEffect } from 'react';
import { FaCalendarAlt, FaPlus, FaChevronLeft, FaChevronRight, FaClock, FaMapMarkerAlt, FaTag, FaTimes, FaFilter } from 'react-icons/fa';
import Loading from '../Loading/Loading';
import './Calendar.css';

const Calendar = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [showQuickAdd, setShowQuickAdd] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    types: [],
    search: '',
    dateRange: 'all' // all, week, month
  });
  const [newEvent, setNewEvent] = useState({
    title: '',
    date: '',
    time: '',
    type: 'meeting',
    location: ''
  });
  const [events, setEvents] = useState([]);

  const eventTypes = [
    { id: 'meeting', label: 'Meeting', color: '#1a56db' },
    { id: 'consultation', label: 'Consultation', color: '#059669' },
    { id: 'exam', label: 'Exam', color: '#dc2626' },
    { id: 'seminar', label: 'Seminar', color: '#7c3aed' },
    { id: 'workshop', label: 'Workshop', color: '#d97706' },
    { id: 'evaluation', label: 'Evaluation', color: '#be185d' }
  ];

  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year, month) => {
    return new Date(year, month, 1).getDay();
  };

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const isToday = (day) => {
    const today = new Date();
    return day === today.getDate() && 
           currentDate.getMonth() === today.getMonth() && 
           currentDate.getFullYear() === today.getFullYear();
  };

  const isSelected = (day) => {
    return selectedDate && 
           day === selectedDate.getDate() && 
           currentDate.getMonth() === selectedDate.getMonth() && 
           currentDate.getFullYear() === selectedDate.getFullYear();
  };

  const handleDateClick = (day) => {
    const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    setSelectedDate(newDate);
  };

  const handleQuickAdd = () => {
    if (newEvent.title && newEvent.date && newEvent.time) {
      // Add event logic here
      setShowQuickAdd(false);
      setNewEvent({ 
        title: '', 
        date: '', 
        time: '', 
        type: 'meeting',
        location: '' 
      });
    }
  };

  const toggleEventType = (typeId) => {
    setFilters(prev => ({
      ...prev,
      types: prev.types.includes(typeId)
        ? prev.types.filter(id => id !== typeId)
        : [...prev.types, typeId]
    }));
  };

  const clearFilters = () => {
    setFilters({
      types: [],
      search: '',
      dateRange: 'all'
    });
  };

  const filterEvents = (events) => {
    return events.filter(event => {
      const matchesType = filters.types.length === 0 || filters.types.includes(event.type);
      const matchesSearch = event.title.toLowerCase().includes(filters.search.toLowerCase());
      
      let matchesDateRange = true;
      if (filters.dateRange !== 'all') {
        const eventDate = new Date(event.date);
        const today = new Date();
        const diffTime = Math.abs(eventDate - today);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        if (filters.dateRange === 'week') {
          matchesDateRange = diffDays <= 7;
        } else if (filters.dateRange === 'month') {
          matchesDateRange = diffDays <= 30;
        }
      }

      return matchesType && matchesSearch && matchesDateRange;
    });
  };

  const renderCalendar = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);

    const calendarDays = [];
    let dayCount = 1;

    for (let i = 0; i < firstDay; i++) {
      calendarDays.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
    }

    while (dayCount <= daysInMonth) {
      const date = `${year}-${String(month + 1).padStart(2, '0')}-${String(dayCount).padStart(2, '0')}`;
      const dayEvents = events.filter(event => event.date === date);
      
      calendarDays.push(
        <div 
          key={dayCount} 
          className={`calendar-day ${dayEvents.length > 0 ? 'has-events' : ''} ${isToday(dayCount) ? 'today' : ''} ${isSelected(dayCount) ? 'selected' : ''}`}
          onClick={() => handleDateClick(dayCount)}
        >
          <span className="day-number">{dayCount}</span>
          {dayEvents.length > 0 && (
            <div className="event-indicators">
              {dayEvents.map(event => (
                <div 
                  key={event.id} 
                  className="event-indicator"
                  style={{ backgroundColor: eventTypes.find(t => t.id === event.type)?.color }}
                />
              ))}
            </div>
          )}
        </div>
      );
      dayCount++;
    }

    return calendarDays;
  };

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const getEventsForSelectedDate = () => {
    if (!selectedDate) return [];
    const dateStr = `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, '0')}-${String(selectedDate.getDate()).padStart(2, '0')}`;
    return filterEvents(events.filter(event => event.date === dateStr));
  };

  const filteredEvents = filterEvents(events);

  const getUpcomingEvents = () => {
    const placeholderEvents = [
      { id: 'p1', title: 'Faculty Development Program', date: '2024-03-15', time: '9:00 AM', type: 'workshop', location: 'Training Center' },
      { id: 'p2', title: 'Department Meeting', date: '2024-03-16', time: '10:30 AM', type: 'meeting', location: 'Conference Room A' },
      { id: 'p3', title: 'Student Evaluation', date: '2024-03-17', time: '2:00 PM', type: 'evaluation', location: 'Main Hall' },
      { id: 'p4', title: 'Research Seminar', date: '2024-03-18', time: '1:00 PM', type: 'seminar', location: 'Seminar Hall' },
      { id: 'p5', title: 'Academic Consultation', date: '2024-03-19', time: '11:00 AM', type: 'consultation', location: 'Office 302' }
    ];

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const filteredEvents = events.filter(event => {
      const eventDate = new Date(event.date);
      eventDate.setHours(0, 0, 0, 0);
      return eventDate >= today;
    });

    if (filteredEvents.length === 0) {
      return placeholderEvents;
    }

    return filteredEvents
      .sort((a, b) => new Date(a.date) - new Date(b.date))
      .slice(0, 8);
  };

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
      // Sample events
      setEvents([
        { id: 1, title: 'Faculty Meeting', date: '2024-03-15', time: '10:00 AM', type: 'meeting', location: 'Conference Room A' },
        { id: 2, title: 'Student Evaluation', date: '2024-03-20', time: '9:00 AM', type: 'evaluation', location: 'Main Hall' },
        { id: 3, title: 'Department Review', date: '2024-03-25', time: '2:00 PM', type: 'meeting', location: 'Board Room' },
        { id: 4, title: 'Research Consultation', date: '2024-03-18', time: '11:00 AM', type: 'consultation', location: 'Office 302' },
        { id: 5, title: 'Teaching Workshop', date: '2024-03-22', time: '1:00 PM', type: 'workshop', location: 'Training Room' },
        { id: 6, title: 'Thesis Defense', date: '2024-03-28', time: '3:00 PM', type: 'exam', location: 'Conference Room B' },
        { id: 7, title: 'Faculty Development', date: '2024-03-30', time: '9:00 AM', type: 'meeting', location: 'Training Room' },
        { id: 8, title: 'Student Consultation', date: '2024-03-19', time: '2:30 PM', type: 'consultation', location: 'Office 205' },
        { id: 9, title: 'Curriculum Planning', date: '2024-03-27', time: '10:30 AM', type: 'meeting', location: 'Meeting Room 3' },
        { id: 10, title: 'Research Seminar', date: '2024-03-21', time: '1:30 PM', type: 'seminar', location: 'Room 203' },
        { id: 11, title: 'Teaching Methods Workshop', date: '2024-03-29', time: '2:00 PM', type: 'workshop', location: 'Training Center' },
        { id: 12, title: 'Department Seminar', date: '2024-03-26', time: '11:00 AM', type: 'seminar', location: 'Seminar Hall' },
        { id: 13, title: 'Professor Performance Review', date: '2024-03-23', time: '10:00 AM', type: 'evaluation', location: 'HR Office' },
        { id: 14, title: 'Course Evaluation', date: '2024-03-24', time: '2:00 PM', type: 'evaluation', location: 'Classroom 101' },
        { id: 15, title: 'Research Paper Presentation', date: '2024-03-31', time: '1:00 PM', type: 'seminar', location: 'Research Center' },
        { id: 16, title: 'Student Progress Review', date: '2024-03-17', time: '3:00 PM', type: 'evaluation', location: 'Student Center' },
        { id: 17, title: 'Teaching Excellence Workshop', date: '2024-03-16', time: '9:30 AM', type: 'workshop', location: 'Training Room' },
        { id: 18, title: 'Academic Planning Meeting', date: '2024-03-29', time: '11:00 AM', type: 'meeting', location: 'Board Room' },
        { id: 19, title: 'Research Grant Consultation', date: '2024-03-21', time: '3:30 PM', type: 'consultation', location: 'Office 401' },
        { id: 20, title: 'Final Exam Review', date: '2024-03-27', time: '2:00 PM', type: 'exam', location: 'Main Hall' }
      ]);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="calendar-container">
      <div className="calendar-section">
        <div className="calendar-header">
          <div className="header-content">
            <h1><FaCalendarAlt size={28} /> Academic Calendar</h1>
            <p>Manage and view academic events</p>
          </div>
          <div className="header-actions">
            <button className="filter-btn" onClick={() => setShowFilters(!showFilters)}>
              <FaFilter />
              Filters
            </button>
            <button className="add-event-btn" onClick={() => setShowQuickAdd(true)}>
              <FaPlus />
              Add Event
            </button>
          </div>
        </div>

        <div className={`filters-panel ${showFilters ? 'show' : ''}`}>
          <div className="filters-content">
            <div className="filter-group">
              <label>Event Type</label>
              <div className="type-filters">
                {eventTypes.map(type => (
                  <button
                    key={type.id}
                    className={`type-filter ${filters.types.includes(type.id) ? 'active' : ''}`}
                    style={{
                      backgroundColor: filters.types.includes(type.id) ? type.color : 'white',
                      borderColor: type.color
                    }}
                    onClick={() => toggleEventType(type.id)}
                  >
                    <span className="type-color" style={{ backgroundColor: type.color }}></span>
                    {type.label}
                  </button>
                ))}
              </div>
            </div>
            <div className="filter-group">
              <label>Search Events</label>
              <input
                type="text"
                placeholder="Search by event title..."
                value={filters.search}
                onChange={(e) => setFilters({ ...filters, search: e.target.value })}
              />
            </div>
            <div className="filter-group">
              <label>Date Range</label>
              <select
                value={filters.dateRange}
                onChange={(e) => setFilters({ ...filters, dateRange: e.target.value })}
              >
                <option value="all">All Time</option>
                <option value="week">Next 7 Days</option>
                <option value="month">Next 30 Days</option>
              </select>
            </div>
            <button className="clear-filters-btn" onClick={clearFilters}>
              Clear All Filters
            </button>
          </div>
        </div>

        <div className="calendar-nav">
          <div className="nav-controls">
            <button onClick={prevMonth} className="nav-btn" title="Previous Month">
              &laquo;
            </button>
            <h3><span className="month">{months[currentDate.getMonth()]}</span> <span className="year">{currentDate.getFullYear()}</span></h3>
            <button onClick={nextMonth} className="nav-btn" title="Next Month">
              &raquo;
            </button>
          </div>
        </div>

        <div className="calendar-grid">
          {days.map(day => (
            <div key={day} className="calendar-day-header">
              {day}
            </div>
          ))}
          {renderCalendar()}
        </div>
      </div>

      <div className="upcoming-events">
        <h3>Upcoming Events</h3>
        <div className="upcoming-events-list">
          {getUpcomingEvents().length > 0 ? (
            getUpcomingEvents().map(event => (
              <div key={event.id} className="upcoming-event-card" onClick={() => handleDateClick(new Date(event.date).getDate())}>
                <div className="upcoming-event-date">
                  {new Date(event.date).toLocaleDateString('en-US', { 
                    weekday: 'short', 
                    month: 'short', 
                    day: 'numeric' 
                  })}
                </div>
                <div className="upcoming-event-title">{event.title}</div>
                <div className="upcoming-event-details">
                  <div className="upcoming-event-time">
                    <FaClock size={12} />
                    {event.time}
                  </div>
                  <div className="upcoming-event-location">
                    <FaMapMarkerAlt size={12} />
                    {event.location}
                  </div>
                  <div className="upcoming-event-type">
                    <FaTag size={12} />
                    {eventTypes.find(t => t.id === event.type)?.label}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="empty-state">
              <p>No upcoming events</p>
            </div>
          )}
        </div>
      </div>

      {showQuickAdd && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="quick-add-form">
              <div className="form-header">
                <h3>Quick Add Event</h3>
                <button className="close-btn" onClick={() => setShowQuickAdd(false)}>
                  <FaTimes />
                </button>
              </div>
              <div className="form-content">
                <div className="form-group">
                  <label>Event Title</label>
                  <input 
                    type="text" 
                    value={newEvent.title}
                    onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
                    placeholder="Enter event title"
                  />
                </div>
                <div className="form-group">
                  <label>Date</label>
                  <input 
                    type="date" 
                    value={newEvent.date}
                    onChange={(e) => setNewEvent({...newEvent, date: e.target.value})}
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>
                <div className="form-group">
                  <label>Time</label>
                  <input 
                    type="time" 
                    value={newEvent.time}
                    onChange={(e) => setNewEvent({...newEvent, time: e.target.value})}
                  />
                </div>
                <div className="form-group">
                  <label>Location</label>
                  <input 
                    type="text" 
                    value={newEvent.location}
                    onChange={(e) => setNewEvent({...newEvent, location: e.target.value})}
                    placeholder="Enter location"
                  />
                </div>
                <div className="form-group">
                  <label>Type</label>
                  <select 
                    value={newEvent.type}
                    onChange={(e) => setNewEvent({...newEvent, type: e.target.value})}
                  >
                    {eventTypes.map(type => (
                      <option key={type.id} value={type.id}>{type.label}</option>
                    ))}
                  </select>
                </div>
                <button className="submit-btn" onClick={handleQuickAdd}>
                  Add Event
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Calendar; 