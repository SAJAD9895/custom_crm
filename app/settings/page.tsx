'use client';
import { useState } from 'react';
import Sidebar from '../../components/Sidebar';
import TopBar from '../../components/TopBar';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('profile');
  const [showApiKey, setShowApiKey] = useState(false);
  const [integrations, setIntegrations] = useState({
    googleAds: false,
    meta: false,
    whatsapp: false
  });

  const tabs = [
    { id: 'profile', label: 'Profile', icon: 'ri-user-line' },
    { id: 'business', label: 'Business', icon: 'ri-building-line' },
    { id: 'integrations', label: 'Integrations', icon: 'ri-links-line' },
    { id: 'api', label: 'API Keys', icon: 'ri-key-2-line' },
    { id: 'users', label: 'User Roles', icon: 'ri-team-line' }
  ];

  const users = [
    { id: 1, name: 'John Smith', email: 'john@company.com', role: 'Admin', status: 'Active' },
    { id: 2, name: 'Sarah Wilson', email: 'sarah@company.com', role: 'Sales Rep', status: 'Active' },
    { id: 3, name: 'Mike Johnson', email: 'mike@company.com', role: 'Manager', status: 'Inactive' }
  ];

  const toggleIntegration = (key: string) => {
    setIntegrations(prev => ({
      ...prev,
      [key]: !prev[key as keyof typeof prev]
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar activeItem="settings" />
      
      <div className="ml-64">
        <TopBar 
          title="Settings" 
          subtitle="Manage your CRM preferences and configurations"
        />
        
        <div className="p-8">
          <div className="flex gap-8">
            <div className="w-64">
              <div className="bg-white rounded-lg border border-gray-200 p-4">
                <nav className="space-y-2">
                  {tabs.map(tab => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left font-medium transition-colors whitespace-nowrap ${
                        activeTab === tab.id
                          ? 'bg-blue-50 text-blue-600 border border-blue-200'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <i className={`${tab.icon} w-5 h-5 flex items-center justify-center`}></i>
                      {tab.label}
                    </button>
                  ))}
                </nav>
              </div>
            </div>

            <div className="flex-1">
              {activeTab === 'profile' && (
                <div className="bg-white rounded-lg border border-gray-200 p-8">
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">Profile Settings</h2>
                  
                  <div className="space-y-6">
                    <div className="flex items-center gap-6">
                      <div className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center">
                        <i className="ri-user-line text-white w-8 h-8 flex items-center justify-center"></i>
                      </div>
                      <div>
                        <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap">
                          Change Photo
                        </button>
                        <p className="text-sm text-gray-600 mt-1">JPG, PNG up to 2MB</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                        <input
                          type="text"
                          defaultValue="John"
                          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                        <input
                          type="text"
                          defaultValue="Smith"
                          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                      <input
                        type="email"
                        defaultValue="john@company.com"
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
                      <input
                        type="password"
                        placeholder="Enter current password"
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                        <input
                          type="password"
                          placeholder="Enter new password"
                          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
                        <input
                          type="password"
                          placeholder="Confirm new password"
                          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                        />
                      </div>
                    </div>

                    <div className="flex justify-end gap-3">
                      <button className="px-6 py-2 border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 font-medium transition-colors whitespace-nowrap">
                        Cancel
                      </button>
                      <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-medium transition-colors whitespace-nowrap">
                        Save Changes
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'business' && (
                <div className="bg-white rounded-lg border border-gray-200 p-8">
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">Business Settings</h2>
                  
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Company Name</label>
                      <input
                        type="text"
                        defaultValue="Acme Corporation"
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Company Logo</label>
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center">
                          <i className="ri-image-line text-gray-400 w-6 h-6 flex items-center justify-center"></i>
                        </div>
                        <div>
                          <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap">
                            Upload Logo
                          </button>
                          <p className="text-sm text-gray-600 mt-1">PNG, SVG up to 1MB</p>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Industry</label>
                        <select className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm pr-8">
                          <option>Technology</option>
                          <option>Real Estate</option>
                          <option>Healthcare</option>
                          <option>Finance</option>
                          <option>Marketing</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Company Size</label>
                        <select className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm pr-8">
                          <option>1-10 employees</option>
                          <option>11-50 employees</option>
                          <option>51-200 employees</option>
                          <option>200+ employees</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Timezone</label>
                      <select className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm pr-8">
                        <option>(UTC-08:00) Pacific Time</option>
                        <option>(UTC-07:00) Mountain Time</option>
                        <option>(UTC-06:00) Central Time</option>
                        <option>(UTC-05:00) Eastern Time</option>
                        <option>(UTC+00:00) GMT</option>
                      </select>
                    </div>

                    <div className="flex justify-end gap-3">
                      <button className="px-6 py-2 border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 font-medium transition-colors whitespace-nowrap">
                        Cancel
                      </button>
                      <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-medium transition-colors whitespace-nowrap">
                        Save Changes
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'integrations' && (
                <div className="bg-white rounded-lg border border-gray-200 p-8">
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">Integrations</h2>
                  
                  <div className="space-y-6">
                    <div className="border border-gray-200 rounded-lg p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                            <i className="ri-google-line text-blue-600 w-6 h-6 flex items-center justify-center"></i>
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900">Google Ads</h3>
                            <p className="text-sm text-gray-600">Import leads from Google Ads campaigns</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className={`text-sm font-medium ${integrations.googleAds ? 'text-green-600' : 'text-gray-500'}`}>
                            {integrations.googleAds ? 'Connected' : 'Not Connected'}
                          </span>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={integrations.googleAds}
                              onChange={() => toggleIntegration('googleAds')}
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                          </label>
                        </div>
                      </div>
                      {integrations.googleAds && (
                        <div className="mt-4 p-4 bg-green-50 rounded-lg">
                          <p className="text-sm text-green-800">✓ Successfully connected to Google Ads account</p>
                        </div>
                      )}
                    </div>

                    <div className="border border-gray-200 rounded-lg p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                            <i className="ri-meta-line text-blue-600 w-6 h-6 flex items-center justify-center"></i>
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900">Meta (Facebook & Instagram)</h3>
                            <p className="text-sm text-gray-600">Import leads from Facebook and Instagram ads</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className={`text-sm font-medium ${integrations.meta ? 'text-green-600' : 'text-gray-500'}`}>
                            {integrations.meta ? 'Connected' : 'Not Connected'}
                          </span>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={integrations.meta}
                              onChange={() => toggleIntegration('meta')}
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                          </label>
                        </div>
                      </div>
                      {integrations.meta && (
                        <div className="mt-4 p-4 bg-green-50 rounded-lg">
                          <p className="text-sm text-green-800">✓ Successfully connected to Meta Business account</p>
                        </div>
                      )}
                    </div>

                    <div className="border border-gray-200 rounded-lg p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                            <i className="ri-whatsapp-line text-green-600 w-6 h-6 flex items-center justify-center"></i>
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900">WhatsApp Business API</h3>
                            <p className="text-sm text-gray-600">Send and receive WhatsApp messages</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className={`text-sm font-medium ${integrations.whatsapp ? 'text-green-600' : 'text-gray-500'}`}>
                            {integrations.whatsapp ? 'Connected' : 'Not Connected'}
                          </span>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={integrations.whatsapp}
                              onChange={() => toggleIntegration('whatsapp')}
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                          </label>
                        </div>
                      </div>
                      {integrations.whatsapp && (
                        <div className="mt-4 p-4 bg-green-50 rounded-lg">
                          <p className="text-sm text-green-800">✓ Successfully connected to WhatsApp Business</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'api' && (
                <div className="bg-white rounded-lg border border-gray-200 p-8">
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">API Keys</h2>
                  
                  <div className="space-y-6">
                    <div className="border border-gray-200 rounded-lg p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="font-semibold text-gray-900">API Key</h3>
                          <p className="text-sm text-gray-600">Use this key to access CRM API endpoints</p>
                        </div>
                        <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                          Active
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-4">
                        <div className="flex-1 font-mono text-sm bg-gray-50 px-4 py-3 rounded-lg border">
                          {showApiKey ? 'crm_live_sk_1234567890abcdef...' : '•'.repeat(32)}
                        </div>
                        <button
                          onClick={() => setShowApiKey(!showApiKey)}
                          className="px-4 py-2 border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors whitespace-nowrap"
                        >
                          {showApiKey ? 'Hide' : 'Show'}
                        </button>
                        <button className="px-4 py-2 border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors whitespace-nowrap">
                          Copy
                        </button>
                      </div>
                      
                      <div className="flex gap-3 mt-4">
                        <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap">
                          Regenerate Key
                        </button>
                        <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap">
                          Delete Key
                        </button>
                      </div>
                    </div>

                    <div className="border border-gray-200 rounded-lg p-6">
                      <h3 className="font-semibold text-gray-900 mb-4">Webhook Settings</h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Webhook URL</label>
                          <input
                            type="url"
                            placeholder="https://your-app.com/webhook"
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                          />
                        </div>
                        <div className="flex items-center gap-4">
                          <label className="flex items-center gap-2">
                            <input type="checkbox" className="rounded" />
                            <span className="text-sm text-gray-700">Lead created</span>
                          </label>
                          <label className="flex items-center gap-2">
                            <input type="checkbox" className="rounded" />
                            <span className="text-sm text-gray-700">Lead updated</span>
                          </label>
                          <label className="flex items-center gap-2">
                            <input type="checkbox" className="rounded" />
                            <span className="text-sm text-gray-700">Message sent</span>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'users' && (
                <div className="bg-white rounded-lg border border-gray-200 p-8">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold text-gray-900">User Roles & Permissions</h2>
                    <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap">
                      <i className="ri-add-line mr-2 w-4 h-4 flex items-center justify-center"></i>
                      Add User
                    </button>
                  </div>
                  
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="bg-gray-50 border-b border-gray-200">
                          <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">User</th>
                          <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Role</th>
                          <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Status</th>
                          <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {users.map(user => (
                          <tr key={user.id} className="border-b border-gray-200 hover:bg-gray-50">
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                                  <i className="ri-user-line text-white w-4 h-4 flex items-center justify-center"></i>
                                </div>
                                <div>
                                  <p className="font-medium text-gray-900">{user.name}</p>
                                  <p className="text-sm text-gray-600">{user.email}</p>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <select className="px-3 py-1 border border-gray-200 rounded text-sm pr-8">
                                <option value="Admin" selected={user.role === 'Admin'}>Admin</option>
                                <option value="Manager" selected={user.role === 'Manager'}>Manager</option>
                                <option value="Sales Rep" selected={user.role === 'Sales Rep'}>Sales Rep</option>
                              </select>
                            </td>
                            <td className="px-6 py-4">
                              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                                user.status === 'Active' 
                                  ? 'bg-green-100 text-green-800' 
                                  : 'bg-gray-100 text-gray-800'
                              }`}>
                                {user.status}
                              </span>
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex gap-2">
                                <button className="text-blue-600 hover:text-blue-800 transition-colors">
                                  <i className="ri-edit-line w-4 h-4 flex items-center justify-center"></i>
                                </button>
                                <button className="text-red-600 hover:text-red-800 transition-colors">
                                  <i className="ri-delete-bin-line w-4 h-4 flex items-center justify-center"></i>
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="mt-8 border-t border-gray-200 pt-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Role Permissions</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="border border-gray-200 rounded-lg p-4">
                        <h4 className="font-medium text-gray-900 mb-2">Admin</h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Full system access</li>
                          <li>• Manage users & roles</li>
                          <li>• Access all leads</li>
                          <li>• Configure integrations</li>
                        </ul>
                      </div>
                      <div className="border border-gray-200 rounded-lg p-4">
                        <h4 className="font-medium text-gray-900 mb-2">Manager</h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• View all leads</li>
                          <li>• Assign leads to reps</li>
                          <li>• Access reports</li>
                          <li>• Manage templates</li>
                        </ul>
                      </div>
                      <div className="border border-gray-200 rounded-lg p-4">
                        <h4 className="font-medium text-gray-900 mb-2">Sales Rep</h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• View assigned leads</li>
                          <li>• Update lead status</li>
                          <li>• Send messages</li>
                          <li>• Add notes</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}