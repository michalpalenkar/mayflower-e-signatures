import { useState } from 'react';
import logo from '../assets/mayflower-logo-animated.gif?url';

const SignatureForm = ({ onGenerate }) => {
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    tel: '',
    mail: '',
    position: ''
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const formatPhoneNumber = (value) => {
    // Remove all non-digits
    const digits = value.replace(/\D/g, '');

    // Format as +421 XXX XXX XXX
    if (digits.length === 0) return '';
    if (digits.length <= 3) return `+${digits}`;
    if (digits.length <= 6) return `+${digits.slice(0, 3)} ${digits.slice(3)}`;
    if (digits.length <= 9) return `+${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6)}`;
    return `+${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6, 9)} ${digits.slice(9, 12)}`;
  };

  const validateField = (name, value) => {
    switch (name) {
      case 'name':
      case 'surname':
      case 'position':
        return value.trim() === '' ? 'Toto pole je povinné' : '';

      case 'tel':
        const digits = value.replace(/\D/g, '');
        if (digits.length === 0) return 'Toto pole je povinné';
        if (digits.length !== 12) return 'Neplatný formát telefónneho čísla';
        return '';

      case 'mail':
        if (value.trim() === '') return 'Toto pole je povinné';
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return !emailRegex.test(value) ? 'Neplatná e-mailová adresa' : '';

      default:
        return '';
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    let processedValue = value;
    if (name === 'tel') {
      processedValue = formatPhoneNumber(value);
    }

    setFormData(prev => ({
      ...prev,
      [name]: processedValue
    }));

    if (touched[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: validateField(name, processedValue)
      }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    setErrors(prev => ({
      ...prev,
      [name]: validateField(name, value)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate all fields
    const newErrors = {};
    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key]);
      if (error) newErrors[key] = error;
    });

    // Mark all fields as touched
    const allTouched = Object.keys(formData).reduce((acc, key) => {
      acc[key] = true;
      return acc;
    }, {});
    setTouched(allTouched);

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onGenerate(formData);
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <img
            src={logo}
            alt="Mayflower Logo"
            className="h-64 w-64 object-contain"
          />
        </div>

        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2 text-center">
          Generátor e-mail podpisu
        </h1>
        <p className="text-gray-600 text-center mb-8">
          Vyplňte všetky údaje pre vytvorenie podpisu
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Meno <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition ${
                errors.name && touched.name ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Zadajte svoje meno"
            />
            {errors.name && touched.name && (
              <p className="mt-1 text-sm text-red-500">{errors.name}</p>
            )}
          </div>

          {/* Surname */}
          <div>
            <label htmlFor="surname" className="block text-sm font-medium text-gray-700 mb-2">
              Priezvisko <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="surname"
              name="surname"
              value={formData.surname}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition ${
                errors.surname && touched.surname ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Zadajte svoje priezvisko"
            />
            {errors.surname && touched.surname && (
              <p className="mt-1 text-sm text-red-500">{errors.surname}</p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label htmlFor="tel" className="block text-sm font-medium text-gray-700 mb-2">
              Telefónne číslo <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              id="tel"
              name="tel"
              value={formData.tel}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition ${
                errors.tel && touched.tel ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="+421 911 123 456"
            />
            {errors.tel && touched.tel && (
              <p className="mt-1 text-sm text-red-500">{errors.tel}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label htmlFor="mail" className="block text-sm font-medium text-gray-700 mb-2">
              E-mail <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="mail"
              name="mail"
              value={formData.mail}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition ${
                errors.mail && touched.mail ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="vas.email@example.com"
            />
            {errors.mail && touched.mail && (
              <p className="mt-1 text-sm text-red-500">{errors.mail}</p>
            )}
          </div>

          {/* Position */}
          <div>
            <label htmlFor="position" className="block text-sm font-medium text-gray-700 mb-2">
              Pozícia <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="position"
              name="position"
              value={formData.position}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition ${
                errors.position && touched.position ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Zadajte svoju pozíciu"
            />
            {errors.position && touched.position && (
              <p className="mt-1 text-sm text-red-500">{errors.position}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full text-white font-semibold py-4 px-6 rounded-lg transition duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 hover:opacity-90"
            style={{ backgroundColor: '#ED7402' }}
          >
            Generovať podpis
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignatureForm;
