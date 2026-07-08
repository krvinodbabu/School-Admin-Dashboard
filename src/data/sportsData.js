/**
 * Dummy sports activities data — Indoor & Outdoor with class-wise ranks.
 * Edit rankings arrays to update podium positions and points.
 */

export const sportsSummary = {
  indoorEvents: 6,
  outdoorEvents: 7,
  participatingClasses: 9,
  sportsDayDate: '2026-08-05',
}

/** Indoor sports activities offered at the school */
export const indoorSports = [
  { id: 1, name: 'Chess', venue: 'Activity Room', coach: 'Mr. Amit Joshi', participants: 48 },
  { id: 2, name: 'Table Tennis', venue: 'Sports Hall', coach: 'Mr. Sanjay Pillai', participants: 36 },
  { id: 3, name: 'Carrom', venue: 'Activity Room', coach: 'Mrs. Pooja Menon', participants: 42 },
  { id: 4, name: 'Badminton (Indoor)', venue: 'Indoor Stadium', coach: 'Mr. Sanjay Pillai', participants: 40 },
  { id: 5, name: 'Yoga & Fitness', venue: 'Multipurpose Hall', coach: 'Mrs. Kavita Rao', participants: 55 },
  { id: 6, name: 'Quiz & Debate', venue: 'Auditorium', coach: 'Mrs. Sunita Verma', participants: 60 },
]

/** Outdoor sports activities offered at the school */
export const outdoorSports = [
  { id: 1, name: 'Cricket', venue: 'Main Ground', coach: 'Mr. Sanjay Pillai', participants: 66 },
  { id: 2, name: 'Football', venue: 'Football Field', coach: 'Mr. Deepak Shah', participants: 55 },
  { id: 3, name: 'Athletics (Track)', venue: 'Running Track', coach: 'Mr. Sanjay Pillai', participants: 80 },
  { id: 4, name: 'Basketball', venue: 'Outdoor Court', coach: 'Mr. Sanjay Pillai', participants: 44 },
  { id: 5, name: 'Volleyball', venue: 'Outdoor Court', coach: 'Mr. Deepak Shah', participants: 38 },
  { id: 6, name: 'Kabaddi', venue: 'Main Ground', coach: 'Mr. Amit Joshi', participants: 50 },
  { id: 7, name: 'Kho-Kho', venue: 'Secondary Ground', coach: 'Mrs. Pooja Menon', participants: 45 },
]

/**
 * Overall class-wise championship rankings by category.
 * Points are cumulative across all events in that category.
 */
export const classRankings = {
  indoor: [
    { rank: 1, class: '10-A', totalPoints: 420, gold: 4, silver: 3, bronze: 2, topSport: 'Chess' },
    { rank: 2, class: '9-B', totalPoints: 385, gold: 3, silver: 4, bronze: 1, topSport: 'Table Tennis' },
    { rank: 3, class: '8-A', totalPoints: 340, gold: 2, silver: 2, bronze: 4, topSport: 'Badminton' },
    { rank: 4, class: '8-B', totalPoints: 310, gold: 2, silver: 1, bronze: 3, topSport: 'Carrom' },
    { rank: 5, class: '7-A', totalPoints: 275, gold: 1, silver: 3, bronze: 2, topSport: 'Quiz & Debate' },
    { rank: 6, class: '9-A', totalPoints: 250, gold: 1, silver: 2, bronze: 2, topSport: 'Yoga & Fitness' },
    { rank: 7, class: '8-C', totalPoints: 210, gold: 0, silver: 2, bronze: 3, topSport: 'Chess' },
    { rank: 8, class: '6-B', totalPoints: 180, gold: 0, silver: 1, bronze: 2, topSport: 'Carrom' },
    { rank: 9, class: '6-A', totalPoints: 155, gold: 0, silver: 1, bronze: 1, topSport: 'Table Tennis' },
  ],
  outdoor: [
    { rank: 1, class: '10-A', totalPoints: 510, gold: 5, silver: 2, bronze: 1, topSport: 'Cricket' },
    { rank: 2, class: '9-B', totalPoints: 465, gold: 3, silver: 4, bronze: 2, topSport: 'Football' },
    { rank: 3, class: '8-A', totalPoints: 430, gold: 3, silver: 2, bronze: 3, topSport: 'Athletics' },
    { rank: 4, class: '9-A', totalPoints: 390, gold: 2, silver: 3, bronze: 2, topSport: 'Basketball' },
    { rank: 5, class: '7-B', totalPoints: 355, gold: 2, silver: 2, bronze: 1, topSport: 'Kabaddi' },
    { rank: 6, class: '8-C', totalPoints: 320, gold: 1, silver: 3, bronze: 2, topSport: 'Volleyball' },
    { rank: 7, class: '7-A', totalPoints: 285, gold: 1, silver: 1, bronze: 3, topSport: 'Kho-Kho' },
    { rank: 8, class: '6-A', totalPoints: 240, gold: 0, silver: 2, bronze: 2, topSport: 'Athletics' },
    { rank: 9, class: '6-B', totalPoints: 195, gold: 0, silver: 1, bronze: 1, topSport: 'Football' },
  ],
}

/**
 * Per-sport class-wise rankings.
 * Each sport lists top classes with points and star performer.
 */
export const sportWiseRanks = {
  indoor: [
    {
      sport: 'Chess',
      rankings: [
        { rank: 1, class: '10-A', points: 95, starPlayer: 'Aarav Sharma' },
        { rank: 2, class: '9-B', points: 88, starPlayer: 'Rohan Mehta' },
        { rank: 3, class: '8-A', points: 82, starPlayer: 'Vikram Singh' },
      ],
    },
    {
      sport: 'Table Tennis',
      rankings: [
        { rank: 1, class: '9-B', points: 90, starPlayer: 'Priya Patel' },
        { rank: 2, class: '10-A', points: 85, starPlayer: 'Aarav Sharma' },
        { rank: 3, class: '8-C', points: 78, starPlayer: 'Ananya Iyer' },
      ],
    },
    {
      sport: 'Carrom',
      rankings: [
        { rank: 1, class: '8-A', points: 88, starPlayer: 'Karan Desai' },
        { rank: 2, class: '10-A', points: 84, starPlayer: 'Vikram Singh' },
        { rank: 3, class: '7-A', points: 76, starPlayer: 'Meera Nair' },
      ],
    },
    {
      sport: 'Badminton (Indoor)',
      rankings: [
        { rank: 1, class: '8-A', points: 92, starPlayer: 'Sneha Reddy' },
        { rank: 2, class: '9-A', points: 86, starPlayer: 'Isha Khan' },
        { rank: 3, class: '10-A', points: 80, starPlayer: 'Priya Patel' },
      ],
    },
    {
      sport: 'Yoga & Fitness',
      rankings: [
        { rank: 1, class: '9-A', points: 94, starPlayer: 'Ananya Iyer' },
        { rank: 2, class: '7-A', points: 89, starPlayer: 'Meera Nair' },
        { rank: 3, class: '6-A', points: 85, starPlayer: 'Arjun Gupta' },
      ],
    },
    {
      sport: 'Quiz & Debate',
      rankings: [
        { rank: 1, class: '10-A', points: 98, starPlayer: 'Aarav Sharma' },
        { rank: 2, class: '9-B', points: 91, starPlayer: 'Rohan Mehta' },
        { rank: 3, class: '8-C', points: 87, starPlayer: 'Sneha Reddy' },
      ],
    },
  ],
  outdoor: [
    {
      sport: 'Cricket',
      rankings: [
        { rank: 1, class: '10-A', points: 120, starPlayer: 'Vikram Singh' },
        { rank: 2, class: '9-B', points: 105, starPlayer: 'Rohan Mehta' },
        { rank: 3, class: '8-A', points: 98, starPlayer: 'Karan Desai' },
      ],
    },
    {
      sport: 'Football',
      rankings: [
        { rank: 1, class: '9-B', points: 115, starPlayer: 'Arjun Gupta' },
        { rank: 2, class: '10-A', points: 108, starPlayer: 'Aarav Sharma' },
        { rank: 3, class: '7-B', points: 95, starPlayer: 'Isha Khan' },
      ],
    },
    {
      sport: 'Athletics (Track)',
      rankings: [
        { rank: 1, class: '8-A', points: 130, starPlayer: 'Sneha Reddy' },
        { rank: 2, class: '9-A', points: 118, starPlayer: 'Priya Patel' },
        { rank: 3, class: '10-A', points: 110, starPlayer: 'Vikram Singh' },
      ],
    },
    {
      sport: 'Basketball',
      rankings: [
        { rank: 1, class: '9-A', points: 100, starPlayer: 'Rohan Mehta' },
        { rank: 2, class: '8-C', points: 92, starPlayer: 'Ananya Iyer' },
        { rank: 3, class: '10-A', points: 88, starPlayer: 'Aarav Sharma' },
      ],
    },
    {
      sport: 'Volleyball',
      rankings: [
        { rank: 1, class: '8-C', points: 96, starPlayer: 'Meera Nair' },
        { rank: 2, class: '9-B', points: 90, starPlayer: 'Priya Patel' },
        { rank: 3, class: '7-A', points: 84, starPlayer: 'Karan Desai' },
      ],
    },
    {
      sport: 'Kabaddi',
      rankings: [
        { rank: 1, class: '7-B', points: 110, starPlayer: 'Arjun Gupta' },
        { rank: 2, class: '9-B', points: 102, starPlayer: 'Rohan Mehta' },
        { rank: 3, class: '8-A', points: 96, starPlayer: 'Vikram Singh' },
      ],
    },
    {
      sport: 'Kho-Kho',
      rankings: [
        { rank: 1, class: '7-A', points: 105, starPlayer: 'Isha Khan' },
        { rank: 2, class: '6-A', points: 98, starPlayer: 'Arjun Gupta' },
        { rank: 3, class: '8-C', points: 90, starPlayer: 'Ananya Iyer' },
      ],
    },
  ],
}
