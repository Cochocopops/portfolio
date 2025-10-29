"use client";
import React, { useState, useEffect } from 'react';

const ALL_CATEGORIES = [
  'Product Design',
  'Biomaterials',
  'Code & Software',
  'Electronics',
  'Mechanical Engineering',
  'Digital Fabrication',
  'Interaction Design',
  'Tutorials',
  'Entrepreneurship',
  'Sustainability',
  'Research',
  'Innovation',
];

type ContentSection = {
  id: string;
  type: 'text' | 'youtube' | 'pdf';
  title: string;
  content?: string;
  url?: string;
  pdfFile?: File;
};

export default function UtilisateurPage() {
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [technologies, setTechnologies] = useState("");
  const [sections, setSections] = useState<ContentSection[]>([]);
  const [loading, setLoading] = useState(false);
  
  // Authentication state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);

  // Check authentication on load
  useEffect(() => {
    checkAuthentication();
  }, []);

  async function checkAuthentication() {
    try {
      const res = await fetch('/api/auth/verify');
      if (res.ok) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    } catch (error) {
      setIsAuthenticated(false);
    } finally {
      setIsCheckingAuth(false);
    }
  }

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoginError("");
    setLoginLoading(true);
    
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      
      const data = await res.json();
      
      if (res.ok) {
        setIsAuthenticated(true);
        setPassword("");
      } else {
        setLoginError(data.error || 'Incorrect password');
      }
    } catch (error) {
      setLoginError('Connection error');
    } finally {
      setLoginLoading(false);
    }
  }

  async function handleLogout() {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      setIsAuthenticated(false);
    } catch (error) {
      console.error('Logout error:', error);
    }
  }

  function addSection(type: 'text' | 'youtube' | 'pdf') {
    const newSection: ContentSection = {
      id: Date.now().toString(),
      type,
      title: '',
      content: type === 'text' ? '' : undefined,
      url: type === 'youtube' ? '' : undefined,
    };
    setSections([...sections, newSection]);
  }

  function updateSection(id: string, field: keyof ContentSection, value: any) {
    setSections(sections.map(s => s.id === id ? { ...s, [field]: value } : s));
  }

  function removeSection(id: string) {
    setSections(sections.filter(s => s.id !== id));
  }

  function toggleCategory(category: string) {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter(c => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      setLoading(true);
      
      // Process main image
      let imageBase64 = '';
      let imageExt = '';
      if (imageFile) {
        const buf = await imageFile.arrayBuffer();
        imageBase64 = `data:${imageFile.type};base64,${Buffer.from(buf).toString('base64')}`;
        const parts = imageFile.name.split('.');
        imageExt = parts[parts.length - 1];
      }

      // Process sections with PDFs
      const processedSections = await Promise.all(sections.map(async (section) => {
        if (section.type === 'pdf' && section.pdfFile) {
          const buf = await section.pdfFile.arrayBuffer();
          const pdfBase64 = `data:${section.pdfFile.type};base64,${Buffer.from(buf).toString('base64')}`;
          return {
            type: section.type,
            title: section.title,
            pdfBase64,
            pdfName: section.pdfFile.name,
          };
        }
        return {
          type: section.type,
          title: section.title,
          content: section.content,
          url: section.url,
        };
      }));

      const res = await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          title, 
          excerpt, 
          categories: selectedCategories, 
          imageBase64, 
          imageExt,
          date,
          sections: processedSections,
          technologies: technologies.split(',').map(t => t.trim()).filter(Boolean),
        }),
      });
      
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || 'Error');
      
      alert('Project added successfully!');
      
      // Reset form
      setTitle('');
      setExcerpt('');
      setSelectedCategories([]);
      setImageFile(null);
      setDate(new Date().toISOString().split('T')[0]);
      setTechnologies('');
      setSections([]);
    } catch (err: any) {
      alert(err.message || 'Unable to add project');
    } finally {
      setLoading(false);
    }
  }

  // Loading screen
  if (isCheckingAuth) {
    return (
      <main style={{
        minHeight: '100vh',
        backgroundColor: '#f5f5f5',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <div style={{ color: '#666', fontSize: '1.2rem' }}>Verifying...</div>
      </main>
    );
  }

  // Login screen
  if (!isAuthenticated) {
  return (
    <main style={{
      minHeight: '100vh',
      backgroundColor: '#f5f5f5',
      display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <div style={{
          backgroundColor: 'white',
          padding: '3rem',
          borderRadius: '20px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
          maxWidth: '400px',
          width: '90%',
        }}>
          <h1 style={{ 
            color: '#111', 
            fontSize: '2rem', 
            marginBottom: '0.5rem',
            textAlign: 'center'
          }}>
            Admin Access
          </h1>
          <p style={{ 
            color: '#666', 
            textAlign: 'center', 
            marginBottom: '2rem',
            fontSize: '0.95rem'
          }}>
            Please enter password to continue
          </p>
          
          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label htmlFor="password" style={{ color: '#333', fontWeight: '500' }}>
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                required
                autoFocus
                style={{
                  padding: '12px 16px',
                  borderRadius: '10px',
                  border: '2px solid #ddd',
                  fontSize: '1rem',
                  transition: 'border-color 0.2s',
                  outline: 'none',
                }}
                onFocus={(e) => e.target.style.borderColor = '#111'}
                onBlur={(e) => e.target.style.borderColor = '#ddd'}
              />
            </div>
            
            {loginError && (
              <div style={{
                padding: '12px',
                backgroundColor: '#fee',
                color: '#c33',
                borderRadius: '8px',
                fontSize: '0.9rem',
                textAlign: 'center'
              }}>
                {loginError}
              </div>
            )}
            
            <button
              type="submit"
              disabled={loginLoading}
              style={{
                padding: '14px',
                borderRadius: '10px',
                border: 'none',
                background: loginLoading ? '#999' : '#111',
                color: '#fff',
                fontSize: '1rem',
                fontWeight: '600',
                cursor: loginLoading ? 'not-allowed' : 'pointer',
                transition: 'background 0.2s',
                marginTop: '0.5rem'
              }}
              onMouseOver={(e) => !loginLoading && (e.currentTarget.style.background = '#333')}
              onMouseOut={(e) => !loginLoading && (e.currentTarget.style.background = '#111')}
            >
              {loginLoading ? 'Connecting...' : 'Login'}
            </button>
          </form>
        </div>
      </main>
    );
  }

  // Main page (once authenticated)
  return (
    <main style={{
      minHeight: '100vh',
      backgroundColor: '#f5f5f5',
      paddingTop: 'calc(var(--nav-h) + var(--gap))',
      paddingLeft: '2rem',
      paddingRight: '2rem',
      paddingBottom: '4rem'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          marginBottom: '2rem'
        }}>
          <h1 style={{ color: 'black', fontSize: '2.2rem', margin: 0 }}>
            Add a New Project
      </h1>
          <button
            onClick={handleLogout}
            style={{
              padding: '10px 20px',
              borderRadius: '8px',
              border: '1.5px solid #c33',
              background: 'white',
              color: '#c33',
              cursor: 'pointer',
              fontSize: '0.95rem',
              fontWeight: '500',
              transition: 'all 0.2s'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.background = '#c33';
              e.currentTarget.style.color = 'white';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = 'white';
              e.currentTarget.style.color = '#c33';
            }}
          >
            Logout
          </button>
        </div>
        
      <form onSubmit={handleSubmit} style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '2rem',
        }}>
          {/* Basic Info Section */}
          <div style={{
            background: 'white',
            padding: '2rem',
            borderRadius: '12px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
          }}>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', color: '#111' }}>
              Basic Information
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <label htmlFor="title" style={{ fontWeight: '500', color: '#333' }}>
                  Project Title *
                </label>
                <input 
                  id="title" 
                  required 
                  value={title} 
                  onChange={e => setTitle(e.target.value)} 
                  placeholder="Enter project title"
                  style={{ 
                    padding: '12px', 
                    borderRadius: 8, 
                    border: '1.5px solid #ddd',
                    fontSize: '1rem'
                  }} 
                />
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <label htmlFor="date" style={{ fontWeight: '500', color: '#333' }}>
                  Date
                </label>
                <input 
                  id="date" 
                  type="date"
                  value={date} 
                  onChange={e => setDate(e.target.value)} 
                  style={{ 
                    padding: '12px', 
                    borderRadius: 8, 
                    border: '1.5px solid #ddd',
                    fontSize: '1rem'
                  }} 
                />
              </div>
              
              <div style={{ gridColumn: '1 / -1', display: 'flex', flexDirection: 'column', gap: 8 }}>
                <label htmlFor="excerpt" style={{ fontWeight: '500', color: '#333' }}>
                  Short Description *
                </label>
                <textarea 
                  id="excerpt" 
                  required 
                  value={excerpt} 
                  onChange={e => setExcerpt(e.target.value)} 
                  rows={3}
                  placeholder="Brief description that will appear on project cards"
                  style={{ 
                    padding: '12px', 
                    borderRadius: 8, 
                    border: '1.5px solid #ddd',
                    fontSize: '1rem',
                    resize: 'vertical'
                  }} 
                />
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <label htmlFor="image" style={{ fontWeight: '500', color: '#333' }}>
                  Main Image *
                </label>
                <input 
                  id="image" 
                  type="file" 
                  accept="image/*" 
                  onChange={e => setImageFile(e.target.files?.[0] || null)}
                  style={{ padding: '8px' }}
                />
                {imageFile && (
                  <span style={{ fontSize: '0.9rem', color: '#666' }}>
                    Selected: {imageFile.name}
                  </span>
                )}
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <label htmlFor="technologies" style={{ fontWeight: '500', color: '#333' }}>
                  Technologies (comma separated)
                </label>
                <input 
                  id="technologies" 
                  value={technologies} 
                  onChange={e => setTechnologies(e.target.value)} 
                  placeholder="Arduino, 3D Print, Electronics"
                  style={{ 
                    padding: '12px', 
                    borderRadius: 8, 
                    border: '1.5px solid #ddd',
                    fontSize: '1rem'
                  }} 
                />
              </div>
            </div>
          </div>

          {/* Categories Section */}
          <div style={{
            background: 'white',
            padding: '2rem',
            borderRadius: '12px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
          }}>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#111' }}>
              Categories
            </h2>
            <p style={{ fontSize: '0.9rem', color: '#666', marginBottom: '1rem' }}>
              Select all categories that apply to this project
            </p>
            <div style={{ 
        display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
              gap: '0.8rem' 
            }}>
              {ALL_CATEGORIES.map(category => (
                <label 
                  key={category}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '10px 12px',
                    background: selectedCategories.includes(category) ? '#111' : '#f8f8f8',
                    color: selectedCategories.includes(category) ? 'white' : '#333',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    fontWeight: '500',
                    fontSize: '0.95rem'
                  }}
                  onMouseOver={(e) => {
                    if (!selectedCategories.includes(category)) {
                      e.currentTarget.style.background = '#e8e8e8';
                    }
                  }}
                  onMouseOut={(e) => {
                    if (!selectedCategories.includes(category)) {
                      e.currentTarget.style.background = '#f8f8f8';
                    }
                  }}
                >
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(category)}
                    onChange={() => toggleCategory(category)}
                    style={{ cursor: 'pointer' }}
                  />
                  {category}
                </label>
              ))}
            </div>
          </div>

          {/* Content Sections */}
          <div style={{
            background: 'white',
            padding: '2rem',
            borderRadius: '12px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h2 style={{ fontSize: '1.5rem', margin: 0, color: '#111' }}>
                Content Sections
              </h2>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button
                  type="button"
                  onClick={() => addSection('text')}
                  style={{
                    padding: '8px 16px',
                    borderRadius: '6px',
                    border: '1.5px solid #111',
                    background: 'white',
                    color: '#111',
                    cursor: 'pointer',
                    fontSize: '0.9rem',
                    fontWeight: '500'
                  }}
                >
                  + Text Section
                </button>
                <button
                  type="button"
                  onClick={() => addSection('youtube')}
                  style={{
                    padding: '8px 16px',
                    borderRadius: '6px',
                    border: '1.5px solid #c00',
                    background: 'white',
                    color: '#c00',
                    cursor: 'pointer',
                    fontSize: '0.9rem',
                    fontWeight: '500'
                  }}
                >
                  + YouTube Video
                </button>
                <button
                  type="button"
                  onClick={() => addSection('pdf')}
                  style={{
                    padding: '8px 16px',
                    borderRadius: '6px',
                    border: '1.5px solid #06c',
                    background: 'white',
                    color: '#06c',
                    cursor: 'pointer',
                    fontSize: '0.9rem',
                    fontWeight: '500'
                  }}
                >
                  + PDF Document
                </button>
              </div>
            </div>

            {sections.length === 0 && (
              <p style={{ color: '#999', textAlign: 'center', padding: '2rem' }}>
                No content sections yet. Click the buttons above to add text, videos, or PDFs.
              </p>
            )}

            {sections.map((section, index) => (
              <div 
                key={section.id}
                style={{
                  marginBottom: '1.5rem',
                  padding: '1.5rem',
                  background: '#f9f9f9',
                  borderRadius: '8px',
                  border: '1px solid #e0e0e0'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <h3 style={{ fontSize: '1.1rem', margin: 0, color: '#111' }}>
                    {section.type === 'text' && '📝 Text Section'}
                    {section.type === 'youtube' && '🎥 YouTube Video'}
                    {section.type === 'pdf' && '📄 PDF Document'}
                    {' '} #{index + 1}
                  </h3>
                  <button
                    type="button"
                    onClick={() => removeSection(section.id)}
                    style={{
                      padding: '6px 12px',
                      borderRadius: '6px',
                      border: '1px solid #c33',
                      background: 'white',
                      color: '#c33',
                      cursor: 'pointer',
                      fontSize: '0.85rem'
                    }}
                  >
                    Remove
                  </button>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#333' }}>
                      Section Title
                    </label>
                    <input
                      value={section.title}
                      onChange={(e) => updateSection(section.id, 'title', e.target.value)}
                      placeholder="Enter section title"
                      style={{
                        width: '100%',
                        padding: '10px',
                        borderRadius: '6px',
                        border: '1px solid #ddd',
                        fontSize: '1rem'
                      }}
                    />
                  </div>

                  {section.type === 'text' && (
                    <div>
                      <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#333' }}>
                        Content
                      </label>
                      <textarea
                        value={section.content || ''}
                        onChange={(e) => updateSection(section.id, 'content', e.target.value)}
                        placeholder="Enter your text content here..."
                        rows={6}
                        style={{
                          width: '100%',
                          padding: '10px',
                          borderRadius: '6px',
                          border: '1px solid #ddd',
                          fontSize: '1rem',
                          resize: 'vertical'
                        }}
                      />
                    </div>
                  )}

                  {section.type === 'youtube' && (
                    <div>
                      <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#333' }}>
                        YouTube Video ID or URL
                      </label>
                      <input
                        value={section.url || ''}
                        onChange={(e) => updateSection(section.id, 'url', e.target.value)}
                        placeholder="e.g., dQw4w9WgXcQ or https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                        style={{
                          width: '100%',
                          padding: '10px',
                          borderRadius: '6px',
                          border: '1px solid #ddd',
                          fontSize: '1rem'
                        }}
                      />
                      <p style={{ fontSize: '0.85rem', color: '#666', marginTop: '0.5rem' }}>
                        Enter the full YouTube URL or just the video ID
                      </p>
                    </div>
                  )}

                  {section.type === 'pdf' && (
                    <div>
                      <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#333' }}>
                        Upload PDF File
                      </label>
                      <input
                        type="file"
                        accept=".pdf"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            updateSection(section.id, 'pdfFile', file);
                          }
                        }}
                        style={{ padding: '8px' }}
                      />
                      {section.pdfFile && (
                        <p style={{ fontSize: '0.9rem', color: '#666', marginTop: '0.5rem' }}>
                          Selected: {section.pdfFile.name}
                        </p>
                      )}
        </div>
                  )}
        </div>
        </div>
            ))}
        </div>

          {/* Submit Button */}
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <button 
              disabled={loading} 
              type="submit" 
              style={{ 
                borderRadius: 10, 
                border: 'none', 
                background: loading ? '#999' : '#111', 
                color: '#fff', 
                padding: '14px 28px', 
                cursor: loading ? 'not-allowed' : 'pointer',
                fontSize: '1rem',
                fontWeight: '600',
                transition: 'background 0.2s'
              }}
              onMouseOver={(e) => !loading && (e.currentTarget.style.background = '#333')}
              onMouseOut={(e) => !loading && (e.currentTarget.style.background = '#111')}
            >
              {loading ? 'Adding Project...' : 'Publish Project'}
            </button>
            <span style={{ color: '#666', fontSize: '0.95rem' }}>
              All fields marked with * are required
            </span>
        </div>
      </form>
      </div>
    </main>
  );
}
