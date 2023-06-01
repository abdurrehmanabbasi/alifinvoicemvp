import { useState } from 'react';
import General from './General';
const Settings = () => {
  const [activeTab, setActiveTab] = useState('general');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className='flex flex-col p-4'>
        <h2 className='text-3xl'>Settings</h2>
      <div className="tab-navigation flex gap-3 mt-5">
        <button
          className={activeTab === 'general' ? 'bg-black rounded-t-md text-white p-3' : ''}
          onClick={() => handleTabChange('general')}
        >
          General
        </button>
        <button
          className={activeTab === 'categories' ? 'bg-black rounded-t-md text-white p-3' : ''}
          onClick={() => handleTabChange('categories')}
        >
          Categories
        </button>
        <button
          className={activeTab === 'payment' ? 'bg-black rounded-t-md text-white p-3' : ''}
          onClick={() => handleTabChange('payment')}
        >
          Payment
        </button>
        <button
          className={activeTab === 'invoicing' ? 'bg-black rounded-t-md text-white p-3' : ''}
          onClick={() => handleTabChange('invoicing')}
        >
          Invoicing Template
        </button>
        <button
          className={activeTab === 'other' ? 'bg-black rounded-t-md text-white p-3' : ''}
          onClick={() => handleTabChange('other')}
        >
          Other
        </button>
      </div>
    <hr />
      <div className="tab-content">
        {activeTab === 'general' && (
          <div>
            {/* General settings content */}
            <h2>General</h2>
            <General />
          </div>
        )}

        {activeTab === 'categories' && (
          <div>
            {/* Categories content */}
            <h2>Categories</h2>
            {/* ... */}
          </div>
        )}

        {activeTab === 'payment' && (
          <div>
            {/* Payment content */}
            <h2>Payment</h2>
            {/* ... */}
          </div>
        )}

        {activeTab === 'invoicing' && (
          <div>
            {/* Invoicing Template content */}
            <h2>Invoicing Template</h2>
            {/* ... */}
          </div>
        )}

        {activeTab === 'other' && (
          <div>
            {/* Other content */}
            <h2>Other</h2>
            {/* ... */}
          </div>
        )}
      </div>
    </div>
  );
};

export default Settings;
