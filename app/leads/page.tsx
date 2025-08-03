'use client';
import { useState } from 'react';
import Sidebar from '../../components/Sidebar';
import TopBar from '../../components/TopBar';

export default function LeadsPage() {
  const [selectedSource, setSelectedSource] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedRep, setSelectedRep] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const leads = [
    {
      id: 1,
      name: 'John Smith',
      phone: '+1 555-0123',
      email: 'john@company.com',
      source: 'Google Ads',
      assignedRep: 'Sarah Johnson',
      status: 'New',
      createdAt: '2024-01-15',
      budget: '$50,000',
      crmName: 'Sales Lead CRM'
    },
    {
      id: 2,
      name: 'Emily Davis',
      phone: '+1 555-0124',
      email: 'emily@startup.com',
      source: 'Meta',
      assignedRep: 'Mike Wilson',
      status: 'In Progress',
      createdAt: '2024-01-14',
      budget: '$25,000',
      crmName: 'Marketing Campaign CRM'
    },
    {
      id: 3,
      name: 'Robert Brown',
      phone: '+1 555-0125',
      email: 'robert@business.com',
      source: 'WhatsApp',
      assignedRep: 'Sarah Johnson',
      status: 'Closed',
      createdAt: '2024-01-13',
      budget: '$75,000',
      crmName: 'Sales Lead CRM'
    },
    {
      id: 4,
      name: 'Lisa Martinez',
      phone: '+1 555-0126',
      email: 'lisa@enterprise.com',
      source: 'Google Ads',
      assignedRep: 'David Lee',
      status: 'New',
      createdAt: '2024-01-12',
      budget: '$100,000',
      crmName: 'Event Registration CRM'
    },
    {
      id: 5,
      name: 'James Wilson',
      phone: '+1 555-0127',
      email: 'james@company2.com',
      source: 'Meta',
      assignedRep: 'Mike Wilson',
      status: 'In Progress',
      createdAt: '2024-01-11',
      budget: '$30,000',
      crmName: 'Customer Support CRM'
    }
  ];

  const getStatusBadge = (status: string) => {
    const styles = {
      'New': 'bg-blue-100 text-blue-800 border-blue-200',
      'In Progress': 'bg-orange-100 text-orange-800 border-orange-200',
      'Closed': 'bg-green-100 text-green-800 border-green-200'
    };
    return styles[status] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const getSourceIcon = (source: string) => {
    switch (source) {
      case 'Google Ads': return 'ri-google-fill text-blue-600';
      case 'Meta': return 'ri-meta-fill text-blue-700';
      case 'WhatsApp': return 'ri-whatsapp-fill text-green-600';
      default: return 'ri-global-line text-gray-600';
    }
  };

  const getCRMBadgeColor = (crmName: string) => {
    const colors = ['bg-purple-100 text-purple-800', 'bg-indigo-100 text-indigo-800', 'bg-pink-100 text-pink-800', 'bg-teal-100 text-teal-800'];
    return colors[crmName.length % colors.length];
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar activeItem="leads" />
      
      <div className="ml-64">
        <TopBar 
          title="Leads" 
          subtitle="Manage and track your sales prospects across all CRMs"
        />
        
        <div className="p-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <select
                  value={selectedSource}
                  onChange={(e) => setSelectedSource(e.target.value)}
                  className="px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm pr-8"
                >
                  <option value="">All Sources</option>
                  <option value="Google Ads">Google Ads</option>
                  <option value="Meta">Meta</option>
                  <option value="WhatsApp">WhatsApp</option>
                </select>

                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm pr-8"
                >
                  <option value="">All Statuses</option>
                  <option value="New">New</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Closed">Closed</option>
                </select>

                <select
                  value={selectedRep}
                  onChange={(e) => setSelectedRep(e.target.value)}
                  className="px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm pr-8"
                >
                  <option value="">All Reps</option>
                  <option value="Sarah Johnson">Sarah Johnson</option>
                  <option value="Mike Wilson">Mike Wilson</option>
                  <option value="David Lee">David Lee</option>
                </select>
              </div>

              <div className="relative">
                <input
                  type="text"
                  placeholder="Search leads..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm w-64"
                />
                <i className="ri-search-line absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 flex items-center justify-center"></i>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button className="px-4 py-2 border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 font-medium transition-colors whitespace-nowrap">
                <i className="ri-download-line mr-2 w-4 h-4 inline-flex items-center justify-center"></i>
                Import
              </button>
              <button className="px-4 py-2 border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 font-medium transition-colors whitespace-nowrap">
                <i className="ri-user-add-line mr-2 w-4 h-4 inline-flex items-center justify-center"></i>
                Bulk Assign
              </button>
              <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap">
                <i className="ri-add-line mr-2 w-4 h-4 inline-flex items-center justify-center"></i>
                Add Lead
              </button>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200 sticky top-0">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">
                      <input type="checkbox" className="rounded border-gray-300" />
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Name</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Contact</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Source</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">CRM</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Budget</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Assigned Rep</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Status</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Created</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {leads.map((lead) => (
                    <tr key={lead.id} className="hover:bg-gray-50 cursor-pointer">
                      <td className="px-6 py-4">
                        <input type="checkbox" className="rounded border-gray-300" />
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-medium text-gray-900">{lead.name}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">{lead.phone}</div>
                        <div className="text-sm text-gray-600">{lead.email}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <i className={`${getSourceIcon(lead.source)} w-4 h-4 flex items-center justify-center`}></i>
                          <span className="text-sm text-gray-900">{lead.source}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCRMBadgeColor(lead.crmName)}`}>
                          {lead.crmName}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">{lead.budget}</td>
                      <td className="px-6 py-4 text-sm text-gray-900">{lead.assignedRep}</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusBadge(lead.status)}`}>
                          {lead.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">{lead.createdAt}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button className="text-gray-400 hover:text-blue-600 transition-colors">
                            <i className="ri-eye-line w-4 h-4 flex items-center justify-center"></i>
                          </button>
                          <button className="text-gray-400 hover:text-green-600 transition-colors">
                            <i className="ri-edit-line w-4 h-4 flex items-center justify-center"></i>
                          </button>
                          <button className="text-gray-400 hover:text-red-600 transition-colors">
                            <i className="ri-delete-bin-line w-4 h-4 flex items-center justify-center"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="bg-white border-t border-gray-200 px-6 py-4 flex items-center justify-between">
              <div className="text-sm text-gray-600">
                Showing 1 to 5 of 247 leads
              </div>
              <div className="flex items-center gap-2">
                <button className="px-3 py-1 border border-gray-200 rounded text-sm hover:bg-gray-50 transition-colors">
                  Previous
                </button>
                <button className="px-3 py-1 bg-blue-500 text-white rounded text-sm">1</button>
                <button className="px-3 py-1 border border-gray-200 rounded text-sm hover:bg-gray-50 transition-colors">2</button>
                <button className="px-3 py-1 border border-gray-200 rounded text-sm hover:bg-gray-50 transition-colors">3</button>
                <button className="px-3 py-1 border border-gray-200 rounded text-sm hover:bg-gray-50 transition-colors">
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}