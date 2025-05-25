import React from 'react';
import ClientsTable from '../components/Dashboard/ClientsTable';
const ClientsPage: React.FC = () => {
  return <div className="px-4 sm:px-6 lg:px-8">
      <div className="pb-5 border-b border-gray-200">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          Client Management
        </h3>
        <p className="mt-2 max-w-4xl text-sm text-gray-500">
          View and manage all client information
        </p>
      </div>
      <div className="mt-8">
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 border-b border-gray-200 sm:px-6 flex justify-between items-center">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              All Clients
            </h3>
            <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700">
              Add New Client
            </button>
          </div>
          <div className="p-2">
            <ClientsTable />
          </div>
        </div>
      </div>
    </div>;
};
export default ClientsPage;