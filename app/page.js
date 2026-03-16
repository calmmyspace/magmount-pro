'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { Float, RoundedBox, Environment, MeshDistortMaterial } from '@react-three/drei'
import { motion } from 'framer-motion'
import { useRef, useState } from 'react'

/* ─── 3D Floating Phone + Mount ──────────────────────────────────────── */
function Phone() {
  const group = useRef()
  useFrame((state) => {
    group.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.3
    group.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.1
  })
  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={1}>
      <group ref={group}>
        {/* Phone body */}
        <RoundedBox args={[1.4, 2.8, 0.15]} radius={0.15} smoothness={4} position={[0, 0, 0]}>
          <meshPhysicalMaterial color="#1a1f25" roughness={0.1} metalness={0.9} clearcoat={1} />
        </RoundedBox>
        {/* Screen */}
        <RoundedBox args={[1.2, 2.5, 0.01]} radius={0.1} smoothness={4} position={[0, 0, 0.08]}>
          <meshPhysicalMaterial color="#3b82f6" roughness={0.3} metalness={0.2} emissive="#3b82f6" emissiveIntensity={0.3} />
        </RoundedBox>
        {/* MagSafe ring */}
        <mesh position={[0, 0, -0.09]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.45, 0.04, 16, 48]} />
          <meshStandardMaterial color="#60a5fa" emissive="#60a5fa" emissiveIntensity={0.8} />
        </mesh>
        {/* Mount base */}
        <mesh position={[0, -1.8, -0.3]}>
          <cylinderGeometry args={[0.5, 0.6, 0.2, 32]} />
          <meshPhysicalMaterial color="#373f4a" roughness={0.2} metalness={0.8} />
        </mesh>
        {/* Mount arm */}
        <RoundedBox args={[0.15, 0.8, 0.15]} radius={0.05} position={[0, -1.2, -0.2]}>
          <meshPhysicalMaterial color="#4a5766" roughness={0.2} metalness={0.8} />
        </RoundedBox>
      </group>
    </Float>
  )
}

function MagneticField({ position, delay }) {
  const mesh = useRef()
  useFrame((state) => {
    const t = state.clock.elapsedTime + delay
    const scale = 0.5 + Math.sin(t * 1.5) * 0.3
    mesh.current.scale.setScalar(scale)
    mesh.current.material.opacity = 0.15 + Math.sin(t * 1.5) * 0.1
  })
  return (
    <mesh ref={mesh} position={position} rotation={[Math.PI / 2, 0, 0]}>
      <torusGeometry args={[1, 0.01, 16, 64]} />
      <meshStandardMaterial color="#60a5fa" transparent opacity={0.2} />
    </mesh>
  )
}

function HeroScene() {
  return (
    <Canvas camera={{ position: [0, 0, 7], fov: 40 }} className="!absolute inset-0">
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <pointLight position={[-3, 2, 4]} intensity={0.5} color="#60a5fa" />
      <Phone />
      {[...Array(5)].map((_, i) => (
        <MagneticField key={i} position={[0, 0, -0.5 - i * 0.3]} delay={i * 0.8} />
      ))}
      <Environment preset="studio" />
    </Canvas>
  )
}

/* ─── Data ───────────────────────────────────────────────────────────── */
const fadeIn = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }

const topPicks = [
  { rank: '#1', name: 'Belkin MagSafe Car Mount Pro', score: '9.5/10', price: '$39.99', pros: ['Rock-solid hold', 'One-hand mount', '15W charging'], badge: "Editor's Choice" },
  { rank: '#2', name: 'ESR HaloLock Dash Mount', score: '9.2/10', price: '$27.99', pros: ['Best budget pick', 'Slim design', 'Strong magnets'], badge: 'Best Value' },
  { rank: '#3', name: 'Peak Design Mobile Car Mount', score: '9.0/10', price: '$59.99', pros: ['Premium build', 'Versatile angles', 'SlimLink compatible'], badge: 'Premium' },
  { rank: '#4', name: 'Anker MagGo Car Charger', score: '8.8/10', price: '$32.99', pros: ['Fast charging', 'Compact design', 'USB-C powered'], badge: 'Fast Charge' },
]

const categories = [
  { icon: '🚗', title: 'Car Mounts', count: '24 reviewed', desc: 'Dashboard, vent, windshield — every mounting style tested for hold strength and charging speed.' },
  { icon: '✈️', title: 'Travel Kits', count: '18 reviewed', desc: 'Complete MagSafe travel setups from chargers to mounts for hotel, airplane, and rental car.' },
  { icon: '⚡', title: 'Wireless Chargers', count: '31 reviewed', desc: 'MagSafe chargers ranked by speed, heat, and reliability. Tested with every iPhone model.' },
  { icon: '🏠', title: 'Desk & Home', count: '15 reviewed', desc: 'Stands, docks, and mounts for your home office and nightstand. Style meets function.' },
  { icon: '🎒', title: 'Portable Power', count: '12 reviewed', desc: 'MagSafe battery packs and portable chargers for all-day power on the go.' },
  { icon: '📱', title: 'Cases & Wallets', count: '20 reviewed', desc: 'MagSafe-compatible cases ranked by protection, grip, and magnet strength.' },
]

const articles = [
  { title: 'Best MagSafe Car Mounts 2026: Complete Buyer\'s Guide', tag: 'Buying Guide', read: '12 min' },
  { title: 'MagSafe vs Qi2: Which Wireless Standard Wins?', tag: 'Comparison', read: '8 min' },
  { title: 'The Ultimate MagSafe Travel Setup for Business Travelers', tag: 'Travel', read: '10 min' },
  { title: 'iPhone 16 MagSafe Changes: What Accessory Buyers Need to Know', tag: 'News', read: '5 min' },
]

export default function Home() {
  const [email, setEmail] = useState('')

  return (
    <div className="overflow-x-hidden bg-steel-50 text-steel-950">
      {/* ─── Nav ─── */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-steel-200">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-accent-500 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
            </div>
            <span className="text-lg font-bold">MagMount Pro</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm text-steel-500">
            <a href="#reviews" className="hover:text-steel-900 transition">Reviews</a>
            <a href="#categories" className="hover:text-steel-900 transition">Categories</a>
            <a href="#blog" className="hover:text-steel-900 transition">Blog</a>
            <a href="#newsletter" className="hover:text-steel-900 transition">Newsletter</a>
          </div>
          <a href="#reviews" className="bg-steel-900 text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-steel-800 transition">
            Top Picks
          </a>
        </div>
      </nav>

      {/* ─── Hero ─── */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-b from-steel-100 to-steel-50">
        <div className="absolute right-0 top-0 w-1/2 h-full opacity-60">
          <HeroScene />
        </div>
        <div className="relative z-10 max-w-6xl mx-auto px-6 pt-24 pb-16">
          <div className="max-w-xl">
            <motion.div initial="hidden" animate="visible" variants={fadeIn} transition={{ duration: 0.7 }}>
              <span className="inline-flex items-center gap-2 bg-accent-500/10 text-accent-600 text-xs font-semibold px-3 py-1.5 rounded-full mb-6">
                Updated March 2026 — 120+ Products Tested
              </span>
            </motion.div>
            <motion.h1 initial="hidden" animate="visible" variants={fadeIn} transition={{ duration: 0.7, delay: 0.1 }}
              className="text-5xl md:text-6xl font-bold leading-[1.1] mb-6">
              The best MagSafe
              <span className="text-accent-500"> mounts & accessories.</span>
              <br />Actually tested.
            </motion.h1>
            <motion.p initial="hidden" animate="visible" variants={fadeIn} transition={{ duration: 0.7, delay: 0.2 }}
              className="text-lg text-steel-500 mb-8 leading-relaxed">
              We buy every product with our own money, test it for 30+ days, and tell you exactly what&apos;s worth buying. No sponsored rankings. No affiliate bias.
            </motion.p>
            <motion.div initial="hidden" animate="visible" variants={fadeIn} transition={{ duration: 0.7, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4">
              <a href="#reviews" className="bg-steel-900 text-white px-8 py-4 rounded-xl text-base font-semibold hover:bg-steel-800 transition text-center">
                See Top Picks for 2026
              </a>
              <a href="#categories" className="border-2 border-steel-300 text-steel-700 px-8 py-4 rounded-xl text-base font-semibold hover:bg-white transition text-center">
                Browse Categories
              </a>
            </motion.div>
            <motion.div initial="hidden" animate="visible" variants={fadeIn} transition={{ duration: 0.7, delay: 0.4 }}
              className="mt-8 flex items-center gap-4 text-sm text-steel-400">
              <span>120+ products tested</span>
              <span className="w-1 h-1 bg-steel-300 rounded-full" />
              <span>50K+ monthly readers</span>
              <span className="w-1 h-1 bg-steel-300 rounded-full" />
              <span>100% independent</span>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── Top Picks ─── */}
      <section id="reviews" className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} transition={{ duration: 0.6 }} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Top MagSafe Car Mounts 2026</h2>
            <p className="text-steel-500 text-lg max-w-xl mx-auto">30+ days of testing each. Scored on hold strength, charging speed, ease of use, and build quality.</p>
          </motion.div>
          <div className="space-y-6">
            {topPicks.map((p, i) => (
              <motion.div key={p.name} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-steel-50 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center gap-6 border border-steel-100 hover:shadow-lg transition group">
                <div className="flex items-center gap-4 md:w-16">
                  <span className="text-3xl font-bold text-steel-300">{p.rank}</span>
                </div>
                <div className="w-20 h-20 bg-gradient-to-br from-steel-200 to-steel-300 rounded-xl flex-shrink-0" />
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <h3 className="text-lg font-bold group-hover:text-accent-600 transition">{p.name}</h3>
                    <span className="text-xs font-semibold bg-accent-500/10 text-accent-600 px-2.5 py-0.5 rounded-full">{p.badge}</span>
                  </div>
                  <div className="flex flex-wrap gap-3 text-sm text-steel-500">
                    {p.pros.map(pro => (
                      <span key={pro} className="flex items-center gap-1">
                        <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                        {pro}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <div className="text-2xl font-bold text-accent-500">{p.score}</div>
                    <div className="text-sm text-steel-400">{p.price}</div>
                  </div>
                  <button className="bg-steel-900 text-white px-6 py-3 rounded-xl text-sm font-semibold hover:bg-steel-800 transition whitespace-nowrap">
                    View on Amazon
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Categories ─── */}
      <section id="categories" className="py-24 bg-steel-50">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} transition={{ duration: 0.6 }} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Browse by Category</h2>
            <p className="text-steel-500 text-lg">120+ products across 6 categories — all independently tested.</p>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((c, i) => (
              <motion.div key={c.title} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} transition={{ duration: 0.5, delay: i * 0.08 }}
                className="bg-white rounded-2xl p-6 border border-steel-100 hover:shadow-lg hover:border-accent-200 transition cursor-pointer group">
                <span className="text-3xl mb-4 block">{c.icon}</span>
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-bold group-hover:text-accent-600 transition">{c.title}</h3>
                  <span className="text-xs text-steel-400 bg-steel-100 px-2 py-0.5 rounded-full">{c.count}</span>
                </div>
                <p className="text-steel-500 text-sm leading-relaxed">{c.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Blog ─── */}
      <section id="blog" className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} transition={{ duration: 0.6 }} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Latest Articles</h2>
            <p className="text-steel-500 text-lg">Buying guides, comparisons, and news from the MagSafe world.</p>
          </motion.div>
          <div className="grid md:grid-cols-2 gap-8">
            {articles.map((a, i) => (
              <motion.div key={a.title} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex gap-5 group cursor-pointer">
                <div className="w-32 h-24 bg-gradient-to-br from-steel-200 to-steel-300 rounded-xl flex-shrink-0" />
                <div>
                  <div className="flex items-center gap-2 mb-2 text-xs text-steel-400">
                    <span className="bg-steel-100 px-2 py-0.5 rounded-full font-medium">{a.tag}</span>
                    <span>{a.read} read</span>
                  </div>
                  <h3 className="font-bold text-base leading-snug group-hover:text-accent-600 transition">{a.title}</h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Newsletter ─── */}
      <section id="newsletter" className="py-24 bg-steel-900 text-white">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} transition={{ duration: 0.6 }}>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Get the Weekly Mount-Up</h2>
            <p className="text-steel-400 text-lg mb-8">New reviews, deals, and MagSafe news every Friday. Join 12,000+ subscribers. Free forever.</p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Your email address"
                className="flex-1 px-5 py-3 rounded-xl bg-steel-800 border border-steel-700 text-white placeholder:text-steel-500 outline-none focus:border-accent-500 transition" />
              <button className="bg-accent-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-accent-600 transition whitespace-nowrap">Subscribe Free</button>
            </div>
            <p className="mt-4 text-steel-500 text-xs">No spam. Unsubscribe in one click. We never share your email.</p>
          </motion.div>
        </div>
      </section>

      {/* ─── Footer ─── */}
      <footer className="bg-steel-950 text-steel-500 py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-accent-500 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                </div>
                <span className="text-lg font-bold text-white">MagMount Pro</span>
              </div>
              <p className="text-sm leading-relaxed">Independent MagSafe accessory reviews. We buy everything, test everything, and tell you what&apos;s actually worth your money.</p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4 text-sm">Categories</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition">Car Mounts</a></li>
                <li><a href="#" className="hover:text-white transition">Travel Kits</a></li>
                <li><a href="#" className="hover:text-white transition">Wireless Chargers</a></li>
                <li><a href="#" className="hover:text-white transition">Desk & Home</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4 text-sm">Resources</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition">Buying Guides</a></li>
                <li><a href="#" className="hover:text-white transition">How We Test</a></li>
                <li><a href="#" className="hover:text-white transition">Newsletter Archive</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4 text-sm">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition">Affiliate Disclosure</a></li>
                <li><a href="#" className="hover:text-white transition">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-steel-800 pt-8 text-sm text-center">
            <p>&copy; 2026 MagMount Pro. All rights reserved. We earn commissions from qualifying purchases through affiliate links.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
