import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, User, Music, ArrowRight, Loader2, Eye, EyeOff } from 'lucide-react';

const AuthModal = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login, signup } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    await new Promise(r => setTimeout(r, 600));

    try {
      const result = isLogin
        ? login(email, password)
        : signup(name, email, password);

      if (!result.success) {
        setError(result.message);
      }
      // If success, AuthContext state updates and App re-renders automatically
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputStyle = {
    width: '100%',
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.1)',
    padding: '14px 14px 14px 46px',
    borderRadius: '14px',
    color: 'white',
    fontSize: '15px',
    outline: 'none',
    transition: 'all 0.2s ease',
    fontFamily: 'inherit'
  };

  const iconStyle = {
    position: 'absolute', left: '15px', top: '50%',
    transform: 'translateY(-50%)', color: 'var(--text-dim)',
    pointerEvents: 'none'
  };

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 1000,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: '#04040a', padding: '20px', overflow: 'hidden'
    }}>
      {/* Ambient BG */}
      <div style={{
        position: 'absolute', top: '-15%', right: '-10%',
        width: '65%', height: '65%',
        background: 'radial-gradient(circle, rgba(168,85,247,0.2), transparent 65%)',
        filter: 'blur(80px)', zIndex: 0,
        animation: 'pulse 8s infinite alternate'
      }} />
      <div style={{
        position: 'absolute', bottom: '-15%', left: '-10%',
        width: '60%', height: '60%',
        background: 'radial-gradient(circle, rgba(34,211,238,0.12), transparent 65%)',
        filter: 'blur(80px)', zIndex: 0,
        animation: 'pulse 11s infinite alternate-reverse'
      }} />
      <div style={{
        position: 'absolute', bottom: '20%', right: '20%',
        width: '30%', height: '30%',
        background: 'radial-gradient(circle, rgba(236,72,153,0.08), transparent 65%)',
        filter: 'blur(60px)', zIndex: 0,
        animation: 'pulse 14s infinite alternate'
      }} />

      {/* Card */}
      <div className="glass-card" style={{
        width: '100%', maxWidth: '420px',
        padding: '44px 40px',
        borderRadius: '28px', zIndex: 1, position: 'relative',
        boxShadow: '0 40px 80px rgba(0,0,0,0.7)'
      }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '36px' }}>
          <div style={{
            width: '68px', height: '68px',
            background: 'var(--accent-gradient)',
            borderRadius: '18px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 20px',
            boxShadow: '0 12px 32px rgba(168,85,247,0.45)',
            transform: 'rotate(-6deg)',
            transition: 'transform 0.3s ease'
          }}
          onMouseOver={(e) => e.currentTarget.style.transform = 'rotate(0deg) scale(1.05)'}
          onMouseOut={(e) => e.currentTarget.style.transform = 'rotate(-6deg)'}
          >
            <Music size={32} color="white" />
          </div>
          <div style={{
            fontFamily: 'Outfit', fontWeight: 800, fontSize: '13px',
            letterSpacing: '2px', textTransform: 'uppercase',
            background: 'var(--accent-gradient)', WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent', marginBottom: '12px'
          }}>
            AesthetiCore
          </div>
          <h1 style={{ fontFamily: 'Outfit', fontSize: '28px', fontWeight: 800, marginBottom: '6px', letterSpacing: '-0.5px' }}>
            {isLogin ? 'Welcome back' : 'Get started'}
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '14px', fontWeight: 500 }}>
            {isLogin ? 'Sign in to your music world' : 'Create your free account today'}
          </p>
        </div>

        {/* Error */}
        {error && (
          <div style={{
            background: 'rgba(239,68,68,0.08)',
            border: '1px solid rgba(239,68,68,0.2)',
            color: '#f87171', padding: '12px 16px',
            borderRadius: '12px', marginBottom: '20px',
            fontSize: '13px', fontWeight: 600, textAlign: 'center'
          }}>
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {!isLogin && (
            <div style={{ position: 'relative' }}>
              <User style={iconStyle} size={18} />
              <input
                type="text" placeholder="Full Name" required
                value={name} onChange={(e) => setName(e.target.value)}
                style={inputStyle}
                onFocus={(e) => { e.target.style.borderColor = 'rgba(168,85,247,0.5)'; e.target.style.boxShadow = '0 0 0 3px rgba(168,85,247,0.08)'; }}
                onBlur={(e) => { e.target.style.borderColor = 'rgba(255,255,255,0.1)'; e.target.style.boxShadow = 'none'; }}
              />
            </div>
          )}

          <div style={{ position: 'relative' }}>
            <Mail style={iconStyle} size={18} />
            <input
              type="email" placeholder="Email address" required
              value={email} onChange={(e) => setEmail(e.target.value)}
              style={inputStyle}
              onFocus={(e) => { e.target.style.borderColor = 'rgba(168,85,247,0.5)'; e.target.style.boxShadow = '0 0 0 3px rgba(168,85,247,0.08)'; }}
              onBlur={(e) => { e.target.style.borderColor = 'rgba(255,255,255,0.1)'; e.target.style.boxShadow = 'none'; }}
            />
          </div>

          <div style={{ position: 'relative' }}>
            <Lock style={iconStyle} size={18} />
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password" required
              value={password} onChange={(e) => setPassword(e.target.value)}
              style={{ ...inputStyle, paddingRight: '46px' }}
              onFocus={(e) => { e.target.style.borderColor = 'rgba(168,85,247,0.5)'; e.target.style.boxShadow = '0 0 0 3px rgba(168,85,247,0.08)'; }}
              onBlur={(e) => { e.target.style.borderColor = 'rgba(255,255,255,0.1)'; e.target.style.boxShadow = 'none'; }}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              style={{
                position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)',
                background: 'transparent', border: 'none', color: 'var(--text-dim)',
                cursor: 'pointer', padding: '4px', display: 'flex', alignItems: 'center'
              }}
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>

          <button
            type="submit"
            className="btn-primary"
            disabled={isSubmitting}
            style={{
              marginTop: '8px', height: '52px',
              display: 'flex', alignItems: 'center',
              justifyContent: 'center', gap: '10px',
              borderRadius: '14px', fontSize: '15px'
            }}
          >
            {isSubmitting
              ? <Loader2 className="animate-spin" size={22} />
              : <>
                  <span>{isLogin ? 'Sign In' : 'Create Account'}</span>
                  <ArrowRight size={18} />
                </>
            }
          </button>
        </form>

        {/* Switch mode */}
        <div style={{ textAlign: 'center', marginTop: '28px' }}>
          <button
            onClick={() => { setIsLogin(!isLogin); setError(''); }}
            style={{
              background: 'transparent', border: 'none',
              color: 'var(--text-muted)', cursor: 'pointer',
              fontSize: '14px', fontWeight: 500, fontFamily: 'inherit'
            }}
          >
            {isLogin ? "Don't have an account? " : 'Already have an account? '}
            <span style={{ color: 'var(--accent-primary)', fontWeight: 700 }}>
              {isLogin ? 'Sign Up' : 'Sign In'}
            </span>
          </button>
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0% { transform: scale(1) rotate(0deg); opacity: 0.5; }
          100% { transform: scale(1.15) rotate(2deg); opacity: 0.9; }
        }
      `}</style>
    </div>
  );
};

export default AuthModal;
