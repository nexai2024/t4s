"use client"
import React, {useState} from 'react'
export default function BookingPage() {
    const [selectedService, setSelectedService] = React.useState<{
      id: string;
      title: string;
      duration: string;
      price: string;
      description: string;
      icon: string;
      color: string;
      urgent: boolean;
    } | null>(null);
    const [selectedDate, setSelectedDate] = React.useState('');
    const [selectedTime, setSelectedTime] = React.useState('');
    const [bookingStep, setBookingStep] = React.useState(1);
    const [bookingData, setBookingData] = React.useState({
      name: '',
      email: '',
      phone: '',
      relationship: 'self', // 'self' or 'family'
      seniorName: '',
      preferredContact: 'phone',
      techLevel: 'beginner',
      specificNeeds: '',
      urgency: 'normal'
    });
    const [isSubmitted, setIsSubmitted] = React.useState(false);
  
    // Available services
    const services = [
      {
        id: 'emergency',
        title: 'Emergency Tech Help',
        duration: '30 min',
        price: 'Free',
        description: 'Urgent tech issue that needs immediate attention',
        icon: '🆘',
        color: 'red',
        urgent: true
      },
      {
        id: 'consultation',
        title: 'Tech Consultation',
        duration: '45 min',
        price: '$39',
        description: 'One-on-one session to solve specific tech problems',
        icon: '💬',
        color: 'blue',
        urgent: false
      },
      {
        id: 'coaching',
        title: 'Tech Coaching Session',
        duration: '60 min',
        price: '$59',
        description: 'Learn new skills at your own pace with patient guidance',
        icon: '🎓',
        color: 'green',
        urgent: false
      },
      {
        id: 'setup',
        title: 'Device Setup & Training',
        duration: '90 min',
        price: '$89',
        description: 'Complete setup of new device with personalized training',
        icon: '📱',
        color: 'purple',
        urgent: false
      },
      {
        id: 'family',
        title: 'Family Tech Session',
        duration: '60 min',
        price: '$69',
        description: 'Group session including family members for ongoing support',
        icon: '👨‍👩‍👧‍👦',
        color: 'orange',
        urgent: false
      }
    ];
  
    // Available time slots
    const timeSlots = [
      '9:00 AM', '10:00 AM', '11:00 AM', '1:00 PM', 
      '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'
    ];
  
    // Generate next 14 days
    const generateAvailableDates = () => {
      const dates = [];
      const today = new Date();
      for (let i = 1; i <= 14; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() + i);
        // Skip Sundays
        if (date.getDay() !== 0) {
          dates.push({
            value: date.toISOString().split('T')[0],
            label: date.toLocaleDateString('en-US', { 
              weekday: 'long', 
              month: 'short', 
              day: 'numeric' 
            })
          });
        }
      }
      return dates;
    };
  
    const availableDates = generateAvailableDates();
  
    const handleInputChange = (field: string, value: string) => {
      setBookingData(prev => ({ ...prev, [field]: value }));
    };
  
    const handleSubmit = (e: { preventDefault: () => void; }) => {
      e.preventDefault();
      setIsSubmitted(true);
      // In real app: API call to create booking
      console.log('Booking submitted:', {
        service: selectedService,
        date: selectedDate,
        time: selectedTime,
        ...bookingData
      });
    };
  
    // Service Selection Component
    const ServiceSelection = () => (
      <div className="space-y-6">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            What kind of help do you need?
          </h2>
          <p className="text-lg text-gray-600">
            Choose the service that best fits your needs. We&apos;re here to help!
          </p>
        </div>
  
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service) => (
            <div
              key={service.id}
              onClick={() => {
                setSelectedService(service);
                setBookingStep(2);
              }}
              className={`relative p-6 rounded-xl border-2 cursor-pointer transition-all duration-200 hover:shadow-lg ${
                service.urgent 
                  ? 'border-red-300 bg-red-50 hover:border-red-400' 
                  : 'border-gray-200 bg-white hover:border-blue-300'
              }`}
            >
              {service.urgent && (
                <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                  URGENT
                </div>
              )}
              
              <div className="flex items-start space-x-4">
                <div className="text-4xl">{service.icon}</div>
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-semibold text-gray-900">{service.title}</h3>
                    <div className="text-right">
                      <div className={`text-lg font-bold ${
                        service.price === 'Free' ? 'text-green-600' : 'text-gray-900'
                      }`}>
                        {service.price}
                      </div>
                      <div className="text-sm text-gray-500">{service.duration}</div>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  <button className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${
                    service.urgent
                      ? 'bg-red-500 hover:bg-red-600 text-white'
                      : 'bg-blue-500 hover:bg-blue-600 text-white'
                  }`}>
                    {service.urgent ? 'Get Urgent Help' : 'Book This Session'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  
    // Date & Time Selection Component
    const DateTimeSelection = () => (
      <div className="space-y-8">
        <div className="text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            When works best for you?
          </h2>
          <div className="bg-blue-50 p-4 rounded-lg mb-6">
            <div className="flex items-center justify-center space-x-2 text-blue-800">
              <span className="text-2xl">{selectedService?.icon}</span>
              <span className="font-semibold">{selectedService?.title}</span>
              <span>•</span>
              <span>{selectedService?.duration}</span>
              <span>•</span>
              <span className="font-bold">{selectedService?.price}</span>
            </div>
          </div>
        </div>
  
        {/* Date Selection */}
        <div>
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Choose a Date</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {availableDates.map((date) => (
              <button
                key={date.value}
                onClick={() => setSelectedDate(date.value)}
                className={`p-3 rounded-lg border-2 text-center transition-all ${
                  selectedDate === date.value
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-200 hover:border-gray-300 text-gray-700'
                }`}
              >
                <div className="font-medium">{date.label}</div>
              </button>
            ))}
          </div>
        </div>
  
        {/* Time Selection */}
        {selectedDate && (
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Choose a Time</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {timeSlots.map((time) => (
                <button
                  key={time}
                  onClick={() => setSelectedTime(time)}
                  className={`p-3 rounded-lg border-2 text-center transition-all ${
                    selectedTime === time
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-200 hover:border-gray-300 text-gray-700'
                  }`}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>
        )}
  
        {/* Navigation */}
        <div className="flex justify-between pt-6">
          <button
            onClick={() => setBookingStep(1)}
            className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            ← Back to Services
          </button>
          {selectedDate && selectedTime && (
            <button
              onClick={() => setBookingStep(3)}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Continue to Details →
            </button>
          )}
        </div>
      </div>
    );
  
    // Contact Information Component
    const ContactInformation = () => (
      <div className="space-y-6">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            Tell us about yourself
          </h2>
          <p className="text-lg text-gray-600">
            This helps us prepare for your session and provide the best support.
          </p>
        </div>
  
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Booking For */}
          <div>
            <label className="block text-lg font-medium text-gray-900 mb-3">
              Who is this booking for?
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => handleInputChange('relationship', 'self')}
                className={`p-4 rounded-lg border-2 text-left transition-all ${
                  bookingData.relationship === 'self'
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">👤</span>
                  <div>
                    <div className="font-semibold">For myself</div>
                    <div className="text-sm text-gray-600">I need tech help</div>
                  </div>
                </div>
              </button>
              <button
                type="button"
                onClick={() => handleInputChange('relationship', 'family')}
                className={`p-4 rounded-lg border-2 text-left transition-all ${
                  bookingData.relationship === 'family'
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">👨‍👩‍👧‍👦</span>
                  <div>
                    <div className="font-semibold">For a family member</div>
                    <div className="text-sm text-gray-600">Booking for someone else</div>
                  </div>
                </div>
              </button>
            </div>
          </div>
  
          {/* Contact Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-lg font-medium text-gray-900 mb-2">
                Your Name *
              </label>
              <input
                type="text"
                value={bookingData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className="w-full p-3 border-2 border-gray-300 rounded-lg text-lg focus:border-blue-500 focus:outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-lg font-medium text-gray-900 mb-2">
                Email Address *
              </label>
              <input
                type="email"
                value={bookingData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="w-full p-3 border-2 border-gray-300 rounded-lg text-lg focus:border-blue-500 focus:outline-none"
                required
              />
            </div>
          </div>
  
          <div>
            <label className="block text-lg font-medium text-gray-900 mb-2">
              Phone Number *
            </label>
            <input
              type="tel"
              value={bookingData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              className="w-full p-3 border-2 border-gray-300 rounded-lg text-lg focus:border-blue-500 focus:outline-none"
              required
            />
          </div>
  
          {/* If booking for family member */}
          {bookingData.relationship === 'family' && (
            <div>
              <label className="block text-lg font-medium text-gray-900 mb-2">
                Senior&apos;s Name *
              </label>
              <input
                type="text"
                value={bookingData.seniorName}
                onChange={(e) => handleInputChange('seniorName', e.target.value)}
                placeholder="Who will be receiving the tech help?"
                className="w-full p-3 border-2 border-gray-300 rounded-lg text-lg focus:border-blue-500 focus:outline-none"
                required
              />
            </div>
          )}
  
          {/* Preferred Contact Method */}
          <div>
            <label className="block text-lg font-medium text-gray-900 mb-3">
              How would you prefer we contact you?
            </label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { value: 'phone', label: 'Phone Call', icon: '📞' },
                { value: 'email', label: 'Email', icon: '📧' },
                { value: 'text', label: 'Text Message', icon: '💬' }
              ].map((method) => (
                <button
                  key={method.value}
                  type="button"
                  onClick={() => handleInputChange('preferredContact', method.value)}
                  className={`p-3 rounded-lg border-2 text-center transition-all ${
                    bookingData.preferredContact === method.value
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="text-2xl mb-1">{method.icon}</div>
                  <div className="font-medium">{method.label}</div>
                </button>
              ))}
            </div>
          </div>
  
          {/* Tech Experience Level */}
          <div>
            <label className="block text-lg font-medium text-gray-900 mb-3">
              How comfortable are you with technology?
            </label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { value: 'beginner', label: 'Beginner', desc: 'New to most tech' },
                { value: 'intermediate', label: 'Some Experience', desc: 'Know the basics' },
                { value: 'advanced', label: 'Pretty Comfortable', desc: 'Just need specific help' }
              ].map((level) => (
                <button
                  key={level.value}
                  type="button"
                  onClick={() => handleInputChange('techLevel', level.value)}
                  className={`p-4 rounded-lg border-2 text-center transition-all ${
                    bookingData.techLevel === level.value
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="font-semibold">{level.label}</div>
                  <div className="text-sm text-gray-600">{level.desc}</div>
                </button>
              ))}
            </div>
          </div>
  
          {/* Specific Needs */}
          <div>
            <label className="block text-lg font-medium text-gray-900 mb-2">
              What specific help do you need? (Optional)
            </label>
            <textarea
              value={bookingData.specificNeeds}
              onChange={(e) => handleInputChange('specificNeeds', e.target.value)}
              placeholder="Tell us about your tech challenge so we can prepare..."
              rows={4}
              className="w-full p-3 border-2 border-gray-300 rounded-lg text-lg focus:border-blue-500 focus:outline-none"
            />
          </div>
  
          {/* Navigation */}
          <div className="flex justify-between pt-6">
            <button
              type="button"
              onClick={() => setBookingStep(2)}
              className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              ← Back to Date & Time
            </button>
            <button
              type="submit"
              className="px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold"
            >
              Book My Session 🎉
            </button>
          </div>
        </form>
      </div>
    );
  
    // Confirmation Component
    const BookingConfirmation = () => (
      <div className="text-center space-y-6">
        <div className="text-6xl mb-4">🎉</div>
        <h2 className="text-3xl font-bold text-green-600 mb-4">
          Your session is booked!
        </h2>
        
        <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6 max-w-md mx-auto">
          <h3 className="text-xl font-semibold text-green-800 mb-4">Session Details</h3>
          <div className="space-y-2 text-left">
            <div className="flex justify-between">
              <span className="text-green-700">Service:</span>
              <span className="font-medium">{selectedService?.title}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-green-700">Date:</span>
              <span className="font-medium">
                {availableDates.find(d => d.value === selectedDate)?.label}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-green-700">Time:</span>
              <span className="font-medium">{selectedTime}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-green-700">Duration:</span>
              <span className="font-medium">{selectedService?.duration}</span>
            </div>
          </div>
        </div>
  
        <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6 max-w-lg mx-auto">
          <h3 className="text-lg font-semibold text-blue-800 mb-3">What happens next?</h3>
          <div className="space-y-3 text-left text-blue-700">
            <div className="flex items-start space-x-3">
              <span className="text-xl">📧</span>
              <span>You&apos;ll receive a confirmation email with session details</span>
            </div>
            <div className="flex items-start space-x-3">
              <span className="text-xl">📞</span>
              <span>We&apos;ll call you 15 minutes before your session</span>
            </div>
            <div className="flex items-start space-x-3">
              <span className="text-xl">🤝</span>
              <span>Your tech concierge will be ready to help!</span>
            </div>
          </div>
        </div>
  
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => {
              setBookingStep(1);
              setSelectedService(null);
              setSelectedDate('');
              setSelectedTime('');
              setIsSubmitted(false);
              setBookingData({
                name: '', email: '', phone: '', relationship: 'self',
                seniorName: '', preferredContact: 'phone', techLevel: 'beginner',
                specificNeeds: '', urgency: 'normal'
              });
            }}
            className="px-6 py-3 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
          >
            Book Another Session
          </button>
          <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Go to Dashboard
          </button>
        </div>
      </div>
    );
  
    // Progress Indicator
    const ProgressIndicator = () => (
      <div className="flex justify-center mb-8">
        <div className="flex items-center space-x-4">
          {[
            { step: 1, label: 'Service' },
            { step: 2, label: 'Date & Time' },
            { step: 3, label: 'Details' },
            { step: 4, label: 'Confirmation' }
          ].map((item, index) => (
            <React.Fragment key={item.step}>
              <div className={`flex items-center justify-center w-10 h-10 rounded-full text-sm font-bold ${
                bookingStep >= item.step || isSubmitted
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-600'
              }`}>
                {isSubmitted && item.step === 4 ? '✓' : item.step}
              </div>
              <span className={`text-sm ${
                bookingStep >= item.step || isSubmitted ? 'text-blue-600' : 'text-gray-500'
              }`}>
                {item.label}
              </span>
              {index < 3 && (
                <div className={`w-8 h-0.5 ${
                  bookingStep > item.step || isSubmitted ? 'bg-blue-600' : 'bg-gray-200'
                }`} />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    );
  
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow-sm">
          <div className="max-w-4xl mx-auto px-4 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="text-2xl">🤝</div>
                <h1 className="text-2xl font-bold text-gray-900">Book Your Tech Help Session</h1>
              </div>
              <div className="text-sm text-gray-600">
                Need immediate help? <span className="text-blue-600 font-medium cursor-pointer">Call (267) 776-9766</span>
              </div>
            </div>
          </div>
        </header>
  
        {/* Main Content */}
        <main className="max-w-4xl mx-auto px-4 py-8">
          {!isSubmitted && <ProgressIndicator />}
          
          <div className="bg-white rounded-xl shadow-lg p-8">
            {!isSubmitted ? (
              <>
                {bookingStep === 1 && <ServiceSelection />}
                {bookingStep === 2 && <DateTimeSelection />}
                {bookingStep === 3 && <ContactInformation />}
              </>
            ) : (
              <BookingConfirmation />
            )}
          </div>
        </main>
      </div>
    );
  }