import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { apiService } from "../services/api";
import { getApiErrorMessage } from "../utils/apiError";


const Register = () => {

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        password: ''
    });


    const [error, setError] = useState('');
    const [fieldErrors, setFieldErrors] = useState({});
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
        if (fieldErrors[name]) {
            setFieldErrors((prev) => {
                const next = { ...prev };
                delete next[name];
                return next;
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
        setError('')
        setFieldErrors({})
        setSuccess('')

        try {
            const response = await apiService.register(formData);

            if (response.data.statusCode === 200) {
                setSuccess(response.data.message);
                setTimeout(() => {
                    navigate('/login')
                }, 4000)
            } else {
                setError(response.data.message);
            }

        } catch (error) {
            const body = error.response?.data;
            const errors = body?.data;

            if (errors && typeof errors === 'object' && !Array.isArray(errors)) {
                setFieldErrors(errors);
                setError(Object.values(errors).filter(Boolean).join('. ') || body.message || 'Validation failed');
            } else {
                setError(getApiErrorMessage(error, 'Registration failed'));
            }

        } finally {
            setLoading(false)
        }
    }




    return (
        <div className="auth-container">
            <div className="auth-form">
                <h2>Create Your Account</h2>
                {error && <div className="error-message">{error}</div>}
                {success && <div className="success-message">{success}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="firstName">First Name</label>
                            <input
                                type="text"
                                id="firstName"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                required
                            />
                            {fieldErrors.firstName && (
                                <span className="field-error">{fieldErrors.firstName}</span>
                            )}
                        </div>

                        <div className="form-group">
                            <label htmlFor="lastName">Last Name</label>
                            <input
                                type="text"
                                id="lastName"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                                required
                            />
                            {fieldErrors.lastName && (
                                <span className="field-error">{fieldErrors.lastName}</span>
                            )}
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                        {fieldErrors.email && (
                            <span className="field-error">{fieldErrors.email}</span>
                        )}
                    </div>

                    <div className="form-group">
                        <label htmlFor="phoneNumber">Phone Number</label>
                        <input
                            type="tel"
                            id="phoneNumber"
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                            required
                        />
                        {fieldErrors.phoneNumber && (
                            <span className="field-error">{fieldErrors.phoneNumber}</span>
                        )}
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                        {fieldErrors.password && (
                            <span className="field-error">{fieldErrors.password}</span>
                        )}
                    </div>

                    <button
                        type="submit"
                        className="auth-button"
                        disabled={loading}
                    >
                        {loading ? 'Creating Account...' : 'Create Account'}
                    </button>
                </form>

                <div className="auth-link">
                    Already have an account? <Link to="/login">Login</Link>
                </div>
            </div>
        </div>
    );


}

export default Register;