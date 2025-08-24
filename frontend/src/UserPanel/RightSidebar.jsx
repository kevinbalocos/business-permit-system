// RightSidebar.jsx
import React from "react";
import { Calendar, Bell, Eye } from "lucide-react";

const RightSidebar = ({
  recentActivities = [],
  upcomingEvents = [],
  reminders = [],
  collapsed = false, // if you want to support collapsed/condensed mode
}) => {
  // Condensed width when collapsed (useful on very small screens or when you want a narrow panel)
  const containerClass = collapsed ? "w-14 sm:w-20 lg:w-64" : "w-full";

  return (
    <aside
      className={`${containerClass} bg-transparent`}
      aria-label="Right sidebar"
    >
      <div className="space-y-4 sm:space-y-6">
        {/* Recent Activities */}
        <div className="  p-4 sm:p-6">
          <h2 className="text-base sm:text-lg font-semibold text-gray-800 mb-3 sm:mb-4">
            Recent Activities
          </h2>
          <div className="space-y-3 sm:space-y-4">
            {recentActivities.length === 0 ? (
              <p className="text-xs text-gray-500">No recent activity.</p>
            ) : (
              recentActivities.map((activity, index) => (
                <div key={index} className="flex gap-3">
                  <div
                    className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                      activity.type === "application"
                        ? "bg-teal-500"
                        : activity.type === "payment"
                        ? "bg-blue-500"
                        : activity.type === "document"
                        ? "bg-purple-500"
                        : "bg-orange-500"
                    }`}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs sm:text-sm text-gray-800">
                      {activity.action}
                    </p>
                    <p className="text-xs text-gray-500">
                      {activity.user} • {activity.time}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="  p-4 sm:p-6">
          <h2 className="text-base sm:text-lg font-semibold text-gray-800 mb-3 sm:mb-4">
            Upcoming Events
          </h2>
          <div className="space-y-3 sm:space-y-4">
            {upcomingEvents.length === 0 ? (
              <p className="text-xs text-gray-500">No upcoming events.</p>
            ) : (
              upcomingEvents.map((event, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-teal-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-teal-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-800 text-xs sm:text-sm">
                      {event.title}
                    </p>
                    <p className="text-xs text-gray-500">
                      {event.date} {event.time ? `at ${event.time}` : ""}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Reminders */}
        <div className="bg-teal-50 border border-teal-200 rounded-xl p-3 sm:p-4">
          <div className="flex items-center gap-2 mb-2">
            <Bell className="w-4 h-4 sm:w-5 sm:h-5 text-teal-600" />
            <h2 className="text-base sm:text-lg font-semibold text-teal-800">
              Reminders
            </h2>
          </div>

          {reminders.length === 0 ? (
            <p className="text-xs text-teal-700">No reminders.</p>
          ) : (
            <ul className="list-disc list-inside text-teal-700 text-xs sm:text-sm space-y-1">
              {reminders.map((r, i) => (
                <li key={i}>{r}</li>
              ))}
            </ul>
          )}
        </div>

        {/* Optional helper/action card (small CTA) */}
        <div className="hidden sm:block   p-3 sm:p-4 text-center">
          <p className="text-sm text-gray-700 mb-3">
            Need help with an application?
          </p>
          <button className="px-3 py-2 bg-teal-600 text-white rounded-lg text-sm hover:bg-teal-700 transition-colors inline-flex items-center">
            <Eye className="w-4 h-4 mr-2" /> View Help
          </button>
        </div>
      </div>
    </aside>
  );
};

export default RightSidebar;
