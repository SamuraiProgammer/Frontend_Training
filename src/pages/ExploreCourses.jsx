import { useEffect, useState } from 'react'
//import Footer from "./Footer";
//import axios from "axios";
import CourseStructure from '../assets/CourseStructure.svg'
import RightArrow from '../assets/RightArrow.svg'
import DownArrow from '../assets/DownArrow.svg'
import YellowLine from '../assets/YellowLine.svg'
//import { API_URL } from "../constant/APIConstant";
//import Header from "./Header";
import { useNavigate, useParams } from 'react-router-dom'
//import BatchModal from "../components/BatchModal";
//import { useSelector } from "react-redux";
import { Modal } from 'antd'
import { Question } from '@phosphor-icons/react'
import { navigateToFeaturedOfferRegistration } from '../utils/featuredOffer'
//import { useRecoilState, useRecoilValue } from "recoil";
//import { dapatom } from "../recoil/DAP";

const buttonData = [
  { name: 'learning', label: 'Learning' },
  { name: 'skills', label: 'Skills' },
  { name: 'pedagogy', label: 'Pedagogy' },
  { name: 'outcomes', label: 'Outcomes' },
  { name: 'course', label: 'Course Structure' }
]

const courseData = {
  _id: '6937bf9bb48964fa977992aa',
  title: 'Applied Child Psychology: Insights and Interventions',
  subtitle:
    'This course delves into the intricacies of child and adolescent development, exploring key theories, milestones, mental health challenges, and culturally relevant intervention strategies. With a strong focus on the Indian context, participants will gain hands-on experience through practical case studies, therapeutic techniques, and parent-child dynamics to foster holistic mental well-being.',
  duration: '30',
  module: '4',
  price: 3500,
  level: 'Beginner',
  category: 'Child and Adolescent',
  subcategory: 'undergraduate',
  mode: ['Offline', 'Online', 'Hybrid'],
  learning: [
    'Understand developmental theories and milestones across childhood and adolescence.',
    'Identify and address common mental health challenges in children and adolescents.',
    'Develop culturally sensitive therapeutic techniques to engage young clients.',
    'Analyze case studies to formulate effective, ethical intervention strategies.',
    'Strengthen skills in parent-child communication for fostering well-being.'
  ],
  skills: [
    'Critical Analytical Thinking',
    'Empathy-Based Communication',
    'Culturally-Sensitive Interventions',
    'Practical Case Formulation',
    'Therapeutic Application Skills'
  ],
  pedagogy: [
    {
      image:
        'https://corportal.s3.ap-south-1.amazonaws.com/jindalpedagogy/blended-learning.svg',
      title: 'Blended Learning',
      description:
        'A combination of in-person and online formats allows for flexibility while exposing students to diverse methods of delivering therapy.'
    },
    {
      image:
        'https://corportal.s3.ap-south-1.amazonaws.com/jindalpedagogy/roleplays.svg',
      title: 'Role-Playing and Simulations',
      description:
        'Structured role-plays and mock sessions simulate realistic client interactions.'
    },
    {
      image:
        'https://corportal.s3.ap-south-1.amazonaws.com/jindalpedagogy/case-based.svg',
      title: 'Case-Based Learning',
      description:
        'Use of case studies and real-life examples allows students to explore various scenarios.'
    },
    {
      image:
        'https://corportal.s3.ap-south-1.amazonaws.com/jindalpedagogy/experimentallearning.svg',
      title: 'Experiential Learning',
      description:
        'Hands-on practice through real-time consultations, role-playing, and case simulations.'
    },
    {
      image:
        'https://corportal.s3.ap-south-1.amazonaws.com/jindalpedagogy/reflective.svg',
      title: 'Reflective Learning',
      description:
        'Regular debriefs, feedback sessions, and journaling to build self-awareness and critical thinking.'
    },
    {
      image:
        'https://corportal.s3.ap-south-1.amazonaws.com/jindalpedagogy/guided-reading.svg',
      title: 'Guided Reading and Integration',
      description:
        'Incorporating relevant readings and research papers to provide foundational knowledge.'
    },
    {
      image:
        'https://corportal.s3.ap-south-1.amazonaws.com/jindalpedagogy/Feedback.svg',
      title: 'Feedback-Oriented Assessment',
      description:
        'Ongoing assessments and constructive feedback for continuous skill refinement.'
    },
    {
      image:
        'https://corportal.s3.ap-south-1.amazonaws.com/jindalpedagogy/collaborative.svg',
      title: 'Collaborative Learning',
      description:
        'Group discussions, peer reviews, and collaborative activities to foster teamwork.'
    }
  ],
  courseStructure: [
    {
      heading: 'Module 1: Developmental Milestones and Dynamics',
      subheading: [
        'Theories of development (Piaget, Erikson, Vygotsky).',
        'Physical, cognitive, emotional, and social milestones in childhood and adolescence.',
        'Indian family dynamics and their influence on development.'
      ]
    },
    {
      heading: 'Module 2: Mental Health Challenges in Children and Adolescents',
      subheading: [
        'Behavioral issues: ADHD, Conduct Disorder.',
        'Emotional challenges: Anxiety, Depression, Phobias.',
        'The impact of trauma, abuse, and bullying in Indian contexts.'
      ]
    },
    {
      heading: 'Module 3: Therapeutic Techniques and Intervention Strategies',
      subheading: [
        'Introduction to play therapy, art therapy, and narrative therapy.',
        'Building resilience and coping skills.',
        'Parent-child communication in fostering mental well-being.'
      ]
    },
    {
      heading: 'Module 4: Practical Understanding Through Case Studies',
      subheading: [
        "Case formulation: Understanding the child's context and environment.",
        'Risk assessment and ethical considerations in dealing with minors.',
        'Indian cultural and systemic influences on child psychology cases.'
      ]
    }
  ],
  outcome: [
    {
      title: 'In-depth Understanding of Developmental Theories',
      description:
        'Participants will master key theories (Piaget, Erikson, Vygotsky) and their application in understanding childhood and adolescent development.'
    },
    {
      title: 'Holistic Perspective on Developmental Milestones',
      description:
        'Gain insights into physical, cognitive, emotional, and social milestones, emphasizing how Indian family dynamics shape these processes.'
    },
    {
      title: 'Expertise in Mental Health Challenges',
      description:
        'Recognize and address behavioral and emotional challenges such as ADHD, anxiety, depression, and trauma, with a focus on their socio-cultural dimensions.'
    },
    {
      title: 'Proficiency in Therapeutic Techniques',
      description:
        'Develop foundational skills in play therapy, art therapy, and narrative therapy while fostering resilience and effective parent-child communication.'
    },
    {
      title: 'Practical Application of Case Study Analysis',
      description:
        'Learn to formulate cases with ethical sensitivity, perform risk assessments, and incorporate Indian cultural and systemic factors into therapeutic interventions.'
    },
    {
      title: 'Critical and Empathetic Problem-Solving',
      description:
        'Build problem-solving skills that integrate critical thinking with empathy, ensuring the best outcomes for clients in therapeutic settings cases with analytical rigor and cultural empathy.'
    }
  ],
  batchType: 'Weekdays/Weekend',
  batches: [],
  elective: [],
  instructors: [
    {
      _id: '67b9a5ebd17ac15a56892b42',
      name: 'Anwesha Choudhury ',
      imageUrl:
        'https://corportal.s3.ap-south-1.amazonaws.com/upload/profilePic/e47c7164754c25a4baced7889ce88d22',
      degree: 'Masters in Clinical Psychology ',
      specialization:
        'Counseling Psychology, Clinical Psychology, I/O Psychology ',
      experience:
        '1.5 years of experience as a trainer. \nTrained more than 500+ students'
    }
  ],
  isActive: true,
  createdAt: '2025-12-09T06:20:11.737Z',
  updatedAt: '2025-12-09T06:20:11.737Z',
  images: {
    Courseimage:
      'https://corportal.s3.ap-south-1.amazonaws.com/upload/CourseStructure/Course1.png',
    Outcomeimage:
      'https://corportal.s3.ap-south-1.amazonaws.com/upload/Outcomes/Outcome4.svg'
  },
  courseImageUrl:
    'https://corportal.s3.ap-south-1.amazonaws.com/upload/profilePic/83fc1f8f452fe5890db1b4790e0b43ad',
  university: '6776287ec8d0d16564dcba7d',
  type: 'internships',
  period: '1',
  courseType: 'live',
  batchIds: []
}

const ExploreCourses = () => {
  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5002/api'
  const navigate = useNavigate()
  const [selectedSection, setSelectedSection] = useState('learning')
  const [openSection, setOpenSection] = useState(0)
  const [openSectionOutcome, setOpenSectionOutcome] = useState(0)
  const [openSectionElective, setOpenSectionElective] = useState(0)
  const [details, setDetails] = useState(courseData)
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false)
  const [currentMethod, setCurrentMethod] = useState(null)

  const toggleSectionElective = index => {
    setOpenSectionElective(openSectionElective === index ? null : index)
  }

  const { id } = useParams()
  //const courseData = coursedata.filter((data) => data._id===id)
  //console.log(courseData[0])

  useEffect(() => {
    if (!id) return
    const fetchData = async () => {
      console.log('Running on page load')

      try {
        const response = await fetch(
          `${apiUrl}/course-detail/${id}`
        )
        const data = await response.json()
        const courseInfo = data?.data ?? data
        console.log(courseInfo)
        setDetails(courseInfo)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [apiUrl, id])

  //const hen=useRecoilValue(dapatom);
  //let subcategory = hen?.selectedCourse?.subcategory;
  let subcategory = 'Undergraduate'
  if (subcategory) {
    subcategory = subcategory.charAt(0).toUpperCase() + subcategory.slice(1)
  }
  console.log(subcategory, 'dta from recoil')

  const showModal = method => {
    setCurrentMethod(method)
    setIsInfoModalOpen(true)
  }

  const handleCancel = () => {
    setIsInfoModalOpen(false)
    setCurrentMethod(null)
  }

  const toggleSection = index => {
    setOpenSection(openSection === index ? null : index)
  }

  const toggleSectionOutcome = index => {
    setOpenSectionOutcome(openSectionOutcome === index ? null : index)
  }

  const handleButtonClick = section => {
    setSelectedSection(section)
    const element = document.getElementById(section)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleEnroll = async () => {
    await navigateToFeaturedOfferRegistration({
      navigate,
      sourceCourseTitle: details?.title || '',
      fallbackHeading: details?.title || '2 Hour Preview of the Training',
    })
  }

  // ── Shared style tokens ──────────────────────────────────────────────────
  const purple = '#5b4fcf'
  const navy = '#1a1a2e'
  const yellow = '#faad14'
  const bg = '#faf8f5'
  const border = '#fff'
  const gray = '#666'

  const courseStructureSections =
    details?.courseStructure?.map(item => {
      if (item?.structure) {
        return {
          title: item?.title || '',
          description: item?.description || '',
          sections: item.structure
        }
      }

      return {
        title: item?.heading || '',
        description: '',
        sections: [
          {
            heading: item?.heading || '',
            subheading: item?.subheading || []
          }
        ]
      }
    }) || []

  return (
    <>
      {/* ── Hero ── */}
      <div
        style={{
          background: 'linear-gradient(135deg, #f0ebff 0%, #e8f0ff 100%)',
          paddingTop: '40px',
          paddingBottom: '40px',
          position: 'relative',
          paddingLeft: 'clamp(20px, 7vw, 80px)',
          paddingRight: 'clamp(20px, 7vw, 80px)'
        }}
      >
        <div
          style={{
            width: '100%',
            maxWidth: '900px',
            paddingTop: 'clamp(32px, 8vw, 80px)',
            paddingBottom: '56px'
          }}
        >
          <h1
            style={{
              color: purple,
              fontSize: 'clamp(1.6rem, 5vw, 2.5rem)',
              fontWeight: 500,
              lineHeight: 1.15,
              letterSpacing: '-0.5px'
            }}
          >
            {details?.title}
          </h1>

          {/* Enroll button — desktop */}
          <div className='my-8 sm:flex hidden'>
            <button
              onClick={handleEnroll}
              style={{
                background: yellow,
                color: navy,
                padding: '14px 36px',
                borderRadius: '50px',
                border: 'none',

                fontWeight: 700,
                fontSize: '0.9rem',
                letterSpacing: '0.5px',
                textTransform: 'uppercase',
                cursor: 'pointer',
                boxShadow: '0 4px 14px rgba(240,192,64,0.4)',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={e =>
                (e.currentTarget.style.transform = 'translateY(-2px)')
              }
              onMouseLeave={e =>
                (e.currentTarget.style.transform = 'translateY(0)')
              }
            >
              Enroll Now
            </button>
          </div>

          <div style={{ marginTop: '24px', maxWidth: '720px' }}>
            <h6
              style={{
                color: gray,
                fontSize: 'clamp(0.85rem, 2vw, 1rem)',
                fontWeight: 400,
                lineHeight: 1.7
              }}
            >
              {details?.subtitle}
            </h6>
          </div>

          {/* Enroll button — mobile */}
          <div className='my-8 sm:hidden flex'>
            <button
              onClick={handleEnroll}
              style={{
                background: yellow,
                color: navy,
                padding: '14px 36px',
                borderRadius: '50px',
                border: 'none',

                fontWeight: 700,
                fontSize: '0.9rem',
                letterSpacing: '0.5px',
                textTransform: 'uppercase',
                cursor: 'pointer',
                boxShadow: '0 4px 14px rgba(240,192,64,0.4)'
              }}
            >
              Enroll Now
            </button>
          </div>
        </div>

        {/* ── Info Bar ── */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-evenly',
            alignItems: 'center',
            position: 'absolute',
            bottom: 0,
            left: '12%',
            transform: 'translateY(50%)',
            width: '75%',
            minHeight: '80px',
            padding: '20px 32px',
            background: '#fff',
            borderRadius: '20px',
            border: `1px solid ${border}`,
            boxShadow: '0 4px 24px rgba(91, 79, 207, 0.12)',
            gap: '16px'
          }}
        >
          {details?.university !== '677661a47b6cc38356bc6ad3' && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                borderRight: `1px solid ${border}`,
                paddingRight: '24px'
              }}
            >
              <p
                style={{
                  fontSize: 'clamp(1rem, 2.5vw, 1.6rem)',
                  fontWeight: 800,
                  color: yellow
                }}
              >
                {details?.duration > 8
                  ? `${details?.duration} Hours`
                  : details?.duration === undefined
                  ? '0 Hours'
                  : `${details?.duration} Month`}
                <span
                  style={{
                    display: 'block',

                    fontWeight: 400,
                    fontSize: 'clamp(0.7rem, 1.5vw, 0.85rem)',
                    color: gray
                  }}
                >
                  Intensive Offline Paid Training
                </span>
              </p>
            </div>
          )}

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              borderRight: `1px solid ${border}`,
              paddingRight: '24px'
            }}
          >
            <p
              style={{
                fontSize: 'clamp(1rem, 2.5vw, 1.6rem)',
                fontWeight: 800,
                color: yellow
              }}
            >
              Starting @ {details?.price}/-
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center' }}>
            <p
              style={{
                fontSize: 'clamp(1rem, 2.5vw, 1.6rem)',
                fontWeight: 800,
                color: yellow
              }}
            >
              For{' '}
              {details?.subcategory
                ? details.subcategory.charAt(0).toUpperCase() +
                  details.subcategory.slice(1)
                : ''}{' '}
              Students
            </p>
          </div>
        </div>
      </div>

      {/* ── Section Nav Pills ── */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          width: '100%',
          justifyContent: 'flex-start',
          alignItems: 'center',
          gap: '10px',
          marginTop: 'clamp(180px, 25vw, 120px)',
          padding: '0 clamp(16px, 7vw, 80px)'
        }}
      >
        {buttonData.map(button => (
          <button
            key={button.name}
            style={{
              padding: '8px 20px',
              height: '40px',

              fontSize: '0.82rem',
              fontWeight: 600,
              borderRadius: '50px',
              border:
                selectedSection === button.name
                  ? `2px solid ${yellow}`
                  : `2px solid ${yellow}`,
              background: selectedSection === button.name ? yellow : '#fff',
              color: selectedSection === button.name ? '#000' : '#000',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              letterSpacing: '0.3px'
            }}
            onClick={() => handleButtonClick(button.name)}
          >
            {button.label}
          </button>
        ))}
      </div>

      {/* ── Main Content ── */}
      <div
        style={{
          paddingLeft: 'clamp(20px, 7vw, 80px)',
          paddingRight: 'clamp(20px, 7vw, 40px)',
          marginTop: '48px'
        }}
      >
        {/* Learning */}
        <div id='learning' style={{ marginTop: '40px', position: 'relative' }}>
          <h2
            style={{
              fontSize: 'clamp(1.5rem, 4vw, 2.8rem)',
              color: yellow,
              marginBottom: '28px',
              position: 'relative',
              width: 'fit-content'
            }}
          >
            What will students learn
            <img
              src={YellowLine}
              alt=''
              style={{ position: 'absolute', right: '-16px', bottom: '-4px' }}
            />
          </h2>
          <p
            style={{
              fontSize: 'clamp(0.85rem, 2vw, 1rem)',
              color: gray,
              marginBottom: '16px'
            }}
          >
            By the end of the course, students will be able to:
          </p>
          <ul
            style={{
              listStyle: 'disc',
              paddingLeft: '24px',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px'
            }}
          >
            {details?.learning?.map((item, index) => (
              <li
                key={index}
                style={{
                  fontSize: 'clamp(0.85rem, 2vw, 1rem)',
                  color: navy,
                  lineHeight: 1.6
                }}
              >
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Skills */}
        <div id='skills' style={{ marginTop: '56px' }}>
          <h2
            style={{
              fontSize: 'clamp(1.5rem, 4vw, 2.8rem)',
              color: yellow,
              marginBottom: '28px',
              position: 'relative',
              width: 'fit-content'
            }}
          >
            Skills
            <img
              src={YellowLine}
              alt=''
              style={{ position: 'absolute', right: '-16px', bottom: '-4px' }}
            />
          </h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {details?.skills?.map((skill, index) => (
              <span
                key={index}
                style={{
                  display: 'inline-block',
                  background: '#fff',
                  border: `1px solid ${border}`,
                  color: '#000',

                  fontSize: '0.82rem',
                  fontWeight: 600,
                  padding: '8px 18px',
                  borderRadius: '50px',
                  boxShadow: '0 1px 6px rgba(91,79,207,0.06)'
                }}
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Pedagogy */}
        <div style={{ marginTop: '56px' }}>
          <h2
            style={{
              fontSize: 'clamp(1.5rem, 4vw, 2.8rem)',
              color: yellow,
              marginBottom: '28px',
              position: 'relative',
              width: 'fit-content'
            }}
          >
            Pedagogy:
            <img
              src={YellowLine}
              alt=''
              style={{ position: 'absolute', right: '-16px', bottom: '-8px' }}
            />
          </h2>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
              marginBottom: '32px'
            }}
            id='pedagogy'
          >
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                background: '#fff',
                borderRadius: '20px',
                border: `1px solid ${border}`,
                boxShadow: '0 2px 12px rgba(91,79,207,0.07)',
                overflow: 'hidden'
              }}
            >
              {details?.pedagogy?.map(method => (
                <div
                  key={method.title}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '16px',
                    gap: '10px',
                    width: '25%',
                    minWidth: '180px',
                    justifyContent: 'flex-start',
                    flex: '1 1 180px'
                  }}
                >
                  <img
                    src={method?.image}
                    alt={method.title}
                    style={{ width: '48px', height: '48px', flexShrink: 0 }}
                  />
                  <h4
                    style={{
                      fontWeight: 700,
                      fontSize: '0.82rem',
                      color: navy,
                      flex: 1,
                      lineHeight: 1.4
                    }}
                  >
                    {method.title}
                  </h4>
                  <div>
                    <Question
                      size={20}
                      onClick={() => showModal(method)}
                      style={{
                        cursor: 'pointer',
                        color: purple,
                        flexShrink: 0
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <Modal
              title={
                <span style={{ color: navy, fontSize: '1.1rem' }}>
                  {currentMethod?.title}
                </span>
              }
              open={isInfoModalOpen}
              onCancel={handleCancel}
              footer={null}
              closeIcon={
                <span
                  onClick={handleCancel}
                  style={{ fontSize: '1rem', color: gray, cursor: 'pointer' }}
                >
                  &#10005;
                </span>
              }
              bodyStyle={{
                backgroundColor: bg,
                borderRadius: '12px',
                padding: '20px',
                color: gray,
                fontSize: '0.9rem',
                lineHeight: '1.7'
              }}
              centered
            >
              <p style={{ color: gray, lineHeight: 1.7 }}>
                {currentMethod?.description}
              </p>
            </Modal>
          </div>
        </div>

        {/* Course Structure */}
        <div
          style={{
            marginTop: '56px',
            width: '100%'
          }}
        >
          <div style={{ marginBottom: '32px' }}>
            <h2
              style={{
                fontSize: 'clamp(1.4rem, 3.5vw, 2.4rem)',
                color: yellow,
                marginBottom: '28px',
                position: 'relative',
                width: 'fit-content'
              }}
            >
              Course Structure
              <img
                src={YellowLine}
                alt=''
                style={{ position: 'absolute', right: '-16px', bottom: '-4px' }}
              />
            </h2>
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '24px',
                justifyContent: 'space-between'
              }}
            >
              {courseStructureSections.map((section, index) => (
                <div
                  key={index}
                  style={{
                    flex: '1 1 calc(50% - 12px)',
                    minWidth: '280px',
                    background: '#fff',
                    borderRadius: '24px',
                    border: `1px solid ${border}`,
                    boxShadow: '0 14px 40px rgba(91,79,207,0.08)',
                    padding: '24px'
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '14px',
                      marginBottom: '20px'
                    }}
                  >
                    <div
                      style={{
                        color: '#000',
                        width: '36px',
                        height: '36px',
                        background: yellow,
                        fontWeight: 700,
                        fontSize: '0.85rem',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: '12px',
                        flexShrink: 0
                      }}
                    >
                      {`0${index + 1}`}
                    </div>
                    <div style={{ flex: 1 }}>
                      <h4
                        style={{
                          fontSize: 'clamp(1rem, 2vw, 1.2rem)',
                          color: navy,
                          fontWeight: 700,
                          lineHeight: 1.4,
                          marginBottom: section.description ? '10px' : '0'
                        }}
                      >
                        {section.title}
                      </h4>
                      {section.description && (
                        <p
                          style={{
                            color: gray,
                            fontSize: '0.95rem',
                            lineHeight: 1.7
                          }}
                        >
                          {section.description}
                        </p>
                      )}
                    </div>
                  </div>

                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '18px'
                    }}
                  >
                    {section.sections.map((item, itemIndex) => (
                      <div key={itemIndex}>
                        <h5
                          style={{
                            color: navy,
                            fontSize: '0.95rem',
                            fontWeight: 600,
                            marginBottom: '10px',
                            lineHeight: 1.4
                          }}
                        >
                          {item.heading}
                        </h5>
                        <ul
                          style={{
                            listStyle: 'disc',
                            paddingLeft: '24px',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '8px'
                          }}
                        >
                          {item?.subheading?.map((point, subIndex) => (
                            <li
                              key={subIndex}
                              style={{
                                color: gray,
                                fontSize: '0.9rem',
                                lineHeight: 1.7
                              }}
                            >
                              {point}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Electives */}
        <div>
          {details?.electives?.length > 0 ? (
            <>
              <p
                style={{
                  fontWeight: 700,
                  fontSize: 'clamp(1.2rem, 3vw, 1.8rem)',
                  color: navy,
                  marginBottom: '20px',
                  marginTop: '48px'
                }}
              >
                {details?.category === 'Business side of therapy'
                  ? 'Counselling & Clinical Skills'
                  : 'Electives'}
              </p>
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  justifyContent: 'space-between',
                  gap: '16px'
                }}
              >
                {details?.electives?.map((course, index) => (
                  <div
                    key={index}
                    style={{
                      marginBottom: '32px',
                      paddingBottom: '20px',
                      width: 'clamp(300px, 45%, 100%)'
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        cursor: 'pointer',
                        marginBottom: '12px',
                        width: '100%'
                      }}
                      onClick={() => toggleSectionElective(index)}
                    >
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '12px'
                        }}
                      >
                        <div
                          style={{
                            color: purple,
                            width: '36px',
                            height: '36px',
                            background: yellow,
                            fontWeight: 700,
                            fontSize: '0.85rem',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: '8px',
                            flexShrink: 0
                          }}
                        >
                          {`0${index + 1}`}
                        </div>
                        <h4
                          style={{
                            fontSize: 'clamp(0.85rem, 2vw, 1rem)',
                            color: navy,
                            fontWeight: 600,
                            lineHeight: 1.4
                          }}
                        >
                          {course?.heading}
                        </h4>
                      </div>
                      <div style={{ marginRight: '8px' }}>
                        {openSectionElective === index ? (
                          <img src={DownArrow} alt='collapse' />
                        ) : (
                          <img src={RightArrow} alt='expand' />
                        )}
                      </div>
                    </div>
                    {openSectionElective === index && (
                      <div style={{ paddingLeft: '48px' }}>
                        <p
                          style={{
                            color: gray,
                            fontSize: '0.9rem',
                            marginBottom: '12px',
                            lineHeight: 1.6
                          }}
                        >
                          {course?.subheading}
                        </p>
                        <h2
                          style={{
                            color: gray,
                            fontSize: '0.9rem',
                            marginBottom: '8px'
                          }}
                        >
                          {details?.category === 'Business side of therapy'
                            ? ''
                            : 'Takeaway'}
                        </h2>
                        <ul
                          style={{
                            listStyle: 'disc',
                            paddingLeft: '24px',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '6px'
                          }}
                        >
                          {course?.points.map((point, i) => (
                            <li
                              key={i}
                              style={{
                                color: gray,
                                fontSize: '0.87rem',
                                lineHeight: 1.6
                              }}
                            >
                              {point}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </>
          ) : null}
        </div>

        {/* Outcomes */}
        <div
          style={{
            marginBottom: '56px',
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            width: '100%',
            gap: '32px'
          }}
          id='outcomes'
        >
          <div className='w-full sm:w-1/2 sm:flex justify-center items-center hidden'>
            <img
              style={{ width: '57rem', height: '35rem' }}
              src={CourseStructure}
              alt=''
            />
          </div>

          <div style={{ flex: '1 1 320px' }}>
            <h2
              className='font-nuninto sm:block hidden w-fit relative mb-[2.5rem] sm:mb-[3.5rem]'
              style={{
                color: yellow,
                fontSize: 'clamp(1.5rem, 5vw, 3rem)',
                position: 'relative',
                width: 'fit-content',
                marginBottom: '28px'
              }}
            >
              Outcomes:
              <img
                src={YellowLine}
                alt=''
                style={{ position: 'absolute', right: '-16px', bottom: 0 }}
              />
            </h2>

            <ul
              style={{
                listStyle: 'disc',
                paddingLeft: '24px',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px'
              }}
            >
              {details?.outcome &&
              details?.outcome.length > 0 &&
              details?.outcome[0]?.heading
                ? details?.outcome.map((outcome, index) => (
                    <div
                      key={index}
                      style={{
                        borderBottom: `1px solid ${border}`,
                        marginBottom: '32px',
                        paddingBottom: '20px'
                      }}
                    >
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          cursor: 'pointer',
                          marginBottom: '12px'
                        }}
                        onClick={() => toggleSectionOutcome(index)}
                      >
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          <div style={{ marginLeft: '12px' }}>
                            <h4
                              style={{
                                fontSize: 'clamp(0.9rem, 2vw, 1.1rem)',
                                fontWeight: 600,
                                color: navy,
                                lineHeight: 1.4
                              }}
                            >
                              {outcome?.heading}
                            </h4>
                          </div>
                        </div>
                        <div style={{ marginRight: '12px' }}>
                          <span
                            style={{
                              color: yellow,
                              fontWeight: 700,
                              fontSize: '1.2rem'
                            }}
                          >
                            {openSectionOutcome === index ? '−' : '+'}
                          </span>
                        </div>
                      </div>
                      {openSectionOutcome === index && (
                        <div style={{ paddingLeft: '12px', marginTop: '8px' }}>
                          {outcome.titles.map((point, i) => (
                            <li
                              key={i}
                              style={{
                                marginBottom: '12px',
                                listStyle: 'disc',
                                marginLeft: '24px'
                              }}
                            >
                              <span
                                style={{
                                  fontSize: '0.95rem',
                                  fontWeight: 600,
                                  color: navy
                                }}
                              >
                                {point.title}:{' '}
                              </span>
                              <span
                                style={{
                                  fontSize: '0.87rem',
                                  fontWeight: 400,
                                  color: gray
                                }}
                              >
                                {point.description}
                              </span>
                            </li>
                          ))}
                        </div>
                      )}
                    </div>
                  ))
                : details?.outcome?.map((outcome, index) => (
                    <li key={index} style={{ marginBottom: '12px' }}>
                      <span
                        style={{
                          fontSize: '0.95rem',
                          fontWeight: 600,
                          color: navy
                        }}
                      >
                        {outcome.title}:{' '}
                      </span>
                      <span
                        style={{
                          fontSize: '0.87rem',
                          fontWeight: 400,
                          color: gray,
                          lineHeight: 1.6
                        }}
                      >
                        {outcome.description}
                      </span>
                    </li>
                  ))}
            </ul>
          </div>
        </div>
      </div>

      {/* ── Mode & Batches Bar ── */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          padding: '16px 24px',
          justifyContent: 'space-evenly',
          width: '95%',
          maxWidth: '89rem',
          margin: '0 auto 32px',
          border: `1px solid ${border}`,
          borderRadius: '20px',
          background: '#fff',
          boxShadow: '0 2px 12px rgba(91,79,207,0.07)',
          gap: '16px'
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            flexWrap: 'wrap'
          }}
        >
          <span
            style={{
              fontWeight: 800,
              fontSize: 'clamp(1rem, 2.5vw, 1.5rem)',
              color: yellow
            }}
          >
            MODE
          </span>
          <label style={{ display: 'flex', alignItems: 'center' }}>
            <span
              style={{
                color: yellow,
                fontSize: 'clamp(0.82rem, 2vw, 1rem)',
                fontWeight: 400
              }}
            >
              {details?.mode?.map(mode => mode).join(' / ')}
            </span>
          </label>
          <span
            style={{
              fontWeight: 800,
              fontSize: 'clamp(1rem, 2.5vw, 1.5rem)',
              color: yellow
            }}
          >
            BATCHES
          </span>
          <span
            style={{
              color: yellow,
              fontSize: 'clamp(0.82rem, 2vw, 1rem)',
              fontWeight: 400
            }}
          >
            {details?.batchType}
          </span>
        </div>
      </div>
    </>
  )
}

export default ExploreCourses
