"use client"
import Image from "next/image"
import MeetingModal from "./MeetingModal"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { useUser } from "@clerk/nextjs"
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk"
import {useToast} from "@/components/ui/use-toast"
import { Textarea } from "./ui/textarea"
import ReactDatePicker from 'react-datepicker';




const MeetingTypeList = () => {

    const router=useRouter()

    
    const [meetingState,setMeetingState] = useState<'isScheduleMeeting' | 'isJoiningMeeting' | 'isInstantMeeting' | undefined>()

    const {user}=useUser();

    const client = useStreamVideoClient();
    const [values,setValues]=useState({
       datetime:new Date(),
       description:'',
       link:''

    })

    const [callDetails,setCallDetails]=useState<Call>()
    const {toast} = useToast();
    

    const createMeeting=async ()=>{
        if(!client||!user) return;

        try{

            if(!values.datetime) {
                toast({
                    title:"Please select a date and time"})
                    return;
                   
                }
            
            const id = crypto.randomUUID();
            const call= client.call('default',id);

            if(!call) throw new Error('Call not created');

            const startsAt= values.datetime.toISOString()||new Date(Date.now()).toISOString();
            const description=values.description||'Instant meeting';


            await call.getOrCreate({
                data:{
                    starts_at:startsAt,
                    custom:{
                        description,
                        
                    }
                }

            })
            setCallDetails(call);

            if(!values.description){
                router.push(`/meeting/${call.id}`)
            }
            toast({title:"Meeting Created"})
        }
        catch(error)
        {
            console.log(error);
            toast({
                title:'Failed to Create Meeting',
               
            })
        }

        
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
        ' onClick={()=>setMeetingState('isScheduleMeeting')}>
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


       
       {/* scheduling */}
        {!callDetails?(



        <MeetingModal  
        isOpen={meetingState==='isScheduleMeeting'}
        onClose={()=>setMeetingState(undefined)}
        title="Create a Scheduled Meeting"
        buttonText="Schedule now"
        handleClick={createMeeting}

                    
      >
        <div className="flex flex-col gap-2.5">
            <label className="text-base text-normal leading-[22px]">Add a Description for the meeting</label>


            <Textarea className="border-none bg-dark-3 focus-visible:ring-0 focus-visible:ring-offset-0"
                onChange={(e)=>{
                    setValues({...values,description:e.target.value})
                }}
            />
        </div>

        <div className="flex w-full flex-col gap-2.5">
        <label className="text-base text-normal leading-[22px]">Select Date and Time</label>
                <ReactDatePicker
                    selected={values.datetime}
                    onChange={(date:Date)=>setValues({...values,datetime:date!})}
                    showTimeSelect
                    timeFormat="HH:mm"
                    timeIntervals={15}
                    timeCaption="time"
                    dateFormat="MMMM d, yyyy h:mm aa"
                    className="border-none bg-dark-3 focus-visible:ring-0 focus-visible:ring-offset-0"
                />


        </div>


        }


            {/* // if not we are going for opening the new block    */}
        ):(
            <MeetingModal  
            isOpen={meetingState==='isScheduleMeeting'}
            onClose={()=>setMeetingState(undefined)}
            title="Schedulded Meeting Created Successfully"
            buttonText="Start Meeting"
            handleClick={()=>{
                // navigator.clipboard.writeText(meetingLink)
                // toast({title:'Link Copied'})

            }}
            image="/icons/checked.svg"
            buttonIcon="/icons/copy.svg"
            buttonText="Copy Meeting Link"

                        
        />


         )
 

        {/* // instant meeting */}
        <MeetingModal  
            isOpen={meetingState==='isInstantMeeting'}
            onClose={()=>setMeetingState(undefined)}
            title="Start an Instant Meeting"
            buttonText="Start Meeting"
            handleClick={createMeeting}

                        
        />

        

    </section>
  );
};

export default MeetingTypeList;