
'use client';
import { SetStateAction, useState } from 'react';
import Link from 'next/link';
import Sidebar from '../../components/Sidebar';
import TopBar from '../../components/TopBar';

export default function MyCRMsPage() {
  const [crms, setCrms] = useState([
    {
      id: 1,
      name: 'Sales Lead CRM',
      createdBy: 'John Smith',
      createdDate: '2024-01-15',
      status: 'Active',
      fields: 8,
      leads: 247,
      lastActivity: '2 hours ago'
    },
    {
      id: 2,
      name: 'Marketing Campaign CRM',
      createdBy: 'Sarah Wilson',
      createdDate: '2024-01-12',
      status: 'Draft',
      fields: 12,
      leads: 0,
      lastActivity: '1 day ago'
    },
    {
      id: 3,
      name: 'Customer Support CRM',
      createdBy: 'Mike Johnson',
      createdDate: '2024-01-10',
      status: 'Active',
      fields: 6,
      leads: 89,
      lastActivity: '3 hours ago'
    },
    {
      id: 4,
      name: 'Event Registration CRM',
      createdBy: 'Emily Davis',
      createdDate: '2024-01-08',
      status: 'Active',
      fields: 10,
      leads: 156,
      lastActivity: '1 hour ago'
    },
    {
      id: 5,
      name: 'Real Estate CRM',
      createdBy: 'David Brown',
      createdDate: '2024-01-05',
      status: 'Draft',
      fields: 15,
      leads: 0,
      lastActivity: '5 days ago'
    }
  ]);

  const [showCRMBuilder, setShowCRMBuilder] = useState(false);
  const [showCRMDashboard, setShowCRMDashboard] = useState(false);
  type CRM = {
    id: number;
    name: string;
    createdBy: string;
    createdDate: string;
    status: string;
    fields: number;
    leads: number;
    lastActivity: string;
  };

  const [selectedCRM, setSelectedCRM] = useState<CRM | null>(null);
  const [builderStep, setBuilderStep] = useState(1);
  type CRMField = {
    id: number;
    name: string;
    type: string;
    required: boolean;
    options: string[];
  };

  type NewCRM = {
    name: string;
    fields: CRMField[];
    status: string;
  };

  const [newCRM, setNewCRM] = useState<NewCRM>({
    name: '',
    fields: [],
    status: 'Draft'
  });
  const [newField, setNewField] = useState<CRMField>({
    id: 0,
    name: '',
    type: 'Text',
    required: false,
    options: []
  });

  const getStatusBadge = (status: string) => {
    return status === 'Active' 
      ? 'bg-green-100 text-green-800 border-green-200' 
      : 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const deleteCRM = (id: number) => {
    if (confirm('Are you sure you want to delete this CRM? This action cannot be undone.')) {
      setCrms(crms.filter(crm => crm.id !== id));
    }
  };

  const openCRMBuilder = () => {
    setNewCRM({ name: '', fields: [], status: 'Draft' });
    setBuilderStep(1);
    setShowCRMBuilder(true);
  };

  const openCRMDashboard = (crm: SetStateAction<{ id: number; name: string; createdBy: string; createdDate: string; status: string; fields: number; leads: number; lastActivity: string; } | null>) => {
    setSelectedCRM(crm);
    setShowCRMDashboard(true);
  };

  const addField = () => {
    if (!newField.name) return;
    
    const { id, ...fieldData } = newField;
    const field = {
      id: Date.now(),
      ...fieldData,
      options: newField.type === 'Dropdown' || newField.type === 'Tags' ? newField.options : []
    };
    
    setNewCRM(prev => ({
      ...prev,
      fields: [...prev.fields, field]
    }));
    
    setNewField({ id: 0, name: '', type: 'Text', required: false, options: [] });
  };

  const removeField = (fieldId: number) => {
    setNewCRM(prev => ({
      ...prev,
      fields: prev.fields.filter(f => f.id !== fieldId)
    }));
  };

  const saveCRM = (publish = false) => {
    if (!newCRM.name || newCRM.fields.length === 0) return;
    
    const crmData = {
      id: Date.now(),
      name: newCRM.name,
      createdBy: 'John Smith',
      createdDate: new Date().toISOString().split('T')[0],
      status: publish ? 'Active' : 'Draft',
      fields: newCRM.fields.length,
      leads: 0,
      lastActivity: 'Just now'
    };
    
    setCrms(prev => [crmData, ...prev]);
    setShowCRMBuilder(false);
    setBuilderStep(1);
  };

  const fieldTypes = [
    { value: 'Text', label: 'Text Input', icon: 'ri-text' },
    { value: 'Number', label: 'Number', icon: 'ri-hashtag' },
    { value: 'Dropdown', label: 'Dropdown', icon: 'ri-arrow-down-s-line' },
    { value: 'Tags', label: 'Tags/Multi-select', icon: 'ri-price-tag-3-line' },
    { value: 'Date', label: 'Date Picker', icon: 'ri-calendar-line' },
    { value: 'Email', label: 'Email', icon: 'ri-mail-line' },
    { value: 'Phone', label: 'Phone', icon: 'ri-phone-line' },
    { value: 'Checkbox', label: 'Checkbox', icon: 'ri-checkbox-line' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar activeItem="my-crms" />
      
      <div className="ml-64">
        <TopBar 
          title="My CRMs" 
          subtitle="Manage all your custom CRM configurations in one place"
        />
        
        <div className="p-8">
          {/* Stats Overview */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-6">
              <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center">
                    <i className="ri-database-2-line text-blue-600 w-7 h-7 flex items-center justify-center"></i>
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-gray-900">{crms.length}</p>
                    <p className="text-sm text-gray-600 font-medium">Total CRMs</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center">
                    <i className="ri-check-circle-line text-green-600 w-7 h-7 flex items-center justify-center"></i>
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-gray-900">{crms.filter(crm => crm.status === 'Active').length}</p>
                    <p className="text-sm text-gray-600 font-medium">Active CRMs</p>
                  </div>
                </div>
              </div>
            </div>

            <button 
              onClick={openCRMBuilder}
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold transition-all shadow-sm hover:shadow-md whitespace-nowrap flex items-center gap-3"
            >
              <i className="ri-add-line w-5 h-5 flex items-center justify-center"></i>
              Create New CRM
            </button>
          </div>

          {/* CRM List Table */}
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">CRM Name</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Created By</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Created Date</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Status</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Fields</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Total Leads</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Last Activity</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {crms.map((crm) => (
                    <tr 
                      key={crm.id} 
                      className="hover:bg-gray-50 cursor-pointer transition-colors"
                      onClick={() => openCRMDashboard(crm)}
                    >
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                            <i className="ri-database-2-line text-blue-600 w-6 h-6 flex items-center justify-center"></i>
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900 text-base">{crm.name}</p>
                            <p className="text-sm text-gray-600">{crm.fields} custom fields configured</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
                            <span className="text-xs font-semibold text-white">
                              {crm.createdBy.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                          <span className="text-sm font-medium text-gray-900">{crm.createdBy}</span>
                        </div>
                      </td>
                      <td className="px-6 py-5 text-sm font-medium text-gray-700">{crm.createdDate}</td>
                      <td className="px-6 py-5">
                        <span className={`px-3 py-1.5 rounded-full text-xs font-semibold border ${getStatusBadge(crm.status)}`}>
                          {crm.status}
                        </span>
                      </td>
                      <td className="px-6 py-5">
                        <span className="text-lg font-bold text-gray-900">{crm.fields}</span>
                      </td>
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-2">
                          <span className="text-lg font-bold text-gray-900">{crm.leads}</span>
                          {crm.leads > 0 && (
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-5 text-sm text-gray-600 font-medium">{crm.lastActivity}</td>
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-2">
                          <button 
                            onClick={(e) => { e.stopPropagation(); openCRMDashboard(crm); }}
                            className="p-2 hover:bg-gray-100 rounded-lg text-gray-500 hover:text-blue-600 transition-colors"
                            title="View CRM"
                          >
                            <i className="ri-eye-line w-4 h-4 flex items-center justify-center"></i>
                          </button>
                          <Link href={`/crm-builder?edit=${crm.id}`}>
                            <button 
                              onClick={(e) => e.stopPropagation()}
                              className="p-2 hover:bg-gray-100 rounded-lg text-gray-500 hover:text-green-600 transition-colors"
                              title="Edit CRM"
                            >
                              <i className="ri-edit-line w-4 h-4 flex items-center justify-center"></i>
                            </button>
                          </Link>
                          <button 
                            onClick={(e) => { e.stopPropagation(); deleteCRM(crm.id); }}
                            className="p-2 hover:bg-gray-100 rounded-lg text-gray-500 hover:text-red-600 transition-colors"
                            title="Delete CRM"
                          >
                            <i className="ri-delete-bin-line w-4 h-4 flex items-center justify-center"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="bg-gray-50 border-t border-gray-200 px-6 py-4 flex items-center justify-between">
              <div className="text-sm text-gray-600 font-medium">
                Showing {crms.length} CRM configurations
              </div>
              <div className="flex items-center gap-2">
                <button className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
                  Previous
                </button>
                <button className="px-3 py-1.5 bg-blue-500 text-white rounded-lg text-sm font-medium">1</button>
                <button className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
                  Next
                </button>
              </div>
            </div>
          </div>

          {/* Recent CRM Activity */}
          <div className="mt-8 bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Recent CRM Activity</h3>
            <div className="space-y-4">
              {crms.slice(0, 4).map((crm) => (
                <div key={crm.id} className="flex items-center justify-between py-4 border-b border-gray-100 last:border-b-0 hover:bg-gray-50 rounded-lg px-4 transition-colors cursor-pointer">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <i className="ri-database-2-line text-blue-600 w-5 h-5 flex items-center justify-center"></i>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{crm.name}</p>
                      <p className="text-sm text-gray-600">Owner: {crm.createdBy}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">Last Updated</p>
                    <p className="text-sm text-gray-600">{crm.lastActivity}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CRM Builder Modal */}
      {showCRMBuilder && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div>
                <h3 className="text-2xl font-bold text-gray-900">Create New CRM</h3>
                <p className="text-gray-600 mt-1">Step {builderStep} of 3 - {builderStep === 1 ? 'Enter CRM Name' : builderStep === 2 ? 'Add Custom Fields' : 'Save Configuration'}</p>
              </div>
              <button 
                onClick={() => setShowCRMBuilder(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <i className="ri-close-line w-6 h-6 flex items-center justify-center"></i>
              </button>
            </div>

            {/* Progress Indicator */}
            <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
              <div className="flex items-center justify-between max-w-md mx-auto">
                {[1, 2, 3].map((step) => (
                  <div key={step} className="flex items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                      builderStep >= step 
                        ? 'bg-blue-500 text-white' 
                        : 'bg-gray-200 text-gray-600'
                    }`}>
                      {step}
                    </div>
                    {step < 3 && (
                      <div className={`w-16 h-1 mx-2 ${
                        builderStep > step ? 'bg-blue-500' : 'bg-gray-200'
                      }`}></div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto max-h-[60vh]">
              {/* Step 1: CRM Name */}
              {builderStep === 1 && (
                <div className="text-center max-w-md mx-auto">
                  <div className="w-20 h-20 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <i className="ri-database-2-line text-blue-600 w-10 h-10 flex items-center justify-center"></i>
                  </div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">Name Your CRM</h4>
                  <p className="text-gray-600 mb-8">Give your CRM a descriptive name that reflects its purpose</p>
                  
                  <input
                    type="text"
                    value={newCRM.name}
                    onChange={(e) => setNewCRM(prev => ({...prev, name: e.target.value}))}
                    placeholder="e.g., Sales Lead Management CRM"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-center text-lg font-medium"
                  />
                </div>
              )}

              {/* Step 2: Add Fields */}
              {builderStep === 2 && (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h4 className="text-xl font-semibold text-gray-900">Add Custom Fields</h4>
                      <p className="text-gray-600">Define the data fields for your CRM</p>
                    </div>
                    <div className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                      {newCRM.fields.length} fields added
                    </div>
                  </div>

                  {/* Add Field Form */}
                  <div className="bg-gray-50 rounded-xl p-6 mb-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <input
                        type="text"
                        value={newField.name}
                        onChange={(e) => setNewField(prev => ({...prev, name: e.target.value}))}
                        placeholder="Field Name (e.g., Company Name)"
                        className="px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                      />
                      
                      <select
                        value={newField.type}
                        onChange={(e) => setNewField(prev => ({...prev, type: e.target.value}))}
                        className="px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm pr-8"
                      >
                        {fieldTypes.map(type => (
                          <option key={type.value} value={type.value}>{type.label}</option>
                        ))}
                      </select>
                      
                      <button
                        onClick={addField}
                        disabled={!newField.name}
                        className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 text-white px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap"
                      >
                        <i className="ri-add-line mr-2 w-4 h-4 inline-flex items-center justify-center"></i>
                        Add Field
                      </button>
                    </div>
                    
                    <label className="flex items-center gap-2 text-sm">
                      <input
                        type="checkbox"
                        checked={newField.required}
                        onChange={(e) => setNewField(prev => ({...prev, required: e.target.checked}))}
                        className="rounded border-gray-300 text-blue-500 focus:ring-blue-500"
                      />
                      <span className="text-gray-700">Required field</span>
                    </label>
                  </div>

                  {/* Fields List */}
                  <div className="space-y-3">
                    {newCRM.fields.map((field, index) => (
                      <div key={field.id} className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg hover:border-gray-300 transition-colors">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
                            <i className={`${fieldTypes.find(t => t.value === field.type)?.icon} text-blue-600 w-4 h-4 flex items-center justify-center`}></i>
                          </div>
                          <div>
                            <h5 className="font-medium text-gray-900">{field.name}</h5>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-md">{field.type}</span>
                              {field.required && (
                                <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded-md">Required</span>
                              )}
                            </div>
                          </div>
                        </div>
                        <button
                          onClick={() => removeField(field.id)}
                          className="text-gray-400 hover:text-red-600 transition-colors"
                        >
                          <i className="ri-delete-bin-line w-4 h-4 flex items-center justify-center"></i>
                        </button>
                      </div>
                    ))}
                    
                    {newCRM.fields.length === 0 && (
                      <div className="text-center py-8 text-gray-500">
                        <i className="ri-file-list-3-line w-12 h-12 flex items-center justify-center mx-auto mb-3 text-gray-300"></i>
                        <p>No fields added yet. Add your first field above.</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Step 3: Save */}
              {builderStep === 3 && (
                <div className="text-center max-w-md mx-auto">
                  <div className="w-20 h-20 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <i className="ri-check-circle-line text-green-600 w-10 h-10 flex items-center justify-center"></i>
                  </div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">Ready to Save</h4>
                  <p className="text-gray-600 mb-8">Your CRM "{newCRM.name}" is configured with {newCRM.fields.length} custom fields</p>
                  
                  <div className="bg-gray-50 rounded-xl p-6 mb-8">
                    <h5 className="font-semibold text-gray-900 mb-3">CRM Summary</h5>
                    <div className="text-left space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Name:</span>
                        <span className="font-medium">{newCRM.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Fields:</span>
                        <span className="font-medium">{newCRM.fields.length}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Required Fields:</span>
                        <span className="font-medium">{newCRM.fields.filter(f => f.required).length}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-3">
                    <button 
                      onClick={() => saveCRM(false)}
                      className="flex-1 border border-gray-200 text-gray-700 hover:bg-gray-50 px-6 py-3 rounded-xl font-semibold transition-colors whitespace-nowrap"
                    >
                      Save as Draft
                    </button>
                    <button 
                      onClick={() => saveCRM(true)}
                      className="flex-1 bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold transition-colors whitespace-nowrap"
                    >
                      Save & Publish
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="flex justify-between items-center p-6 border-t border-gray-200 bg-gray-50">
              <button 
                onClick={() => builderStep > 1 ? setBuilderStep(builderStep - 1) : setShowCRMBuilder(false)}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                <i className="ri-arrow-left-line w-4 h-4 flex items-center justify-center"></i>
                {builderStep > 1 ? 'Previous' : 'Cancel'}
              </button>
              
              {builderStep < 3 && (
                <button 
                  onClick={() => setBuilderStep(builderStep + 1)}
                  disabled={builderStep === 1 ? !newCRM.name : builderStep === 2 ? newCRM.fields.length === 0 : false}
                  className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 text-white px-6 py-2 rounded-lg font-medium transition-colors whitespace-nowrap"
                >
                  Continue
                  <i className="ri-arrow-right-line ml-2 w-4 h-4 inline-flex items-center justify-center"></i>
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* CRM Dashboard Modal */}
      {showCRMDashboard && selectedCRM && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <i className="ri-database-2-line text-blue-600 w-6 h-6 flex items-center justify-center"></i>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">{selectedCRM.name}</h3>
                  <p className="text-gray-600">Created by {selectedCRM.createdBy} • {selectedCRM.createdDate}</p>
                </div>
              </div>
              <button 
                onClick={() => setShowCRMDashboard(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <i className="ri-close-line w-6 h-6 flex items-center justify-center"></i>
              </button>
            </div>

            {/* Dashboard Content */}
            <div className="p-6 overflow-y-auto max-h-[70vh]">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-xl border border-blue-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-blue-700">Total Leads</p>
                      <p className="text-3xl font-bold text-blue-900 mt-1">{selectedCRM.leads}</p>
                    </div>
                    <i className="ri-user-star-line text-blue-600 w-8 h-8 flex items-center justify-center"></i>
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-green-50 to-green-100 p-6 rounded-xl border border-green-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-green-700">Active Leads</p>
                      <p className="text-3xl font-bold text-green-900 mt-1">{Math.floor(selectedCRM.leads * 0.7)}</p>
                    </div>
                    <i className="ri-user-heart-line text-green-600 w-8 h-8 flex items-center justify-center"></i>
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-6 rounded-xl border border-purple-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-purple-700">Converted</p>
                      <p className="text-3xl font-bold text-purple-900 mt-1">{Math.floor(selectedCRM.leads * 0.15)}</p>
                    </div>
                    <i className="ri-trophy-line text-purple-600 w-8 h-8 flex items-center justify-center"></i>
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-amber-50 to-amber-100 p-6 rounded-xl border border-amber-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-amber-700">Fields</p>
                      <p className="text-3xl font-bold text-amber-900 mt-1">{selectedCRM.fields}</p>
                    </div>
                    <i className="ri-file-list-3-line text-amber-600 w-8 h-8 flex items-center justify-center"></i>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <Link href={`/leads?crm=${selectedCRM.id}`}>
                  <button className="w-full p-4 bg-blue-50 border border-blue-200 rounded-xl hover:bg-blue-100 transition-colors">
                    <i className="ri-eye-line text-blue-600 w-6 h-6 flex items-center justify-center mx-auto mb-2"></i>
                    <p className="font-semibold text-blue-900">View All Leads</p>
                    <p className="text-sm text-blue-700">Manage {selectedCRM.leads} leads</p>
                  </button>
                </Link>
                
                <Link href={`/crm-builder?edit=${selectedCRM.id}`}>
                  <button className="w-full p-4 bg-green-50 border border-green-200 rounded-xl hover:bg-green-100 transition-colors">
                    <i className="ri-edit-line text-green-600 w-6 h-6 flex items-center justify-center mx-auto mb-2"></i>
                    <p className="font-semibold text-green-900">Edit Configuration</p>
                    <p className="text-sm text-green-700">Modify {selectedCRM.fields} fields</p>
                  </button>
                </Link>
                
                <Link href={`/automations?crm=${selectedCRM.id}`}>
                  <button className="w-full p-4 bg-purple-50 border border-purple-200 rounded-xl hover:bg-purple-100 transition-colors">
                    <i className="ri-flow-chart text-purple-600 w-6 h-6 flex items-center justify-center mx-auto mb-2"></i>
                    <p className="font-semibold text-purple-900">Setup Automation</p>
                    <p className="text-sm text-purple-700">Create workflows</p>
                  </button>
                </Link>
              </div>

              {/* Recent Activity */}
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h4>
                <div className="space-y-4">
                  {[
                    { action: 'New lead captured', source: 'Google Ads', time: '2 hours ago', type: 'lead' },
                    { action: 'Lead status updated', source: 'Manual', time: '4 hours ago', type: 'update' },
                    { action: 'Automation triggered', source: 'WhatsApp', time: '6 hours ago', type: 'automation' },
                    { action: 'Lead converted', source: 'Email', time: '1 day ago', type: 'conversion' }
                  ].map((activity, index) => (
                    <div key={index} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          activity.type === 'lead' ? 'bg-blue-100' : 
                          activity.type === 'update' ? 'bg-green-100' :
                          activity.type === 'automation' ? 'bg-purple-100' : 'bg-amber-100'
                        }`}>
                          <i className={`${
                            activity.type === 'lead' ? 'ri-user-add-line text-blue-600' : 
                            activity.type === 'update' ? 'ri-edit-line text-green-600' :
                            activity.type === 'automation' ? 'ri-flow-chart text-purple-600' : 'ri-trophy-line text-amber-600'
                          } w-4 h-4 flex items-center justify-center`}></i>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{activity.action}</p>
                          <p className="text-sm text-gray-600">Source: {activity.source}</p>
                        </div>
                      </div>
                      <span className="text-sm text-gray-500">{activity.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
