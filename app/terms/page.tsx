"use client"

import {FileText,Shield,AlertTriangle,Scale,Mail,Clock,Ban,Copyright} from "lucide-react"

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


export function Terms(){
  return(
    <div className="max-w-xl space-y-4 text-sm leading-6">
      <h1 className="text-lg font-semibold flex items-center gap-2">
        <FileText size={16}/>Terms of Service
      </h1>

      <p className="text-xs opacity-70">Last updated: 2025-12-17</p>

      <p>
        <H icon={Shield}>zuzu.rest</H> is a simple, temporary file hosting service.
        There are <H icon={Ban}>no accounts</H> and <H icon={Ban}>no registration</H>.
      </p>

      <S icon={Clock} title="How the service works">
        <p>
          Uploads are stored temporarily and <H icon={Clock}>auto delete after ~3 hours</H>.
          There is <H icon={AlertTriangle}>no manual deletion</H> feature.
        </p>
      </S>

      <S icon={Copyright} title="Your content & permissions">
        <p>
          Upload only content you own or have permission to share.
          By uploading, you grant us a limited license to store and serve the file solely to operate the service during its lifetime.
        </p>
      </S>

      <S icon={AlertTriangle} title="Abuse and prohibited content">
        <p>Do not use the service for anything illegal, harmful, or abusive. This includes, but isn’t limited to:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li><H icon={Ban}>Malware</H>, exploit kits, payloads, or instructions intended to compromise devices/accounts.</li>
          <li>Phishing pages, credential theft, scam kits, or fraud.</li>
          <li>Harassment, threats, stalking, doxxing, or non-consensual sharing of personal data.</li>
          <li>Hate or violent extremist content used to target or incite harm against protected groups.</li>
          <li><H icon={Ban}>CSAM</H> or any sexual content involving minors (will be reported where required).</li>
          <li>Non-consensual intimate imagery.</li>
          <li>Spam distribution or bulk automated abuse.</li>
          <li>Copyright infringement or pirated media distribution.</li>
        </ul>
      </S>

      <S icon={Scale} title="Enforcement & takedowns">
        <p>
          We may remove content, block access, or restrict usage at any time to enforce these terms, address abuse, or comply with legal obligations.
          Because files expire quickly and there are no accounts, enforcement may be at the network or request level.
        </p>
      </S>

      <S icon={AlertTriangle} title="Availability & limits">
        <p>
          The service is provided <H icon={AlertTriangle}>as-is</H>.
          Uptime, retention timing, and storage are <H icon={AlertTriangle}>not guaranteed</H>.
          You are responsible for keeping your own backups.
        </p>
      </S>

      <S icon={Scale} title="Liability">
        <p>
          To the maximum extent permitted by law, we are not liable for lost data, failed deliveries, or damages arising from use or inability to use the service.
        </p>
      </S>

      <S icon={Mail} title="Contact">
        <p>
          Report abuse or contact support: <H icon={Mail}>bliss@hoosh.cat</H>
        </p>
      </S>
    </div>
  )
}

export default function Page(){
  return(
    <div className="p-6 flex justify-center">
      <Terms/>
    </div>
  )
}
