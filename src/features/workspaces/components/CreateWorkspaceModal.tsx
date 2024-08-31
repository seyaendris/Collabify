"use client"

import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { useCreateWorkspaceModal } from '../store/useCreateWorkspaceModal'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useCreateWorkspaces } from '../api/useCreateWorkspace'
import { useRouter } from 'next/navigation'
  

const CreateWorkspaceModal = () => {
  const [name, setName] = useState("")
  const router = useRouter()
    const { mutate } = useCreateWorkspaces()
    const [open, setOpen] = useCreateWorkspaceModal()
    
    const handleClose = () => {
        setOpen(false)
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()

      mutate({ name }, {

      })

      try {
        const data = await mutate({
          name: 'Workspace 1'
      }, 

      {
          onSuccess(data) {
              router.push('/workspaces/${data}')
          },

          onError: () => {

          },
          
          onSetteled: () => {

          },
      }
  )
        
      } catch (error) {
        
      }
      

    }


  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
            <DialogTitle>Add a Workspace</DialogTitle>
        </DialogHeader>

        <form className='space-y-4'>
            <Input 
                value={name}
                onChange={(e) => setName((e.target as HTMLInputElement).value)}
                disabled={false}
                required
                autoFocus
                minLength={3}
                placeholder='Workspace Name e.g: "Work", "Personal", "Home"'
                />

                <div className='flex justify-end'>
                    <Button disabled={false}>
                        Create
                    </Button>
                </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default CreateWorkspaceModal
