export interface Photo {
  id: string;
  src: string;
  caption: string;
  category: 'hero' | 'gallery' | 'travel' | 'note' | 'final';
  aspect: 'portrait' | 'landscape' | 'square';
}

export const heroPhoto: Photo = {
  id: 'hero',
  src: '/photos/IMG-20260608-WA0102.jpg',
  caption: 'Where elegance meets the horizon.',
  category: 'hero',
  aspect: 'portrait',
};

export const finalPhoto: Photo = {
  id: 'final',
  src: '/photos/IMG-20260608-WA0141.jpg',
  caption: 'Some moments are larger than memory itself.',
  category: 'final',
  aspect: 'portrait',
};

export const notePhoto: Photo = {
  id: 'note',
  src: '/photos/IMG-20260608-WA0128.jpg',
  caption: 'Tradition, grace, and timeless beauty.',
  category: 'note',
  aspect: 'portrait',
};

export const galleryPhotos: Photo[] = [
  {
    id: 'g1',
    src: '/photos/IMG-20260608-WA0084.jpg',
    caption: 'One of the museum favorites.',
    category: 'gallery',
    aspect: 'portrait',
  },
  {
    id: 'g2',
    src: '/photos/IMG-20260608-WA0104.jpg',
    caption: 'A celebration of tradition and grace.',
    category: 'gallery',
    aspect: 'square',
  },
  {
    id: 'g3',
    src: '/photos/IMG-20260608-WA0110.jpg',
    caption: 'Main character energy.',
    category: 'gallery',
    aspect: 'portrait',
  },
  {
    id: 'g4',
    src: '/photos/IMG-20260608-WA0113.jpg',
    caption: 'A frame that deserved its own exhibit.',
    category: 'gallery',
    aspect: 'portrait',
  },
  {
    id: 'g5',
    src: '/photos/IMG-20260608-WA0117.jpg',
    caption: 'Proof that good memories exist.',
    category: 'gallery',
    aspect: 'portrait',
  },
  {
    id: 'g6',
    src: '/photos/IMG-20260608-WA0121.jpg',
    caption: 'When the lights align perfectly.',
    category: 'gallery',
    aspect: 'portrait',
  },
  {
    id: 'g7',
    src: '/photos/IMG-20260608-WA0123.jpg',
    caption: 'A moment worth preserving.',
    category: 'gallery',
    aspect: 'portrait',
  },
  {
    id: 'g8',
    src: '/photos/IMG-20260608-WA0124.jpg',
    caption: 'Effortless charm, captured forever.',
    category: 'gallery',
    aspect: 'portrait',
  },
  {
    id: 'g9',
    src: '/photos/IMG-20260608-WA0126.jpg',
    caption: 'Reflections of a beautiful soul.',
    category: 'gallery',
    aspect: 'portrait',
  },
  {
    id: 'g10',
    src: '/photos/IMG-20260608-WA0129.jpg',
    caption: 'Simplicity in its finest form.',
    category: 'gallery',
    aspect: 'portrait',
  },
  {
    id: 'g11',
    src: '/photos/IMG-20260608-WA0130.jpg',
    caption: 'Heritage wrapped in elegance.',
    category: 'gallery',
    aspect: 'portrait',
  },
  {
    id: 'g12',
    src: '/photos/IMG-20260608-WA0131.jpg',
    caption: 'A smile that lights up the room.',
    category: 'gallery',
    aspect: 'portrait',
  },
  {
    id: 'g13',
    src: '/photos/IMG-20260608-WA0133.jpg',
    caption: 'Grace in every detail.',
    category: 'gallery',
    aspect: 'portrait',
  },
  {
    id: 'g14',
    src: '/photos/IMG-20260608-WA0137.jpg',
    caption: 'Confidence looks good on her.',
    category: 'gallery',
    aspect: 'portrait',
  },
  {
    id: 'g15',
    src: '/photos/IMG-20260608-WA0143.jpg',
    caption: 'The kind of candid that belongs in a gallery.',
    category: 'gallery',
    aspect: 'landscape',
  },
  {
    id: 'g16',
    src: '/photos/IMG-20260608-WA0145.jpg',
    caption: 'Caught in a moment of pure joy.',
    category: 'gallery',
    aspect: 'portrait',
  },
  {
    id: 'g17',
    src: '/photos/IMG-20260608-WA0147.jpg',
    caption: 'Quiet confidence, loud impact.',
    category: 'gallery',
    aspect: 'portrait',
  },
  {
    id: 'g18',
    src: '/photos/IMG-20260608-WA0149.jpg',
    caption: 'Art in every corner.',
    category: 'gallery',
    aspect: 'portrait',
  },
  {
    id: 'g19',
    src: '/photos/IMG-20260617-WA0069(1).jpg',
    caption: 'Stairway to memorable moments.',
    category: 'gallery',
    aspect: 'portrait',
  },
  {
    id: 'g20',
    src: '/photos/IMG-20260617-WA0071(1).jpg',
    caption: 'A pose that tells a story.',
    category: 'gallery',
    aspect: 'portrait',
  },
];

export const travelPhotos: Photo[] = [
  {
    id: 't1',
    src: '/photos/IMG-20260608-WA0125.jpg',
    caption: 'Travel mode activated.',
    category: 'travel',
    aspect: 'portrait',
  },
  {
    id: 't2',
    src: '/photos/IMG-20260608-WA0127.jpg',
    caption: 'Adventures written in stone.',
    category: 'travel',
    aspect: 'portrait',
  },
  {
    id: 't3',
    src: '/photos/IMG-20260608-WA0135.jpg',
    caption: 'Sunshine and good times.',
    category: 'travel',
    aspect: 'portrait',
  },
  {
    id: 't4',
    src: '/photos/IMG-20260608-WA0139.jpg',
    caption: 'Nature\'s favorite visitor.',
    category: 'travel',
    aspect: 'portrait',
  },
  {
    id: 't5',
    src: '/photos/IMG-20260617-WA0067(1).jpg',
    caption: 'Collecting moments, not things.',
    category: 'travel',
    aspect: 'portrait',
  },
  {
    id: 't6',
    src: '/photos/IMG-20260617-WA0068(1).jpg',
    caption: 'Wanderlust looks like this.',
    category: 'travel',
    aspect: 'portrait',
  },
];

export const allPhotos = [heroPhoto, ...galleryPhotos, ...travelPhotos, notePhoto, finalPhoto];
