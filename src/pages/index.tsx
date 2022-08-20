import Head from 'next/head'
import Link from "next/link"
import React from 'react'
import HeadData from '../components/HeadData'
import useStore from '../stores/useStore'

const Home = () => {
  const users = useStore((state => state?.users))
  // useStore recebe o elemento que aponta para qual estado iremos usar

  return (
    <div className='flexCol'>
      <HeadData />

      <main>
        <div>
          {users?.map((item) => {
            return <p key={Math.floor(Math.random() * 100000)}>{item?.name} | {item?.email} | {item?.age} | {item?.password}</p>
          })}
        </div>
        <Link href="/userform">
          <a>
            <button>UserForm</button>
          </a>
        </Link>
      </main>
    </div >
  )
}

export default Home
