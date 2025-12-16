"use client"

import "./globals.css"
import {Inter} from "next/font/google"
import {motion} from "framer-motion"

const inter=Inter({subsets:["latin"]})

export default function RootLayout({children}:{children:React.ReactNode}){
  return(
    <html lang="en">
      <body className={inter.className}>
        <motion.main
          initial={{opacity:0,y:8}}
          animate={{opacity:1,y:0}}
          transition={{duration:0.4,ease:[0.22,1,0.36,1]}}
          className="w-screen max-w-2xl mx-auto min-h-screen px-4 py-12 flex flex-col"
        >
          {children}
        </motion.main>
      </body>
    </html>
  )
}
