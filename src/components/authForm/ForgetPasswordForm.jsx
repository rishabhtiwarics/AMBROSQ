import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { motion } from 'motion/react';
import { Mail, Send, Loader } from 'lucide-react';

/* ─── Brand tokens ──────────────────────────────────────────────────── */
const C = {
  primary:     '#0D0D0D',
  secondary:   '#C89B3C',
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

const ForgetSchema = Yup.object().shape({
  email: Yup.string().email('Please enter a valid email address').required('Email is required'),
});

export default function ForgetPasswordForm() {
  return (
    <Formik
      initialValues={{ email: '' }}
      validationSchema={ForgetSchema}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        setTimeout(() => {
          alert(`Recovery link sent to ${values.email}`);
          resetForm();
          setSubmitting(false);
        }, 1200);
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
            {/* ── Info note ──────────────────────────────────────────── */}
            <p
              style={{
                fontSize: '0.82rem',
                fontWeight: 300,
                lineHeight: 1.65,
                color: 'rgba(13,13,13,0.5)',
                padding: '0.85rem 1rem',
                background: 'rgba(200,155,60,0.07)',
                borderLeft: '2px solid rgba(200,155,60,0.5)',
              }}
            >
              Enter your registered email address and we will send you a secure link to reset your password.
            </p>

            {/* ── Email ──────────────────────────────────────────────── */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              <label
                style={{
                  fontSize: '0.72rem',
                  fontWeight: 500,
                  letterSpacing: '0.05em',
                  color: C.label,
                }}
              >
                Email address
              </label>
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

            {/* ── Submit ─────────────────────────────────────────────── */}
            <button
              type="submit"
              disabled={isSubmitting}
              style={{
                width: '100%',
                marginTop: '0.1rem',
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
                  Sending link...
                </>
              ) : (
                <>
                  Send recovery link
                  <Send size={13} />
                </>
              )}
            </button>

          </motion.div>
        </Form>
      )}
    </Formik>
  );
}
