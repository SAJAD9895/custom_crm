'use client';
import { SetStateAction, useState } from 'react';
import Sidebar from '../../components/Sidebar';
import TopBar from '../../components/TopBar';

type WorkflowStep = {
  id: number;
  type: string;
  title: string;
  subtitle: string;
  icon: string;
  color: string;
  config: any;
  note?: string;
};

export default function AutomationsPage() {
  const [selectedWorkflow, setSelectedWorkflow] = useState(1);
  const [showBlockConfig, setShowBlockConfig] = useState(false);
  const [selectedBlock, setSelectedBlock] = useState<WorkflowStep | null>(null);
  const [draggedBlock, setDraggedBlock] = useState<any>(null);
  const [workflowStatus, setWorkflowStatus] = useState('Draft');
  const [workflowName, setWorkflowName] = useState('New Lead Welcome Flow');
  const [showWorkflowSettings, setShowWorkflowSettings] = useState(false);
  
  const workflows = [
    {
      id: 1,
      name: 'New Lead Welcome Flow',
      status: 'Active',
      triggers: 23,
      lastRun: '2 hours ago',
      description: 'Automatically welcome new leads and assign to sales reps',
      blocks: 4,
      owner: 'John Smith'
    },
    {
      id: 2,
      name: 'Follow-up Sequence',
      status: 'Draft',
      triggers: 0,
      lastRun: 'Never',
      description: 'Send follow-up messages after initial contact',
      blocks: 2,
      owner: 'Sarah Wilson'
    },
    {
      id: 3,
      name: 'Appointment Reminders',
      status: 'Active',
      triggers: 12,
      lastRun: '30 minutes ago',
      description: 'Remind leads about scheduled appointments',
      blocks: 5,
      owner: 'Mike Johnson'
    },
    {
      id: 4,
      name: 'High Value Lead Alert',
      status: 'Active',
      triggers: 8,
      lastRun: '1 hour ago',
      description: 'Notify team when high-value leads are captured',
      blocks: 3,
      owner: 'Emily Davis'
    }
  ];

  const [workflowSteps, setWorkflowSteps] = useState([
    {
      id: 1,
      type: 'trigger',
      title: 'Lead Captured',
      subtitle: 'From: Google Ads, Meta, Contact Form',
      icon: 'ri-user-add-line',
      color: 'emerald',
      config: { sources: ['Google Ads', 'Meta', 'Contact Form'] },
      note: 'Triggers when new leads are added to any CRM'
    },
    {
      id: 2,
      type: 'message',
      title: 'Send WhatsApp Message',
      subtitle: 'Template: Welcome New Lead',
      icon: 'ri-whatsapp-line',
      color: 'green',
      config: { channel: 'WhatsApp', template: 'Welcome New Lead' },
      note: 'Send personalized welcome message'
    },
    {
      id: 3,
      type: 'condition',
      title: 'Check Lead Source',
      subtitle: 'If source equals Google Ads',
      icon: 'ri-git-branch-line',
      color: 'amber',
      config: { field: 'source', operator: 'equals', value: 'Google Ads' },
      note: 'Branch workflow based on lead source'
    },
    {
      id: 4,
      type: 'assign',
      title: 'Assign Sales Rep',
      subtitle: 'Auto-assign: Sarah Johnson',
      icon: 'ri-user-star-line',
      color: 'purple',
      config: { assignee: 'Sarah Johnson', method: 'auto' },
      note: 'Distribute leads evenly among team'
    },
    {
      id: 5,
      type: 'delay',
      title: 'Wait 2 Hours',
      subtitle: 'Delay before next action',
      icon: 'ri-time-line',
      color: 'slate',
      config: { duration: 2, unit: 'hours' },
      note: 'Give leads time to respond'
    },
    {
      id: 6,
      type: 'end',
      title: 'End Flow',
      subtitle: 'Workflow completed successfully',
      icon: 'ri-stop-circle-line',
      color: 'red',
      config: {},
      note: 'Automation ends here'
    }
  ]);

  const availableBlocks: {
      type: string;
      title: string;
      icon: string;
      color: 'emerald' | 'green' | 'amber' | 'purple' | 'slate' | 'red';
      description: string;
    }[] = [
      { 
        type: 'trigger', 
        title: 'Lead Captured', 
        icon: 'ri-user-add-line', 
        color: 'emerald',
        description: 'Start automation when lead is captured'
      },
      { 
        type: 'message', 
        title: 'Send Message', 
        icon: 'ri-message-3-line', 
        color: 'green',
        description: 'Send WhatsApp, Email, or SMS'
      },
      { 
        type: 'assign', 
        title: 'Assign Sales Rep', 
        icon: 'ri-user-star-line', 
        color: 'purple',
        description: 'Assign lead to team member'
      },
      { 
        type: 'condition', 
        title: 'Check Condition', 
        icon: 'ri-git-branch-line', 
        color: 'amber',
        description: 'Create conditional logic paths'
      },
      { 
        type: 'delay', 
        title: 'Wait (Delay)', 
        icon: 'ri-time-line', 
        color: 'slate',
        description: 'Add time delays between actions'
      },
      { 
        type: 'end', 
        title: 'End Flow', 
        icon: 'ri-stop-circle-line', 
        color: 'red',
        description: 'End the automation workflow'
      }
    ];

  const getBlockColors = (
    color: 'emerald' | 'green' | 'amber' | 'purple' | 'slate' | 'red',
    variant: 'bg' | 'text' | 'border' | 'hover' = 'bg'
  ) => {
    const colorMap = {
      emerald: {
        bg: 'bg-emerald-50',
        text: 'text-emerald-700',
        border: 'border-emerald-200',
        hover: 'hover:bg-emerald-100'
      },
      green: {
        bg: 'bg-green-50',
        text: 'text-green-700',
        border: 'border-green-200',
        hover: 'hover:bg-green-100'
      },
      amber: {
        bg: 'bg-amber-50',
        text: 'text-amber-700',
        border: 'border-amber-200',
        hover: 'hover:bg-amber-100'
      },
      purple: {
        bg: 'bg-purple-50',
        text: 'text-purple-700',
        border: 'border-purple-200',
        hover: 'hover:bg-purple-100'
      },
      slate: {
        bg: 'bg-slate-50',
        text: 'text-slate-700',
        border: 'border-slate-200',
        hover: 'hover:bg-slate-100'
      },
      red: {
        bg: 'bg-red-50',
        text: 'text-red-700',
        border: 'border-red-200',
        hover: 'hover:bg-red-100'
      }
    };
    return colorMap[color]?.[variant] || colorMap.slate[variant];
  };

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, block: typeof availableBlocks[number]) => {
    setDraggedBlock(block);
    e.dataTransfer.effectAllowed = 'copy';
  };

  const handleDragOver = (e: { preventDefault: () => void; dataTransfer: { dropEffect: string; }; }) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
  };

  const handleDrop = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    if (draggedBlock) {
      const newStep = {
        id: Date.now(),
        type: draggedBlock.type,
        title: draggedBlock.title,
        subtitle: 'Click to configure settings',
        icon: draggedBlock.icon,
        color: draggedBlock.color,
        config: {},
        note: ''
      };
      setWorkflowSteps([...workflowSteps, newStep]);
      setDraggedBlock(null);
    }
  };

  const configureBlock = (step: SetStateAction<WorkflowStep | null>) => {
    setSelectedBlock(step);
    setShowBlockConfig(true);
  };

  const removeStep = (stepId: number) => {
    setWorkflowSteps(workflowSteps.filter(step => step.id !== stepId));
  };

  const moveStep = (stepId: number, direction: string) => {
    const currentIndex = workflowSteps.findIndex(step => step.id === stepId);
    if (
      (direction === 'up' && currentIndex > 0) ||
      (direction === 'down' && currentIndex < workflowSteps.length - 1)
    ) {
      const newSteps = [...workflowSteps];
      const targetIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
      [newSteps[currentIndex], newSteps[targetIndex]] = [newSteps[targetIndex], newSteps[currentIndex]];
      setWorkflowSteps(newSteps);
    }
  };

  const saveBlockConfig = (config: any) => {
    if (selectedBlock) {
      setWorkflowSteps(workflowSteps.map(step => 
        step.id === selectedBlock.id 
          ? { ...step, config, subtitle: getConfigSubtitle(step.type, config) }
          : step
      ));
    }
    setShowBlockConfig(false);
    setSelectedBlock(null);
  };

  const updateBlockNote = (stepId: number, note: string) => {
    setWorkflowSteps(workflowSteps.map(step => 
      step.id === stepId ? { ...step, note } : step
    ));
  };

  const getConfigSubtitle = (type: string, config: { sources: any[]; channel: any; template: any; field: any; operator: any; value: any; method: any; assignee: any; duration: number; unit: any; }) => {
    switch (type) {
      case 'trigger':
        return `From: ${config.sources?.join(', ') || 'Configure sources'}`;
      case 'message':
        return `${config.channel || 'WhatsApp'}: ${config.template || 'Select template'}`;
      case 'condition':
        return `If ${config.field || 'field'} ${config.operator || 'equals'} ${config.value || 'value'}`;
      case 'assign':
        return `${config.method || 'Auto-assign'}: ${config.assignee || 'Select rep'}`;
      case 'delay':
        return `Wait ${config.duration || 1} ${config.unit || 'hour'}${config.duration > 1 ? 's' : ''}`;
      case 'end':
        return 'Workflow completed successfully';
      default:
        return 'Click to configure settings';
    }
  };

  const testWorkflow = () => {
    alert('Test run initiated - Check your test messages!');
  };

  const saveAndActivate = () => {
    setWorkflowStatus('Active');
    alert('Workflow saved and activated successfully!');
  };

  const saveWorkflowSettings = (name: SetStateAction<string>) => {
    setWorkflowName(name);
    setShowWorkflowSettings(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar activeItem="automations" />
      
      <div className="ml-64">
        <TopBar 
          title="Workflow Automation" 
          subtitle="Design automated workflows to nurture leads and streamline processes"
        />
        
        <div className="p-8">
          <div className="grid grid-cols-1 xl:grid-cols-5 gap-8">
            {/* Left Sidebar - Workflows & Blocks */}
            <div className="xl:col-span-1 space-y-6">
              {/* Workflow List */}
              <div className="bg-white rounded-lg border border-gray-200 p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-900">Workflows</h3>
                  <button className="text-blue-600 hover:text-blue-700 transition-colors">
                    <i className="ri-add-line w-5 h-5 flex items-center justify-center"></i>
                  </button>
                </div>
                
                <div className="space-y-3">
                  {workflows.map((workflow) => (
                    <div
                      key={workflow.id}
                      onClick={() => setSelectedWorkflow(workflow.id)}
                      className={`p-3 rounded-lg cursor-pointer transition-all border ${
                        selectedWorkflow === workflow.id 
                          ? 'bg-blue-50 border-blue-200 shadow-sm' 
                          : 'border-gray-200 hover:bg-gray-50 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-gray-900 text-sm">{workflow.name}</h4>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          workflow.status === 'Active' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {workflow.status}
                        </span>
                      </div>
                      <p className="text-xs text-gray-600 mb-2 line-clamp-2">{workflow.description}</p>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>{workflow.blocks} blocks</span>
                        <span>{workflow.triggers} runs</span>
                      </div>
                      <div className="text-xs text-gray-500 mt-1">Owner: {workflow.owner}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Draggable Blocks Panel */}
              <div className="bg-white rounded-lg border border-gray-200 p-4">
                <h3 className="font-semibold text-gray-900 mb-4">Drag Blocks</h3>
                <div className="space-y-2">
                  {availableBlocks.map((block, index) => (
                    <div
                      key={index}
                      draggable
                      onDragStart={(e) => handleDragStart(e, block)}
                      className={`p-3 rounded-lg cursor-grab active:cursor-grabbing border-2 border-dashed transition-all ${getBlockColors(block.color, 'bg')} ${getBlockColors(block.color, 'border')} ${getBlockColors(block.color, 'hover')} hover:shadow-sm hover:scale-105`}
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${getBlockColors(block.color, 'bg')} ${getBlockColors(block.color, 'text')}`}>
                          <i className={`${block.icon} w-4 h-4 flex items-center justify-center`}></i>
                        </div>
                        <div className="flex-1">
                          <h4 className={`text-sm font-medium ${getBlockColors(block.color, 'text')}`}>{block.title}</h4>
                        </div>
                      </div>
                      <p className="text-xs text-gray-600 ml-11">{block.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Main Panel - Visual Flow Builder */}
            <div className="xl:col-span-4">
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                {/* Top Bar */}
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-semibold text-gray-900">{workflowName}</h3>
                      <button 
                        onClick={() => setShowWorkflowSettings(true)}
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        <i className="ri-edit-line w-4 h-4 flex items-center justify-center"></i>
                      </button>
                    </div>
                    <p className="text-sm text-gray-600">Drag blocks from the sidebar to build your automation workflow</p>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                      workflowStatus === 'Active' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {workflowStatus}
                    </div>
                    
                    <button 
                      onClick={testWorkflow}
                      className="px-4 py-2 border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 font-medium transition-colors whitespace-nowrap"
                    >
                      <i className="ri-play-line mr-2 w-4 h-4 inline-flex items-center justify-center"></i>
                      Test Run
                    </button>
                    <button 
                      onClick={saveAndActivate}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap"
                    >
                      <i className="ri-save-line mr-2 w-4 h-4 inline-flex items-center justify-center"></i>
                      Save & Activate
                    </button>
                  </div>
                </div>

                {/* Workflow Canvas */}
                <div 
                  className="workflow-canvas bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-8 min-h-[600px] border-2 border-dashed border-gray-200 relative overflow-auto"
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                >
                  {workflowSteps.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-80 text-gray-500">
                      <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                        <i className="ri-drag-drop-line w-8 h-8 flex items-center justify-center text-blue-600"></i>
                      </div>
                      <p className="text-xl font-medium mb-2 text-gray-700">Start Building Your Workflow</p>
                      <p className="text-sm text-center max-w-md">Drag blocks from the sidebar to create automated workflows that will help you manage leads and streamline your sales process.</p>
                    </div>
                  ) : (
                    <div className="space-y-4 max-w-2xl mx-auto">
                      {workflowSteps.map((step, index) => (
                        <div key={step.id} className="flex flex-col items-center">
                          {/* Workflow Block */}
                          <div 
                            onClick={() => configureBlock(step)}
                            className={`w-full max-w-md p-5 rounded-xl border-2 cursor-pointer transition-all shadow-sm hover:shadow-md group ${getBlockColors(step.color as 'emerald' | 'green' | 'amber' | 'purple' | 'slate' | 'red', 'bg')} ${getBlockColors(step.color as 'emerald' | 'green' | 'amber' | 'purple' | 'slate' | 'red', 'border')} ${getBlockColors(step.color as 'emerald' | 'green' | 'amber' | 'purple' | 'slate' | 'red', 'hover')}`}
                          >
                            <div className="flex items-center gap-4">
                              {/* Block Icon */}
                              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${getBlockColors(step.color as 'emerald' | 'green' | 'amber' | 'purple' | 'slate' | 'red', 'bg')} ${getBlockColors(step.color as 'emerald' | 'green' | 'amber' | 'purple' | 'slate' | 'red', 'text')} shadow-sm`}>
                                <i className={`${step.icon} w-6 h-6 flex items-center justify-center`}></i>
                              </div>
                              
                              {/* Block Content */}
                              <div className="flex-1 min-w-0">
                                <h4 className={`font-semibold text-lg ${getBlockColors(step.color as 'emerald' | 'green' | 'amber' | 'purple' | 'slate' | 'red', 'text')}`}>{step.title}</h4>
                                <p className="text-sm text-gray-600 mt-1">{step.subtitle}</p>
                                {step.note && (
                                  <p className="text-xs text-gray-500 mt-1 italic">{step.note}</p>
                                )}
                              </div>
                              
                              {/* Block Actions */}
                              <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button 
                                  onClick={(e) => { e.stopPropagation(); moveStep(step.id, 'up'); }}
                                  className="text-gray-500 hover:text-gray-700 transition-colors"
                                  disabled={index === 0}
                                >
                                  <i className="ri-arrow-up-line w-4 h-4 flex items-center justify-center"></i>
                                </button>
                                <button 
                                  onClick={(e) => { e.stopPropagation(); moveStep(step.id, 'down'); }}
                                  className="text-gray-500 hover:text-gray-700 transition-colors"
                                  disabled={index === workflowSteps.length - 1}
                                >
                                  <i className="ri-arrow-down-line w-4 h-4 flex items-center justify-center"></i>
                                </button>
                                <button 
                                  onClick={(e) => { e.stopPropagation(); configureBlock(step); }}
                                  className="text-gray-500 hover:text-blue-600 transition-colors"
                                >
                                  <i className="ri-settings-3-line w-4 h-4 flex items-center justify-center"></i>
                                </button>
                                <button 
                                  onClick={(e) => { e.stopPropagation(); removeStep(step.id); }}
                                  className="text-gray-500 hover:text-red-600 transition-colors"
                                >
                                  <i className="ri-delete-bin-line w-4 h-4 flex items-center justify-center"></i>
                                </button>
                              </div>
                            </div>
                          </div>
                          
                          {/* Connection Arrow */}
                          {index < workflowSteps.length - 1 && (
                            <div className="my-2">
                              <div className="w-10 h-10 bg-white border-2 border-gray-300 rounded-full flex items-center justify-center shadow-sm">
                                <i className="ri-arrow-down-line text-gray-600 w-5 h-5 flex items-center justify-center"></i>
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Workflow Settings Modal */}
      {showWorkflowSettings && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Workflow Settings</h3>
              <button 
                onClick={() => setShowWorkflowSettings(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <i className="ri-close-line w-6 h-6 flex items-center justify-center"></i>
              </button>
            </div>

            <div className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Workflow Name</label>
                  <input
                    type="text"
                    value={workflowName}
                    onChange={(e) => setWorkflowName(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 p-6 border-t border-gray-200">
              <button 
                onClick={() => setShowWorkflowSettings(false)}
                className="px-4 py-2 border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 font-medium transition-colors whitespace-nowrap"
              >
                Cancel
              </button>
              <button 
                onClick={() => saveWorkflowSettings(workflowName)}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Block Configuration Modal */}
      {showBlockConfig && selectedBlock && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getBlockColors(selectedBlock.color as 'emerald' | 'green' | 'amber' | 'purple' | 'slate' | 'red', 'bg')} ${getBlockColors(selectedBlock.color as 'emerald' | 'green' | 'amber' | 'purple' | 'slate' | 'red', 'text')}`}>
                  <i className={`${selectedBlock.icon} w-5 h-5 flex items-center justify-center`}></i>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{selectedBlock.title}</h3>
                  <p className="text-sm text-gray-600">Configure block settings</p>
                </div>
              </div>
              <button 
                onClick={() => setShowBlockConfig(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <i className="ri-close-line w-6 h-6 flex items-center justify-center"></i>
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              {/* Add Note Section */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Block Note/Description</label>
                <textarea
                  value={selectedBlock.note || ''}
                  onChange={(e) => updateBlockNote(selectedBlock.id, e.target.value)}
                  placeholder="Add a note or description for this block..."
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm resize-none"
                  rows={2}
                />
              </div>

              {selectedBlock.type === 'trigger' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">Select Lead Sources</label>
                  <div className="space-y-3">
                    {['Contact Form', 'Google Ads', 'Meta (Facebook)', 'WhatsApp Business'].map(source => (
                      <label key={source} className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                        <input type="checkbox" defaultChecked className="rounded w-4 h-4 text-blue-600" />
                        <span className="text-sm text-gray-700 font-medium">{source}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {selectedBlock.type === 'message' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">Message Channel</label>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { name: 'WhatsApp', icon: 'ri-whatsapp-line', color: 'green' },
                        { name: 'Email', icon: 'ri-mail-line', color: 'blue' },
                        { name: 'SMS', icon: 'ri-message-2-line', color: 'purple' }
                      ].map(channel => (
                        <label key={channel.name} className="flex flex-col items-center gap-2 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                          <input type="radio" name="channel" className="w-4 h-4" />
                          <i className={`${channel.icon} w-6 h-6 flex items-center justify-center text-${channel.color}-600`}></i>
                          <span className="text-xs font-medium">{channel.name}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Message Template</label>
                    <select className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm pr-8">
                      <option>Welcome New Lead</option>
                      <option>Follow-up Message</option>
                      <option>Appointment Reminder</option>
                      <option>Thank You Message</option>
                    </select>
                  </div>
                </>
              )}

              {selectedBlock.type === 'assign' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Assignment Method</label>
                    <div className="space-y-2">
                      <label className="flex items-center gap-2">
                        <input type="radio" name="assignment" defaultChecked className="w-4 h-4" />
                        <span className="text-sm">Auto-assign (Round Robin)</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input type="radio" name="assignment" className="w-4 h-4" />
                        <span className="text-sm">Assign to specific rep</span>
                      </label>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Sales Representative</label>
                    <select className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm pr-8">
                      <option>Sarah Johnson</option>
                      <option>Michael Chen</option>
                      <option>Emma Wilson</option>
                      <option>David Rodriguez</option>
                    </select>
                  </div>
                </>
              )}

              {selectedBlock.type === 'condition' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Field to Check</label>
                    <select className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm pr-8">
                      <option>Lead Source</option>
                      <option>Lead Status</option>
                      <option>Budget Range</option>
                      <option>Industry</option>
                      <option>Company Size</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Condition</label>
                    <select className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm pr-8">
                      <option>equals</option>
                      <option>does not equal</option>
                      <option>contains</option>
                      <option>greater than</option>
                      <option>less than</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Value</label>
                    <input
                      type="text"
                      placeholder="Enter comparison value"
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    />
                  </div>
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <i className="ri-git-branch-line text-amber-600 w-4 h-4 flex items-center justify-center"></i>
                      <p className="text-sm font-medium text-amber-800">Conditional Branching</p>
                    </div>
                    <p className="text-xs text-amber-700">This block will create two paths: "If Condition is Met" and "Else". You can add different blocks to each path.</p>
                  </div>
                </>
              )}

              {selectedBlock.type === 'delay' && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Duration</label>
                    <input
                      type="number"
                      defaultValue="1"
                      min="1"
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Time Unit</label>
                    <select className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm pr-8">
                      <option>minutes</option>
                      <option>hours</option>
                      <option>days</option>
                      <option>weeks</option>
                    </select>
                  </div>
                </div>
              )}

              {selectedBlock.type === 'end' && (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <i className="ri-stop-circle-line text-red-600 w-8 h-8 flex items-center justify-center"></i>
                  </div>
                  <h4 className="font-medium text-gray-900 mb-2">End Flow Block</h4>
                  <p className="text-sm text-gray-600">This block marks the end of your automation workflow. No additional configuration is needed.</p>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="flex justify-end gap-3 p-6 border-t border-gray-200">
              <button 
                onClick={() => setShowBlockConfig(false)}
                className="px-4 py-2 border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 font-medium transition-colors whitespace-nowrap"
              >
                Cancel
              </button>
              <button 
                onClick={() => saveBlockConfig(selectedBlock.config)}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap"
              >
                Save Configuration
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}