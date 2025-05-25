import React from 'react';
import { useNavigate } from 'react-router-dom';
import StatCard from './StatCard';
import { dashboardStats } from '../../utils/demoData';
import { UsersIcon, FileTextIcon, TrendingUpIcon, DollarSignIcon } from 'lucide-react';
const StatCards: React.FC = () => {
  const navigate = useNavigate();
  return <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
      <div onClick={() => navigate('/dashboard/clients')} className="cursor-pointer">
        <StatCard title="Total Clients" value={dashboardStats.totalClients} icon={<UsersIcon className="h-6 w-6 text-red-600" aria-hidden="true" />} change={{
        value: 5.3,
        positive: true
      }} />
      </div>
      <div onClick={() => navigate('/dashboard/policies')} className="cursor-pointer">
        <StatCard title="Active Policies" value={dashboardStats.activePolicies} icon={<FileTextIcon className="h-6 w-6 text-red-600" aria-hidden="true" />} change={{
        value: 2.1,
        positive: true
      }} />
      </div>
      <div onClick={() => navigate('/dashboard/reports')} className="cursor-pointer">
        <StatCard title="Monthly Revenue" value={(dashboardStats.monthlyRevenue / 1000).toFixed(1)} prefix="KES " suffix="k" icon={<TrendingUpIcon className="h-6 w-6 text-red-600" aria-hidden="true" />} change={{
        value: 1.8,
        positive: true
      }} />
      </div>
      <div onClick={() => navigate('/dashboard/claims')} className="cursor-pointer">
        <StatCard title="Average Premium" value={dashboardStats.averagePremium.toFixed(2)} prefix="KES " icon={<DollarSignIcon className="h-6 w-6 text-red-600" aria-hidden="true" />} change={{
        value: 0.5,
        positive: false
      }} />
      </div>
    </div>;
};
export default StatCards;