import React, { useState } from 'react';
import SidebarCitizen from './Sidebar';
import NavbarCitizen from './Navbar';
import { 
  FilePlus, 
  ClipboardList, 
  CreditCard, 
  Clock, 
  CheckCircle2, 
  AlertTriangle, 
  Download,
  TrendingUp,
  Calendar,
  Eye,
  Bell,
  Activity
} from 'lucide-react';

const LandingPage = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const applications = [
    { id: 'APP-2025-001', type: 'Business Permit', status: 'For Assessment', date: '2025-08-10', progress: 60 },
    { id: 'APP-2025-002', type: 'Renewal', status: 'Pending Payment', date: '2025-08-12', progress: 80 },
    { id: 'APP-2025-003', type: 'Amendment', status: 'Approved', date: '2025-08-15', progress: 100 },
  ];

  const recentActivities = [
    { action: 'New permit application submitted', user: 'You', time: '2 hours ago', type: 'application' },
    { action: 'Payment confirmation received', user: 'System', time: '4 hours ago', type: 'payment' },
    { action: 'Document uploaded successfully', user: 'You', time: '1 day ago', type: 'document' },
    { action: 'Inspection scheduled', user: 'Admin', time: '2 days ago', type: 'inspection' },
  ];

  const upcomingEvents = [
    { title: 'Business Inspection', date: '2025-08-25', time: '10:00 AM' },
    { title: 'Permit Renewal Deadline', date: '2025-12-31', time: 'All day' },
    { title: 'Document Submission Due', date: '2025-08-28', time: '5:00 PM' },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <SidebarCitizen 
        isCollapsed={isCollapsed} 
        toggleSidebar={() => setIsCollapsed(!isCollapsed)} 
      />

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <NavbarCitizen />

        {/* Dashboard content */}
        <main className="flex-1 overflow-y-auto p-6 bg-gradient-to-br from-green-50 to-emerald-100">
          {/* Welcome Header */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-800">Welcome, Citizen User</h1>
            <p className="text-gray-600">Here's your current business permit activities and updates.</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm text-gray-600">Total Applications</p>
                  <p className="text-2xl font-bold text-gray-800">12</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <FilePlus className="w-6 h-6 text-green-600" />
                </div>
              </div>
              <p className="text-sm text-green-600 flex items-center">
                <TrendingUp className="w-4 h-4 mr-1" />
                +2 from last month
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm text-gray-600">Pending Review</p>
                  <p className="text-2xl font-bold text-gray-800">3</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Clock className="w-6 h-6 text-blue-600" />
                </div>
              </div>
              <p className="text-sm text-blue-600">2 require action</p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm text-gray-600">Approved</p>
                  <p className="text-2xl font-bold text-gray-800">8</p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6 text-purple-600" />
                </div>
              </div>
              <p className="text-sm text-purple-600">+81% from last month</p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm text-gray-600">Payments Due</p>
                  <p className="text-2xl font-bold text-gray-800">1</p>
                </div>
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <CreditCard className="w-6 h-6 text-orange-600" />
                </div>
              </div>
              <p className="text-sm text-orange-600">+15.3% from last month</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Application Status - Left 2 columns */}
            <div className="lg:col-span-2 space-y-6">
              {/* Quick Actions */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center text-center hover:shadow-lg transition-shadow">
                  <FilePlus className="w-10 h-10 text-green-600 mb-3" />
                  <h3 className="text-lg font-semibold text-gray-800">New Application</h3>
                  <p className="text-gray-600 text-sm mb-3">Start a new business permit application.</p>
                  <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                    Apply Now
                  </button>
                </div>

                <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center text-center hover:shadow-lg transition-shadow">
                  <ClipboardList className="w-10 h-10 text-green-600 mb-3" />
                  <h3 className="text-lg font-semibold text-gray-800">Track Applications</h3>
                  <p className="text-gray-600 text-sm mb-3">View the status of your applications.</p>
                  <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                    Track Now
                  </button>
                </div>

                <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center text-center hover:shadow-lg transition-shadow">
                  <CreditCard className="w-10 h-10 text-green-600 mb-3" />
                  <h3 className="text-lg font-semibold text-gray-800">Pay Fees</h3>
                  <p className="text-gray-600 text-sm mb-3">Pay your pending permit fees online.</p>
                  <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                    Pay Now
                  </button>
                </div>
              </div>

              {/* Application Status Table */}
              <div className="bg-white rounded-2xl shadow-md p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Applications</h2>
                <div className="space-y-4">
                  {applications.map((app, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="font-medium text-gray-800">{app.id}</span>
                          <span className="text-sm text-gray-500">• {app.type}</span>
                        </div>
                        <div className="flex items-center gap-2 mb-3">
                          {app.status === 'Approved' && (
                            <span className="flex items-center text-green-600 text-sm">
                              <CheckCircle2 className="w-4 h-4 mr-1" /> Approved
                            </span>
                          )}
                          {app.status === 'For Assessment' && (
                            <span className="flex items-center text-yellow-600 text-sm">
                              <Clock className="w-4 h-4 mr-1" /> For Assessment
                            </span>
                          )}
                          {app.status === 'Pending Payment' && (
                            <span className="flex items-center text-red-600 text-sm">
                              <AlertTriangle className="w-4 h-4 mr-1" /> Pending Payment
                            </span>
                          )}
                          <span className="text-xs text-gray-500">• {app.date}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-green-500 h-2 rounded-full transition-all"
                            style={{ width: `${app.progress}%` }}
                          ></div>
                        </div>
                      </div>
                      <div className="flex gap-2 ml-4">
                        <button className="px-3 py-1 bg-green-100 text-green-700 rounded-lg text-sm hover:bg-green-200 flex items-center">
                          <Eye className="w-4 h-4 mr-1" /> View
                        </button>
                        {app.status === 'Approved' && (
                          <button className="px-3 py-1 bg-green-100 text-green-700 rounded-lg text-sm hover:bg-green-200 flex items-center">
                            <Download className="w-4 h-4 mr-1" /> Download
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Recent Activities */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Recent Activities</h2>
                <div className="space-y-4">
                  {recentActivities.map((activity, index) => (
                    <div key={index} className="flex gap-3">
                      <div className={`w-2 h-2 rounded-full mt-2 ${
                        activity.type === 'application' ? 'bg-green-500' :
                        activity.type === 'payment' ? 'bg-blue-500' :
                        activity.type === 'document' ? 'bg-purple-500' :
                        'bg-orange-500'
                      }`}></div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-800">{activity.action}</p>
                        <p className="text-xs text-gray-500">{activity.user} • {activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Upcoming Events */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Upcoming Events</h2>
                <div className="space-y-4">
                  {upcomingEvents.map((event, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Calendar className="w-5 h-5 text-green-600" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-800 text-sm">{event.title}</p>
                        <p className="text-xs text-gray-500">{event.date} at {event.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Reminders Section */}
              <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Bell className="w-5 h-5 text-green-600" />
                  <h2 className="text-lg font-semibold text-green-800">Reminders</h2>
                </div>
                <ul className="list-disc list-inside text-green-700 text-sm space-y-1">
                  <li>Renew your business permit before January 20, 2026 to avoid penalties.</li>
                  <li>Check your email regularly for inspection schedules.</li>
                  <li>Update your business profile to keep your information accurate.</li>
                </ul>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default LandingPage;