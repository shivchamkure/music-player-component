import Head from 'next/head'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import Rawplayer from '../Musicplayer/Rawplayer'
import { Layout } from '../Musicplayer/Layout'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Layout>

        <Rawplayer/>

      </Layout>

    </>
  )
}
