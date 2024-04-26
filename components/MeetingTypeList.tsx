"use client"
import Image from "next/image"
import MeetingModal from "./MeetingModal"
import { useState } from "react"
import { useRouter } from "next/navigation"


const MeetingTypeList = () => {

    const router=useRouter()

    
    const [meetingState,setMeetingState] = useState<'isScheduleMeeting' | 'isJoiningMeeting' | 'isInstantMeeting' | undefined>()


    const createMeeting=()=>{
        
    }


  return (
    <section className='grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4' >
        <div className='bg-orange-1 px-4 py-6 flex flex-col justify-between w-full xl:max-w-[270px] min-h-[260px] rounded-[14px]
            cursor-pointer
        ' onClick={()=>setMeetingState('isInstantMeeting')}>
            <div className="flex-center glassmorphism size-12 rounded-[10px]">
                <Image src='/icons/add-meeting.svg' alt='meeting' width={27} height={27} />

            </div>

            <div className="flex flex-col gap-2   "> 
                <h1 className="text-2xl font-bold">New Meeting</h1>
                <p className="text-lg font-normal">Start an instant Meeting</p>

               


            </div>

           

        </div>

        <div className='bg-blue-1 px-4 py-6 flex flex-col justify-between w-full xl:max-w-[270px] min-h-[260px] rounded-[14px]
            cursor-pointer
        ' onClick={()=>setMeetingState('isJoiningMeeting')}>
            <div className="flex-center glassmorphism size-12 rounded-[10px]">
                <Image src='/icons/join-meeting.svg' alt='meeting' width={27} height={27} />

            </div>

            <div className="flex flex-col gap-2 handleClick={()=>setMeetingState('isJoiningMeeting')} ">
                <h1 className="text-2xl font-bold">Join Meeting</h1>
                <p className="text-lg font-normal">via invitaion link</p>

            </div>

        </div>

        <div className='bg-purple-1 px-4 py-6 flex flex-col justify-between w-full xl:max-w-[270px] min-h-[260px] rounded-[14px]
            cursor-pointer
        ' onClick={()=>{}}>
            <div className="flex-center glassmorphism size-12 rounded-[10px]">
                <Image src='/icons/schedule.svg' alt='meeting' width={27} height={27} />

            </div>

            <div className="flex flex-col gap-2 handleClick={()=>setMeetingState('isScheduleMeeting')}">
                <h1 className="text-2xl font-bold">Schedule</h1>
                <p className="text-lg font-normal">Plan your meeting</p>

            </div>

        </div>

        <div className='bg-yellow-1 px-4 py-6 flex flex-col justify-between w-full xl:max-w-[270px] min-h-[260px] rounded-[14px]
            cursor-pointer
        ' onClick={()=>{}}>
            <div className="flex-center glassmorphism size-12 rounded-[10px]">
                <Image src='/icons/recordings.svg' alt='meeting' width={27} height={27} />

            </div>

            <div className="flex flex-col gap-2 handleClick={()=>router.push('/recordings')}">
                <h1 className="text-2xl font-bold">View Recordings</h1>
                <p className="text-lg font-normal">Meeting Recordings</p>

            </div>

        </div>

        <MeetingModal  
            isOpen={meetingState=='isInstantMeeting'}
            onClose={()=>setMeetingState(undefined)}
            title="Start an Instant Meeting"
            buttonText="Start Meeting"
            handleClick={createMeeting}

                        
        />

    </section>
  )
}

export default MeetingTypeList