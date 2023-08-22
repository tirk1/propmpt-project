'use client'

import { useSession } from 'next-auth/react'
import {useState, useEffect} from 'react'
import { useRouter } from 'next/navigation'

import Profile from '@components/Profile'

const MyProfile = () => {

  const router = useRouter()

  const { data: session } = useSession()

  const [myPosts, setMyPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${session?.user.id}/posts`);
      const data = await response.json();

      setMyPosts(data);
    };

    if (session?.user.id) fetchPosts();
  }, [session?.user.id]);

    const handleEdit = (post) => {
      router.push(`/update-prompt?id=${post._id}`)
    }

    const handleDelete = async (post) => {
      const hasConfirmed = confirm("Are you sure about that?")

      if(hasConfirmed) {
        try {
          await fetch(`/api/prompt/${post._id.toString()}`,{
            method: 'DELETE'
          })

        const filteredPosts = myPosts.filter((p) => p._id !== post._id)
        setMyPosts(filteredPosts)
        } catch (error) {
          
        }
      }
    }

  return (
    <Profile
    name='My'
    desc='Welcome to your personal profile page'
    data={myPosts}
    handleEdit={handleEdit}
    handleDelete={handleDelete}
    />
  )
}

export default MyProfile