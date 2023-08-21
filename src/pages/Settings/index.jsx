import { useState } from 'react';
import useAuth from "../../hooks/useAuth";
import General from './General';
import Categories from './Categories';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('general');
  const { user } = useAuth();


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

      </div>
    <hr />
      <div className="tab-content">
        {activeTab === 'general' && (
          <div>
            {/* General settings content */}
            <General user={user}/>
          </div>
        )}

        {activeTab === 'categories' && (
          <div>
            {/* Categories content */}
            <Categories user={user}/>
            {/* ... */}
          </div>
        )}

      </div>
    </div>
  );
};

export default Settings;
