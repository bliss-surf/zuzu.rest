"use client"

import {motion} from "framer-motion"
import Link from "next/link"

export default function NotFound(){
  return(
    <div className="flex flex-1 flex-col items-center justify-center gap-6 text-center">
      <motion.h1
        initial={{opacity:0,y:6}}
        animate={{opacity:1,y:0}}
        transition={{duration:0.3,ease:[0.22,1,0.36,1]}}
        className="text-5xl font-bold"
      >
        404
      </motion.h1>

      <motion.p
        initial={{opacity:0,y:6}}
        animate={{opacity:1,y:0}}
        transition={{delay:0.05,duration:0.3,ease:[0.22,1,0.36,1]}}
        className="text-sm font-mono text-zinc-500"
      >
        page not found
      </motion.p>

      <motion.div
        initial={{opacity:0,y:6}}
        animate={{opacity:1,y:0}}
        transition={{delay:0.1,duration:0.3,ease:[0.22,1,0.36,1]}}
      >
        <Link
          href="/"
          className="text-xs font-mono text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200 transition"
        >
          go home
        </Link>
      </motion.div>
    </div>
  )
}
