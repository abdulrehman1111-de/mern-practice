import React, { useEffect, useState } from 'react'
import Nav from '../components/Nav'
import { Link, useParams } from 'react-router'
import Posts from '../components/Posts';
import Comments from '../components/Comments';

const DetailedUser = () => {

  // useParams is giving here id as a string
  const { id } = useParams();

  const [users, setUsers] = useState(null);
  const [posts, setPosts] = useState(null);
  const [comments, setComments] = useState(null);
  const [photos, setPhotos] = useState(null);
  const [todos, setTodos] = useState(null);

  // Everytime the id changes, fetches data for that particular id
  useEffect(() => {

    fetch(`https://jsonplaceholder.typicode.com/users?id=${id}`)
      .then(res => res.json())
      .then(data => setUsers(data));

    fetch(`https://jsonplaceholder.typicode.com/posts?userId=${id}`)
      .then(res => res.json())
      .then(data => setPosts(data))

    fetch(`https://jsonplaceholder.typicode.com/comments?postId=${id}`)
      .then(res => res.json())
      .then(data => setComments(data))

    // For fetching the pics we need to use albums as bridge from the users to get the pics
    fetch(`https://jsonplaceholder.typicode.com/albums?userId=${id}`)
      .then(res => res.json())
      .then(albums => {
        // In each group of albums fetch for the very first album
        if (albums.length > 0) {
          return fetch(`https://jsonplaceholder.typicode.com/photos?albumId=${albums[0].id}`)
            .then(res => res.json())
            .then(data => setPhotos(data))
        }
      })

    fetch(`https://jsonplaceholder.typicode.com/todos?userId=${id}`)
      .then(res => res.json())
      .then(data => setTodos(data))  

  }, [id]);

  if ((!posts) || (!comments) || (!users) || (!photos) || (!todos)) {
    return <p className='text-5xl sora font-semibold text-center pt-20'>Loading...</p>
  }


  return (
    <>

      <div className='bg-[#F7F8FA] text-[#1B1F24] w-full h-auto flex items-center flex-col'>
        <Nav users={users} />

        <div className='w-[80%] h-screen pt-10'>
          <Link to={"/home"}><button className='text-[#6B7280] font-semibold pb-3'>← Back to all users</button></Link>

          <div className='w-full bg-[#FFFFFF] h-48 border-1 border-gray-300 rounded-xl flex items-center pb-2'>

            <div className='w-[12%] h-full flex items-center flex-col pt-7'>

              {
                users && users.map((item) => {
                  return <div className='text-[#3D5AFE] bg-[#EEF1FF] h-15 w-15 p-1 pr-2 pl-2 flex justify-center items-center text-center rounded-full  text-nowrap font-semibold text-xl'>{item.id}</div>
                })
              }

            </div>

            <div className='flex flex-col gap-2'>

              <div className='flex flex-col pt-4'>
                {
                  users && users.map((item) => {
                    return <><p className='text-xl font-bold sora'>{item.name}</p>
                      <p className='text-[#6B7280]'>{item.address.city}</p>
                    </>
                  })
                }
              </div>

              <div className='grid grid-cols-2 gap-5'>

                {
                  users && users.map((item) => {
                    return <>
                      <div>

                        <div className='flex flex-col pb-2'>
                          <p className='text-[#6B7280]'>Email</p>
                          <p className='text-sm font-medium'>{item.email}</p>
                        </div>

                        <div className='flex flex-col'>
                          <p className='text-[#6B7280]'>Website</p>
                          <p className='text-sm font-medium'>{item.website}</p>
                        </div>

                      </div>

                      <div>

                        <div className='flex flex-col pb-2'>
                          <p className='text-[#6B7280]'>Phone</p>
                          <p className='text-sm font-medium'>{item.phone}</p>
                        </div>

                        <div className='flex flex-col'>
                          <p className='text-[#6B7280]'>Address</p>
                          <p className='text-sm font-medium'>{item.address.street}</p>
                        </div>

                      </div>
                    </>
                  })
                }

              </div>

            </div>

          </div>

          <div className='h-auto w-full flex'>

            <div className='w-[55%] h-auto'>

              <div className='flex w-full items-center p-2 gap-3 pt-3 pb-3'>
                <p className='text-xl font-semibold'>Posts</p>
                <div className='text-[#3D5AFE] bg-[#EEF1FF] h-7 w-7 p-1 pr-2 pl-2 flex justify-center items-center text-center rounded-full  text-nowrap text-xs font-semibold'>5</div>
                
              </div>

              <div className='flex flex-col gap-3 pb-10'>
                {
                  posts && posts.slice(0, 5).map((item) => {
                    return <Posts title={item.title} body={item.body} />
                  })
                }
              </div>


            </div>

            <div className='w-[45%] h-auto'>

              <div className='flex w-full items-center p-2 gap-3 pt-3 pb-3'>
                <p className='text-xl font-semibold'>Comments</p>
                
                <div className='text-[#3D5AFE] bg-[#EEF1FF] h-7 w-7 p-1 pr-2 pl-2 flex justify-center items-center text-center rounded-full  text-nowrap text-xs font-semibold'>4</div>
                
              </div>

              {
                comments && comments.slice(0, 4).map((item) => {
                  return <Comments name={item.name} email={item.email} body={item.body} />
                })
              }


            </div>


          </div>

          <hr className='opacity-20 pb-10' />

          <div className='flex w-full gap-15'>

            <div className='flex flex-col gap-3 pt-3 pb-10 w-[48%] shrink-0'>

            <div className='flex gap-2 items-center'>
              <div className='text-md sora font-semibold'>Posts</div>
              <div className='text-[#3D5AFE] bg-[#EEF1FF] h-7 w-7 p-1 pr-2 pl-2 flex justify-center items-center text-center rounded-full  text-nowrap text-xs font-semibold'>8</div>

            </div>

            <div className='h-auto w-full grid grid-cols-4 gap-3'>

              {
                photos && photos.slice(0, 8).map((item) => {
                  return <div className={`h-30 w-full bg-center bg-cover rounded-lg hover:scale-105 duration-150 transition-all ease-out hover:shadow-xl`} style={{ backgroundImage: `url(https://picsum.photos/seed/${item.id}/300/300)` }}></div>
                })
              }

            </div>

          </div>

         
          <div className='flex flex-col gap-3 pt-3 pb-10 w-[48%] shrink-0'>

            <div className='flex gap-2 items-center'>
              <div className='text-md sora font-semibold'>Todos</div>
              <div className='text-[#3D5AFE] bg-[#EEF1FF] h-7 w-7 p-1 pr-2 pl-2 flex justify-center items-center text-center rounded-full  text-nowrap text-xs font-semibold'>5</div>

            </div>

            <div className='h-auto w-full flex flex-col gap-3'>

              {
                todos && todos.slice(0, 5).map((item) => {
                  return  <div className='flex flex-col pb-2'>
                          <p className='text-[#6B7280]'>{item.title}</p>
                          <p className='text-sm font-medium text-[#3D5AFE]'>
                            {item.completed ? "Completed" : "Incomplete"}
                          </p>
                        </div>
                })
              }

            </div>

          </div>

          </div>



        </div>

      </div>

    </>
  )
}

export default DetailedUser
