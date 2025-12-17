"use client"

import {Shield,Database,Clock,EyeOff,Mail,Lock,Scale} from "lucide-react"

const H=({icon:Icon,children}:{icon:any,children:any})=>(
  <span className="inline-flex bg-[#252525] px-2 rounded-md items-center gap-2">
    <Icon className="w-3 h-3"/>
    {children}
  </span>
)

const Brace=({className}:{className?:string})=>(
  <div className={`absolute left-0 top-0 bottom-0 w-4 flex flex-col ${className||""}`} aria-hidden="true">
    <svg viewBox="0 0 20 24" className="w-4 h-6" fill="none">
      <path
        d="M15 2C8 2 8 8 8 16L8 24"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>

    <svg viewBox="0 0 20 100" className="w-4 flex-1" preserveAspectRatio="none" fill="none">
      <path
        d="M8 0L8 100"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>

    <svg viewBox="0 0 20 24" className="w-4 h-6" fill="none">
      <path
        d="M8 0L8 8C8 16 8 22 15 22"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  </div>
)

const S=({icon:Icon,title,children}:{icon:any,title:string,children:any})=>(
  <section className="relative pl-7 space-y-2">
    <Brace className="text-[#3a3a3a]"/>
    <h2 className="text-[13px] font-semibold flex items-center gap-2">
      <Icon className="w-4 h-4"/>{title}
    </h2>
    <div className="space-y-2">{children}</div>
  </section>
)


export function Privacy(){
  return(
    <div className="max-w-xl space-y-4 text-sm leading-6">
      <h1 className="text-lg font-semibold flex items-center gap-2">
        <Shield size={16}/>Privacy Policy
      </h1>

      <p className="text-xs opacity-70">Last updated: 2025-12-17</p>

      <p>
        <H icon={Shield}>zuzu.rest</H> is a temporary file hosting service with no accounts, no registration, and no tracking.
      </p>

      <S icon={Database} title="What we store">
        <ul className="list-disc pl-5 space-y-1">
          <li><H icon={Database}>Uploaded files</H> so we can serve them back to you.</li>
          <li>Minimal technical metadata needed to operate the service (request basics, error info, abuse prevention signals).</li>
        </ul>
      </S>

      <S icon={EyeOff} title="What we do not do">
        <ul className="list-disc pl-5 space-y-1">
          <li>No ads.</li>
          <li>No analytics tracking cookies.</li>
          <li>No user profiles (there are no accounts).</li>
          <li>No selling of personal data.</li>
        </ul>
      </S>

      <S icon={Clock} title="Retention">
        <p>
          Files are temporary: they <H icon={Clock}>auto delete after ~3 hours</H>.
          There is <H icon={Scale}>no manual deletion</H> option—if you upload something by mistake, you must wait for expiry.
        </p>
      </S>

      <S icon={Lock} title="Security">
        <p>
          We aim to protect uploads in transit and while stored, but no system is perfect.
          Avoid uploading secrets (passwords, private keys, recovery codes) or sensitive personal data.
        </p>
      </S>

      <S icon={Scale} title="When we may share information">
        <p>
          We don’t share your content except when required to comply with law, enforce these terms, respond to valid legal requests, or handle safety/abuse reports.
        </p>
      </S>

      <S icon={Mail} title="Contact">
        <p>Support: <H icon={Mail}>bliss@hoosh.cat</H></p>
      </S>
    </div>
  )
}

export default function Page(){
  return(
    <div className="p-6 flex justify-center">
      <Privacy/>
    </div>
  )
}
