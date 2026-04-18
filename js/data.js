// Project Data — Edit this file to add/update projects
const PROJECTS = [
    {
        id: 'sky-residences',
        name: 'Sky Residences',
        type: 'Residential',
        status: 'new',           // 'new' | 'ongoing' | 'sold'
        location: 'Bandra West, Mumbai',
        tagline: 'Of all the privileges of living at Sky Residences, the rarest is the view.',
        description: [
            'A place for those who want more out of life — connected to the city yet untouched by its chaos. Sky Residences is designed for those who want amenities that not only help them relax but also inspire. A residence that promises health, happiness, and absolute well-being.',
            'Sky Residences is a tapestry of experiences so rich, it would take a lifetime to enjoy all of them. Morning walks on the sky deck, weekend evenings by the pool, dinners with panoramic views — experiences you could never have envisioned are now yours to enjoy in the heart of the city.',
            'Inspired by the finest global residences, the 50,000 sq. ft. clubhouse is a two-storied jewel featuring world-class facilities. With exceptional interiors, it makes it easy to have a happy mind in a healthy body.'
        ],
        highlights: [
            { value: '42', unit: 'Floors', icon: '🏙️' },
            { value: '50,000', unit: 'sq. ft. Clubhouse', icon: '🏛️' },
            { value: '3', unit: 'Swimming Pools', icon: '🏊' },
            { value: '5', unit: 'acre Podium Garden', icon: '🌳' }
        ],
        configs: ['2 BHK', '3 BHK', '4 BHK'],
        priceRange: '₹ 4.5 Cr onwards',
        mapEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3771.319!2d72.82366!3d19.0544!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c9149b7b7dbb%3A0x4c9ca6e30be77910!2sBandra%20West%2C%20Mumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1712000000000',
        amenities: [
            { icon: '🏊', label: 'Infinity Pool' },
            { icon: '🏋️', label: 'World-class Gym' },
            { icon: '🌳', label: 'Sky Garden' },
            { icon: '🚗', label: 'Valet Parking' },
            { icon: '�', label: 'Banquet Hall' },
            { icon: '🎮', label: "Kids' Play Zone" },
            { icon: '🔒', label: '24/7 Security' },
            { icon: '⚡', label: 'EV Charging' },
            { icon: '🎾', label: 'Tennis Court' },
            { icon: '🧘', label: 'Yoga Deck' },
            { icon: '📚', label: 'Library Lounge' },
            { icon: '🍽️', label: 'Rooftop Restaurant' }
        ],
        floorPlans: [
            { label: '2 BHK', name: '2 Bed Residence', area: '1,180 sq. ft.', icon: '🛏️' },
            { label: '3 BHK', name: '3 Bed Residence', area: '1,680 sq. ft.', icon: '🛏️' },
            { label: '4 BHK', name: '4 Bed Luxury', area: '2,400 sq. ft.', icon: '🛏️' }
        ],
        neighbourhood: [
            { place: 'Bandra-Worli Sea Link', time: '5 mins' },
            { place: 'Mumbai International Airport', time: '30 mins' },
            { place: 'BKC Business District', time: '10 mins' },
            { place: 'Palladium Mall', time: '15 mins' }
        ],
        faq: [
            { q: 'What configurations are available at Sky Residences?', a: '2 BHK, 3 BHK, and 4 BHK apartments are available.' },
            { q: 'What is the total number of floors?', a: 'Sky Residences is a 42-floor tower.' },
            { q: 'Is the project RERA registered?', a: 'Yes, the project is fully RERA registered and compliant.' },
            { q: 'What is the possession date?', a: 'Expected possession is December 2026.' }
        ],
        media: [
            { type: 'placeholder', icon: '🏙️', label: 'Tower View' },
            { type: 'placeholder', icon: '🛋️', label: 'Living Room' },
            { type: 'placeholder', icon: '🌅', label: 'Sea View' },
            { type: 'placeholder', icon: '🏊', label: 'Pool Deck' }
        ]
    },
    {
        id: 'green-valley',
        name: 'Green Valley Villas',
        type: 'Residential',
        status: 'ongoing',
        location: 'Wakad, Pune',
        tagline: 'Live surrounded by nature, yet connected to everything.',
        description: [
            'Green Valley Villas is a sprawling township spread across 25 acres of lush greenery in Wakad, Pune. Featuring independent villas and row houses, the community is designed around nature with walking trails, organic gardens, and open-air amphitheatres.',
            'Ideal for families seeking a peaceful lifestyle close to the IT corridor, Green Valley creates the perfect ecosystem for residents to meet, socialise, and bond. The township is designed to foster a community of like-minded individuals.',
        ],
        highlights: [
            { value: '25', unit: 'Acre Township', icon: '🌿' },
            { value: '200+', unit: 'Villas', icon: '🏡' },
            { value: '5', unit: 'Sports Courts', icon: '🏸' },
            { value: '1', unit: 'Organic Farm', icon: '🥬' }
        ],
        configs: ['3 BHK Villa', '4 BHK Villa', 'Row House'],
        priceRange: '₹ 1.8 Cr onwards',
        mapEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3781.176!2d73.75568!3d18.5973!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2bb2b4e74fd6d%3A0x7ae76b1e8bc43b1e!2sWakad%2C%20Pimpri-Chinchwad%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1712000000000',
        amenities: [
            { icon: '🌿', label: 'Organic Garden' },
            { icon: '🚶', label: 'Walking Trails' },
            { icon: '🎭', label: 'Amphitheatre' },
            { icon: '🏫', label: 'School Nearby' },
            { icon: '🏊', label: 'Swimming Pool' },
            { icon: '🏸', label: 'Sports Courts' },
            { icon: '🐕', label: 'Pet Zone' },
            { icon: '🔒', label: 'Gated Security' },
            { icon: '🧘', label: 'Yoga Lawn' },
            { icon: '🎪', label: 'Picnic Pavilion' }
        ],
        floorPlans: [
            { label: '3 BHK Villa', name: '3 Bed Villa', area: '2,100 sq. ft.', icon: '🏡' },
            { label: '4 BHK Villa', name: '4 Bed Premium Villa', area: '2,800 sq. ft.', icon: '🏡' },
            { label: 'Row House', name: 'Row House', area: '1,600 sq. ft.', icon: '🏘️' }
        ],
        neighbourhood: [
            { place: 'Hinjewadi IT Park', time: '10 mins' },
            { place: 'Pune International Airport', time: '35 mins' },
            { place: 'Aundh Shopping District', time: '15 mins' },
            { place: 'Baner Market', time: '10 mins' }
        ],
        faq: [
            { q: 'What types of homes are available?', a: '3 BHK Villas, 4 BHK Villas, and Row Houses are available.' },
            { q: 'Is it a gated community?', a: 'Yes, Green Valley is a fully gated, 24/7 secured community.' },
            { q: 'Is the project RERA registered?', a: 'Yes, fully RERA registered and compliant.' },
            { q: 'What is the possession date?', a: 'Expected possession is March 2026.' }
        ],
        media: [
            { type: 'placeholder', icon: '🏡', label: 'Villa Exterior' },
            { type: 'placeholder', icon: '🌿', label: 'Garden View' },
            { type: 'placeholder', icon: '🏊', label: 'Pool Area' },
            { type: 'placeholder', icon: '🌄', label: 'Township View' }
        ]
    },
    {
        id: 'metro-hub',
        name: 'Metro Hub Commercial',
        type: 'Commercial',
        status: 'new',
        location: 'Andheri East, Mumbai',
        tagline: 'The new address of business in Mumbai.',
        description: [
            'Metro Hub is a Grade-A commercial development strategically located adjacent to the Andheri Metro Station. The complex offers premium office spaces, retail showrooms, and food court areas across 18 floors.',
            'With LEED Gold certification and cutting-edge infrastructure, it is the preferred address for leading corporations. Designed for the future of work, every detail of Metro Hub is built to enhance productivity and corporate image.'
        ],
        highlights: [
            { value: '18', unit: 'Floors', icon: '🏢' },
            { value: '5,00,000', unit: 'sq. ft. Total Area', icon: '📐' },
            { value: '800+', unit: 'Car Parks', icon: '🚗' },
            { value: 'LEED', unit: 'Gold Certified', icon: '🌱' }
        ],
        configs: ['Small Office', 'Mid Office', 'Full Floor'],
        priceRange: '₹ 180/sq. ft. onwards',
        mapEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3769.5!2d72.8470!3d19.1136!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c9a2d8b3e0f5%3A0x1234567890abcdef!2sAndheri%20East%2C%20Mumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1712000000000',
        amenities: [
            { icon: '🚇', label: 'Metro Access' },
            { icon: '🅿️', label: 'Multi-level Parking' },
            { icon: '☕', label: 'Food Court' },
            { icon: '💼', label: 'Business Lounge' },
            { icon: '📶', label: 'High-speed Fiber' },
            { icon: '🏦', label: 'ATM / Bank' },
            { icon: '🌱', label: 'LEED Certified' },
            { icon: '🔒', label: 'Access Control' },
            { icon: '🏋️', label: 'Fitness Center' },
            { icon: '🍽️', label: 'Executive Dining' }
        ],
        floorPlans: [
            { label: 'Small Office', name: 'Boutique Office', area: '500–1,000 sq. ft.', icon: '💼' },
            { label: 'Mid Office', name: 'Mid-size Suite', area: '1,000–5,000 sq. ft.', icon: '🏢' },
            { label: 'Full Floor', name: 'Full Floor Plate', area: '25,000 sq. ft.', icon: '🏗️' }
        ],
        neighbourhood: [
            { place: 'Andheri Metro Station', time: '2 mins walk' },
            { place: 'Mumbai International Airport', time: '15 mins' },
            { place: 'SEEPZ Special Zone', time: '5 mins' },
            { place: 'Goregaon Film City', time: '20 mins' }
        ],
        faq: [
            { q: 'What office sizes are available?', a: 'Offices range from 500 sq. ft. boutique spaces to full floor plates of 25,000 sq. ft.' },
            { q: 'Is it close to public transport?', a: 'Yes, the Andheri Metro Station is just a 2-minute walk away.' },
            { q: 'What is the LEED certification level?', a: 'Metro Hub is LEED Gold certified.' },
            { q: 'Is parking available?', a: 'Yes, 800+ car parks are available across a multi-level parking structure.' }
        ],
        media: [
            { type: 'placeholder', icon: '🏢', label: 'Building Facade' },
            { type: 'placeholder', icon: '💼', label: 'Office Floor' },
            { type: 'placeholder', icon: '☕', label: 'Food Court' },
            { type: 'placeholder', icon: '🅿️', label: 'Parking Level' }
        ]
    }
];
