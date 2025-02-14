"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Anchor, Ship, Trophy } from "lucide-react"
import wlug from "../assets/wlug-black.png"
import meta from "../assets/mets-2.png"
import { Tilt } from "react-tilt"
import wp from "../assets/wp.png"


interface User {
  id: number
  name: string
  score: number
  avatar: string
}

const Leaderboard3Row: React.FC<{ user: User; position: number; prevPosition: number }> = ({
  user,
  position,
  prevPosition,
}) => {
  const [prevScore, setPrevScore] = useState(user.score)

  useEffect(() => {
    setPrevScore(user.score)
  }, [user.score])

  const isTopFive = position <= 5

  return (
    <motion.tr
      layout
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className={`relative mb-4 ${isTopFive ? "scale-105" : ""} hover:scale-102 transition-transform duration-300`}
    >
      <motion.td
        className={`p-5 text-center flex items-center justify-center gap-2 ${
          isTopFive ? "bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600" : "bg-teal-700"
        } rounded-l-lg`}
        animate={{
          y: position < prevPosition ? [0, -20, 0] : position > prevPosition ? [0, 20, 0] : 0,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <span
          className={`inline-block py-1 px-3 rounded-full text-2xl font-bold ${
            isTopFive ? "bg-yellow-300 text-yellow-900" : "bg-blue-200 text-teal-900"
          }`}
        >
          {position}
        </span>
        {isTopFive && (
          <Trophy
            className={`flex w-6 h-6 ${position === 1 ? "text-yellow-300" : position === 2 ? "text-gray-300" : "text-yellow-600"}`}
          />
        )}
      </motion.td>
      <td className={`p-4 ${isTopFive ? "blur-sm bg-yellow-500" : "bg-teal-600"}`}>
        <div className="flex items-center">
          <div className="w-12 h-12 rounded-full bg-teal-400 flex items-center justify-center overflow-hidden border-2 border-white mr-4">
            <Ship className="w-8 h-8 text-teal-900" />
          </div>
          <span className="text-xl font-bold text-white">{user.name}</span>
        </div>
      </td>
      <motion.td
        className={`p-4 text-right ${isTopFive ? "blur-sm bg-yellow-400" : "bg-teal-500"} rounded-r-lg`}
        animate={{
          scale: user.score !== prevScore ? [1, 1.1, 1] : 1,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <span className="text-2xl font-extrabold text-white">{user.score}</span>
      </motion.td>
    </motion.tr>
  )
}

const Leaderboard3: React.FC = () => {
    const [users, setUsers] = useState<User[]>([])
  
    useEffect(() => {
      const initialUsers: User[] = Array.from({ length: 10 }, (_, index) => ({
        id: index + 1,
        name: `Sailor ${index + 1}`,
        score: Math.floor(Math.random() * 1000),
        avatar: `/placeholder.svg?height=100&width=100`,
      }))
      setUsers(initialUsers.sort((a, b) => b.score - a.score))
  
      const interval = setInterval(() => {
        setUsers((prevUsers) => {
          const updatedUsers = prevUsers.map((user) => ({
            ...user,
            score: user.score + Math.floor(Math.random() * 100) - 25,
          }))
          return updatedUsers.sort((a, b) => b.score - a.score).slice(0, 10)
        })
      }, 3000)
  
      return () => clearInterval(interval)
    }, [])
  
  return (
    <div className="min-h-screen p-8 flex flex-col items-center justify-center">
      <motion.img src={wlug} alt="wlug logo" className="absolute sm:block hidden top-5 left-5 w-35 h-24 z-25" />
      {/* <motion.img src={meta} alt="Meta Title" className="absolute top-5 left-1/2 transform -translate-x-1/2 w-96 h-auto z-20" /> */}
      <motion.img
            src={meta}
            alt="Meta Title"
            className="absolute top-3 left-1/2 transform -translate-x-1/2 w-103 h-auto z-20"
            animate={{
                y: [0, -10, 0],  
              }}
              transition={{
                duration: 2,      
                repeat: Infinity, 
                repeatType: "mirror", 
                ease: "easeInOut"
              }}
        />
        <div className="absolute md:block hidden top-4 right-5 bg-opacity-10 px-4 py-2 rounded-lg shadow-md">
        <motion.img
            src={wp}
            alt="wooden plank"
            className="absolute top-0.5 left-1/2 transform -translate-x-1/2 w-96 h-20 z-10" 
        />
        <div className="relative z-20"> 
            <p className="relative left-3 text-white font-bold text-lg">Score:</p>
            <p className="text-white ext-sm">Rank: Who knows?</p>
        </div>
    </div>
      <Tilt options={{ max: 25, scale: 1.05 }} className="w-full max-w-4xl mt-20">
        <div className="relative w-full bg-teal-900 bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-xl shadow-2xl overflow-hidden border border-white border-opacity-20">
          <table className="w-full border-collapse">
            <thead>
              <tr className="text-white bg-teal-950">
                <th className="p-4 text-left">Rank</th>
                <th className="p-4 text-left">Sailor</th>
                <th className="p-4 text-right">Score</th>
              </tr>
            </thead>
            <AnimatePresence>
              <tbody>
                {users.map((user, index) => (
                  <Leaderboard3Row key={user.id} user={user} position={index + 1} prevPosition={index + 1} />
                ))}
              </tbody>
            </AnimatePresence>
          </table>
        </div>
      </Tilt>
    </div>
  )
}

export default Leaderboard3
