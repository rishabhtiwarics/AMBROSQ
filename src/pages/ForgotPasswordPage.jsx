import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import ForgetPasswordForm from '../components/authForm/ForgetPasswordForm';

const logoSrc = '/ambrosqlogo/AMBROSQ.png';
const authLogoStyle = {
  filter: 'brightness(0) saturate(100%) invert(78%) sepia(55%) saturate(525%) hue-rotate(2deg) brightness(95%) contrast(92%) drop-shadow(0 4px 16px rgba(0,0,0,0.65))',
};
const mobileLogoStyle = {
  filter: 'brightness(0) saturate(100%) invert(42%) sepia(59%) saturate(631%) hue-rotate(4deg) brightness(95%) contrast(87%)',
};

export default function ForgotPasswordPage() {
  return (
    <div style={{ minHeight: '100svh', width: '100%', position: 'relative', display: 'flex', overflow: 'hidden' }}>

      {/* ── Video Background ─────────────────────────────────────── */}
      <div style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
        <video
          autoPlay loop muted playsInline
          preload="metadata"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
        >
          <source src="/authbg.mp4" type="video/mp4" />
        </video>
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(135deg, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.55) 60%, rgba(0,0,0,0.75) 100%)',
        }} />
      </div>

      {/* ── Desktop Logo ──────────────────────────────────────────── */}
      <div className="absolute top-8 left-10 z-20 hidden lg:block">
        <Link to="/" className="inline-flex items-center drop-shadow-lg">
          <img
            src={logoSrc}
            alt="AMBROSQ"
            className="h-20 w-auto object-contain"
            style={authLogoStyle}
          />
        </Link>
      </div>

      {/* ── Left Hero Copy (desktop only) ───────────────────────── */}
      <div className="relative z-10 hidden lg:flex flex-col justify-end pb-20 pl-14 w-[55%] flex-shrink-0">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="space-y-5 max-w-md"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-px" style={{ background: '#C89B3C' }} />
            <span style={{ fontSize: '0.7rem', letterSpacing: '0.35em', fontWeight: 500, color: '#C89B3C' }}>
              Account Recovery
            </span>
          </div>
          <h2 className="text-white text-5xl leading-[1.1] font-serif font-light drop-shadow-lg">
            Regain access<br />
            <span className="italic font-light" style={{ color: '#C89B3C' }}>to your world.</span>
          </h2>
          <p className="text-white/55 text-sm leading-relaxed font-light max-w-sm">
            Enter your email and we'll send you a secure link to restore access to your private account.
          </p>
        </motion.div>
      </div>

      {/* ── Form Panel ────────────────────────────────────────────── */}
      <div
        className="relative z-10 flex-1 flex items-center justify-center"
        style={{ padding: 'clamp(1.5rem, 5vw, 3rem) clamp(1rem, 4vw, 1.5rem)' }}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, ease: 'easeOut' }}
          style={{ width: '100%', maxWidth: '420px' }}
        >

          {/* Card */}
          <div style={{
            background: '#FAF9F6',
            border: '1px solid rgba(200,155,60,0.22)',
            boxShadow: '0 25px 60px rgba(0,0,0,0.35)',
            overflow: 'hidden',
          }}>
            {/* Gold top line */}
            <div style={{
              height: '3px',
              background: 'linear-gradient(90deg, transparent, #C89B3C 40%, #e8c46a 60%, transparent)',
            }} />

            <div style={{ padding: 'clamp(1.5rem, 5vw, 2.5rem) clamp(1.25rem, 5vw, 2.5rem)' }}>

              {/* Mobile Logo */}
              <div className="lg:hidden" style={{ marginBottom: '1.5rem' }}>
                <Link to="/" className="inline-flex items-center">
                  <img
                    src={logoSrc}
                    alt="AMBROSQ"
                    className="h-12 w-auto object-contain"
                    style={mobileLogoStyle}
                  />
                </Link>
              </div>

              {/* Header */}
              <div style={{ marginBottom: '1.5rem' }}>
                <h1 style={{
                  fontFamily: '"Cormorant Garamond", serif',
                  fontSize: 'clamp(1.6rem, 5vw, 2rem)',
                  fontWeight: 300,
                  color: '#0D0D0D',
                  lineHeight: 1.25,
                  marginBottom: '0.4rem',
                }}>
                  Reset Password
                </h1>
                <p style={{ fontSize: '0.875rem', fontWeight: 300, color: 'rgba(13,13,13,0.45)', lineHeight: 1.5 }}>
                  We'll send a secure recovery link to your email.
                </p>
              </div>

              {/* Divider */}
              <div style={{ height: '1px', background: 'rgba(200,155,60,0.18)', marginBottom: '1.5rem' }} />

              {/* Form */}
              <ForgetPasswordForm />

              {/* Back to login row */}
              <div style={{
                marginTop: '1.5rem',
                paddingTop: '1.25rem',
                borderTop: '1px solid rgba(13,13,13,0.08)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '0.5rem',
              }}>
                <span style={{ fontSize: '0.875rem', fontWeight: 300, color: 'rgba(13,13,13,0.4)' }}>
                  Remembered it?
                </span>
                <Link to="/login" style={{
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  color: '#C89B3C',
                  textDecoration: 'underline',
                  textDecorationColor: 'rgba(200,155,60,0.4)',
                  textUnderlineOffset: '4px',
                }}>
                  Back to sign in
                </Link>
              </div>
            </div>
          </div>

          {/* Below card links */}
          <div style={{
            marginTop: '1.25rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 0.25rem',
          }}>
            <Link to="/" style={{ fontSize: '0.72rem', fontWeight: 300, color: 'rgba(255,255,255,0.6)', textDecoration: 'none' }}>
              ← Back to store
            </Link>
            <span style={{ fontSize: '0.72rem', fontWeight: 300, color: 'rgba(255,255,255,0.38)' }}>
              Secured · TLS 1.3
            </span>
          </div>

        </motion.div>
      </div>
    </div>
  );
}
