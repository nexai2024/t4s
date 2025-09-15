"use client"
import Link from 'next/link';
import React, { useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import type { UserResource } from '@clerk/types';
export default function DashboardPage() {
    const [user, setUser] = React.useState<UserResource | null>(null);
    
    const [activeSection, setActiveSection] = React.useState("dashboard");
    const [helpRequests, setHelpRequests] = React.useState([
      { id: 1, issue: "WiFi Connection", status: "resolved", date: "2 days ago" },
      { id: 2, issue: "Email Setup", status: "in-progress", date: "Today" }
    ]);
    const { isLoaded, user: clerkUser } = useUser();

    useEffect(() => {
      if (isLoaded && clerkUser) {
        setUser(clerkUser);
      }
    }, [isLoaded, clerkUser]);
    if (!user) {
      return <div>Loading...</div>;
    } 

    // Emergency Help Button Component
    const EmergencyHelpButton = () => (
      <button className="w-full bg-red-500 hover:bg-red-600 text-white text-2xl font-bold py-6 px-8 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-200 mb-6">
        🆘 GET HELP NOW
        <div className="text-sm font-normal mt-1">Connect to live support instantly</div>
      </button>
    );
  
    // Quick Actions Component
    const QuickActions = () => (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {[
          { icon: "💬", title: "Chat Support", desc: "Text with our tech experts", link: "/booking" },
          { icon: "📞", title: "Call Support", desc: "Speak with a real person", link: "/booking"  },
          { icon: "📹", title: "Video Help", desc: "Show us your screen", link: "/booking"  },
          { icon: "📚", title: "Learn & Practice", desc: "Step-by-step tutorials", link: "/booking"  },
          { icon: "🛡️", title: "Scam Check", desc: "Verify suspicious messages", link: "/booking" },
          { icon: "⚙️", title: "Device Health", desc: "Check your devices", link: "/booking"  }
        ].map((action, index) => (
          <Link href={action.link} key={index} className="no-underline">
          <button key={index} className="text-4xl mb-3">{action.icon}
            <h3 className="text-lg font-semibold text-gray-800 mb-2">{action.title}</h3>
            <p className="text-gray-600 text-sm">{action.desc}</p>
          </button>
          </Link>
        ))}
      </div>
    );
  
    // Recent Activity Component
    const RecentActivity = () => (
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Recent Help Requests</h2>
        <div className="space-y-3">
          {helpRequests.map(request => (
            <div key={request.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <h3 className="font-medium text-gray-800">{request.issue}</h3>
                <p className="text-sm text-gray-600">{request.date}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                request.status === 'resolved' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-yellow-100 text-yellow-800'
              }`}>
                {request.status === 'resolved' ? '✅ Solved' : '🔄 In Progress'}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  
    // Device Status Component
    const DeviceStatus = () => (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Your Devices</h2>
        <div className="space-y-4">
          {[
            { name: "iPad", status: "good", battery: "85%", wifi: "Strong" },
            { name: "iPhone", status: "good", battery: "92%", wifi: "Strong" },
            { name: "Computer", status: "attention", battery: "N/A", wifi: "Weak" }
          ].map((device, index) => (
            <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center space-x-3">
                <div className={`w-3 h-3 rounded-full ${
                  device.status === 'good' ? 'bg-green-500' : 'bg-yellow-500'
                }`}></div>
                <span className="font-medium">{device.name}</span>
              </div>
              <div className="text-sm text-gray-600">
                {device.battery !== "N/A" && `🔋 ${device.battery} • `}📶 {device.wifi}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  
    // Navigation Component
    const Navigation = () => (
      <nav className="bg-white shadow-sm border-b mb-6">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <div className="text-2xl">🤝</div>
              <h1 className="text-xl font-bold text-gray-800">Tech4Seniors</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-600">Hello, {user?.fullName || "Guest"}!</span>
              <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors">
                Settings
              </button>
            </div>
          </div>
        </div>
      </nav>
    );
  
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        
        <main className="max-w-7xl mx-auto px-4 py-6">
          {/* Emergency Help - Always Visible */}
          <EmergencyHelpButton />
          
          {/* Welcome Message */}
          <div className="bg-blue-50 border-l-4 border-blue-400 p-6 mb-6 rounded-r-lg">
            <h2 className="text-lg font-semibold text-blue-800 mb-2">
              Welcome back, {user?.fullName || "Guest"}! 👋
            </h2>
            <p className="text-blue-700">
              Your tech support team is here whenever you need us. What can we help you with today?
            </p>
          </div>
  
          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Quick Actions */}
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">How can we help?</h2>
              <QuickActions />
              <RecentActivity />
            </div>
            
            {/* Right Column - Device Status & Tips */}
            <div className="space-y-6">
              <DeviceStatus />
              
              {/* Daily Tip */}
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-6 border border-purple-200">
                <h3 className="text-lg font-semibold text-purple-800 mb-2">💡 Today&apos;s Tip</h3>
                <p className="text-purple-700 text-sm">
                  Did you know? You can make text bigger on any website by holding Ctrl and pressing the + key!
                </p>
              </div>
              
              {/* Family Connection */}
              <div className="bg-green-50 rounded-lg p-6 border border-green-200">
                <h3 className="text-lg font-semibold text-green-800 mb-2">👨‍👩‍👧‍👦 Family Circle</h3>
                <p className="text-green-700 text-sm mb-3">
                  Your daughter Sarah can help you remotely if needed.
                </p>
                <button className="bg-green-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-600 transition-colors">
                  Invite Family Member
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }