import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type BookingStep = 'destination' | 'dates' | 'travelers' | 'services' | 'confirm';

export default function BookingModal({ isOpen, onClose }: BookingModalProps) {
  const [step, setStep] = useState<BookingStep>('destination');
  const [formData, setFormData] = useState({
    destination: '',
    checkIn: '',
    checkOut: '',
    adults: 2,
    children: 0,
    services: [] as string[],
    name: '',
    email: '',
    phone: '',
  });
  
  const steps: BookingStep[] = ['destination', 'dates', 'travelers', 'services', 'confirm'];
  const currentStepIndex = steps.indexOf(step);
  
  const nextStep = () => {
    const nextIndex = currentStepIndex + 1;
    if (nextIndex < steps.length) {
      setStep(steps[nextIndex]);
    }
  };
  
  const prevStep = () => {
    const prevIndex = currentStepIndex - 1;
    if (prevIndex >= 0) {
      setStep(steps[prevIndex]);
    }
  };
  
  const toggleService = (service: string) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter(s => s !== service)
        : [...prev.services, service],
    }));
  };
  
  const destinations = [
    'Maldives', 'Bali', 'Paris', 'Tokyo', 'Dubai', 'New York', 'Santorini', 'Swiss Alps'
  ];
  
  const serviceOptions = [
    { id: 'flight', name: 'Flight Booking', icon: '✈️' },
    { id: 'hotel', name: 'Hotel Reservation', icon: '🏨' },
    { id: 'visa', name: 'Visa Assistance', icon: '📋' },
    { id: 'transfer', name: 'Airport Transfer', icon: '🚗' },
    { id: 'tour', name: 'Guided Tours', icon: '🎯' },
    { id: 'insurance', name: 'Travel Insurance', icon: '🛡️' },
  ];
  
  const handleSubmit = () => {
    // Simulate booking submission
    console.log('Booking submitted:', formData);
    alert('Booking request submitted successfully! We will contact you shortly.');
    onClose();
    setStep('destination');
    setFormData({
      destination: '',
      checkIn: '',
      checkOut: '',
      adults: 2,
      children: 0,
      services: [],
      name: '',
      email: '',
      phone: '',
    });
  };
  
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[200] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          
          {/* Modal */}
          <motion.div
            className="relative w-full max-w-2xl glass rounded-3xl overflow-hidden"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          >
            {/* Header */}
            <div className="p-6 border-b border-white/10">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold text-white">Book Your Journey</h2>
                  <p className="text-white/60 text-sm mt-1">
                    Step {currentStepIndex + 1} of {steps.length}
                  </p>
                </div>
                <motion.button
                  className="cursor-button w-10 h-10 rounded-full glass flex items-center justify-center text-white"
                  onClick={onClose}
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                >
                  ✕
                </motion.button>
              </div>
              
              {/* Progress bar */}
              <div className="flex gap-2 mt-4">
                {steps.map((s, i) => (
                  <motion.div
                    key={s}
                    className={`h-1 flex-1 rounded-full ${
                      i <= currentStepIndex ? 'bg-[linear-gradient(135deg,#f6be22_0%,#d4a010_72%,#b88a00_100%)]' : 'bg-white/20'
                    }`}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: i * 0.1 }}
                  />
                ))}
              </div>
            </div>
            
            {/* Content */}
            <div className="p-6 min-h-[300px]">
              <AnimatePresence mode="wait">
                {step === 'destination' && (
                  <motion.div
                    key="destination"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-4"
                  >
                    <h3 className="text-xl font-semibold text-white mb-4">Where would you like to go?</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {destinations.map((dest) => (
                        <motion.button
                          key={dest}
                          className={`cursor-button p-4 rounded-xl text-left transition-all ${
                            formData.destination === dest
                              ? 'bg-[linear-gradient(135deg,#f6be22_0%,#d4a010_72%,#b88a00_100%)] text-white'
                              : 'glass text-white/80 hover:text-white'
                          }`}
                          onClick={() => setFormData(prev => ({ ...prev, destination: dest }))}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          {dest}
                        </motion.button>
                      ))}
                    </div>
                    <div className="mt-4">
                      <input
                        type="text"
                        placeholder="Or type your destination..."
                        value={formData.destination}
                        onChange={(e) => setFormData(prev => ({ ...prev, destination: e.target.value }))}
                        className="w-full px-4 py-3 glass rounded-xl text-white placeholder:text-white/50 outline-none focus:ring-2 focus:ring-[rgba(209,166,60,0.55)]"
                      />
                    </div>
                  </motion.div>
                )}
                
                {step === 'dates' && (
                  <motion.div
                    key="dates"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-4"
                  >
                    <h3 className="text-xl font-semibold text-white mb-4">When are you traveling?</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-white/60 text-sm mb-2 block">Check-in Date</label>
                        <input
                          type="date"
                          value={formData.checkIn}
                          onChange={(e) => setFormData(prev => ({ ...prev, checkIn: e.target.value }))}
                          className="w-full px-4 py-3 glass rounded-xl text-white outline-none focus:ring-2 focus:ring-[rgba(209,166,60,0.55)]"
                        />
                      </div>
                      <div>
                        <label className="text-white/60 text-sm mb-2 block">Check-out Date</label>
                        <input
                          type="date"
                          value={formData.checkOut}
                          onChange={(e) => setFormData(prev => ({ ...prev, checkOut: e.target.value }))}
                          className="w-full px-4 py-3 glass rounded-xl text-white outline-none focus:ring-2 focus:ring-[rgba(209,166,60,0.55)]"
                        />
                      </div>
                    </div>
                  </motion.div>
                )}
                
                {step === 'travelers' && (
                  <motion.div
                    key="travelers"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <h3 className="text-xl font-semibold text-white mb-4">Who's traveling?</h3>
                    
                    <div className="space-y-4">
                      <div className="flex items-center justify-between glass rounded-xl p-4">
                        <div>
                          <div className="text-white font-medium">Adults</div>
                          <div className="text-white/60 text-sm">Age 13+</div>
                        </div>
                        <div className="flex items-center gap-4">
                          <motion.button
                            className="cursor-button w-10 h-10 rounded-full glass flex items-center justify-center text-white"
                            onClick={() => setFormData(prev => ({ ...prev, adults: Math.max(1, prev.adults - 1) }))}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            -
                          </motion.button>
                          <span className="text-white text-xl w-8 text-center">{formData.adults}</span>
                          <motion.button
                            className="cursor-button w-10 h-10 rounded-full glass flex items-center justify-center text-white"
                            onClick={() => setFormData(prev => ({ ...prev, adults: prev.adults + 1 }))}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            +
                          </motion.button>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between glass rounded-xl p-4">
                        <div>
                          <div className="text-white font-medium">Children</div>
                          <div className="text-white/60 text-sm">Age 2-12</div>
                        </div>
                        <div className="flex items-center gap-4">
                          <motion.button
                            className="cursor-button w-10 h-10 rounded-full glass flex items-center justify-center text-white"
                            onClick={() => setFormData(prev => ({ ...prev, children: Math.max(0, prev.children - 1) }))}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            -
                          </motion.button>
                          <span className="text-white text-xl w-8 text-center">{formData.children}</span>
                          <motion.button
                            className="cursor-button w-10 h-10 rounded-full glass flex items-center justify-center text-white"
                            onClick={() => setFormData(prev => ({ ...prev, children: prev.children + 1 }))}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            +
                          </motion.button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
                
                {step === 'services' && (
                  <motion.div
                    key="services"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-4"
                  >
                    <h3 className="text-xl font-semibold text-white mb-4">Select services you need</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {serviceOptions.map((service) => (
                        <motion.button
                          key={service.id}
                          className={`cursor-button p-4 rounded-xl text-left transition-all ${
                            formData.services.includes(service.id)
                              ? 'bg-[linear-gradient(135deg,#f6be22_0%,#d4a010_72%,#b88a00_100%)] text-white'
                              : 'glass text-white/80 hover:text-white'
                          }`}
                          onClick={() => toggleService(service.id)}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <span className="text-2xl mb-2 block">{service.icon}</span>
                          <span className="text-sm font-medium">{service.name}</span>
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                )}
                
                {step === 'confirm' && (
                  <motion.div
                    key="confirm"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-4"
                  >
                    <h3 className="text-xl font-semibold text-white mb-4">Confirm your details</h3>
                    
                    {/* Summary */}
                    <div className="glass rounded-xl p-4 space-y-2 mb-6">
                      <div className="flex justify-between text-white/80">
                        <span>Destination:</span>
                        <span className="font-medium text-white">{formData.destination || 'Not selected'}</span>
                      </div>
                      <div className="flex justify-between text-white/80">
                        <span>Dates:</span>
                        <span className="font-medium text-white">{formData.checkIn} to {formData.checkOut}</span>
                      </div>
                      <div className="flex justify-between text-white/80">
                        <span>Travelers:</span>
                        <span className="font-medium text-white">{formData.adults} Adults, {formData.children} Children</span>
                      </div>
                      <div className="flex justify-between text-white/80">
                        <span>Services:</span>
                        <span className="font-medium text-white">{formData.services.length} selected</span>
                      </div>
                    </div>
                    
                    {/* Contact details */}
                    <div className="space-y-3">
                      <input
                        type="text"
                        placeholder="Your Name"
                        value={formData.name}
                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                        className="w-full px-4 py-3 glass rounded-xl text-white placeholder:text-white/50 outline-none focus:ring-2 focus:ring-[rgba(209,166,60,0.55)]"
                      />
                      <input
                        type="email"
                        placeholder="Email Address"
                        value={formData.email}
                        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                        className="w-full px-4 py-3 glass rounded-xl text-white placeholder:text-white/50 outline-none focus:ring-2 focus:ring-[rgba(209,166,60,0.55)]"
                      />
                      <input
                        type="tel"
                        placeholder="Phone Number"
                        value={formData.phone}
                        onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                        className="w-full px-4 py-3 glass rounded-xl text-white placeholder:text-white/50 outline-none focus:ring-2 focus:ring-[rgba(209,166,60,0.55)]"
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            {/* Footer */}
            <div className="p-6 border-t border-white/10 flex justify-between">
              <motion.button
                className="cursor-button px-6 py-3 glass rounded-xl text-white font-medium"
                onClick={prevStep}
                disabled={currentStepIndex === 0}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                style={{ opacity: currentStepIndex === 0 ? 0.5 : 1 }}
              >
                Back
              </motion.button>
              
              {step === 'confirm' ? (
                <motion.button
                  className="cursor-button px-8 py-3 bg-[linear-gradient(135deg,#f6be22_0%,#d4a010_72%,#b88a00_100%)] rounded-xl text-white font-semibold"
                  onClick={handleSubmit}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Submit Booking Request
                </motion.button>
              ) : (
                <motion.button
                  className="cursor-button px-8 py-3 bg-[linear-gradient(135deg,#f6be22_0%,#d4a010_72%,#b88a00_100%)] rounded-xl text-white font-semibold"
                  onClick={nextStep}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Continue
                </motion.button>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
