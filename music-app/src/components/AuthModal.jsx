import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, User, Music, ArrowRight, Loader2 } from 'lucide-react';

const AuthModal = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login, signup } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);
    
    // Simulate slight delay for premium feel
    await new Promise(r => setTimeout(r, 600));

    const result = isLogin 
      ? login(email, password) 
      : signup(name, email, password);

    if (result.success) {
      window.location.reload(); // Refresh to boot the app for the new user
    } else {
      setError(result.message);
    }
    setIsSubmitting(false);
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 1000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'radial-gradient(circle at center, #1a1a2e 0%, #0a0a0c 100%)',
      padding: '20px'
    }}>
      <div className="glass" style={{
        width: '100%',
        maxWidth: '420px',
        padding: '40px',
        borderRadius: '24px',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
        textAlign: 'center'
      }}>
        <div style={{
          width: '64px',
          height: '64px',
          background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))',
          borderRadius: '16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 24px',
          boxShadow: '0 0 20px rgba(168, 85, 247, 0.4)'
        }}>
          <Music size={32} color="white" />
        </div>

        <h2 style={{ fontSize: '28px', marginBottom: '8px', fontWeight: 700 }}>AesthetiCore</h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '32px' }}>
          {isLogin ? 'Welcome back! Please sign in' : 'Create your world of music'}
        </p>

        {error && (
          <div style={{
            background: 'rgba(239, 68, 68, 0.1)',
            border: '1px solid rgba(239, 68, 68, 0.2)',
            color: '#f87171',
            padding: '12px',
            borderRadius: '12px',
            marginBottom: '20px',
            fontSize: '14px'
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {!isLogin && (
            <div style={{ position: 'relative' }}>
              <User style={{ position: 'absolute', left: '16px', top: '12px', color: 'var(--text-muted)' }} size={20} />
              <input 
                type="text" 
                placeholder="Full Name" 
                required 
                className="search-input" 
                style={{ paddingLeft: '48px' }}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          )}
          
          <div style={{ position: 'relative' }}>
            <Mail style={{ position: 'absolute', left: '16px', top: '12px', color: 'var(--text-muted)' }} size={20} />
            <input 
              type="email" 
              placeholder="Email" 
              required 
              className="search-input" 
              style={{ paddingLeft: '48px' }}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div style={{ position: 'relative' }}>
            <Lock style={{ position: 'absolute', left: '16px', top: '12px', color: 'var(--text-muted)' }} size={20} />
            <input 
              type="password" 
              placeholder="Password" 
              required 
              className="search-input" 
              style={{ paddingLeft: '48px' }}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button 
            type="submit" 
            className="btn-primary" 
            disabled={isSubmitting}
            style={{ marginTop: '8px', height: '48px', position: 'relative' }}
          >
            {isSubmitting ? (
              <Loader2 className="animate-spin" />
            ) : (
              <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                {isLogin ? 'Sign In' : 'Sign Up'} <ArrowRight size={18} />
              </span>
            )}
          </button>
        </form>

        <p style={{ marginTop: '24px', color: 'var(--text-muted)', fontSize: '14px' }}>
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <button 
            className="btn" 
            onClick={() => setIsLogin(!isLogin)}
            style={{ marginLeft: '8px', color: 'var(--accent-primary)', fontWeight: 600 }}
          >
            {isLogin ? 'Sign Up' : 'Sign In'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default AuthModal;
