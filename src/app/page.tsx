import { Post } from './components/post'
import './globals.css'
import img from '@/../public/repository-open-graph-template.png'

export default function Home() {
  const data = [img]

  return (
    <div className="h-[5000px] grid grid-layout-template">
    <main className="grid-area-main">
      <Post.Root>
        <Post.Icon image='favicon.ico' />
        <Post.ContentRoot>
          <Post.Information 
            nickname='mtyxxx'
            username='teste'
            date='1y'
          />
          <Post.Content text="Primeiro Post" />
          <Post.Media data={data} />
          <Post.Actions />
        </Post.ContentRoot>
      </Post.Root>
      <Post.Root>
        <Post.Icon image='favicon.ico' />
        <Post.ContentRoot>
          <Post.Information 
            nickname='mtyxxx'
            username='teste'
            date='1y'
          />
          <Post.Content text="Primeiro Post" />
          <Post.Actions />
        </Post.ContentRoot>
      </Post.Root>
      <Post.Root>
        <Post.Icon image='favicon.ico' />
        <Post.ContentRoot>
          <Post.Information 
            nickname='mtyxxx'
            username='teste'
            date='1y'
          />
          <Post.Content text="Primeiro Post" />
          <Post.Media data={[img, img]} />
          <Post.Actions />
        </Post.ContentRoot>
      </Post.Root>
      <Post.Root>
        <Post.Icon image='favicon.ico' />
        <Post.ContentRoot>
          <Post.Information 
            nickname='mtyxxx'
            username='teste'
            date='1y'
          />
          <Post.Content text="Primeiro Post" />
          <Post.Media data={[img, img, img]} />
          <Post.Actions />
        </Post.ContentRoot>
      </Post.Root>
      <Post.Root>
        <Post.Icon image='favicon.ico' />
        <Post.ContentRoot>
          <Post.Information 
            nickname='mtyxxx'
            username='teste'
            date='1y'
          />
          <Post.Content text="Primeiro Post" />
          <Post.Media data={[img, img, img, img]} />
          <Post.Actions />
        </Post.ContentRoot>
      </Post.Root>
      <Post.Root>
        <Post.Icon image='favicon.ico' />
        <Post.ContentRoot>
          <Post.Information 
            nickname='mtyxxx'
            username='teste'
            date='1y'
          />
          <Post.Content text="Primeiro Post" />
          <Post.Media data={data} />
          <Post.Actions />
        </Post.ContentRoot>
      </Post.Root>
      <Post.Root>
        <Post.Icon image='favicon.ico' />
        <Post.ContentRoot>
          <Post.Information 
            nickname='mtyxxx'
            username='teste'
            date='1y'
          />
          <Post.Content text="Primeiro Post" />
          <Post.Media data={data} />
          <Post.Actions />
        </Post.ContentRoot>
      </Post.Root>
    </main>
    </div>
  )
}
