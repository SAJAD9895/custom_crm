'use client';
import Sidebar from '../components/Sidebar';
import TopBar from '../components/TopBar';
import StatCard from '../components/StatCard';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const salesData = [
  { name: 'Jan', sales: 4000, leads: 240 },
  { name: 'Feb', sales: 3000, leads: 139 },
  { name: 'Mar', sales: 2000, leads: 980 },
  { name: 'Apr', sales: 2780, leads: 390 },
  { name: 'May', sales: 1890, leads: 480 },
  { name: 'Jun', sales: 2390, leads: 380 },
  { name: 'Jul', sales: 3490, leads: 430 },
];

const leadSourceData = [
  { name: 'Google Ads', value: 45, color: '#3B82F6' },
  { name: 'Meta', value: 30, color: '#10B981' },
  { name: 'WhatsApp', value: 25, color: '#F59E0B' },
];

const recentLeads = [
  { name: 'Sarah Johnson', email: 'sarah@email.com', source: 'Google Ads', status: 'New', value: '$5,200' },
  { name: 'Michael Chen', email: 'michael@email.com', source: 'Meta', status: 'In Progress', value: '$3,800' },
  { name: 'Emily Davis', email: 'emily@email.com', source: 'WhatsApp', status: 'Closed', value: '$7,500' },
  { name: 'David Wilson', email: 'david@email.com', source: 'Google Ads', status: 'New', value: '$4,200' },
];

const recentCRMActivity = [
  { name: 'Sales Lead CRM', owner: 'John Smith', lastUpdated: '2 hours ago' },
  { name: 'Marketing Campaign CRM', owner: 'Sarah Wilson', lastUpdated: '1 day ago' },
  { name: 'Customer Support CRM', owner: 'Mike Johnson', lastUpdated: '3 hours ago' }
];

export default function Dashboard() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'New': return 'bg-blue-100 text-blue-800';
      case 'In Progress': return 'bg-yellow-100 text-yellow-800';
      case 'Closed': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getSourceIcon = (source: string) => {
    switch (source) {
      case 'Google Ads': return 'ri-google-fill text-blue-600';
      case 'Meta': return 'ri-meta-fill text-blue-700';
      case 'WhatsApp': return 'ri-whatsapp-fill text-green-600';
      default: return 'ri-global-line text-gray-600';
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar activeItem="dashboard" />
      
      <div className="flex-1 ml-64 overflow-auto">
        <TopBar title="Dashboard" subtitle="Welcome back! Here's what's happening with your leads today." />
        
        <div className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <StatCard
              title="New Leads Today"
              value="24"
              change="+12%"
              changeType="positive"
              icon="ri-user-add-line"
              iconColor="text-blue-500"
            />
            <StatCard
              title="Total CRMs Created"
              value="5"
              change="+2"
              changeType="positive"
              icon="ri-database-2-line"
              iconColor="text-purple-500"
            />
            <StatCard
              title="Assigned Leads"
              value="156"
              change="+8%"
              changeType="positive"
              icon="ri-user-star-line"
              iconColor="text-green-500"
            />
            <StatCard
              title="Total Leads"
              value="1,247"
              change="+15%"
              changeType="positive"
              icon="ri-group-line"
              iconColor="text-orange-500"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <div className="bg-white p-6 rounded-xl border border-gray-200">
              <h3 className="text-lg font-bold text-gray-900 mb-6">Sales Performance</h3>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="name" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip />
                  <Area type="monotone" dataKey="sales" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.1} />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-white p-6 rounded-xl border border-gray-200">
              <h3 className="text-lg font-bold text-gray-900 mb-6">Lead Sources</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={leadSourceData}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    dataKey="value"
                  >
                    {leadSourceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex flex-wrap gap-4 mt-4">
                {leadSourceData.map((source) => (
                  <div key={source.name} className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: source.color }}></div>
                    <span className="text-sm text-gray-600">{source.name} ({source.value}%)</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <div className="bg-white rounded-xl border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-bold text-gray-900">Recent Leads</h3>
              </div>
              <div className="p-6 space-y-4">
                {recentLeads.map((lead, index) => (
                  <div key={index} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm font-medium">
                          {lead.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{lead.name}</p>
                        <div className="flex items-center gap-2">
                          <i className={`${getSourceIcon(lead.source)} w-3 h-3 flex items-center justify-center`}></i>
                          <p className="text-sm text-gray-600">{lead.source}</p>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ${getStatusColor(lead.status)}`}>
                        {lead.status}
                      </span>
                      <p className="text-sm font-medium text-gray-900 mt-1">{lead.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-bold text-gray-900">Recent CRM Activity</h3>
              </div>
              <div className="p-6 space-y-4">
                {recentCRMActivity.map((activity, index) => (
                  <div key={index} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                        <i className="ri-database-2-line text-purple-600 w-5 h-5 flex items-center justify-center"></i>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{activity.name}</p>
                        <p className="text-sm text-gray-600">Owner: {activity.owner}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-900">Last Updated</p>
                      <p className="text-sm text-gray-600">{activity.lastUpdated}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}