// Project Data — Edit this file to add/update projects
const PROJECTS = [
    {
        id: 'lodha-park',
        name: 'Lodha Park',
        type: 'Residential',
        status: 'new',           // 'new' | 'ongoing' | 'sold'
        location: 'Worli, Mumbai',
        tagline: 'An urban oasis in the heart of the city.',
        description: [
            'Of all the privileges of living at Lodha Park, the rarest is living around a 7-acre private park. A place for those who want more out of life, who want to be connected to the city but remain untouched by its chaos.',
            'Lodha Park is a tapestry of experiences so rich, it would take a lifetime to enjoy all of them. Morning walks by a garden, weekend picnics in the lawns, fruit and vegetables from a private orchard and organic garden — experiences you could never have envisioned, are now yours to enjoy in the heart of the city.',
            'With several areas for activity, leisure & recreation dotting its vast landscape, Lodha Park creates the perfect ecosystem for its elite residents to meet, socialize, and bond. Picnic spots, garden pavilions, a restaurant, banquet facilities, and a clubhouse — Lodha Park is designed to create a community of like-minded people from diverse professions, where exchanging views is as easy as sharing a cup of coffee.'
        ],
        highlights: [
            { value: '7', unit: 'Acre Private Park', icon: '�' },
            { value: '50,000', unit: 'sq. ft. Clubhouse', icon: '🏛️' },
            { value: '7', unit: 'Swimming Pools', icon: '🏊' },
            { value: 'Ready', unit: 'To Move In', icon: '�️' }
        ],
        configs: ['2 BHK', '3 BHK', '4 BHK', 'Duplex'],
        priceRange: '₹ 4.5 Cr onwards',
        mapEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3772.0!2d72.8177!3d19.0176!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7ce7a98a39381%3A0x89af6c3a5a07b9c9!2sWorli%2C%20Mumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1712000000000',
        amenities: [
            { icon: '🏊', label: '7 Swimming Pools' },
            { icon: '🏋️', label: 'World-class Gym with Boxing Ring' },
            { icon: '🌳', label: '7-Acre Private Park' },
            { icon: '🏛️', label: '50,000 sq.ft. Clubhouse' },
            { icon: '🎭', label: 'Banquet Facilities' },
            { icon: '🎮', label: "Kids' Play Area" },
            { icon: '🏓', label: 'Indoor Games Room' },
            { icon: '🏸', label: 'Multi-purpose Courts' },
            { icon: '�️', label: 'Restaurant' },
            { icon: '🌿', label: 'Organic Garden' },
            { icon: '�', label: 'Garden Pavilions' },
            { icon: '🔒', label: '24/7 Security' }
        ],
        floorPlans: [
            { label: '2 BHK', name: '2 Bed Residence', area: 'Carpet: 850 sq.ft. · Deck: 80 sq.ft.', icon: '🛏️' },
            { label: '3 BHK', name: '3 Bed Premium', area: 'Carpet: 1,180 sq.ft. · Deck: 120 sq.ft.', icon: '🛏️' },
            { label: '4 BHK', name: '4 Bed Luxury', area: 'Carpet: 1,650 sq.ft. · Deck: 180 sq.ft.', icon: '🛏️' },
            { label: 'Duplex', name: 'Duplex Residence', area: 'Carpet: 2,400 sq.ft. · Deck: 250 sq.ft.', icon: '🛏️' }
        ],
        neighbourhood: [
            { place: 'Bandra-Worli Sea Link', time: '20 mins' },
            { place: 'Mumbai International Airport', time: '30 mins' },
            { place: 'Peninsula Corporate Park', time: '10 mins' },
            { place: 'Palladium & High Street Phoenix', time: '05 mins' }
        ],
        faq: [
            { q: 'What configurations are available at Lodha Park?', a: '2 BHK, 3 BHK, 4 BHK, and Duplex residences are available.' },
            { q: 'What is the size of the private park?', a: 'Lodha Park features a 7-acre private park — one of the largest in any residential development in the city.' },
            { q: 'How large is the clubhouse?', a: 'The Jewel clubhouse is 50,000 sq.ft. spread over two storeys at the park level.' },
            { q: 'Is the project ready to move in?', a: 'Yes, Lodha Park is ready for possession.' },
            { q: 'Is the project RERA registered?', a: 'Yes, the project is fully RERA registered and compliant.' }
        ],
        media: [
            { type: 'placeholder', icon: '🏙️', label: 'Tower View' },
            { type: 'placeholder', icon: '🌳', label: 'Private Park' },
            { type: 'placeholder', icon: '�', label: 'Pool Deck' },
            { type: 'placeholder', icon: '�️', label: 'Clubhouse' }
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
