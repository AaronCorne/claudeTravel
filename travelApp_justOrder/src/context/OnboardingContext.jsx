import { createContext, useContext, useReducer, useCallback } from 'react'

const OnboardingContext = createContext(null)

const TOTAL_STEPS = 6

const initialState = {
  currentStep: 0,
  isComplete: false,
  userData: {
    name: '',
    travelStyle: null,
    interests: [],
    interestPreferences: {},
  },
  stepHistory: [],
}

function onboardingReducer(state, action) {
  switch (action.type) {
    case 'SET_NAME':
      return {
        ...state,
        userData: { ...state.userData, name: action.payload },
      }

    case 'SET_TRAVEL_STYLE':
      return {
        ...state,
        userData: { ...state.userData, travelStyle: action.payload },
      }

    case 'TOGGLE_INTEREST': {
      const interests = state.userData.interests.includes(action.payload)
        ? state.userData.interests.filter((i) => i !== action.payload)
        : [...state.userData.interests, action.payload]
      return {
        ...state,
        userData: { ...state.userData, interests },
      }
    }

    case 'TOGGLE_INTEREST_PREFERENCE': {
      const { interestId, preferenceId } = action.payload
      const currentPrefs = state.userData.interestPreferences[interestId] || []
      const newPrefs = currentPrefs.includes(preferenceId)
        ? currentPrefs.filter((p) => p !== preferenceId)
        : [...currentPrefs, preferenceId]
      return {
        ...state,
        userData: {
          ...state.userData,
          interestPreferences: {
            ...state.userData.interestPreferences,
            [interestId]: newPrefs,
          },
        },
      }
    }

    case 'NEXT_STEP':
      return {
        ...state,
        currentStep: Math.min(state.currentStep + 1, TOTAL_STEPS - 1),
        stepHistory: [...state.stepHistory, state.currentStep],
      }

    case 'PREV_STEP':
      return {
        ...state,
        currentStep: Math.max(state.currentStep - 1, 0),
        stepHistory: state.stepHistory.slice(0, -1),
      }

    case 'GO_TO_STEP':
      return {
        ...state,
        currentStep: action.payload,
      }

    case 'COMPLETE_ONBOARDING':
      return {
        ...state,
        isComplete: true,
      }

    case 'RESET':
      return initialState

    default:
      return state
  }
}

export function OnboardingProvider({ children }) {
  const [state, dispatch] = useReducer(onboardingReducer, initialState)

  const setName = useCallback((name) => {
    dispatch({ type: 'SET_NAME', payload: name })
  }, [])

  const setTravelStyle = useCallback((style) => {
    dispatch({ type: 'SET_TRAVEL_STYLE', payload: style })
  }, [])

  const toggleInterest = useCallback((interestId) => {
    dispatch({ type: 'TOGGLE_INTEREST', payload: interestId })
  }, [])

  const toggleInterestPreference = useCallback((interestId, preferenceId) => {
    dispatch({
      type: 'TOGGLE_INTEREST_PREFERENCE',
      payload: { interestId, preferenceId },
    })
  }, [])

  const nextStep = useCallback(() => {
    dispatch({ type: 'NEXT_STEP' })
  }, [])

  const prevStep = useCallback(() => {
    dispatch({ type: 'PREV_STEP' })
  }, [])

  const goToStep = useCallback((step) => {
    dispatch({ type: 'GO_TO_STEP', payload: step })
  }, [])

  const completeOnboarding = useCallback(() => {
    dispatch({ type: 'COMPLETE_ONBOARDING' })
    // Save to localStorage for persistence
    localStorage.setItem('travelGuide_userData', JSON.stringify(state.userData))
    localStorage.setItem('travelGuide_onboardingComplete', 'true')
  }, [state.userData])

  const reset = useCallback(() => {
    dispatch({ type: 'RESET' })
    localStorage.removeItem('travelGuide_userData')
    localStorage.removeItem('travelGuide_onboardingComplete')
  }, [])

  const value = {
    ...state,
    totalSteps: TOTAL_STEPS,
    setName,
    setTravelStyle,
    toggleInterest,
    toggleInterestPreference,
    nextStep,
    prevStep,
    goToStep,
    completeOnboarding,
    reset,
  }

  return (
    <OnboardingContext.Provider value={value}>
      {children}
    </OnboardingContext.Provider>
  )
}

export function useOnboarding() {
  const context = useContext(OnboardingContext)
  if (!context) {
    throw new Error('useOnboarding must be used within OnboardingProvider')
  }
  return context
}
