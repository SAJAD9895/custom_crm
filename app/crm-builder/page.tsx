
'use client';
import { SetStateAction, useState } from 'react';
import Sidebar from '../../components/Sidebar';
import TopBar from '../../components/TopBar';

export default function CRMBuilderPage() {
  const [activeStep, setActiveStep] = useState(1);
  const [fields, setFields] = useState([
    { id: 1, name: 'Name', type: 'Text', required: true, key: 'name', defaultValue: '' },
    { id: 2, name: 'Phone', type: 'Phone', required: true, key: 'phone', defaultValue: '' },
    { id: 3, name: 'Email', type: 'Email', required: true, key: 'email', defaultValue: '' }
  ]);
  const [showDrawer, setShowDrawer] = useState(false);
  const [editingField, setEditingField] = useState<null | { id?: number; name: string; type: string; required: boolean; key: string; defaultValue: string }>(null);
  const [newField, setNewField] = useState({
    name: '',
    type: 'Text',
    required: false,
    key: '',
    defaultValue: ''
  });
  const [showSuccess, setShowSuccess] = useState(false);

  const fieldTypes = [
    'Text',
    'Number', 
    'Date',
    'Email',
    'Phone',
    'Dropdown',
    'Checkbox'
  ];

  const steps = [
    { number: 1, title: 'Create Fields', description: 'Design your CRM structure' },
    { number: 2, title: 'Preview', description: 'Test your form layout' },
    { number: 3, title: 'Save', description: 'Finalize your CRM' }
  ];

  const openAddField = () => {
    setEditingField(null);
    setNewField({
      name: '',
      type: 'Text',
      required: false,
      key: '',
      defaultValue: ''
    });
    setShowDrawer(true);
  };

  const openEditField = (field: { id?: number; name: string; type: string; required: boolean; key: string; defaultValue: string } | null) => {
    if (!field) return;
    setEditingField(field);
    setNewField({
      name: field.name ?? '',
      type: field.type ?? 'Text',
      required: field.required ?? false,
      key: field.key ?? '',
      defaultValue: field.defaultValue ?? ''
    });
    setShowDrawer(true);
  };

  const saveField = () => {
    if (!newField.name) return;
    
    const fieldKey = newField.key || newField.name.toLowerCase().replace(/\s+/g, '_');
    
    if (editingField) {
      setFields(fields.map(f => f.id === editingField.id ? { ...newField, key: fieldKey, id: f.id } : f));
    } else {
      const newId = Math.max(...fields.map(f => f.id), 0) + 1;
      setFields([...fields, { ...newField, id: newId, key: fieldKey }]);
    }
    
    setShowDrawer(false);
  };

  const removeField = (id: number) => {
    setFields(fields.filter(f => f.id !== id));
  };

  const moveField = (id: number, direction: string) => {
    const currentIndex = fields.findIndex(f => f.id === id);
    if (currentIndex === -1) return;
    
    const newIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
    if (newIndex < 0 || newIndex >= fields.length) return;
    
    const newFields = [...fields];
    [newFields[currentIndex], newFields[newIndex]] = [newFields[newIndex], newFields[currentIndex]];
    setFields(newFields);
  };

  type FieldType = 'Text' | 'Number' | 'Date' | 'Email' | 'Phone' | 'Dropdown' | 'Checkbox';

  const getFieldTypeIcon = (type: FieldType) => {
    const icons: Record<FieldType, string> = {
      'Text': 'ri-text',
      'Number': 'ri-hashtag',
      'Date': 'ri-calendar-line',
      'Email': 'ri-mail-line',
      'Phone': 'ri-phone-line',
      'Dropdown': 'ri-arrow-down-s-line',
      'Checkbox': 'ri-checkbox-line'
    };
    return icons[type] || 'ri-text';
  };

  const saveCRMSchema = () => {
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
    }, 3000);
  };

  const mockFormData = {
    Name: 'John Smith',
    Phone: '+1 555-0123',
    Email: 'john@company.com',
    Budget: '$50,000',
    Source: 'Google Ads',
    'Company Size': '50-100 employees',
    'Interested in': 'Enterprise Plan'
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar activeItem="crm-builder" />
      
      <div className="ml-64">
        <TopBar 
          title="Build Your Custom CRM" 
          subtitle="Create and customize your lead management fields"
        />
        
        <div className="p-8">
          {/* Steps Indicator */}
          <div className="mb-8">
            <div className="flex items-center justify-between max-w-2xl">
              {steps.map((step, index) => (
                <div key={step.number} className="flex items-center">
                  <div className="flex flex-col items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-colors ${
                      activeStep >= step.number 
                        ? 'bg-blue-500 text-white' 
                        : 'bg-gray-200 text-gray-600'
                    }`}>
                      {activeStep > step.number ? (
                        <i className="ri-check-line w-5 h-5 flex items-center justify-center"></i>
                      ) : (
                        step.number
                      )}
                    </div>
                    <div className="mt-2 text-center">
                      <div className="text-sm font-medium text-gray-900">{step.title}</div>
                      <div className="text-xs text-gray-500">{step.description}</div>
                    </div>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`flex-1 h-0.5 mx-4 ${
                      activeStep > step.number ? 'bg-blue-500' : 'bg-gray-200'
                    }`}></div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Step 1: Create Fields */}
          {activeStep === 1 && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">Custom Fields</h2>
                <button 
                  onClick={openAddField}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 whitespace-nowrap"
                >
                  <i className="ri-add-line w-4 h-4 flex items-center justify-center"></i>
                  Add Field
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {fields.map((field, index) => (
                  <div key={field.id} className="bg-white rounded-xl border border-gray-200 p-5 hover:border-gray-300 transition-all hover:shadow-sm">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
                          <i className={`${getFieldTypeIcon(field.type as FieldType)} text-blue-600 w-4 h-4 flex items-center justify-center`}></i>
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">{field.name}</h3>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-md">{field.type}</span>
                            {field.required && (
                              <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded-md">Required</span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="text-xs text-gray-500">
                        Key: {field.key}
                      </div>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => moveField(field.id, 'up')}
                          disabled={index === 0}
                          className="p-1 hover:bg-gray-100 rounded text-gray-400 hover:text-gray-600 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                        >
                          <i className="ri-arrow-up-line w-4 h-4 flex items-center justify-center"></i>
                        </button>
                        <button
                          onClick={() => moveField(field.id, 'down')}
                          disabled={index === fields.length - 1}
                          className="p-1 hover:bg-gray-100 rounded text-gray-400 hover:text-gray-600 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                        >
                          <i className="ri-arrow-down-line w-4 h-4 flex items-center justify-center"></i>
                        </button>
                        <button
                          onClick={() => openEditField(field)}
                          className="p-1 hover:bg-gray-100 rounded text-gray-400 hover:text-gray-600 transition-colors"
                        >
                          <i className="ri-edit-line w-4 h-4 flex items-center justify-center"></i>
                        </button>
                        {!field.required && (
                          <button
                            onClick={() => removeField(field.id)}
                            className="p-1 hover:bg-gray-100 rounded text-red-400 hover:text-red-600 transition-colors"
                          >
                            <i className="ri-delete-bin-line w-4 h-4 flex items-center justify-center"></i>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-end pt-6">
                <button
                  onClick={() => setActiveStep(2)}
                  disabled={fields.length === 0}
                  className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 text-white px-6 py-2 rounded-lg font-medium transition-colors whitespace-nowrap"
                >
                  Next: Preview Form
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Preview */}
          {activeStep === 2 && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">Form Preview</h2>
                <div className="flex gap-3">
                  <button
                    onClick={() => setActiveStep(1)}
                    className="border border-gray-200 text-gray-700 hover:bg-gray-50 px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap"
                  >
                    Back to Fields
                  </button>
                  <button
                    onClick={() => setActiveStep(3)}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-medium transition-colors whitespace-nowrap"
                  >
                    Continue to Save
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 p-8 max-w-2xl mx-auto">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Lead Information Form</h3>
                <div className="space-y-4">
                  {fields.map((field) => (
                    <div key={field.id}>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {field.name}
                        {field.required && <span className="text-red-500 ml-1">*</span>}
                      </label>
                      {field.type === 'Checkbox' ? (
                        <div className="flex items-center gap-2">
                          <input type="checkbox" className="rounded border-gray-300" />
                          <span className="text-sm text-gray-600">{field.defaultValue || 'Checkbox option'}</span>
                        </div>
                      ) : field.type === 'Dropdown' ? (
                        <select className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm pr-8">
                          <option>{mockFormData[field.name as keyof typeof mockFormData] || field.defaultValue || 'Select an option'}</option>
                        </select>
                      ) : (
                        <input
                          type={field.type === 'Email' ? 'email' : field.type === 'Phone' ? 'tel' : field.type === 'Date' ? 'date' : field.type === 'Number' ? 'number' : 'text'}
                          className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                          placeholder={mockFormData[field.name as keyof typeof mockFormData] || field.defaultValue || `Enter ${field.name.toLowerCase()}`}
                          defaultValue={mockFormData[field.name as keyof typeof mockFormData] || field.defaultValue || ''}
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Save */}
          {activeStep === 3 && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">Save Your CRM Schema</h2>
                <button
                  onClick={() => setActiveStep(2)}
                  className="border border-gray-200 text-gray-700 hover:bg-gray-50 px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap"
                >
                  Back to Preview
                </button>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 p-8 max-w-lg mx-auto text-center">
                <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="ri-database-2-line text-blue-600 w-8 h-8 flex items-center justify-center"></i>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Ready to Save</h3>
                <p className="text-gray-600 mb-6">Your CRM schema includes {fields.length} custom fields and is ready to be deployed.</p>
                
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Schema Name (e.g., Sales Lead CRM)"
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  />
                  
                  <button 
                    onClick={saveCRMSchema}
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium transition-colors whitespace-nowrap"
                  >
                    Save CRM Schema
                  </button>
                  
                  <p className="text-sm text-gray-500">
                    Next: Connect this form to your automation workflow
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Right Side Drawer */}
      {showDrawer && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50">
          <div className="absolute right-0 top-0 h-full w-96 bg-white shadow-xl border-l border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">
                  {editingField ? 'Edit Field' : 'Add New Field'}
                </h3>
                <button
                  onClick={() => setShowDrawer(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <i className="ri-close-line w-6 h-6 flex items-center justify-center"></i>
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-6 overflow-y-auto h-[calc(100vh-80px)]">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Field Label</label>
                <input
                  type="text"
                  value={newField.name}
                  onChange={(e) => setNewField({...newField, name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  placeholder="e.g., Company Name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Field Type</label>
                <select
                  value={newField.type}
                  onChange={(e) => setNewField({...newField, type: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm pr-8"
                >
                  {fieldTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={newField.required}
                    onChange={(e) => setNewField({...newField, required: e.target.checked})}
                    className="rounded border-gray-300 text-blue-500 focus:ring-blue-500"
                  />
                  <div>
                    <div className="text-sm font-medium text-gray-700">Required Field</div>
                    <div className="text-xs text-gray-500">Users must fill this field</div>
                  </div>
                </label>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Default Value</label>
                <input
                  type="text"
                  value={newField.defaultValue}
                  onChange={(e) => setNewField({...newField, defaultValue: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  placeholder="Optional default value"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Field Key</label>
                <input
                  type="text"
                  value={newField.key}
                  onChange={(e) => setNewField({...newField, key: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  placeholder={newField.name ? newField.name.toLowerCase().replace(/\s+/g, '_') : 'field_key'}
                />
                <p className="text-xs text-gray-500 mt-1">Used for automation and API reference</p>
              </div>
              
              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => setShowDrawer(false)}
                  className="flex-1 border border-gray-200 text-gray-700 hover:bg-gray-50 px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap"
                >
                  Cancel
                </button>
                <button
                  onClick={saveField}
                  disabled={!newField.name}
                  className="flex-1 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 text-white px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap"
                >
                  {editingField ? 'Update Field' : 'Add Field'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Success Toast */}
      {showSuccess && (
        <div className="fixed top-6 right-6 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 flex items-center gap-3">
          <i className="ri-check-circle-line w-5 h-5 flex items-center justify-center"></i>
          <div>
            <div className="font-medium">CRM Schema Saved!</div>
            <div className="text-sm opacity-90">Connect this form to your automation workflow</div>
          </div>
        </div>
      )}
    </div>
  );
}
