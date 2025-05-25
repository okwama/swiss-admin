import React from 'react';
interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  change?: {
    value: number;
    positive: boolean;
  };
  prefix?: string;
  suffix?: string;
}
const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon,
  change,
  prefix = '',
  suffix = ''
}) => {
  return <div className="bg-white overflow-hidden shadow rounded-lg">
      <div className="p-5">
        <div className="flex items-center">
          <div className="flex-shrink-0 bg-red-50 rounded-md p-3">{icon}</div>
          <div className="ml-5 w-0 flex-1">
            <dl>
              <dt className="text-sm font-medium text-gray-500 truncate">
                {title}
              </dt>
              <dd>
                <div className="text-lg font-medium text-gray-900">
                  {prefix}
                  {value}
                  {suffix}
                </div>
              </dd>
            </dl>
          </div>
        </div>
      </div>
      {change && <div className="bg-gray-50 px-5 py-3">
          <div className="text-sm">
            <span className={`font-medium ${change.positive ? 'text-green-600' : 'text-red-600'}`}>
              {change.positive ? '+' : '-'}
              {Math.abs(change.value)}%
            </span>{' '}
            <span className="text-gray-500">from previous period</span>
          </div>
        </div>}
    </div>;
};
export default StatCard;