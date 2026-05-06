import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { motion } from 'motion/react';
import { Mail, Lock, ArrowRight, Loader } from 'lucide-react';
import { login } from '../../store/slices/authSlice';

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email format')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

export default function LoginForm({ onNext }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const C = {
    primary:    '#0D0D0D',
    secondary:  '#C89B3C',
    cream:      '#FAF9F6',
    border:     'rgba(13,13,13,0.12)',
    borderFocus: 'rgba(200,155,60,0.6)',
    borderErr:  '#ef4444',
    placeholder: 'rgba(13,13,13,0.3)',
    label:      'rgba(13,13,13,0.55)',
    error:      '#dc2626',
    btnBg:      '#C89B3C',
    btnHover:   '#b8892c',
    btnText:    '#ffffff',
  };

  const inputStyle = {
    width: '100%',
    background: '#ffffff',
    border: `1px solid ${C.border}`,
    color: C.primary,
    fontSize: '0.875rem',
    fontWeight: 300,
    padding: '0.85rem 1rem 0.85rem 2.75rem',
    outline: 'none',
    borderRadius: 0,
    transition: 'border-color 0.25s',
  };

  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={LoginSchema}
      onSubmit={(values, { setSubmitting }) => {
        dispatch(
          login({
            token: 'fake-token-123',
            user: {
              id: 'user-123',
              email: values.email,
              name: values.email.split('@')[0],
            },
          })
        );
        if (onNext) {
          onNext();
        } else {
          navigate('/');
        }
        setSubmitting(false);
      }}
    >
      {({ isSubmitting, errors, touched }) => (
        <Form style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.1 }}
            style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}
          >
            {/* ── Email ──────────────────────────────────────────────── */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
              <label style={{ fontSize: '0.72rem', fontWeight: 500, letterSpacing: '0.05em', color: C.label }}>Email address</label>
              <div style={{ position: 'relative' }}>
                <Mail size={14} style={{ position: 'absolute', left: '0.9rem', top: '50%', transform: 'translateY(-50%)', color: touched.email && errors.email ? C.borderErr : C.secondary, opacity: 0.6 }} />
                <Field name="email">
                  {({ field, meta }) => (
                    <input {...field} type="email" placeholder="your@email.com" style={{ ...inputStyle, borderColor: meta.touched && meta.error ? C.borderErr : C.border }} onFocus={e => e.target.style.borderColor = meta.touched && meta.error ? C.borderErr : C.borderFocus} onBlur={e => { field.onBlur(e); e.target.style.borderColor = meta.touched && meta.error ? C.borderErr : C.border; }} />
                  )}
                </Field>
              </div>
              <ErrorMessage name="email">{msg => <span style={{ fontSize: '0.72rem', color: C.error, fontWeight: 400 }}>{msg}</span>}</ErrorMessage>
            </div>

            {/* ── Password ───────────────────────────────────────────── */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <label style={{ fontSize: '0.72rem', fontWeight: 500, letterSpacing: '0.05em', color: C.label }}>Password</label>
                <Link to="/forgot-password" style={{ fontSize: '0.72rem', fontWeight: 400, color: C.secondary, textDecoration: 'none', opacity: 0.85, transition: 'opacity 0.2s' }} onMouseEnter={e => (e.currentTarget.style.opacity = '1')} onMouseLeave={e => (e.currentTarget.style.opacity = '0.85')}>Forgot password?</Link>
              </div>
              <div style={{ position: 'relative' }}>
                <Lock size={14} style={{ position: 'absolute', left: '0.9rem', top: '50%', transform: 'translateY(-50%)', color: touched.password && errors.password ? C.borderErr : C.secondary, opacity: 0.6 }} />
                <Field name="password">
                  {({ field, meta }) => (
                    <input {...field} type="password" placeholder="••••••••" style={{ ...inputStyle, borderColor: meta.touched && meta.error ? C.borderErr : C.border }} onFocus={e => e.target.style.borderColor = meta.touched && meta.error ? C.borderErr : C.borderFocus} onBlur={e => { field.onBlur(e); e.target.style.borderColor = meta.touched && meta.error ? C.borderErr : C.border; }} />
                  )}
                </Field>
              </div>
              <ErrorMessage name="password">{msg => <span style={{ fontSize: '0.72rem', color: C.error, fontWeight: 400 }}>{msg}</span>}</ErrorMessage>
            </div>

            {/* ── Submit ─────────────────────────────────────────────── */}
            <button
              type="submit"
              disabled={isSubmitting}
              style={{
                width: '100%',
                marginTop: '0.25rem',
                background: isSubmitting ? 'rgba(13,13,13,0.8)' : C.btnBg,
                color: C.btnText,
                border: 'none',
                borderRadius: 0,
                padding: '1rem',
                fontSize: '0.875rem',
                fontWeight: 500,
                letterSpacing: '0.02em',
                textTransform: 'none',
                cursor: isSubmitting ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.8rem',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 18px rgba(200,155,60,0.25)',
              }}
              onMouseEnter={e => { if (!isSubmitting) e.currentTarget.style.background = C.btnHover; }}
              onMouseLeave={e => { if (!isSubmitting) e.currentTarget.style.background = C.btnBg; }}
            >
              {isSubmitting ? (
                <>
                  <Loader size={14} style={{ animation: 'spin 1s linear infinite' }} />
                  Signing in...
                </>
              ) : (
                <>
                  Sign in to your account
                  <ArrowRight size={14} />
                </>
              )}
            </button>
          </motion.div>
        </Form>
      )}
    </Formik>
  );
}
