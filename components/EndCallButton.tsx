"use client"

import {useCall, useCallStateHooks} from '@stream-io/video-react-sdk'
import React from 'react'
import { Button } from './ui/button';
import { useRouter } from 'next/navigation';

const EndCallButton = () => {

    const call =useCall();
    const router=useRouter();

    const {useLocalParticipant}=useCallStateHooks();
    const LocalParticipants=useLocalParticipant();

    const isMeetingOwner=LocalParticipants&& call?.state.createdBy && LocalParticipants.userId===call.state.createdBy.id
    if(!isMeetingOwner)
        return null;

    return (
        <Button onClick={async()=>{
            await call.endCall();
            router.push('/');
        }} className='bg-red-600'>

            End Call for Everyone

        </Button>
    )

    

  return (
    <div>EndCallButton</div>
  )
}

export default EndCallButton