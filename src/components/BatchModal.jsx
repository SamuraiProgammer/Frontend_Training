import React, { useEffect, useState } from 'react'
import { X } from '@phosphor-icons/react'
import BatchCard from './BatchCard'
//import { useRecoilValue } from 'recoil'
//import { dapatom } from '../recoil/DAP'

const BatchModal = ({ isOpen, onClose, courseDetails }) => {
  // const hen = useRecoilValue(dapatom)
  // console.log(hen, 'dta from recoil in batch modal', courseDetails)
  const [courseDetail, setCourseDetail] = useState({})
  const [activeTab, setActiveTab] = useState('online')

  useEffect(() => {
    setCourseDetail(courseDetails)
  }, [courseDetails])

  const handleCloseModal = () => {
    onClose()
  }

  const filteredBatches = courseDetail?.batches?.filter(batch => {
    const mode = (batch?.mode || '').toLowerCase().trim()
    const tab = (activeTab || '').toLowerCase().trim()
    return mode === tab
  })

  useEffect(() => {
    setActiveTab(prev => (prev ? prev.toLowerCase() : 'online'))
  }, [activeTab])

  const tabs = ['online', 'offline', 'hybrid']

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'rgba(26, 26, 46, 0.55)',
        backdropFilter: 'blur(6px)',
        WebkitBackdropFilter: 'blur(6px)',
        padding: '16px',
      }}
    >
      <div
        style={{
          background: '#faf8f5',
          padding: 'clamp(24px, 5vw, 40px)',
          borderRadius: '24px',
          boxShadow: '0 16px 48px rgba(91, 79, 207, 0.18)',
          position: 'relative',
          width: '100%',
          maxWidth: '700px',
          maxHeight: '90vh',
          overflowY: 'auto',
          scrollbarWidth: 'none',
        }}
      >
        {/* Close Button */}
        <button
          onClick={handleCloseModal}
          style={{
            position: 'absolute',
            top: '20px',
            right: '24px',
            background: 'none',
            border: '1px solid #ede9f8',
            color: '#1a1a2e',
            cursor: 'pointer',
            padding: '6px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = '#5b4fcf'
            e.currentTarget.style.color = '#fff'
            e.currentTarget.style.borderColor = '#5b4fcf'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = 'none'
            e.currentTarget.style.color = '#1a1a2e'
            e.currentTarget.style.borderColor = '#ede9f8'
          }}
        >
          <X size={20} />
        </button>

        {/* Title */}
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <p
            style={{
              fontFamily: 'Georgia, serif',
              fontSize: 'clamp(1.4rem, 4vw, 2rem)',
              fontWeight: 700,
              color: '#1a1a2e',
              letterSpacing: '-0.3px',
            }}
          >
            Select Batch
          </p>
        </div>

        {/* Tab Buttons */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '6px',
            marginBottom: '28px',
          }}
        >
          {tabs.map((tab, i) => (
            <React.Fragment key={tab}>
              <button
                onClick={() => setActiveTab(tab)}
                style={{
                  padding: '8px 22px',
                  borderRadius: '50px',
                  border: activeTab === tab ? '2px solid #5b4fcf' : '2px solid #ede9f8',
                  background: activeTab === tab ? '#5b4fcf' : '#fff',
                  color: activeTab === tab ? '#fff' : '#888',
                  fontFamily: 'Arial, sans-serif',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  textTransform: 'capitalize',
                  letterSpacing: '0.3px',
                }}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
              {i < tabs.length - 1 && (
                <div
                  style={{
                    height: '20px',
                    width: '1px',
                    background: '#d0c8f0',
                  }}
                />
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Cards */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '20px',
          }}
        >
          {filteredBatches?.length > 0 ? (
            filteredBatches.map((batch, index) => (
              <BatchCard
                key={index}
                batch={batch}
                courseDetails={courseDetails}
              />
            ))
          ) : (
            <p
              style={{
                textAlign: 'center',
                color: '#888',
                fontFamily: 'Arial, sans-serif',
                fontSize: '0.9rem',
                padding: '32px 0',
              }}
            >
              No batches available for {activeTab}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

export default BatchModal