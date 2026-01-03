import { User, Bell, LogOut } from 'lucide-react';

export default function Navbar() {
  return (
    <div className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Left side - Page title */}
        <div>
          <h2 className="text-xl font-semibold text-gray-800">Document Processing</h2>
          <p className="text-sm text-gray-500 mt-0.5">
            Upload and extract text from your documents
          </p>
        </div>

        {/* Right side - User actions */}
        <div className="flex items-center gap-4">
          <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors relative">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-ocean-500 rounded-full"></span>
          </button>
          
          <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
            <div className="text-right">
              <div className="text-sm font-medium text-gray-700">Demo User</div>
              <div className="text-xs text-gray-500">demo@fergana.uz</div>
            </div>
            <button className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
              <User className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
