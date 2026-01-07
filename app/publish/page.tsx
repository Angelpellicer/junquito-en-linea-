'use client';

import { useState } from 'react';
import Navigation from '@/components/Navigation';
import { ArrowLeft, ArrowRight, Save } from 'lucide-react';
import Link from 'next/link';

type WizardStep = 1 | 2 | 3 | 4;

export default function PublishPage() {
  const [currentStep, setCurrentStep] = useState<WizardStep>(1);
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    description: '',
    services: [] as string[],
    zone: '',
    schedule: {
      monday: { open: '08:00', close: '18:00', available: true },
      tuesday: { open: '08:00', close: '18:00', available: true },
      wednesday: { open: '08:00', close: '18:00', available: true },
      thursday: { open: '08:00', close: '18:00', available: true },
      friday: { open: '08:00', close: '18:00', available: true },
      saturday: { open: '09:00', close: '14:00', available: true },
      sunday: { open: '00:00', close: '00:00', available: false },
    },
    whatsapp: '',
    phone: '',
  });

  const [newService, setNewService] = useState('');

  const categories = [
    'Plomería',
    'Electricidad',
    'Mecánica',
    'Belleza',
    'Comida',
    'Transporte',
    'Salud',
    'Hogar',
    'Tecnología',
    'Limpieza',
    'Jardinería',
    'Carpintería',
  ];

  const zones = [
    'El Junquito Centro',
    'El Junquito Alto',
    'El Junquito Bajo',
    'La Vega',
  ];

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return formData.name && formData.category && formData.description;
      case 2:
        return formData.services.length > 0;
      case 3:
        return formData.zone;
      case 4:
        return formData.whatsapp || formData.phone;
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (canProceed() && currentStep < 4) {
      setCurrentStep((prev) => (prev + 1) as WizardStep);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => (prev - 1) as WizardStep);
    }
  };

  const handleAddService = () => {
    if (newService.trim()) {
      setFormData({
        ...formData,
        services: [...formData.services, newService.trim()],
      });
      setNewService('');
    }
  };

  const handleRemoveService = (index: number) => {
    setFormData({
      ...formData,
      services: formData.services.filter((_, i) => i !== index),
    });
  };

  const handleSaveDraft = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('publishDraft', JSON.stringify(formData));
      alert('Borrador guardado');
    }
  };

  const handlePublish = () => {
    // In a real app, this would send data to backend
    alert('Servicio publicado exitosamente (simulado)');
  };

  const stepTitles = [
    'Datos básicos',
    'Servicios',
    'Zona y cobertura',
    'Horarios y contacto',
  ];

  return (
    <div className="min-h-screen pb-20 lg:pb-0">
      <Navigation />

      <div className="max-w-2xl mx-auto px-4 py-8">
        <Link
          href="/profile"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-primary mb-6 transition-colors"
        >
          <ArrowLeft size={18} />
          Volver
        </Link>

        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8">Publicar servicio</h1>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            {[1, 2, 3, 4].map((step) => (
              <div key={step} className="flex items-center flex-1">
                <div
                  className={`flex items-center justify-center w-10 h-10 rounded-full border-2 font-semibold ${
                    step <= currentStep
                      ? 'bg-primary border-primary text-white'
                      : 'bg-white border-gray-300 text-gray-400'
                  }`}
                >
                  {step}
                </div>
                {step < 4 && (
                  <div
                    className={`flex-1 h-1 mx-2 ${
                      step < currentStep ? 'bg-primary' : 'bg-gray-200'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          <p className="text-center text-gray-600 font-medium">
            {stepTitles[currentStep - 1]}
          </p>
        </div>

        {/* Step Content */}
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 mb-6">
          {currentStep === 1 && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Nombre completo o nombre del negocio *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg focus:border-primary dark:focus:border-primary-light focus:ring-2 focus:ring-primary/20 outline-none"
                  placeholder="Ej: Juan Pérez"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Categoría *
                </label>
                <select
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg focus:border-primary dark:focus:border-primary-light focus:ring-2 focus:ring-primary/20 outline-none"
                >
                  <option value="">Selecciona una categoría</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Descripción *
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg focus:border-primary dark:focus:border-primary-light focus:ring-2 focus:ring-primary/20 outline-none"
                  placeholder="Describe tu servicio, experiencia y especialidades..."
                />
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Servicios que ofreces *
                </label>
                <div className="flex gap-2 mb-4">
                  <input
                    type="text"
                    value={newService}
                    onChange={(e) => setNewService(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddService();
                      }
                    }}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
                    placeholder="Ej: Reparación de tuberías"
                  />
                  <button
                    onClick={handleAddService}
                    className="px-4 py-2 bg-primary text-white rounded-lg font-medium hover:bg-primary-light transition-colors"
                  >
                    Agregar
                  </button>
                </div>
                <div className="space-y-2">
                  {formData.services.map((service, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                    >
                      <span className="text-gray-700 dark:text-gray-300">{service}</span>
                      <button
                        onClick={() => handleRemoveService(index)}
                        className="text-red-500 hover:text-red-600"
                      >
                        Eliminar
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Zona principal *
                </label>
                <select
                  value={formData.zone}
                  onChange={(e) =>
                    setFormData({ ...formData, zone: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg focus:border-primary dark:focus:border-primary-light focus:ring-2 focus:ring-primary/20 outline-none"
                >
                  <option value="">Selecciona tu zona</option>
                  {zones.map((zone) => (
                    <option key={zone} value={zone}>
                      {zone}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mapa (simulado)
                </label>
                <div className="w-full h-64 bg-gray-100 rounded-lg border border-gray-200 flex items-center justify-center text-gray-400">
                  Mapa interactivo (mock)
                </div>
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  WhatsApp *
                </label>
                <input
                  type="tel"
                  value={formData.whatsapp}
                  onChange={(e) =>
                    setFormData({ ...formData, whatsapp: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg focus:border-primary dark:focus:border-primary-light focus:ring-2 focus:ring-primary/20 outline-none"
                  placeholder="584121234567"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Teléfono
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg focus:border-primary dark:focus:border-primary-light focus:ring-2 focus:ring-primary/20 outline-none"
                  placeholder="02121234567"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-4">
                  Horarios
                </label>
                <div className="space-y-2">
                  {Object.entries(formData.schedule).map(([day, schedule]) => (
                    <div
                      key={day}
                      className="flex items-center gap-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                    >
                      <div className="w-24 text-sm font-medium text-gray-700 dark:text-gray-300 capitalize">
                        {day === 'monday'
                          ? 'Lunes'
                          : day === 'tuesday'
                          ? 'Martes'
                          : day === 'wednesday'
                          ? 'Miércoles'
                          : day === 'thursday'
                          ? 'Jueves'
                          : day === 'friday'
                          ? 'Viernes'
                          : day === 'saturday'
                          ? 'Sábado'
                          : 'Domingo'}
                      </div>
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={schedule.available}
                          onChange={(e) => {
                            const newSchedule = {
                              ...formData.schedule,
                              [day]: {
                                ...schedule,
                                available: e.target.checked,
                              },
                            };
                            setFormData({ ...formData, schedule: newSchedule });
                          }}
                          className="text-primary focus:ring-primary rounded"
                        />
                        <span className="text-sm text-gray-600">Disponible</span>
                      </label>
                      {schedule.available && (
                        <div className="flex items-center gap-2">
                          <input
                            type="time"
                            value={schedule.open}
                            onChange={(e) => {
                              const newSchedule = {
                                ...formData.schedule,
                                [day]: { ...schedule, open: e.target.value },
                              };
                              setFormData({ ...formData, schedule: newSchedule });
                            }}
                            className="px-2 py-1 border border-gray-300 rounded text-sm"
                          />
                          <span className="text-gray-500">-</span>
                          <input
                            type="time"
                            value={schedule.close}
                            onChange={(e) => {
                              const newSchedule = {
                                ...formData.schedule,
                                [day]: { ...schedule, close: e.target.value },
                              };
                              setFormData({ ...formData, schedule: newSchedule });
                            }}
                            className="px-2 py-1 border border-gray-300 rounded text-sm"
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between gap-4">
          <div>
            {currentStep > 1 && (
              <button
                onClick={handleBack}
                className="flex items-center gap-2 px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-lg font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <ArrowLeft size={18} />
                Atrás
              </button>
            )}
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={handleSaveDraft}
              className="flex items-center gap-2 px-6 py-3 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <Save size={18} />
              Guardar borrador
            </button>
            {currentStep < 4 ? (
              <button
                onClick={handleNext}
                disabled={!canProceed()}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors ${
                  canProceed()
                    ? 'bg-primary text-white hover:bg-primary-light'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                Siguiente
                <ArrowRight size={18} />
              </button>
            ) : (
              <button
                onClick={handlePublish}
                disabled={!canProceed()}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors ${
                  canProceed()
                    ? 'bg-primary text-white hover:bg-primary-light'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                Publicar
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

