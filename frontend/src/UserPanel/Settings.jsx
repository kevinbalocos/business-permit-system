import React, { useState } from 'react';
import SidebarCitizen from "./LeftSidebar";
import NavbarCitizen from "./Navbar";
import { 
  User, 
  Bell, 
  Shield, 
  Globe, 
  Eye, 
  Moon, 
  Sun, 
  Smartphone, 
  Mail, 
  Lock,
  ChevronRight,
  Check,
  X,
  MapPin,
  Calendar,
  FileText,
  CreditCard,
  Phone,
  Camera,
  Download
} from 'lucide-react';

const Settings = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    push: true,
    announcements: true,
    permits: true,
    reminders: false
  });
  const [twoFactor, setTwoFactor] = useState(false);
  const [language, setLanguage] = useState('English');
  const [activeSection, setActiveSection] = useState('account');

  const toggleNotification = (type) => {
    setNotifications(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
  };

  const ToggleSwitch = ({ enabled, onToggle, label }) => (
    <div className="flex items-center justify-between py-3">
      <span className="text-gray-700 font-medium text-sm sm:text-base">{label}</span>
      <button
        onClick={onToggle}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 ${
          enabled ? 'bg-teal-600' : 'bg-gray-200'
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-lg transition-transform ${
            enabled ? 'translate-x-6' : 'translate-x-1'
          }`}
        />
      </button>
    </div>
  );

  const SettingsCard = ({ icon: Icon, title, description, children, onClick, active }) => (
    <div 
      className={`bg-white rounded-xl shadow-sm border-2 transition-all duration-200 hover:shadow-md cursor-pointer ${
        active ? 'border-teal-200 bg-teal-50' : 'border-gray-100 hover:border-gray-200'
      }`}
      onClick={onClick}
    >
      <div className="p-4 sm:p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3 sm:space-x-4 flex-1">
            <div className={`p-2 sm:p-3 rounded-xl flex-shrink-0 ${active ? 'bg-teal-100 text-teal-600' : 'bg-gray-100 text-gray-600'}`}>
              <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 truncate">{title}</h3>
              <p className="text-gray-500 text-xs sm:text-sm mt-1 line-clamp-2">{description}</p>
            </div>
          </div>
          <ChevronRight className={`w-5 h-5 text-gray-400 transition-transform flex-shrink-0 ${active ? 'rotate-90' : ''}`} />
        </div>
        {active && children && (
          <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-gray-100">
            {children}
          </div>
        )}
      </div>
    </div>
  );

  const ProfileSection = () => (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6">
        <div className="relative flex-shrink-0">
          <div className="w-20 h-20 bg-gradient-to-br from-teal-500 to-teal-600 rounded-full flex items-center justify-center">
            <User className="w-8 h-8 text-white" />
          </div>
          <button className="absolute -bottom-1 -right-1 bg-white rounded-full p-2 shadow-lg border border-gray-200 hover:bg-gray-50">
            <Camera className="w-4 h-4 text-gray-600" />
          </button>
        </div>
        <div className="text-center sm:text-left">
          <h4 className="text-lg font-semibold text-gray-900">Juan Dela Cruz</h4>
          <p className="text-gray-500 text-sm sm:text-base">juan.delacruz@email.com</p>
          <p className="text-sm text-teal-600 font-medium">Verified Citizen</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Full Name</label>
          <input 
            type="text" 
            value="Juan Dela Cruz" 
            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500" 
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Email Address</label>
          <input 
            type="email" 
            value="juan.delacruz@email.com" 
            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500" 
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Phone Number</label>
          <input 
            type="tel" 
            value="+63 912 345 6789" 
            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500" 
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Address</label>
          <input 
            type="text" 
            value="Quezon City, Metro Manila" 
            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500" 
          />
        </div>
      </div>
      
      <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
        <button className="bg-teal-600 text-white px-6 py-2 rounded-lg hover:bg-teal-700 transition-colors">
          Save Changes
        </button>
        <button className="border border-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-50 transition-colors">
          Cancel
        </button>
      </div>
    </div>
  );

  const NotificationSection = () => (
    <div className="space-y-6">
      <div className="bg-teal-50 border border-teal-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Bell className="w-5 h-5 text-teal-600 mt-0.5 flex-shrink-0" />
          <div>
            <h4 className="text-sm font-medium text-teal-800">Stay Updated</h4>
            <p className="text-sm text-teal-600 mt-1">
              Get notified about permit status changes, new announcements, and important deadlines.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <h4 className="text-lg font-semibold text-gray-900 mb-4">Notification Channels</h4>
          <div className="space-y-3 bg-gray-50 rounded-lg p-4">
            <ToggleSwitch
              enabled={notifications.email}
              onToggle={() => toggleNotification('email')}
              label="Email Notifications"
            />
            <ToggleSwitch
              enabled={notifications.sms}
              onToggle={() => toggleNotification('sms')}
              label="SMS Notifications"
            />
            <ToggleSwitch
              enabled={notifications.push}
              onToggle={() => toggleNotification('push')}
              label="Browser Push Notifications"
            />
          </div>
        </div>

        <div>
          <h4 className="text-lg font-semibold text-gray-900 mb-4">Content Preferences</h4>
          <div className="space-y-3 bg-gray-50 rounded-lg p-4">
            <ToggleSwitch
              enabled={notifications.permits}
              onToggle={() => toggleNotification('permits')}
              label="Permit Updates & Status Changes"
            />
            <ToggleSwitch
              enabled={notifications.announcements}
              onToggle={() => toggleNotification('announcements')}
              label="LGU Announcements & News"
            />
            <ToggleSwitch
              enabled={notifications.reminders}
              onToggle={() => toggleNotification('reminders')}
              label="Payment & Deadline Reminders"
            />
          </div>
        </div>
      </div>
    </div>
  );

  const SecuritySection = () => (
    <div className="space-y-6">
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Shield className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
          <div>
            <h4 className="text-sm font-medium text-red-800">Security Recommendations</h4>
            <p className="text-sm text-red-600 mt-1">
              Enable two-factor authentication and use a strong password to secure your account.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0 mb-4">
            <div>
              <h4 className="text-lg font-semibold text-gray-900">Two-Factor Authentication</h4>
              <p className="text-sm text-gray-500">Add an extra layer of security to your account</p>
            </div>
            <div className={`px-3 py-1 rounded-full text-xs font-medium self-start sm:self-center ${twoFactor ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
              {twoFactor ? 'Enabled' : 'Disabled'}
            </div>
          </div>
          <button 
            onClick={() => setTwoFactor(!twoFactor)}
            className={`w-full sm:w-auto px-4 py-2 rounded-lg font-medium transition-colors ${
              twoFactor 
                ? 'bg-red-100 text-red-700 hover:bg-red-200' 
                : 'bg-teal-600 text-white hover:bg-teal-700'
            }`}
          >
            {twoFactor ? 'Disable 2FA' : 'Enable 2FA'}
          </button>
        </div>

        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-gray-900">Login & Devices</h4>
          <div className="bg-gray-50 rounded-lg p-4 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 bg-white rounded-lg space-y-2 sm:space-y-0">
              <div className="flex items-center space-x-3">
                <Smartphone className="w-5 h-5 text-gray-600 flex-shrink-0" />
                <div>
                  <p className="font-medium text-gray-900">iPhone 14 Pro</p>
                  <p className="text-sm text-gray-500">Current device • Manila, Philippines</p>
                </div>
              </div>
              <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full self-start sm:self-center">Active</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 bg-white rounded-lg space-y-2 sm:space-y-0">
              <div className="flex items-center space-x-3">
                <Globe className="w-5 h-5 text-gray-600 flex-shrink-0" />
                <div>
                  <p className="font-medium text-gray-900">Chrome Browser</p>
                  <p className="text-sm text-gray-500">Last used 2 days ago • Quezon City</p>
                </div>
              </div>
              <button className="text-red-600 text-sm hover:underline self-start sm:self-center">Remove</button>
            </div>
          </div>
        </div>

        <div>
          <h4 className="text-lg font-semibold text-gray-900 mb-4">Password</h4>
          <button className="flex items-center space-x-2 text-teal-600 hover:text-teal-700 font-medium">
            <Lock className="w-4 h-4" />
            <span>Change Password</span>
          </button>
        </div>
      </div>
    </div>
  );

  const PreferencesSection = () => (
    <div className="space-y-6">
      <div>
        <h4 className="text-lg font-semibold text-gray-900 mb-4">Appearance</h4>
        <div className="bg-gray-50 rounded-lg p-4">
          <ToggleSwitch
            enabled={darkMode}
            onToggle={() => setDarkMode(!darkMode)}
            label="Dark Mode"
          />
        </div>
      </div>

      <div>
        <h4 className="text-lg font-semibold text-gray-900 mb-4">Language & Region</h4>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">Language</label>
            <select 
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
            >
              <option value="English">English</option>
              <option value="Filipino">Filipino</option>
              <option value="Cebuano">Cebuano</option>
            </select>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">Time Zone</label>
            <select className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500">
              <option>Asia/Manila (GMT+8)</option>
            </select>
          </div>
        </div>
      </div>

      <div>
        <h4 className="text-lg font-semibold text-gray-900 mb-4">Data & Privacy</h4>
        <div className="space-y-3">
          <button className="flex items-center justify-between w-full p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
            <div className="flex items-center space-x-3">
              <Download className="w-5 h-5 text-gray-600" />
              <span className="text-gray-700">Download Your Data</span>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-400" />
          </button>
          <button className="flex items-center justify-between w-full p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
            <div className="flex items-center space-x-3">
              <Eye className="w-5 h-5 text-gray-600" />
              <span className="text-gray-700">Privacy Settings</span>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-400" />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <SidebarCitizen />

      {/* Main Content Area */}
      <div className="flex flex-col flex-1 min-w-0">
        {/* Navbar */}
        <NavbarCitizen />

        {/* Page Content */}
        <div className="p-4 sm:p-6 overflow-y-auto">
          <div className="max-w-4xl mx-auto">
            <div className="mb-6 sm:mb-8">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">LGU Settings</h1>
              <p className="mt-2 text-gray-600 text-sm sm:text-base">
                Manage your Local Government Unit preferences, notification settings, and security configurations here.
              </p>
            </div>

            <div className="space-y-4 sm:space-y-6">
              <SettingsCard
                icon={User}
                title="Account & Profile"
                description="Update your profile information, contact details, and account preferences."
                active={activeSection === 'account'}
                onClick={() => setActiveSection(activeSection === 'account' ? '' : 'account')}
              >
                <ProfileSection />
              </SettingsCard>

              <SettingsCard
                icon={Bell}
                title="Notifications"
                description="Manage notification preferences for permit updates, announcements, and reminders."
                active={activeSection === 'notifications'}
                onClick={() => setActiveSection(activeSection === 'notifications' ? '' : 'notifications')}
              >
                <NotificationSection />
              </SettingsCard>

              <SettingsCard
                icon={Shield}
                title="Security & Privacy"
                description="Enable two-factor authentication, manage login devices, and control privacy settings."
                active={activeSection === 'security'}
                onClick={() => setActiveSection(activeSection === 'security' ? '' : 'security')}
              >
                <SecuritySection />
              </SettingsCard>

              <SettingsCard
                icon={Globe}
                title="Preferences"
                description="Customize your experience with language, theme, and regional settings."
                active={activeSection === 'preferences'}
                onClick={() => setActiveSection(activeSection === 'preferences' ? '' : 'preferences')}
              >
                <PreferencesSection />
              </SettingsCard>
            </div>

            {/* Footer Actions */}
            <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-gray-200 mb-15 sm:mb-0">
              <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
                <div className="text-sm text-gray-500 text-center sm:text-left">
                  Last updated: {new Date().toLocaleDateString()}
                </div>
                <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
                  <button className="text-red-600 hover:text-red-700 text-sm font-medium px-4 py-2 border border-red-200 rounded-lg hover:bg-red-50 transition-colors">
                    Deactivate Account
                  </button>
                  <button className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors text-sm">
                    Save All Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;