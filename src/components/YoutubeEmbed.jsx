import { useState } from 'react'
import { motion } from 'framer-motion'

export default function YoutubeEmbed({ videoId, title = 'Project Video', className = '' }) {
  const [playing, setPlaying] = useState(false)

  if (!videoId) return null

  const thumb = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`

  return (
    <div className={`relative overflow-hidden rounded-2xl bg-black group ${className}`}>
      {!playing ? (
        <motion.div
          className="relative w-full h-full cursor-pointer"
          onClick={() => setPlaying(true)}
          whileHover="hov"
        >
          {/* Thumbnail */}
          <motion.img
            src={thumb}
            alt={title}
            className="w-full h-full object-cover"
            variants={{ hov: { scale: 1.03 } }}
            transition={{ duration: 0.5 }}
            onError={(e) => {
              // Fallback to hq thumbnail if maxres isn't available
              e.target.src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
            }}
          />
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-300" />

          {/* Play button */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              className="w-18 h-18 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center"
              style={{ width: 72, height: 72 }}
              whileHover={{ scale: 1.1, backgroundColor: 'rgba(16,185,129,0.3)' }}
              transition={{ duration: 0.2 }}
            >
              <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </motion.div>
          </div>

          {/* YouTube label */}
          <div className="absolute bottom-4 left-4 flex items-center gap-2">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#FF0000">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
            </svg>
            <span className="text-white/60 text-xs">Official Video</span>
          </div>
        </motion.div>
      ) : (
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
          title={title}
          allow="autoplay; encrypted-media; picture-in-picture"
          allowFullScreen
          className="w-full h-full border-0"
          style={{ minHeight: '100%' }}
        />
      )}
    </div>
  )
}
