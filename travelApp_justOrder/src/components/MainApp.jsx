import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  MapPin,
  Compass,
  MessageCircle,
  Settings,
  RefreshCw,
  Mic,
  Send,
  Menu,
  X,
} from 'lucide-react'
import { INTERESTS } from '../data/interests'
import Button from './ui/Button'
import Card from './ui/Card'

export default function MainApp({ onResetOnboarding }) {
  const [userData, setUserData] = useState(null)
  const [activeTab, setActiveTab] = useState('explore')
  const [message, setMessage] = useState('')
  const [showSettings, setShowSettings] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem('travelGuide_userData')
    if (saved) {
      setUserData(JSON.parse(saved))
    }
  }, [])

  const handleReset = () => {
    localStorage.removeItem('travelGuide_userData')
    localStorage.removeItem('travelGuide_onboardingComplete')
    onResetOnboarding()
  }

  const userInterests = userData?.interests?.map((id) =>
    INTERESTS.find((i) => i.id === id)
  ).filter(Boolean) || []

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-accent-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center">
              <Compass className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-gray-900">TravelGuide</h1>
              <p className="text-xs text-gray-500">
                Hey, {userData?.name || 'Traveler'}!
              </p>
            </div>
          </div>
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            {showSettings ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      {/* Settings dropdown */}
      {showSettings && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-16 right-4 z-50 bg-white rounded-xl shadow-xl border border-gray-200 p-4 min-w-[200px]"
        >
          <button
            onClick={handleReset}
            className="flex items-center gap-2 w-full px-3 py-2 text-left text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <RefreshCw size={16} />
            Reset Onboarding
          </button>
        </motion.div>
      )}

      {/* Main content */}
      <main className="max-w-4xl mx-auto px-4 py-6">
        {/* Tab navigation */}
        <div className="flex gap-2 mb-6">
          {[
            { id: 'explore', label: 'Explore', icon: MapPin },
            { id: 'ask', label: 'Ask Guide', icon: MessageCircle },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all
                ${activeTab === tab.id
                  ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/30'
                  : 'bg-white text-gray-600 hover:bg-gray-50'
                }
              `}
            >
              <tab.icon size={18} />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Explore tab */}
        {activeTab === 'explore' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            {/* Location placeholder */}
            <Card className="text-center py-12">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary-100 flex items-center justify-center">
                <MapPin className="w-8 h-8 text-primary-500" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Enable Location
              </h2>
              <p className="text-gray-500 mb-6 max-w-sm mx-auto">
                Allow location access to discover interesting places around you
              </p>
              <Button>
                <MapPin size={18} />
                Enable Location
              </Button>
            </Card>

            {/* Interests summary */}
            <Card>
              <h3 className="font-semibold text-gray-900 mb-4">
                Your Interests
              </h3>
              <div className="flex flex-wrap gap-2">
                {userInterests.map((interest) => {
                  const Icon = interest.icon
                  return (
                    <span
                      key={interest.id}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-primary-50 text-primary-700 rounded-full text-sm"
                    >
                      <Icon size={14} />
                      {interest.label}
                    </span>
                  )
                })}
              </div>
            </Card>

            {/* Placeholder POIs */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">
                Nearby Places (Demo)
              </h3>
              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  {
                    name: 'Historic Town Center',
                    category: 'History',
                    distance: '0.3 km',
                  },
                  {
                    name: 'Local Food Market',
                    category: 'Food',
                    distance: '0.5 km',
                  },
                  {
                    name: 'Central Park',
                    category: 'Nature',
                    distance: '0.8 km',
                  },
                  {
                    name: 'Art Museum',
                    category: 'Culture',
                    distance: '1.2 km',
                  },
                ].map((poi, index) => (
                  <Card key={index} hover className="cursor-pointer">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-medium text-gray-900">{poi.name}</h4>
                        <p className="text-sm text-gray-500">{poi.category}</p>
                      </div>
                      <span className="text-xs bg-gray-100 px-2 py-1 rounded-full text-gray-600">
                        {poi.distance}
                      </span>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Ask Guide tab */}
        {activeTab === 'ask' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-4"
          >
            <Card className="min-h-[400px] flex flex-col">
              {/* Chat area */}
              <div className="flex-1 space-y-4 mb-4">
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center flex-shrink-0">
                    <Compass size={16} className="text-white" />
                  </div>
                  <div className="bg-gray-100 rounded-2xl rounded-tl-sm px-4 py-3 max-w-[80%]">
                    <p className="text-gray-700">
                      Hi {userData?.name}! I'm your personal guide. Ask me
                      anything about the places around you, local tips, or travel
                      recommendations!
                    </p>
                  </div>
                </div>

                {/* Suggestion chips */}
                <div className="flex flex-wrap gap-2 pl-11">
                  {[
                    "What's nearby?",
                    'Best local food?',
                    'Hidden gems',
                    'Walking routes',
                  ].map((suggestion) => (
                    <button
                      key={suggestion}
                      onClick={() => setMessage(suggestion)}
                      className="px-3 py-1.5 bg-white border border-gray-200 rounded-full text-sm text-gray-600 hover:border-primary-300 hover:bg-primary-50 transition-colors"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>

              {/* Input area */}
              <div className="flex gap-2 pt-4 border-t border-gray-100">
                <button className="p-3 hover:bg-gray-100 rounded-xl transition-colors">
                  <Mic size={20} className="text-gray-500" />
                </button>
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Ask me anything..."
                  className="flex-1 px-4 py-3 bg-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
                <Button disabled={!message.trim()}>
                  <Send size={18} />
                </Button>
              </div>
            </Card>

            <p className="text-center text-sm text-gray-500">
              Voice and AI responses will be enabled with API integration
            </p>
          </motion.div>
        )}
      </main>

      {/* Bottom navigation (mobile) */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-3 sm:hidden">
        <div className="flex justify-around">
          {[
            { id: 'explore', label: 'Explore', icon: MapPin },
            { id: 'ask', label: 'Ask', icon: MessageCircle },
            { id: 'settings', label: 'Settings', icon: Settings },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => {
                if (item.id === 'settings') {
                  setShowSettings(!showSettings)
                } else {
                  setActiveTab(item.id)
                }
              }}
              className={`
                flex flex-col items-center gap-1 px-4 py-1
                ${(activeTab === item.id || (item.id === 'settings' && showSettings))
                  ? 'text-primary-500'
                  : 'text-gray-500'
                }
              `}
            >
              <item.icon size={20} />
              <span className="text-xs">{item.label}</span>
            </button>
          ))}
        </div>
      </nav>
    </div>
  )
}
