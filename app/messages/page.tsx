
'use client';
import { useState } from 'react';
import Sidebar from '../../components/Sidebar';
import TopBar from '../../components/TopBar';

export default function MessagesPage() {
  const [activeTab, setActiveTab] = useState('templates');
  const [selectedContact, setSelectedContact] = useState(1);
  const [newMessage, setNewMessage] = useState('');
  const [showTemplateModal, setShowTemplateModal] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState(null);
  const [templateForm, setTemplateForm] = useState({
    name: '',
    channel: 'WhatsApp',
    message: '',
    useInAutomation: false
  });

  const [templates, setTemplates] = useState([
    {
      id: 1,
      title: 'Welcome Message',
      type: 'WhatsApp',
      preview: 'Hi {name}! Welcome to our CRM platform. We\'re excited to help you grow your business and achieve your goals.',
      lastUsed: '2024-01-15',
      message: 'Hi {name}! Welcome to our CRM platform. We\'re excited to help you grow your business and achieve your goals.'
    },
    {
      id: 2,
      title: 'Follow-up Email',
      type: 'Email',
      preview: 'Thanks for your interest in our services. Let\'s schedule a call to discuss your specific needs and requirements.',
      lastUsed: '2024-01-14',
      message: 'Thanks for your interest in our services. Let\'s schedule a call to discuss your specific needs and requirements.'
    },
    {
      id: 3,
      title: 'Appointment Reminder',
      type: 'SMS',
      preview: 'Reminder: Your appointment is scheduled for tomorrow at 2 PM. Please confirm your availability.',
      lastUsed: '2024-01-13',
      message: 'Reminder: Your appointment is scheduled for tomorrow at 2 PM. Please confirm your availability.'
    },
    {
      id: 4,
      title: 'Quote Request Response',
      type: 'WhatsApp',
      preview: 'Thank you for requesting a quote. We\'ll send you a detailed proposal within 24 hours based on your requirements.',
      lastUsed: '2024-01-12',
      message: 'Thank you for requesting a quote. We\'ll send you a detailed proposal within 24 hours based on your requirements.'
    },
    {
      id: 5,
      title: 'Meeting Confirmation',
      type: 'Email',
      preview: 'Your meeting has been confirmed for {date} at {time}. We look forward to discussing your project details.',
      lastUsed: '2024-01-11',
      message: 'Your meeting has been confirmed for {date} at {time}. We look forward to discussing your project details.'
    },
    {
      id: 6,
      title: 'Thank You Message',
      type: 'SMS',
      preview: 'Thank you for choosing our services, {name}! We appreciate your business and trust in our team.',
      lastUsed: '2024-01-10',
      message: 'Thank you for choosing our services, {name}! We appreciate your business and trust in our team.'
    }
  ]);

  const contacts = [
    { id: 1, name: 'John Smith', lastMessage: 'Looking forward to our call', time: '2m ago', unread: 2, channel: 'WhatsApp' },
    { id: 2, name: 'Sarah Wilson', lastMessage: 'Thanks for the quote', time: '1h ago', unread: 0, channel: 'Email' },
    { id: 3, name: 'Mike Johnson', lastMessage: 'When can we schedule a demo?', time: '3h ago', unread: 1, channel: 'WhatsApp' },
    { id: 4, name: 'Emily Davis', lastMessage: 'Perfect, see you tomorrow', time: '1d ago', unread: 0, channel: 'SMS' },
    { id: 5, name: 'David Brown', lastMessage: 'Could you send more details?', time: '2d ago', unread: 0, channel: 'Email' },
    { id: 6, name: 'Lisa Anderson', lastMessage: 'Interested in your pricing', time: '3d ago', unread: 3, channel: 'WhatsApp' }
  ];

  const messages = [
    { id: 1, sender: 'John Smith', text: 'Hi, I\'m interested in your CRM solution for my business.', time: '10:30 AM', isUser: false },
    { id: 2, sender: 'You', text: 'Thanks for your interest! I\'d be happy to show you how our CRM can help streamline your operations.', time: '10:32 AM', isUser: true },
    { id: 3, sender: 'John Smith', text: 'That sounds great. What would be the best time for a demo?', time: '10:35 AM', isUser: false },
    { id: 4, sender: 'You', text: 'How about tomorrow at 2 PM? I can walk you through all the features.', time: '10:37 AM', isUser: true },
    { id: 5, sender: 'John Smith', text: 'Looking forward to our call', time: '10:40 AM', isUser: false }
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'WhatsApp': return 'ri-whatsapp-fill text-green-600';
      case 'Email': return 'ri-mail-fill text-blue-600';
      case 'SMS': return 'ri-message-3-fill text-purple-600';
      default: return 'ri-message-line text-gray-600';
    }
  };

  const getChannelIcon = (channel: string) => {
    switch (channel) {
      case 'WhatsApp': return 'ri-whatsapp-fill';
      case 'Email': return 'ri-mail-fill';
      case 'SMS': return 'ri-message-3-fill';
      default: return 'ri-message-line';
    }
  };

  const openTemplateModal = (template = null) => {
    if (template) {
      setEditingTemplate(template);
      setTemplateForm({
        name: template.title,
        channel: template.type,
        message: template.message,
        useInAutomation: false
      });
    } else {
      setEditingTemplate(null);
      setTemplateForm({
        name: '',
        channel: 'WhatsApp',
        message: '',
        useInAutomation: false
      });
    }
    setShowTemplateModal(true);
  };

  const closeTemplateModal = () => {
    setShowTemplateModal(false);
    setEditingTemplate(null);
    setTemplateForm({
      name: '',
      channel: 'WhatsApp',
      message: '',
      useInAutomation: false
    });
  };

  const saveTemplate = () => {
    if (!templateForm.name || !templateForm.message) return;

    const newTemplate = {
      id: editingTemplate ? editingTemplate.id : templates.length + 1,
      title: templateForm.name,
      type: templateForm.channel,
      preview: templateForm.message.slice(0, 120) + (templateForm.message.length > 120 ? '...' : ''),
      lastUsed: new Date().toISOString().split('T')[0],
      message: templateForm.message
    };

    if (editingTemplate) {
      setTemplates(templates.map(t => t.id === editingTemplate.id ? newTemplate : t));
    } else {
      setTemplates([...templates, newTemplate]);
    }
    
    closeTemplateModal();
  };

  const cloneTemplate = (template) => {
    const clonedTemplate = {
      ...template,
      id: templates.length + 1,
      title: `${template.title} (Copy)`,
      lastUsed: new Date().toISOString().split('T')[0]
    };
    setTemplates([...templates, clonedTemplate]);
  };

  const deleteTemplate = (templateId) => {
    setTemplates(templates.filter(t => t.id !== templateId));
  };

  const testTemplate = () => {
    alert('Template test sent successfully! Check your test channel for the message.');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar activeItem="messages" />
      
      <div className="ml-64">
        <TopBar 
          title="Messages" 
          subtitle="Manage templates and customer conversations"
        />
        
        <div className="p-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex bg-white rounded-lg p-1 border border-gray-200 shadow-sm">
              <button
                onClick={() => setActiveTab('templates')}
                className={`px-6 py-2.5 rounded-md text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                  activeTab === 'templates' 
                    ? 'bg-blue-500 text-white shadow-sm' 
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <i className="ri-file-text-line mr-2 w-4 h-4 inline-flex items-center justify-center"></i>
                Templates
              </button>
              <button
                onClick={() => setActiveTab('inbox')}
                className={`px-6 py-2.5 rounded-md text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                  activeTab === 'inbox' 
                    ? 'bg-blue-500 text-white shadow-sm' 
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <i className="ri-inbox-line mr-2 w-4 h-4 inline-flex items-center justify-center"></i>
                Inbox
              </button>
            </div>

            {activeTab === 'templates' && (
              <button 
                onClick={() => openTemplateModal()}
                className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2.5 rounded-lg font-medium transition-all duration-200 shadow-sm hover:shadow-md whitespace-nowrap"
              >
                <i className="ri-add-line mr-2 w-4 h-4 inline-flex items-center justify-center"></i>
                Add Template
              </button>
            )}
          </div>

          {activeTab === 'templates' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {templates.map((template) => (
                <div key={template.id} className="bg-white rounded-xl border border-gray-200 p-6 hover:border-blue-200 hover:shadow-md transition-all duration-200 group">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        template.type === 'WhatsApp' ? 'bg-green-100' :
                        template.type === 'Email' ? 'bg-blue-100' : 'bg-purple-100'
                      }`}>
                        <i className={`${getTypeIcon(template.type)} w-5 h-5 flex items-center justify-center`}></i>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">{template.title}</h3>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          template.type === 'WhatsApp' ? 'bg-green-100 text-green-700' :
                          template.type === 'Email' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'
                        }`}>
                          {template.type}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-700 mb-4 line-clamp-2 leading-relaxed">{template.preview}</p>
                  
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs text-gray-500">Last used: {template.lastUsed}</span>
                  </div>

                  <div className="flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => openTemplateModal(template)}
                        className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center gap-1 px-2 py-1 rounded hover:bg-blue-50 transition-colors"
                      >
                        <i className="ri-edit-line w-3 h-3 flex items-center justify-center"></i>
                        Edit
                      </button>
                      <button 
                        onClick={() => cloneTemplate(template)}
                        className="text-green-600 hover:text-green-700 text-sm font-medium flex items-center gap-1 px-2 py-1 rounded hover:bg-green-50 transition-colors"
                      >
                        <i className="ri-file-copy-line w-3 h-3 flex items-center justify-center"></i>
                        Clone
                      </button>
                    </div>
                    <button 
                      onClick={() => deleteTemplate(template.id)}
                      className="text-gray-400 hover:text-red-600 transition-colors p-1 rounded hover:bg-red-50"
                    >
                      <i className="ri-delete-bin-line w-4 h-4 flex items-center justify-center"></i>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'inbox' && (
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm" style={{height: '700px'}}>
              <div className="flex h-full">
                <div className="w-1/3 border-r border-gray-200">
                  <div className="p-4 border-b border-gray-200 bg-gray-50">
                    <div className="relative mb-4">
                      <input
                        type="text"
                        placeholder="Search conversations..."
                        className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                      />
                      <i className="ri-search-line absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 flex items-center justify-center"></i>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="px-3 py-1.5 text-xs font-medium bg-blue-100 text-blue-700 rounded-full">All</button>
                      <button className="px-3 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-100 rounded-full transition-colors">Unread</button>
                      <button className="px-3 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-100 rounded-full transition-colors">WhatsApp</button>
                      <button className="px-3 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-100 rounded-full transition-colors">Email</button>
                    </div>
                  </div>
                  
                  <div className="overflow-y-auto" style={{height: 'calc(100% - 120px)'}}>
                    {contacts.map((contact) => (
                      <div
                        key={contact.id}
                        onClick={() => setSelectedContact(contact.id)}
                        className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
                          selectedContact === contact.id ? 'bg-blue-50 border-blue-200' : ''
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3 flex-1">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                              <span className="text-white text-sm font-medium">
                                {contact.name.split(' ').map(n => n[0]).join('')}
                              </span>
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <h4 className="font-medium text-gray-900 truncate">{contact.name}</h4>
                                <i className={`${getChannelIcon(contact.channel)} w-3 h-3 flex items-center justify-center ${
                                  contact.channel === 'WhatsApp' ? 'text-green-600' :
                                  contact.channel === 'Email' ? 'text-blue-600' : 'text-purple-600'
                                }`}></i>
                              </div>
                              <p className="text-sm text-gray-600 truncate">
                                {contact.lastMessage}
                              </p>
                            </div>
                          </div>
                          <div className="text-right ml-2">
                            <div className="text-xs text-gray-500 mb-1">{contact.time}</div>
                            {contact.unread > 0 && (
                              <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center ml-auto">
                                <span className="text-white text-xs">{contact.unread}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex-1 flex flex-col">
                  <div className="p-4 border-b border-gray-200 bg-gray-50">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                          <span className="text-white text-sm font-medium">JS</span>
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">John Smith</h3>
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            <p className="text-sm text-green-600">Online</p>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button className="p-2 text-gray-600 hover:bg-white rounded-lg transition-colors">
                          <i className="ri-phone-line w-4 h-4 flex items-center justify-center"></i>
                        </button>
                        <button className="p-2 text-gray-600 hover:bg-white rounded-lg transition-colors">
                          <i className="ri-vidicon-line w-4 h-4 flex items-center justify-center"></i>
                        </button>
                        <button className="p-2 text-gray-600 hover:bg-white rounded-lg transition-colors">
                          <i className="ri-more-line w-4 h-4 flex items-center justify-center"></i>
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="flex-1 p-4 overflow-y-auto bg-gradient-to-b from-gray-50 to-white">
                    <div className="space-y-4">
                      {messages.map((message) => (
                        <div key={message.id} className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}>
                          <div className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
                            message.isUser 
                              ? 'bg-blue-500 text-white rounded-br-md' 
                              : 'bg-white border border-gray-200 text-gray-900 rounded-bl-md shadow-sm'
                          }`}>
                            <p className="text-sm leading-relaxed">{message.text}</p>
                            <p className={`text-xs mt-2 ${
                              message.isUser ? 'text-blue-100' : 'text-gray-500'
                            }`}>
                              {message.time}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="p-4 border-t border-gray-200 bg-white">
                    <div className="flex items-center gap-3">
                      <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                        <i className="ri-attachment-line w-4 h-4 flex items-center justify-center"></i>
                      </button>
                      <div className="flex-1 relative">
                        <input
                          type="text"
                          value={newMessage}
                          onChange={(e) => setNewMessage(e.target.value)}
                          placeholder="Type your message..."
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm pr-12"
                        />
                        <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600">
                          <i className="ri-emotion-line w-4 h-4 flex items-center justify-center"></i>
                        </button>
                      </div>
                      <button className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-xl transition-colors">
                        <i className="ri-send-plane-fill w-4 h-4 flex items-center justify-center"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Template Modal */}
      {showTemplateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">
                  {editingTemplate ? 'Edit Template' : 'Create New Template'}
                </h2>
                <button 
                  onClick={closeTemplateModal}
                  className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <i className="ri-close-line w-5 h-5 flex items-center justify-center"></i>
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Template Name</label>
                <input
                  type="text"
                  value={templateForm.name}
                  onChange={(e) => setTemplateForm({...templateForm, name: e.target.value})}
                  placeholder="Enter template name"
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Channel</label>
                <div className="flex gap-3">
                  {['WhatsApp', 'Email', 'SMS'].map((channel) => (
                    <button
                      key={channel}
                      type="button"
                      onClick={() => setTemplateForm({...templateForm, channel})}
                      className={`flex items-center gap-2 px-4 py-3 rounded-lg border transition-all ${
                        templateForm.channel === channel
                          ? 'bg-blue-50 border-blue-200 text-blue-700'
                          : 'bg-white border-gray-200 text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      <i className={`${getChannelIcon(channel)} w-4 h-4 flex items-center justify-center`}></i>
                      {channel}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Message Body</label>
                <textarea
                  value={templateForm.message}
                  onChange={(e) => setTemplateForm({...templateForm, message: e.target.value})}
                  placeholder="Enter your message template. Use variables like {name}, {date}, {company}..."
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                />
                <div className="mt-2 flex flex-wrap gap-2">
                  <span className="text-xs text-gray-500">Quick variables:</span>
                  {['{name}', '{company}', '{date}', '{time}'].map((variable) => (
                    <button
                      key={variable}
                      type="button"
                      onClick={() => setTemplateForm({...templateForm, message: templateForm.message + variable})}
                      className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded hover:bg-gray-200 transition-colors"
                    >
                      {variable}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={templateForm.useInAutomation}
                    onChange={(e) => setTemplateForm({...templateForm, useInAutomation: e.target.checked})}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm font-medium text-gray-700">Use in Automation</span>
                </label>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 flex items-center justify-between">
              <button 
                onClick={testTemplate}
                className="text-blue-600 hover:text-blue-700 font-medium px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors"
              >
                <i className="ri-send-plane-line mr-2 w-4 h-4 inline-flex items-center justify-center"></i>
                Test Template
              </button>
              <div className="flex items-center gap-3">
                <button 
                  onClick={closeTemplateModal}
                  className="px-6 py-2.5 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button 
                  onClick={saveTemplate}
                  disabled={!templateForm.name || !templateForm.message}
                  className="px-6 py-2.5 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 text-white rounded-lg transition-colors font-medium"
                >
                  {editingTemplate ? 'Update Template' : 'Save Template'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
