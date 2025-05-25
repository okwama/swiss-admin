import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { clients, statusColors } from '../utils/demoData';
import { ArrowLeftIcon, UserIcon, CalendarIcon, CreditCardIcon, PhoneIcon, HomeIcon, MailIcon, AlertTriangleIcon, FileTextIcon } from 'lucide-react';
const ClientDetailPage: React.FC = () => {
  const {
    id
  } = useParams<{
    id: string;
  }>();
  const navigate = useNavigate();
  const client = clients.find(c => c.id === id);
  if (!client) {
    return <div className="px-4 py-6 sm:px-6 lg:px-8">
        <div className="text-center py-12">
          <AlertTriangleIcon className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-lg font-medium text-gray-900">
            Client not found
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            The client you're looking for doesn't exist or has been removed.
          </p>
          <div className="mt-6">
            <button type="button" onClick={() => navigate('/dashboard/clients')} className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
              Back to Clients
            </button>
          </div>
        </div>
      </div>;
  }
  return <div className="px-4 sm:px-6 lg:px-8">
      <div className="mb-6">
        <button onClick={() => navigate('/dashboard/clients')} className="inline-flex items-center text-sm text-red-600 hover:text-red-900">
          <ArrowLeftIcon className="mr-1 h-4 w-4" /> Back to Clients
        </button>
      </div>
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
          <div>
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Client Information
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              Personal details and policy information.
            </p>
          </div>
          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusColors[client.status]}`}>
            {client.status.charAt(0).toUpperCase() + client.status.slice(1)}
          </span>
        </div>
        <div className="border-t border-gray-200">
          <dl>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500 flex items-center">
                <UserIcon className="mr-2 h-5 w-5 text-gray-400" />
                Full name
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {client.name}
              </dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500 flex items-center">
                <MailIcon className="mr-2 h-5 w-5 text-gray-400" />
                Email address
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {client.email}
              </dd>
            </div>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500 flex items-center">
                <PhoneIcon className="mr-2 h-5 w-5 text-gray-400" />
                Phone number
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {client.phone}
              </dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500 flex items-center">
                <HomeIcon className="mr-2 h-5 w-5 text-gray-400" />
                Address
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {client.address}
              </dd>
            </div>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500 flex items-center">
                <FileTextIcon className="mr-2 h-5 w-5 text-gray-400" />
                Policy information
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                <div className="space-y-2">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-gray-500">Policy Number</p>
                      <p>{client.policyNumber}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Policy Type</p>
                      <p>{client.policyType}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-gray-500">Start Date</p>
                      <p>{new Date(client.startDate).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">End Date</p>
                      <p>{new Date(client.endDate).toLocaleDateString()}</p>
                    </div>
                  </div>
                </div>
              </dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500 flex items-center">
                <CreditCardIcon className="mr-2 h-5 w-5 text-gray-400" />
                Financial details
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                <div className="space-y-2">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-gray-500">Premium</p>
                      <p>
                        KES{' '}
                        {client.premium.toLocaleString('en-US', {
                        minimumFractionDigits: 2
                      })}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Risk Score</p>
                      <p>{client.riskScore} / 5</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Claims Filed</p>
                    <p>{client.claims}</p>
                  </div>
                </div>
              </dd>
            </div>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500 flex items-center">
                <CalendarIcon className="mr-2 h-5 w-5 text-gray-400" />
                Actions
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                <div className="space-x-2">
                  <button type="button" className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                    Edit Client
                  </button>
                  <button type="button" className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                    Manage Policy
                  </button>
                  <button type="button" className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                    File Claim
                  </button>
                </div>
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>;
};
export default ClientDetailPage;