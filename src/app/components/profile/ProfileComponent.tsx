import ProfileBanner from "./ProfileBanner";
import ProfileFollows from "./ProfileFollows";
import { ProfileIcon } from "./ProfileIcon";
import ProfileInformation from "./ProfileInformation";

type User = {
  _id: string
  username: string
  nickname: string
  bio: string
  icon: string
	followers: string[]
	following: string[]
}

export default function ProfileComponent({user}: {user: User}) {
	const banner = 'https://firebasestorage.googleapis.com/v0/b/incognitosocial-d1ef2.appspot.com/o/default-header.jpg?alt=media&token=325b21a8-6aff-4704-b0cb-4f7e99f0f023'

	return (
		<>
			<ProfileBanner image={banner} />
			<div className='flex items-center justify-between px-6 py-2'>
				<ProfileIcon icon={user.icon} />
				<button className='rounded-3xl py-2 px-6 bg-blue-400 text-white font-medium text-xl'>Follow</button>
			</div>
			<ProfileInformation nickname={user.nickname} username={user.username} bio={user.bio} />
			<ProfileFollows followers={user.followers.length} following={user.following.length} />
		</>
	)
}