// Project Data — Edit this file to add/update projects
const PROJECTS = [
    {
        id: 'sky-residences',
        name: 'Sky Residences',
        type: 'Residential',
        status: 'new',           // 'new' | 'ongoing' | 'sold'
        location: 'Bandra West, Mumbai',
        mapEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3771.0!2d72.8258!3d19.0596!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c9b888ae67fd%3A0x54f8c0b23b7e1b78!2sBandra%20West%2C%20Mumbai!5e0!3m2!1sen!2sin!4v1',
        about: 'Sky Residences is a premium residential tower offering panoramic views of the Arabian Sea. Designed by award-winning architects, this 42-floor development redefines luxury living in the heart of Bandra West. Each apartment is crafted with the finest materials, smart home automation, and floor-to-ceiling glass facades.',
        amenities: [
            { icon: '🏊', label: 'Infinity Pool' },
            { icon: '🏋️', label: 'Fitness Center' },
            { icon: '🌳', label: 'Rooftop Garden' },
            { icon: '🚗', label: 'Valet Parking' },
            { icon: '🏪', label: 'Concierge' },
            { icon: '🎮', label: "Kids' Play Zone" },
            { icon: '🔒', label: '24/7 Security' },
            { icon: '⚡', label: 'EV Charging' }
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
        location: 'Pune, Wakad',
        mapEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3781.0!2d73.7594!3d18.5934!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2bb0d4a6f0001%3A0x1e1e1e1e1e1e1e1e!2sWakad%2C%20Pune!5e0!3m2!1sen!2sin!4v1',
        about: 'Green Valley Villas is a sprawling township spread across 25 acres of lush greenery in Wakad, Pune. Featuring independent villas and row houses, the community is designed around nature with walking trails, organic gardens, and open-air amphitheatres. Ideal for families seeking a peaceful lifestyle close to the IT corridor.',
        amenities: [
            { icon: '🌿', label: 'Organic Garden' },
            { icon: '🚶', label: 'Walking Trails' },
            { icon: '🎭', label: 'Amphitheatre' },
            { icon: '🏫', label: 'School Nearby' },
            { icon: '🏊', label: 'Swimming Pool' },
            { icon: '🏸', label: 'Sports Courts' },
            { icon: '🐕', label: 'Pet Zone' },
            { icon: '🔒', label: 'Gated Security' }
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
        mapEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3769.0!2d72.8688!3d19.1136!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c8e0d64d1e1f%3A0xf74e0e1b1e1e1e1e!2sAndheri%20East%2C%20Mumbai!5e0!3m2!1sen!2sin!4v1',
        about: 'Metro Hub is a Grade-A commercial development strategically located adjacent to the Andheri Metro Station. The complex offers premium office spaces, retail showrooms, and food court areas across 18 floors. With LEED Gold certification and cutting-edge infrastructure, it is the preferred address for leading corporations.',
        amenities: [
            { icon: '🚇', label: 'Metro Access' },
            { icon: '🅿️', label: 'Multi-level Parking' },
            { icon: '☕', label: 'Food Court' },
            { icon: '💼', label: 'Business Lounge' },
            { icon: '📶', label: 'High-speed Fiber' },
            { icon: '🏦', label: 'ATM / Bank' },
            { icon: '🌱', label: 'LEED Certified' },
            { icon: '🔒', label: 'Access Control' }
        ],
        media: [
            { type: 'placeholder', icon: '🏢', label: 'Building Facade' },
            { type: 'placeholder', icon: '💼', label: 'Office Floor' },
            { type: 'placeholder', icon: '☕', label: 'Food Court' },
            { type: 'placeholder', icon: '🅿️', label: 'Parking Level' }
        ]
    }
];
