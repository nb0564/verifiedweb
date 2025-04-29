import { useState, useEffect } from 'react'
import NetworkStateLanding from './components/NetworkStateLanding'
import VerificationPage from './components/VerificationPage'
import VerificationResult from './components/VerificationResult'
import NavBar from './components/NavBar'

function App() {
  const [currentPage, setCurrentPage] = useState('landing')
  const [showLanding, setShowLanding] = useState(true)
  const [verificationCode, setVerificationCode] = useState('')
  const [verificationResult, setVerificationResult] = useState(null)
  const [transitionInProgress, setTransitionInProgress] = useState(false)

  // Fake verification data
  const verificationData = {
    'A1B2C3': {
      camera: 'iPhone 15 Pro',
      location: 'San Francisco, CA',
      timestamp: '2025-04-28T14:23:56',
      author: {
        username: 'techpioneer',
        profile: '/profiles/user1.jpg',
        verified: true
      },
      contentPreview: '/content/SF-golden-gate.jpg'
    },
    'X7Y8Z9': {
      camera: 'Samsung Galaxy S24 Ultra',
      location: 'Tokyo, Japan',
      timestamp: '2025-04-29T08:17:32',
      author: {
        username: 'worldtraveler',
        profile: '/profiles/user2.jpg',
        verified: true
      },
      contentPreview: '/content/tokyo-skyline.jpg'
    },
    'P5Q6R7': {
      camera: 'Google Pixel 9',
      location: 'New York City, NY',
      timestamp: '2025-04-27T19:45:12',
      author: {
        username: 'nyc_photographer',
        profile: '/profiles/user3.jpg',
        verified: true
      },
      contentPreview: '/content/nyc-times-square.jpg'
    },
    'D3E4F5': {
      camera: 'Canon EOS R7',
      location: 'Paris, France',
      timestamp: '2025-04-26T13:10:08',
      author: {
        username: 'artlover',
        profile: '/profiles/user4.jpg',
        verified: true
      },
      contentPreview: '/content/paris-eiffel.jpg'
    },
    'G8H9I0': {
      camera: 'Sony Alpha a7 IV',
      location: 'Cape Town, South Africa',
      timestamp: '2025-04-25T11:32:47',
      author: {
        username: 'wildlifepro',
        profile: '/profiles/user5.jpg',
        verified: true
      },
      contentPreview: '/content/cape-town-table-mountain.jpg'
    },
    'J1K2L3': {
      camera: 'DJI Mavic 3 Pro',
      location: 'Rio de Janeiro, Brazil',
      timestamp: '2025-04-24T16:28:19',
      author: {
        username: 'dronepilot',
        profile: '/profiles/user6.jpg',
        verified: true
      },
      contentPreview: '/content/rio-aerial.jpg'
    }
  }

  useEffect(() => {
    if (showLanding) {
      // Start transition after 3 seconds (aligns with NetworkStateLanding's 2s delay + 1s buffer)
      const timer = setTimeout(() => {
        setTransitionInProgress(true)
        
        // After transition animation completes (5.5s total for smoother fade), switch pages
        // This gives enough time for the full matrix animation (3s) and additional fade time
        setTimeout(() => {
          setShowLanding(false)
          setCurrentPage('verify')
          setTransitionInProgress(false)
        }, 5500)
      }, 3000)
      
      return () => clearTimeout(timer)
    }
  }, [showLanding])

  const handleVerify = (code) => {
    const result = verificationData[code]
    setVerificationResult(result)
    setCurrentPage('result')
  }

  const handleBackToSearch = () => {
    setCurrentPage('verify')
    setVerificationResult(null)
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {currentPage !== 'landing' && (
        <NavBar onLogoClick={() => setCurrentPage('verify')} />
      )}
      
      {showLanding && (
        <NetworkStateLanding />
      )}
      
      {!showLanding && currentPage === 'verify' && (
        <VerificationPage 
          onVerify={handleVerify}
          verificationCode={verificationCode}
          setVerificationCode={setVerificationCode}
        />
      )}
      
      {currentPage === 'result' && (
        <VerificationResult 
          result={verificationResult}
          onBackToSearch={handleBackToSearch}
        />
      )}
    </div>
  )
}

export default App