import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface FormErrors {
    firstName?: string;
    lastName?: string;
    email?: string;
    topic?: string;
    message?: string;
    consent?: string;
}

interface FormData {
    firstName: string;
    lastName: string;
    email: string;
    topic: string;
    message: string;
    consent: boolean;
}

export default function ContactUs() {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState<FormData>({
        firstName: '',
        lastName: '',
        email: '',
        topic: '',
        message: '',
        consent: false
    });
    const [formResponse, setFormResponse] = useState('');
    const [errors, setErrors] = useState<FormErrors>({});

    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validateForm = (): boolean => {
        const newErrors: FormErrors = {};

        // First Name validation
        if (!formData.firstName.trim()) {
            newErrors.firstName = 'First name is required';
        } else if (formData.firstName.trim().length < 2) {
            newErrors.firstName = 'First name must be at least 2 characters';
        }

        // Last Name validation
        if (!formData.lastName.trim()) {
            newErrors.lastName = 'Last name is required';
        } else if (formData.lastName.trim().length < 2) {
            newErrors.lastName = 'Last name must be at least 2 characters';
        }

        // Email validation
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!validateEmail(formData.email)) {
            newErrors.email = 'Please enter a valid email address';
        }

        // Topic validation
        if (!formData.topic) {
            newErrors.topic = 'Please select a topic';
        }

        // Message validation
        if (!formData.message.trim()) {
            newErrors.message = 'Message is required';
        } else if (formData.message.trim().length < 10) {
            newErrors.message = 'Message must be at least 10 characters';
        }

        // Consent validation
        if (!formData.consent) {
            newErrors.consent = 'You must agree to the privacy policy';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>): void => {
        const { name, value, type } = e.target;
        const checked = (e.target as HTMLInputElement).checked;

        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));

        // Clear error for this field when user starts typing/selecting
        if (errors[name as keyof FormErrors]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const handleTopicSelect = (topic: string) => {
        setFormData(prev => ({
            ...prev,
            topic: topic
        }));

        // Clear error for topic field
        if (errors.topic) {
            setErrors(prev => ({
                ...prev,
                topic: ''
            }));
        }

        setIsDropdownOpen(false);
    };

    const topicOptions = [
        { value: 'General Enquiry', label: 'General Enquiry' },
        { value: 'Technical Support', label: 'Technical Support' },
        { value: 'Sales Request', label: 'Sales Request' }
    ];

    const handleSubmit = async (): Promise<void> => {

        if (!validateForm()) {
            setFormResponse('Please correct the errors above.');
            return;
        }

        setIsSubmitting(true);
        setFormResponse('');

        try {
            // Simulate loading state with 1-second delay
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Log submitted data to console
            console.log('Form submitted with data:', formData);

            // Also show alert with submitted data
            alert(`Form submitted successfully!\n\nData:\nFirst Name: ${formData.firstName}\nLast Name: ${formData.lastName}\nEmail: ${formData.email}\nTopic: ${formData.topic}\nMessage: ${formData.message}\nConsent: ${formData.consent}`);

            setFormResponse('Thank you for your message! We\'ll get back to you soon.');

            // Reset form
            setFormData({
                firstName: '',
                lastName: '',
                email: '',
                topic: '',
                message: '',
                consent: false
            });

            // Clear success message after 5 seconds
            setTimeout(() => setFormResponse(''), 5000);
        } catch (error) {
            setFormResponse('Sorry, there was an error sending your message. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section id="contact" className="relative py-8 px-6 bg-gray-900">
            <div className="max-w-4xl mx-auto">
                <h2 className="text-4xl md:text-5xl font-bold text-center mb-8 text-green-400">
                    Contact Us
                </h2>

                {/* Contact Form */}
                <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-green-400 text-white">
                    <div className="space-y-6">
                        {/* First Name and Last Name Row */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="firstName" className="block text-sm font-medium mb-2">
                                    First Name *
                                </label>
                                <input
                                    type="text"
                                    id="firstName"
                                    name="firstName"
                                    placeholder="Enter your first name"
                                    value={formData.firstName}
                                    onChange={handleInputChange}
                                    className={`w-full px-4 py-3 bg-white/10 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-300 placeholder-gray-300 ${errors.firstName
                                        ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
                                        : 'border-white/40 focus:border-slate-100 focus:ring-slate-300/20'
                                        }`}
                                />
                                {errors.firstName && (
                                    <p className="mt-2 text-sm text-red-400">{errors.firstName}</p>
                                )}
                            </div>

                            <div>
                                <label htmlFor="lastName" className="block text-sm font-medium mb-2">
                                    Last Name *
                                </label>
                                <input
                                    type="text"
                                    id="lastName"
                                    name="lastName"
                                    placeholder="Enter your last name"
                                    value={formData.lastName}
                                    onChange={handleInputChange}
                                    className={`w-full px-4 py-3 bg-white/10 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-300 placeholder-gray-300 ${errors.lastName
                                        ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
                                        : 'border-white/40 focus:border-slate-100 focus:ring-slate-300/20'
                                        }`}
                                />
                                {errors.lastName && (
                                    <p className="mt-2 text-sm text-red-400">{errors.lastName}</p>
                                )}
                            </div>
                        </div>

                        {/* Email */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium mb-2">
                                Email *
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="Enter your email address"
                                value={formData.email}
                                onChange={handleInputChange}
                                className={`w-full px-4 py-3 bg-white/10 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-300 placeholder-gray-300 ${errors.email
                                    ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
                                    : 'border-white/40 focus:border-slate-100 focus:ring-slate-300/20'
                                    }`}
                            />
                            {errors.email && (
                                <p className="mt-2 text-sm text-red-400">{errors.email}</p>
                            )}
                        </div>

                        {/* Topic */}
                        <div>
                            <label htmlFor="topic" className="block text-sm font-medium mb-2">
                                Topic *
                            </label>
                            <div className="relative">
                                <button
                                    type="button"
                                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                    className={`w-full px-4 py-3 bg-white/10 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-300 text-left flex items-center justify-between ${errors.topic
                                        ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
                                        : 'border-white/40 focus:border-slate-100 focus:ring-slate-300/20'
                                        }`}
                                >
                                    <span className={formData.topic ? 'text-white' : 'text-gray-300'}>
                                        {formData.topic || 'Select a topic'}
                                    </span>
                                    <ChevronDown
                                        className={`h-5 w-5 text-gray-300 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''
                                            }`}
                                    />
                                </button>

                                {isDropdownOpen && (
                                    <div className="absolute z-50 w-full mt-1 bg-gray-800 border border-white/40 rounded-lg shadow-lg max-h-48 overflow-y-auto">
                                        {topicOptions.map((option) => (
                                            <button
                                                key={option.value}
                                                type="button"
                                                onClick={() => handleTopicSelect(option.value)}
                                                className="w-full px-4 py-3 text-left text-white hover:bg-white/10 transition-colors duration-200 first:rounded-t-lg last:rounded-b-lg"
                                            >
                                                {option.label}
                                            </button>
                                        ))}
                                    </div>
                                )}

                                {/* Overlay to close dropdown when clicking outside */}
                                {isDropdownOpen && (
                                    <div
                                        className="fixed inset-0 z-40"
                                        onClick={() => setIsDropdownOpen(false)}
                                    />
                                )}
                            </div>
                            {errors.topic && (
                                <p className="mt-2 text-sm text-red-400">{errors.topic}</p>
                            )}
                        </div>


                        {/* Message */}
                        <div>
                            <label htmlFor="message" className="block text-sm font-medium mb-2">
                                Message *
                            </label>
                            <textarea
                                id="message"
                                name="message"
                                placeholder="Enter your message"
                                value={formData.message}
                                onChange={handleInputChange}
                                rows={5}
                                className={`w-full px-4 py-3 bg-white/10 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-300 placeholder-gray-300 resize-none ${errors.message
                                    ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
                                    : 'border-white/40 focus:border-slate-100 focus:ring-slate-300/20'
                                    }`}
                            />
                            {errors.message && (
                                <p className="mt-2 text-sm text-red-400">{errors.message}</p>
                            )}
                        </div>

                        {/* Consent Checkbox */}
                        <div>
                            <div className="flex items-start space-x-3">
                                <input
                                    type="checkbox"
                                    id="consent"
                                    name="consent"
                                    checked={formData.consent}
                                    onChange={handleInputChange}
                                    className={`mt-1 w-4 h-4 rounded border-2 focus:ring-2 focus:ring-offset-0 transition-all duration-300 ${errors.consent
                                        ? 'border-red-500 focus:ring-red-500/20'
                                        : 'border-white/40 focus:ring-slate-300/20'
                                        } bg-white/10 checked:bg-green-800 checked:border-green-800`}
                                />
                                <label htmlFor="consent" className="text-sm leading-5">
                                    By selecting this you agree to our privacy policy *
                                </label>
                            </div>
                            {errors.consent && (
                                <p className="mt-2 text-sm text-red-400">{errors.consent}</p>
                            )}
                        </div>

                        {/* Submit Button */}
                        <button
                            type="button"
                            onClick={handleSubmit}
                            disabled={isSubmitting}
                            className={`w-full text-lg font-semibold px-8 py-3 rounded-lg transition-all duration-300 transform shadow-lg ${isSubmitting
                                ? 'bg-gray-600 text-gray-300 cursor-not-allowed'
                                : 'text-black bg-green-400 hover:bg-green-800 hover:text-white hover:scale-105'
                                }`}
                        >
                            {isSubmitting ? 'Sending...' : 'Send Message'}
                        </button>
                    </div>

                    {/* Form Response */}
                    {formResponse && (
                        <div className={`mt-6 p-4 rounded-lg ${formResponse.includes('error') || formResponse.includes('correct')
                            ? 'bg-red-400/30 border border-red-500/30 text-red-200'
                            : 'bg-green-400/30 border border-green-500/30 text-green-200'
                            }`}>
                            {formResponse}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}