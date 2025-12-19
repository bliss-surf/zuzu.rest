"use client"

import {useState,useEffect} from "react"
import {motion,AnimatePresence} from "framer-motion"
import {Image,FileText,Loader2,Copy,Check,Upload} from "lucide-react"

type Item={
  name:string
  type:string
  progress:number
  ready:boolean
  copied:boolean
  url?:string
}

type StatusData={
  ok:boolean
  responseTime:number
}

const iconFor=(type:string)=>{
  if(type.startsWith("image"))return Image
  return FileText
}

export default function Page(){
  const [items,setItems]=useState<Item[]>([])
  const [status,setStatus]=useState<StatusData|null>(null)
  const [statusLoading,setStatusLoading]=useState(true)

  useEffect(()=>{
    const fetchStatus=async()=>{
      try{
        const res=await fetch('/api/status')
        const data=await res.json()
        if(data.ok){
          setStatus(data.data)
        }
      }catch(e){
        console.error('failed to fetch status')
      }finally{
        setStatusLoading(false)
      }
    }
    fetchStatus()
  },[])

  function upload(files:FileList|null){
    if(!files)return
    const next=[...items]
    Array.from(files).forEach(file=>{
      const item:Item={name:file.name,type:file.type,progress:0,ready:false,copied:false}
      next.push(item)
      const idx=next.length-1
      
      const formData=new FormData()
      formData.append('file',file)
      
      const xhr=new XMLHttpRequest()
      xhr.upload.addEventListener('progress',(e)=>{
        if(e.lengthComputable){
          const progress=Math.round((e.loaded/e.total)*100)
          setItems(s=>{
            const c=[...s]
            if(c[idx])c[idx]={...c[idx],progress:Math.min(progress,99)}
            return c
          })
        }
      })
      
      xhr.addEventListener('load',()=>{
        try{
          const response=JSON.parse(xhr.responseText)
          setItems(s=>{
            const c=[...s]
            if(c[idx])c[idx]={...c[idx],progress:100,ready:true,url:response.response}
            return c
          })
        }catch(e){
          setItems(s=>{
            const c=[...s]
            if(c[idx])c[idx]={...c[idx],progress:100,ready:true}
            return c
          })
        }
      })
      
      xhr.addEventListener('error',()=>{
        setItems(s=>{
          const c=[...s]
          if(c[idx])c[idx]={...c[idx],progress:0}
          return c
        })
      })
      
      xhr.open('POST','/api/upload')
      xhr.send(formData)
    })
    setItems(next)
  }

  function copy(i:number){
    const slug=items[i].url?.split('/').pop()||encodeURIComponent(items[i].name)
    const url=`https://zuzu.rest/${slug}`
    if(navigator?.clipboard?.writeText){
      navigator.clipboard.writeText(url)
    }else{
      const t=document.createElement("textarea")
      t.value=url
      document.body.appendChild(t)
      t.select()
      document.execCommand("copy")
      document.body.removeChild(t)
    }
    setItems(s=>{
      const c=[...s]
      if(c[i])c[i].copied=true
      return c
    })
    setTimeout(()=>{
      setItems(s=>{
        const c=[...s]
        if(c[i])c[i].copied=false
        return c
      })
    },1200)
  }

  return(
    <div className="relative flex flex-1 flex-col items-center justify-center gap-10 w-full">
      <h1 className="text-3xl font-bold">zuzu.rest</h1>

      <motion.label
        initial={{opacity:0,scale:0.96}}
        animate={{opacity:1,scale:1}}
        whileHover={{scale:1.03}}
        whileTap={{scale:0.97}}
        transition={{duration:0.25,ease:[0.22,1,0.36,1]}}
        className="cursor-pointer border-[2px] border-zinc-300 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/40 rounded-lg h-24 w-full max-w-md flex flex-col items-center justify-center gap-2 text-sm font-mono text-zinc-500"
      >
        <Upload size={18}/>
        <span>drop files</span>
        <input type="file" multiple hidden onChange={e=>upload(e.target.files)}/>
      </motion.label>

      <div className="w-full max-w-md space-y-2">
        <AnimatePresence>
          {items.map((f,i)=>{
            const Icon=iconFor(f.type)
            const slug=f.url?.split('/').pop()||encodeURIComponent(f.name)
            const url=`https://zuzu.rest/${slug}`
            return(
              <motion.div
                key={i}
                layout
                initial={{opacity:0,y:6}}
                animate={{opacity:1,y:0}}
                exit={{opacity:0}}
                transition={{duration:0.25,ease:[0.22,1,0.36,1]}}
                className="border-[2px] border-zinc-300 dark:border-zinc-800 rounded-md px-3 py-2 flex gap-3 text-sm"
              >
                <Icon size={16} className="text-zinc-500 mt-1 shrink-0"/>

                <div className="flex-1 min-w-0">
                  <div className="font-mono truncate text-zinc-800 dark:text-zinc-200">
                    {f.name}
                  </div>
                  {f.ready&&(
                    <div className="mt-1 text-xs font-mono text-zinc-500 truncate">
                      {url}
                    </div>
                  )}
                </div>

                <div className="flex items-start">
                  {!f.ready&&(
                    <Loader2 size={16} className="animate-spin text-zinc-400 mt-1"/>
                  )}
                  {f.ready&&!f.copied&&(
                    <button
                      onClick={()=>copy(i)}
                      className="cursor-pointer rounded-md p-1 text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200 hover:bg-zinc-200/60 dark:hover:bg-zinc-800/60 transition"
                    >
                      <Copy size={16}/>
                    </button>
                  )}
                  {f.copied&&(
                    <div className="rounded-md p-1 bg-emerald-500/15">
                      <Check size={16} className="text-emerald-500"/>
                    </div>
                  )}
                </div>
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>

      <motion.footer
        initial={{opacity:0,y:10}}
        animate={{opacity:1,y:0}}
        transition={{delay:0.2,duration:0.4,ease:[0.22,1,0.36,1]}}
        className="absolute bottom-4 inset-x-0 flex flex-col items-center gap-3 pointer-events-none"
      >
        <div className="flex items-center gap-4 text-xs">
          <a
            href="/privacy"
            className="pointer-events-auto text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200 transition"
          >
            Privacy
          </a>
          <div className="text-zinc-300 dark:text-zinc-700">•</div>
          <a
            href="/terms"
            className="pointer-events-auto text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200 transition"
          >
            Terms
          </a>
          {(status||statusLoading)&&(
            <>
              <div className="text-zinc-300 dark:text-zinc-700">•</div>
              <a
                href="https://status.bliss.surf/"
                target="_blank"
                className="pointer-events-auto flex items-center gap-1.5 text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200 transition"
              >
                {status&&(
                  <>
                    <div className={`w-1.5 h-1.5 rounded-full ${status.ok?'bg-emerald-500':'bg-red-500'}`}/>
                    <span>{status.ok?'operational':'down'}</span>
                  </>
                )}
                {statusLoading&&(
                  <>
                    <motion.div
                      animate={{opacity:[0.5,1,0.5]}}
                      transition={{duration:1.5,repeat:Infinity}}
                      className="w-1.5 h-1.5 rounded-full bg-zinc-300 dark:bg-zinc-700"
                    />
                    <motion.span
                      animate={{opacity:[0.5,1,0.5]}}
                      transition={{duration:1.5,repeat:Infinity}}
                      className="text-xs w-12 h-3 bg-zinc-200 dark:bg-zinc-800 rounded inline-block"
                    />
                  </>
                )}
              </a>
            </>
          )}
        </div>
        <motion.a
          href="https://bliss.surf"
          target="_blank"
          whileHover={{scale:1.05}}
          className="pointer-events-auto flex items-center gap-2 text-xs text-zinc-500 px-3 py-1 rounded-full hover:bg-zinc-200/60 dark:hover:bg-zinc-800/60 transition"
        >
          <span>powered by</span>
          <svg width="14" height="14" viewBox="0 0 160 160">
            <defs>
              <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#9395FF"/>
                <stop offset="100%" stopColor="#7679FF"/>
              </linearGradient>
            </defs>
            <rect width="160" height="160" rx="32" fill="#0B0B10"/>
            <g fill="none" stroke="url(#g)" strokeWidth="10" strokeLinecap="round">
              <path d="M40 90c20 20 60 20 80 0"/>
              <path d="M40 70c20-20 60-20 80 0" opacity="0.6"/>
            </g>
          </svg>
          <span className="font-medium">bliss.surf</span>
        </motion.a>
      </motion.footer>
    </div>
  )
}
