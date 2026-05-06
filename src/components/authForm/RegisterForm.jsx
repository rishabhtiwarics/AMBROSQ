import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { login } from '../../store/slices/authSlice';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { User, Mail, Lock, ArrowRight, Loader } from 'lucide-react';

/* ─── Brand tokens ──────────────────────────────────────────────────── */
const C = {
  primary:     '#0D0D0D',
  secondary:   '#C89B3C',
  cream:       '#FAF9F6',
  border:      'rgba(13,13,13,0.12)',
  borderFocus: 'rgba(200,155,60,0.6)',
  borderErr:   '#ef4444',
  label:       'rgba(13,13,13,0.55)',
  error:       '#dc2626',
  btnBg:       '#C89B3C',
  btnHover:    '#b8892c',
  btnText:     '#0D0D0D',
};

const inputBase = {
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

const labelStyle = {
  fontSize: '0.72rem',
  fontWeight: 500,
  letterSpacing: '0.05em',
  color: C.label,
};

const RegisterSchema = Yup.object().shape({
  name:     Yup.string().min(2, 'Name must be at least 2 characters').required('Full name is required'),
  email:    Yup.string().email('Please enter a valid email address').required('Email is required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

export default function RegisterForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <Formik
      initialValues={{ name: '', email: '', password: '' }}
      validationSchema={RegisterSchema}
      onSubmit={(values, { setSubmitting }) => {
        dispatch(
          login({
            token: 'fake-token-reg',
            user: {
              id: 'user-new',
              email: values.email,
              name: values.name,
            },
          })
        );
        navigate('/');
        setSubmitting(false);
      }}
    >
      {({ isSubmitting, errors, touched }) => (
        <Form style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.1 }}
            style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}
          >

            {/* ── Full Name ──────────────────────────────────────────── */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
              <label style={labelStyle}>Full name</label>
              <div style={{ position: 'relative' }}>
                <User
                  size={14}
                  style={{
                    position: 'absolute',
                    left: '0.9rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: touched.name && errors.name ? C.borderErr : C.secondary,
                    opacity: 0.7,
                  }}
                />
                <Field name="name">
                  {({ field, meta }) => (
                    <input
                      {...field}
                      type="text"
                      placeholder="Your full name"
                      style={{
                        ...inputBase,
                        borderColor: meta.touched && meta.error ? C.borderErr : C.border,
                      }}
                      onFocus={e => {
                        e.target.style.borderColor =
                          meta.touched && meta.error ? C.borderErr : C.borderFocus;
                      }}
                      onBlur={e => {
                        field.onBlur(e);
                        e.target.style.borderColor =
                          meta.touched && meta.error ? C.borderErr : C.border;
                      }}
                    />
                  )}
                </Field>
              </div>
              <ErrorMessage name="name">
                {msg => (
                  <span style={{ fontSize: '0.72rem', color: C.error, fontWeight: 400 }}>{msg}</span>
                )}
              </ErrorMessage>
            </div>

            {/* ── Email ──────────────────────────────────────────────── */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
              <label style={labelStyle}>Email address</label>
              <div style={{ position: 'relative' }}>
                <Mail
                  size={14}
                  style={{
                    position: 'absolute',
                    left: '0.9rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: touched.email && errors.email ? C.borderErr : C.secondary,
                    opacity: 0.7,
                  }}
                />
                <Field name="email">
                  {({ field, meta }) => (
                    <input
                      {...field}
                      type="email"
                      placeholder="your@email.com"
                      style={{
                        ...inputBase,
                        borderColor: meta.touched && meta.error ? C.borderErr : C.border,
                      }}
                      onFocus={e => {
                        e.target.style.borderColor =
                          meta.touched && meta.error ? C.borderErr : C.borderFocus;
                      }}
                      onBlur={e => {
                        field.onBlur(e);
                        e.target.style.borderColor =
                          meta.touched && meta.error ? C.borderErr : C.border;
                      }}
                    />
                  )}
                </Field>
              </div>
              <ErrorMessage name="email">
                {msg => (
                  <span style={{ fontSize: '0.72rem', color: C.error, fontWeight: 400 }}>{msg}</span>
                )}
              </ErrorMessage>
            </div>

            {/* ── Password ───────────────────────────────────────────── */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
              <label style={labelStyle}>Password</label>
              <div style={{ position: 'relative' }}>
                <Lock
                  size={14}
                  style={{
                    position: 'absolute',
                    left: '0.9rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: touched.password && errors.password ? C.borderErr : C.secondary,
                    opacity: 0.7,
                  }}
                />
                <Field name="password">
                  {({ field, meta }) => (
                    <input
                      {...field}
                      type="password"
                      placeholder="••••••••"
                      style={{
                        ...inputBase,
                        borderColor: meta.touched && meta.error ? C.borderErr : C.border,
                      }}
                      onFocus={e => {
                        e.target.style.borderColor =
                          meta.touched && meta.error ? C.borderErr : C.borderFocus;
                      }}
                      onBlur={e => {
                        field.onBlur(e);
                        e.target.style.borderColor =
                          meta.touched && meta.error ? C.borderErr : C.border;
                      }}
                    />
                  )}
                </Field>
              </div>
              <ErrorMessage name="password">
                {msg => (
                  <span style={{ fontSize: '0.72rem', color: C.error, fontWeight: 400 }}>{msg}</span>
                )}
              </ErrorMessage>
            </div>

            {/* ── Submit ─────────────────────────────────────────────── */}
            <button
              type="submit"
              disabled={isSubmitting}
              style={{
                width: '100%',
                marginTop: '0.25rem',
                background: isSubmitting ? 'rgba(200,155,60,0.65)' : C.btnBg,
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
                gap: '0.55rem',
                transition: 'background 0.25s',
                boxShadow: '0 4px 18px rgba(200,155,60,0.25)',
              }}
              onMouseEnter={e => { if (!isSubmitting) e.currentTarget.style.background = C.btnHover; }}
              onMouseLeave={e => { if (!isSubmitting) e.currentTarget.style.background = C.btnBg; }}
            >
              {isSubmitting ? (
                <>
                  <Loader size={14} style={{ animation: 'spin 1s linear infinite' }} />
                  Creating account...
                </>
              ) : (
                <>
                  Create my account
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
