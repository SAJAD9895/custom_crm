
'use client';

interface StatCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: 'positive' | 'negative';
  icon: string;
  iconColor?: string;
}

const StatCard = ({ title, value, change, changeType, icon, iconColor = 'text-blue-500' }: StatCardProps) => {
  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-2">{value}</p>
          {change && (
            <div className="flex items-center mt-2">
              <i className={`${changeType === 'positive' ? 'ri-arrow-up-line text-green-500' : 'ri-arrow-down-line text-red-500'} w-4 h-4 flex items-center justify-center mr-1`}></i>
              <span className={`text-sm font-medium ${changeType === 'positive' ? 'text-green-600' : 'text-red-600'}`}>
                {change}
              </span>
            </div>
          )}
        </div>
        <div className={`w-12 h-12 rounded-lg bg-gray-50 flex items-center justify-center ${iconColor}`}>
          <i className={`${icon} w-6 h-6 flex items-center justify-center`}></i>
        </div>
      </div>
    </div>
  );
};

export default StatCard;
