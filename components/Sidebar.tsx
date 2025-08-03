'use client';
import Link from 'next/link';
import { useState } from 'react';

const Sidebar = ({ activeItem = 'dashboard' }: { activeItem?: string }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: 'ri-dashboard-line', href: '/' },
    { id: 'my-crms', label: 'My CRMs', icon: 'ri-folder-3-line', href: '/my-crms' },
    { id: 'crm-builder', label: 'CRM Builder', icon: 'ri-database-2-line', href: '/crm-builder' },
    { id: 'leads', label: 'Leads', icon: 'ri-user-star-line', href: '/leads' },
    { id: 'messages', label: 'Messages', icon: 'ri-message-3-line', href: '/messages' },
    { id: 'automations', label: 'Automations', icon: 'ri-flow-chart', href: '/automations' },
    { id: 'settings', label: 'Settings', icon: 'ri-settings-3-line', href: '/settings' }
  ];

  return (
    <div className={`${isCollapsed ? 'w-16' : 'w-64'} bg-white border-r border-gray-200 h-screen fixed left-0 top-0 z-40 transition-all duration-300`}>
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <h1 className="text-xl font-bold text-gray-900 font-['Inter']">CRM Pro</h1>
          )}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <i className={`${isCollapsed ? 'ri-menu-unfold-line' : 'ri-menu-fold-line'} text-gray-600 w-5 h-5 flex items-center justify-center`}></i>
          </button>
        </div>
      </div>
      
      <nav className="p-4 space-y-2">
        {menuItems.map((item) => (
          <Link key={item.id} href={item.href}>
            <div className={`flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer transition-colors whitespace-nowrap ${
              activeItem === item.id 
                ? 'bg-blue-50 text-blue-600 border border-blue-200' 
                : 'text-gray-700 hover:bg-gray-50'
            }`}>
              <i className={`${item.icon} w-5 h-5 flex items-center justify-center text-current`}></i>
              {!isCollapsed && <span className="font-medium">{item.label}</span>}
            </div>
          </Link>
        ))}
      </nav>
      
      {!isCollapsed && (
        <div className="absolute bottom-6 left-4 right-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
              <i className="ri-user-line text-white w-4 h-4 flex items-center justify-center"></i>
            </div>
            <div>
              <p className="font-medium text-gray-900 text-sm">John Smith</p>
              <p className="text-xs text-gray-600">Admin</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;