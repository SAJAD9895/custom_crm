
'use client';

const TopBar = ({ title, subtitle }: { title: string; subtitle?: string }) => {
  return (
    <div className="bg-white border-b border-gray-200 px-8 py-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 font-['Inter']">{title}</h1>
          {subtitle && <p className="text-gray-600 mt-1">{subtitle}</p>}
        </div>
        
        <div className="flex items-center gap-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            />
            <i className="ri-search-line absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 flex items-center justify-center"></i>
          </div>
          
          <button className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
            <i className="ri-notification-3-line w-5 h-5 flex items-center justify-center"></i>
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
          </button>
          
          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center cursor-pointer">
            <i className="ri-user-line text-white w-4 h-4 flex items-center justify-center"></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
