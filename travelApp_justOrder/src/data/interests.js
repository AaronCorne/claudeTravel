import {
  TreePine,
  UtensilsCrossed,
  Landmark,
  Building2,
  Palette,
  PartyPopper,
  Train,
  Church,
} from 'lucide-react'

export const INTERESTS = [
  {
    id: 'nature',
    label: 'Nature',
    icon: TreePine,
    color: 'green',
    description: 'Parks, trails, gardens, and natural wonders',
  },
  {
    id: 'food',
    label: 'Food',
    icon: UtensilsCrossed,
    color: 'orange',
    description: 'Local cuisine, restaurants, and food markets',
  },
  {
    id: 'history',
    label: 'History',
    icon: Landmark,
    color: 'amber',
    description: 'Museums, monuments, and historical sites',
  },
  {
    id: 'architecture',
    label: 'Architecture',
    icon: Building2,
    color: 'slate',
    description: 'Buildings, bridges, and urban design',
  },
  {
    id: 'culture',
    label: 'Culture',
    icon: Palette,
    color: 'purple',
    description: 'Art, music, theater, and local traditions',
  },
  {
    id: 'entertainment',
    label: 'Entertainment',
    icon: PartyPopper,
    color: 'pink',
    description: 'Shows, nightlife, and fun activities',
  },
  {
    id: 'transportation',
    label: 'Transportation',
    icon: Train,
    color: 'blue',
    description: 'Iconic trains, stations, and transit systems',
  },
  {
    id: 'religious',
    label: 'Religious Places',
    icon: Church,
    color: 'indigo',
    description: 'Temples, churches, mosques, and sacred sites',
  },
]

export const TRAVEL_STYLES = [
  {
    id: 'solo',
    label: 'Solo',
    emoji: '🚶',
    description: 'Exploring on my own',
  },
  {
    id: 'couple',
    label: 'Couple',
    emoji: '💑',
    description: 'Traveling with my partner',
  },
  {
    id: 'family',
    label: 'Family',
    emoji: '👨‍👩‍👧‍👦',
    description: 'Traveling with kids',
  },
  {
    id: 'group',
    label: 'Group',
    emoji: '👥',
    description: 'With friends or tour group',
  },
]

export const DEEP_DIVE_QUESTIONS = {
  nature: [
    {
      question: "What kind of nature experiences excite you most?",
      options: [
        { id: 'hiking', label: 'Hiking & Trails', emoji: '🥾' },
        { id: 'gardens', label: 'Gardens & Parks', emoji: '🌷' },
        { id: 'wildlife', label: 'Wildlife Watching', emoji: '🦜' },
        { id: 'water', label: 'Lakes & Beaches', emoji: '🏖️' },
      ],
    },
  ],
  food: [
    {
      question: "What's your food adventure style?",
      options: [
        { id: 'street', label: 'Street Food', emoji: '🍜' },
        { id: 'fine', label: 'Fine Dining', emoji: '🍽️' },
        { id: 'local', label: 'Local Favorites', emoji: '🏠' },
        { id: 'markets', label: 'Food Markets', emoji: '🥬' },
      ],
    },
  ],
  history: [
    {
      question: "What period of history fascinates you?",
      options: [
        { id: 'ancient', label: 'Ancient History', emoji: '🏛️' },
        { id: 'medieval', label: 'Medieval Era', emoji: '🏰' },
        { id: 'modern', label: 'Modern History', emoji: '📰' },
        { id: 'all', label: 'All Periods', emoji: '📚' },
      ],
    },
  ],
  architecture: [
    {
      question: "What architectural styles catch your eye?",
      options: [
        { id: 'classical', label: 'Classical & Gothic', emoji: '🏛️' },
        { id: 'modern', label: 'Modern & Contemporary', emoji: '🏙️' },
        { id: 'traditional', label: 'Traditional & Local', emoji: '🏡' },
        { id: 'all', label: 'All Styles', emoji: '✨' },
      ],
    },
  ],
  culture: [
    {
      question: "How do you like to experience local culture?",
      options: [
        { id: 'museums', label: 'Museums & Galleries', emoji: '🖼️' },
        { id: 'performances', label: 'Live Performances', emoji: '🎭' },
        { id: 'festivals', label: 'Festivals & Events', emoji: '🎉' },
        { id: 'local', label: 'Local Neighborhoods', emoji: '🏘️' },
      ],
    },
  ],
  entertainment: [
    {
      question: "What's your idea of entertainment while traveling?",
      options: [
        { id: 'nightlife', label: 'Nightlife & Bars', emoji: '🍸' },
        { id: 'shows', label: 'Shows & Concerts', emoji: '🎤' },
        { id: 'sports', label: 'Sports Events', emoji: '⚽' },
        { id: 'activities', label: 'Fun Activities', emoji: '🎢' },
      ],
    },
  ],
  transportation: [
    {
      question: "What transport experiences interest you?",
      options: [
        { id: 'trains', label: 'Scenic Trains', emoji: '🚂' },
        { id: 'historic', label: 'Historic Stations', emoji: '🚉' },
        { id: 'unique', label: 'Unique Transit', emoji: '🚡' },
        { id: 'all', label: 'All Transport', emoji: '🚀' },
      ],
    },
  ],
  religious: [
    {
      question: "What draws you to religious sites?",
      options: [
        { id: 'architecture', label: 'The Architecture', emoji: '⛪' },
        { id: 'history', label: 'Historical Significance', emoji: '📜' },
        { id: 'spiritual', label: 'Spiritual Experience', emoji: '🙏' },
        { id: 'art', label: 'Religious Art', emoji: '🎨' },
      ],
    },
  ],
}
