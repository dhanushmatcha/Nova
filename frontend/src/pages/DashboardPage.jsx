import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { api } from '../services/api';
import {
  Sparkles,
  LayoutDashboard,
  FolderKanban,
  CheckSquare,
  Bot,
  Users,
  Settings as SettingsIcon,
  LogOut,
  Plus,
  Trash2,
  Edit2,
  TrendingUp,
  Clock,
  Send,
  Sun,
  Moon,
  Menu,
  X,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

const DashboardPage = ({ onNavigateHome }) => {
  const { user, logout, setUser } = useAuth();
  const { theme, toggleTheme } = useTheme();

  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'projects' | 'tasks' | 'ai' | 'team' | 'settings'
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Real backend data states
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modal / Form states
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [newProjectName, setNewProjectName] = useState('');
  const [newProjectDesc, setNewProjectDesc] = useState('');
  const [newProjectPriority, setNewProjectPriority] = useState('MEDIUM');

  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDesc, setNewTaskDesc] = useState('');
  const [newTaskProjectId, setNewTaskProjectId] = useState('');
  const [newTaskPriority, setNewTaskPriority] = useState('MEDIUM');

  // AI Chat state
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState([
    { id: 1, sender: 'bot', text: 'Hello! I am NOVA Copilot. How can I assist your team with backlog triage, workflow automation, or sprint planning today?' }
  ]);

  // Profile Settings state
  const [profileName, setProfileName] = useState(user?.name || '');
  const [profileCompany, setCompany] = useState(user?.company || '');
  const [profileJob, setJob] = useState(user?.jobTitle || '');
  const [settingsStatus, setSettingsStatus] = useState('');

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const [projRes, taskRes] = await Promise.all([
        api.getProjects().catch(() => ({ success: false, data: [] })),
        api.getTasks().catch(() => ({ success: false, data: [] }))
      ]);

      if (projRes.success && projRes.data) {
        setProjects(projRes.data);
        if (projRes.data.length > 0) {
          setNewTaskProjectId(projRes.data[0].id);
        }
      }
      if (taskRes.success && taskRes.data) {
        setTasks(taskRes.data);
      }
    } catch (err) {
      console.warn('Dashboard API fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateProject = async (e) => {
    e.preventDefault();
    if (!newProjectName) return;

    try {
      const res = await api.createProject({
        name: newProjectName,
        description: newProjectDesc,
        priority: newProjectPriority,
        status: 'PLANNING'
      });

      if (res.success && res.data) {
        setProjects([res.data, ...projects]);
        setIsProjectModalOpen(false);
        setNewProjectName('');
        setNewProjectDesc('');
      }
    } catch (err) {
      alert('Error creating project: ' + err.message);
    }
  };

  const handleDeleteProject = async (id) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return;
    try {
      await api.deleteProject(id);
      setProjects(projects.filter(p => p.id !== id));
      setTasks(tasks.filter(t => t.projectId !== id));
    } catch (err) {
      alert('Delete failed: ' + err.message);
    }
  };

  const handleCreateTask = async (e) => {
    e.preventDefault();
    if (!newTaskTitle || !newTaskProjectId) return;

    try {
      const res = await api.createTask({
        projectId: newTaskProjectId,
        title: newTaskTitle,
        description: newTaskDesc,
        priority: newTaskPriority,
        status: 'TODO'
      });

      if (res.success && res.data) {
        setTasks([res.data, ...tasks]);
        setIsTaskModalOpen(false);
        setNewTaskTitle('');
        setNewTaskDesc('');
      }
    } catch (err) {
      alert('Error creating task: ' + err.message);
    }
  };

  const handleUpdateTaskStatus = async (taskId, newStatus) => {
    try {
      setTasks(tasks.map(t => t.id === taskId ? { ...t, status: newStatus } : t));
      await api.updateTask(taskId, { status: newStatus });
    } catch (err) {
      console.error('Task update failed:', err);
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await api.deleteTask(id);
      setTasks(tasks.filter(t => t.id !== id));
    } catch (err) {
      alert('Delete task failed: ' + err.message);
    }
  };

  const handleSendAiMessage = async (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userText = chatInput;
    const userMsgObj = { id: Date.now(), sender: 'user', text: userText };

    setChatMessages(prev => [...prev, userMsgObj]);
    setChatInput('');

    try {
      const res = await api.sendAiChat({ message: userText });
      if (res.success && res.data) {
        setChatMessages(prev => [...prev, { id: Date.now() + 1, sender: 'bot', text: res.data.reply }]);
      }
    } catch (err) {
      setChatMessages(prev => [...prev, { id: Date.now() + 1, sender: 'bot', text: 'Sorry, I encountered an issue analyzing workspace data.' }]);
    }
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    try {
      const res = await api.updateProfile({
        name: profileName,
        company: profileCompany,
        jobTitle: profileJob
      });
      if (res.success && res.data) {
        setUser({ ...user, ...res.data });
        setSettingsStatus('Profile updated successfully!');
        setTimeout(() => setSettingsStatus(''), 3000);
      }
    } catch (err) {
      setSettingsStatus('Update failed: ' + err.message);
    }
  };

  // Calculations for Overview stats
  const totalProjectsCount = projects.length;
  const activeTasksCount = tasks.filter(t => t.status !== 'DONE').length;
  const completedTasksCount = tasks.filter(t => t.status === 'DONE').length;

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg-primary)', color: 'var(--text-primary)' }}>

      {/* Sidebar Navigation Container */}
      <aside className={`dashboard-sidebar-nav ${isMobileSidebarOpen ? 'open' : ''}`} style={{
        width: '260px',
        background: 'var(--bg-secondary)',
        borderRight: '1px solid var(--border-subtle)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '1.5rem 1rem',
        position: 'fixed',
        top: 0,
        bottom: 0,
        left: 0,
        zIndex: 90,
        transition: 'transform 0.3s ease'
      }}>
        <div>
          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem', padding: '0 0.5rem' }}>
            <button
              onClick={onNavigateHome}
              style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', background: 'none', border: 'none', cursor: 'pointer' }}
            >
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '9px',
                background: 'var(--accent-gradient)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#FFF'
              }}>
                <Sparkles size={18} />
              </div>
              <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '1.35rem', color: 'var(--text-primary)' }}>
                NOVA
              </span>
            </button>

            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              style={{ padding: '0.4rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)', background: 'var(--bg-tertiary)', color: 'var(--text-secondary)' }}
            >
              {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
            </button>
          </div>

          {/* Navigation Tabs */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            <button
              onClick={() => { setActiveTab('overview'); setIsMobileSidebarOpen(false); }}
              className={`dashboard-tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
            >
              <LayoutDashboard size={18} /> Overview
            </button>

            <button
              onClick={() => { setActiveTab('projects'); setIsMobileSidebarOpen(false); }}
              className={`dashboard-tab-btn ${activeTab === 'projects' ? 'active' : ''}`}
            >
              <FolderKanban size={18} /> Projects ({totalProjectsCount})
            </button>

            <button
              onClick={() => { setActiveTab('tasks'); setIsMobileSidebarOpen(false); }}
              className={`dashboard-tab-btn ${activeTab === 'tasks' ? 'active' : ''}`}
            >
              <CheckSquare size={18} /> Tasks Board ({tasks.length})
            </button>

            <button
              onClick={() => { setActiveTab('ai'); setIsMobileSidebarOpen(false); }}
              className={`dashboard-tab-btn ${activeTab === 'ai' ? 'active' : ''}`}
            >
              <Bot size={18} /> AI Copilot
            </button>

            <button
              onClick={() => { setActiveTab('settings'); setIsMobileSidebarOpen(false); }}
              className={`dashboard-tab-btn ${activeTab === 'settings' ? 'active' : ''}`}
            >
              <SettingsIcon size={18} /> Settings
            </button>
          </div>
        </div>

        {/* User Card & Logout */}
        <div style={{ paddingTop: '1rem', borderTop: '1px solid var(--border-subtle)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem', padding: '0.5rem' }}>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              background: 'var(--accent-gradient)',
              color: '#FFF',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '0.85rem'
            }}>
              {user?.name ? user.name.substring(0, 2).toUpperCase() : 'NV'}
            </div>
            <div style={{ overflow: 'hidden' }}>
              <div style={{ fontSize: '0.875rem', fontWeight: 700, whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                {user?.name || 'Workspace User'}
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                {user?.email || 'user@nova.ai'}
              </div>
            </div>
          </div>

          <button
            onClick={logout}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              gap: '0.6rem',
              padding: '0.65rem 0.85rem',
              borderRadius: 'var(--radius-sm)',
              color: '#F87171',
              background: 'rgba(239, 68, 68, 0.1)',
              border: '1px solid rgba(239, 68, 68, 0.2)',
              fontSize: '0.875rem',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            <LogOut size={16} /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main Workspace Area */}
      <main style={{ flex: 1, marginLeft: '260px', padding: '2rem', minWidth: 0 }}>
        {/* Mobile Header Toggle */}
        <div className="mobile-header-toggle" style={{ display: 'none', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <button
            onClick={onNavigateHome}
            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 800 }}
          >
            <Sparkles size={20} style={{ color: 'var(--accent-violet)' }} /> NOVA Workspace
          </button>

          <button
            onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
            style={{ padding: '0.5rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)', background: 'var(--bg-secondary)' }}
          >
            {isMobileSidebarOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Dynamic Tab Views */}

        {/* OVERVIEW TAB */}
        {activeTab === 'overview' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <h1 style={{ fontSize: '1.85rem', fontWeight: 800, marginBottom: '0.25rem' }}>
                  Workspace Overview
                </h1>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                  Real-time project velocity and active team metrics.
                </p>
              </div>

              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <button onClick={() => setIsProjectModalOpen(true)} className="btn btn-primary" style={{ padding: '0.65rem 1.25rem', fontSize: '0.875rem' }}>
                  <Plus size={16} /> New Project
                </button>
              </div>
            </div>

            {/* Metrics Row */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem', marginBottom: '2rem' }}>
              <div className="glass-card" style={{ padding: '1.5rem' }}>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>TOTAL PROJECTS</div>
                <div style={{ fontSize: '2.25rem', fontWeight: 800, margin: '0.35rem 0', color: 'var(--text-primary)' }}>{totalProjectsCount}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--accent-violet-light)' }}>Managed via PostgreSQL</div>
              </div>

              <div className="glass-card" style={{ padding: '1.5rem' }}>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>ACTIVE TASKS</div>
                <div style={{ fontSize: '2.25rem', fontWeight: 800, margin: '0.35rem 0', color: 'var(--accent-cyan)' }}>{activeTasksCount}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--accent-cyan)' }}>In Todo & Progress</div>
              </div>

              <div className="glass-card" style={{ padding: '1.5rem' }}>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>COMPLETED TASKS</div>
                <div style={{ fontSize: '2.25rem', fontWeight: 800, margin: '0.35rem 0', color: 'var(--success)' }}>{completedTasksCount}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--success)' }}>100% Verified</div>
              </div>
            </div>

            {/* Recent Activity List */}
            <div className="glass-card" style={{ padding: '1.75rem' }}>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <FolderKanban size={18} style={{ color: 'var(--accent-violet)' }} /> Recent Active Projects
              </h3>

              {projects.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '3rem 1rem', color: 'var(--text-muted)' }}>
                  <FolderKanban size={36} style={{ marginBottom: '0.75rem', opacity: 0.5 }} />
                  <p style={{ fontWeight: 600 }}>No projects created yet</p>
                  <p style={{ fontSize: '0.85rem', marginBottom: '1.25rem' }}>Create your first project to start turning ideas into progress.</p>
                  <button onClick={() => setIsProjectModalOpen(true)} className="btn btn-primary" style={{ padding: '0.6rem 1.25rem' }}>
                    <Plus size={16} /> Create Project
                  </button>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                  {projects.slice(0, 5).map(proj => (
                    <div key={proj.id} style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '1rem',
                      background: 'var(--bg-primary)',
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid var(--border-subtle)'
                    }}>
                      <div>
                        <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-primary)' }}>{proj.name}</div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{proj.description || 'No description'}</div>
                      </div>
                      <span className="badge" style={{ fontSize: '0.7rem' }}>
                        {proj.status}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* PROJECTS TAB */}
        {activeTab === 'projects' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <h1 style={{ fontSize: '1.85rem', fontWeight: 800, marginBottom: '0.25rem' }}>
                  Projects ({projects.length})
                </h1>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                  Manage sprint milestones, project statuses, and priorities.
                </p>
              </div>

              <button onClick={() => setIsProjectModalOpen(true)} className="btn btn-primary">
                <Plus size={16} /> Add Project
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
              {projects.map(proj => (
                <div key={proj.id} className="glass-card" style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                      <span className="badge" style={{ fontSize: '0.7rem' }}>{proj.status}</span>
                      <button onClick={() => handleDeleteProject(proj.id)} style={{ color: '#F87171', background: 'none', border: 'none', cursor: 'pointer' }}>
                        <Trash2 size={16} />
                      </button>
                    </div>

                    <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
                      {proj.name}
                    </h3>
                    <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                      {proj.description || 'No description provided.'}
                    </p>
                  </div>

                  <div style={{ paddingTop: '1rem', borderTop: '1px solid var(--border-subtle)', display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    <span>Priority: <strong style={{ color: 'var(--accent-violet-light)' }}>{proj.priority}</strong></span>
                    <span>{new Date(proj.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TASKS KANBAN BOARD TAB */}
        {activeTab === 'tasks' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <h1 style={{ fontSize: '1.85rem', fontWeight: 800, marginBottom: '0.25rem' }}>
                  Tasks Board
                </h1>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                  Interactive task workflow columns (TODO, IN_PROGRESS, DONE).
                </p>
              </div>

              <button onClick={() => setIsTaskModalOpen(true)} className="btn btn-primary">
                <Plus size={16} /> Add Task
              </button>
            </div>

            {/* Kanban Columns Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
              {/* TODO Column */}
              <div style={{ background: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)', padding: '1.25rem', border: '1px solid var(--border-subtle)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-primary)' }}>
                  <span>📋 TO DO</span>
                  <span className="badge" style={{ fontSize: '0.7rem' }}>{tasks.filter(t => t.status === 'TODO').length}</span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                  {tasks.filter(t => t.status === 'TODO').map(task => (
                    <div key={task.id} style={{ background: 'var(--bg-primary)', padding: '1rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
                      <div style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: '0.35rem' }}>{task.title}</div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.85rem' }}>{task.description}</div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <button onClick={() => handleUpdateTaskStatus(task.id, 'IN_PROGRESS')} className="btn btn-outline" style={{ padding: '0.25rem 0.65rem', fontSize: '0.75rem' }}>
                          Move to In Progress →
                        </button>
                        <button onClick={() => handleDeleteTask(task.id)} style={{ color: '#F87171', background: 'none', border: 'none', cursor: 'pointer' }}><Trash2 size={14} /></button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* IN PROGRESS Column */}
              <div style={{ background: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)', padding: '1.25rem', border: '1px solid var(--border-subtle)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', fontWeight: 700, fontSize: '0.9rem', color: 'var(--accent-violet-light)' }}>
                  <span>⚡ IN PROGRESS</span>
                  <span className="badge" style={{ fontSize: '0.7rem' }}>{tasks.filter(t => t.status === 'IN_PROGRESS').length}</span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                  {tasks.filter(t => t.status === 'IN_PROGRESS').map(task => (
                    <div key={task.id} style={{ background: 'var(--bg-primary)', padding: '1rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--accent-violet)' }}>
                      <div style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: '0.35rem' }}>{task.title}</div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.85rem' }}>{task.description}</div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <button onClick={() => handleUpdateTaskStatus(task.id, 'DONE')} className="btn btn-primary" style={{ padding: '0.25rem 0.65rem', fontSize: '0.75rem' }}>
                          Complete Task ✓
                        </button>
                        <button onClick={() => handleDeleteTask(task.id)} style={{ color: '#F87171', background: 'none', border: 'none', cursor: 'pointer' }}><Trash2 size={14} /></button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* DONE Column */}
              <div style={{ background: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)', padding: '1.25rem', border: '1px solid var(--border-subtle)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', fontWeight: 700, fontSize: '0.9rem', color: 'var(--success)' }}>
                  <span>✅ COMPLETED</span>
                  <span className="badge" style={{ fontSize: '0.7rem' }}>{tasks.filter(t => t.status === 'DONE').length}</span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                  {tasks.filter(t => t.status === 'DONE').map(task => (
                    <div key={task.id} style={{ background: 'var(--bg-primary)', padding: '1rem', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(16, 185, 129, 0.3)', opacity: 0.85 }}>
                      <div style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: '0.35rem', textDecoration: 'line-through' }}>{task.title}</div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{task.description}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* AI ASSISTANT TAB */}
        {activeTab === 'ai' && (
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <h1 style={{ fontSize: '1.85rem', fontWeight: 800, marginBottom: '0.25rem' }}>
              NOVA Copilot AI Assistant
            </h1>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '2rem' }}>
              Ask Copilot to analyze workspace bottlenecks, draft sprint specs, or write workflow rules.
            </p>

            <div className="glass-card" style={{ padding: '1.5rem', minHeight: '480px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              {/* Chat Thread */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', overflowY: 'auto', maxHeight: '380px', paddingRight: '0.5rem' }}>
                {chatMessages.map(msg => (
                  <div key={msg.id} style={{
                    display: 'flex',
                    alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                    maxWidth: '80%',
                    background: msg.sender === 'user' ? 'var(--accent-gradient)' : 'var(--bg-primary)',
                    color: msg.sender === 'user' ? '#FFF' : 'var(--text-primary)',
                    padding: '0.85rem 1.1rem',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-subtle)',
                    fontSize: '0.9rem',
                    lineHeight: 1.5
                  }}>
                    {msg.text}
                  </div>
                ))}
              </div>

              {/* Input Bar */}
              <form onSubmit={handleSendAiMessage} style={{ display: 'flex', gap: '0.75rem', marginTop: '1.5rem' }}>
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="Ask NOVA Copilot anything about your project..."
                  style={{
                    flex: 1,
                    background: 'var(--bg-primary)',
                    border: '1px solid var(--border-medium)',
                    borderRadius: 'var(--radius-md)',
                    padding: '0.85rem 1rem',
                    color: 'var(--text-primary)',
                    fontSize: '0.9rem',
                    outline: 'none'
                  }}
                />
                <button type="submit" className="btn btn-primary" style={{ padding: '0.85rem 1.5rem' }}>
                  Send <Send size={16} />
                </button>
              </form>
            </div>
          </div>
        )}

        {/* SETTINGS TAB */}
        {activeTab === 'settings' && (
          <div style={{ maxWidth: '600px' }}>
            <h1 style={{ fontSize: '1.85rem', fontWeight: 800, marginBottom: '0.25rem' }}>
              User Profile & Settings
            </h1>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '2rem' }}>
              Manage your personal information and theme preferences.
            </p>

            <div className="glass-card" style={{ padding: '2rem' }}>
              {settingsStatus && (
                <div style={{ background: 'rgba(16, 185, 129, 0.12)', border: '1px solid rgba(16, 185, 129, 0.3)', color: '#34D399', padding: '0.75rem', borderRadius: 'var(--radius-sm)', marginBottom: '1.25rem', fontSize: '0.85rem' }}>
                  {settingsStatus}
                </div>
              )}

              <form onSubmit={handleSaveProfile} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-primary)', display: 'block', marginBottom: '0.35rem' }}>Full Name</label>
                  <input type="text" value={profileName} onChange={(e) => setProfileName(e.target.value)} style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-medium)', background: 'var(--bg-primary)', color: 'var(--text-primary)' }} />
                </div>

                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-primary)', display: 'block', marginBottom: '0.35rem' }}>Company</label>
                  <input type="text" value={profileCompany} onChange={(e) => setCompany(e.target.value)} style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-medium)', background: 'var(--bg-primary)', color: 'var(--text-primary)' }} />
                </div>

                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-primary)', display: 'block', marginBottom: '0.35rem' }}>Job Title</label>
                  <input type="text" value={profileJob} onChange={(e) => setJob(e.target.value)} style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-medium)', background: 'var(--bg-primary)', color: 'var(--text-primary)' }} />
                </div>

                <button type="submit" className="btn btn-primary" style={{ padding: '0.85rem', marginTop: '0.5rem' }}>
                  Save Settings
                </button>
              </form>
            </div>
          </div>
        )}
      </main>

      {/* CREATE PROJECT MODAL */}
      {isProjectModalOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 1000, background: 'rgba(9, 13, 22, 0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }} onClick={() => setIsProjectModalOpen(false)}>
          <div className="glass-card" style={{ width: '100%', maxWidth: '440px', padding: '2rem', background: 'var(--bg-secondary)' }} onClick={(e) => e.stopPropagation()}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '1.25rem' }}>Create New Project</h3>
            <form onSubmit={handleCreateProject} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <input type="text" required placeholder="Project Name" value={newProjectName} onChange={(e) => setNewProjectName(e.target.value)} style={{ padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-medium)', background: 'var(--bg-primary)', color: 'var(--text-primary)' }} />
              <textarea placeholder="Description" value={newProjectDesc} onChange={(e) => setNewProjectDesc(e.target.value)} style={{ padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-medium)', background: 'var(--bg-primary)', color: 'var(--text-primary)' }} />
              <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end', marginTop: '1rem' }}>
                <button type="button" onClick={() => setIsProjectModalOpen(false)} className="btn btn-secondary">Cancel</button>
                <button type="submit" className="btn btn-primary">Create</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CREATE TASK MODAL */}
      {isTaskModalOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 1000, background: 'rgba(9, 13, 22, 0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }} onClick={() => setIsTaskModalOpen(false)}>
          <div className="glass-card" style={{ width: '100%', maxWidth: '440px', padding: '2rem', background: 'var(--bg-secondary)' }} onClick={(e) => e.stopPropagation()}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '1.25rem' }}>Create New Task</h3>
            <form onSubmit={handleCreateTask} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <input type="text" required placeholder="Task Title" value={newTaskTitle} onChange={(e) => setNewTaskTitle(e.target.value)} style={{ padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-medium)', background: 'var(--bg-primary)', color: 'var(--text-primary)' }} />
              <textarea placeholder="Description" value={newTaskDesc} onChange={(e) => setNewTaskDesc(e.target.value)} style={{ padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-medium)', background: 'var(--bg-primary)', color: 'var(--text-primary)' }} />
              <select value={newTaskProjectId} onChange={(e) => setNewTaskProjectId(e.target.value)} style={{ padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-medium)', background: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
                {projects.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
              </select>
              <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end', marginTop: '1rem' }}>
                <button type="button" onClick={() => setIsTaskModalOpen(false)} className="btn btn-secondary">Cancel</button>
                <button type="submit" className="btn btn-primary">Create Task</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Styles */}
      <style>{`
        .dashboard-tab-btn {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.75rem 0.85rem;
          border-radius: var(--radius-sm);
          color: var(--text-secondary);
          font-weight: 600;
          font-size: 0.9rem;
          background: transparent;
          border: none;
          cursor: pointer;
          transition: all 0.2s ease;
          width: 100%;
          text-align: left;
        }
        .dashboard-tab-btn:hover {
          background: var(--bg-tertiary);
          color: var(--text-primary);
        }
        .dashboard-tab-btn.active {
          background: rgba(139, 92, 246, 0.15);
          color: var(--accent-violet-light);
          border-left: 3px solid var(--accent-violet);
        }
        @media (max-width: 900px) {
          .dashboard-sidebar-nav {
            transform: translateX(-100%);
          }
          .dashboard-sidebar-nav.open {
            transform: translateX(0);
          }
          main {
            margin-left: 0 !important;
          }
          .mobile-header-toggle {
            display: flex !important;
          }
        }
      `}</style>
    </div>
  );
};

export default DashboardPage;
