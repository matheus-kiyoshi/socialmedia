import ProfileBanner from "./ProfileBanner";
import ProfileButton from "./ProfileButton";
import ProfileFollows from "./ProfileFollows";
import { ProfileIcon } from "./ProfileIcon";
import ProfileInformation from "./ProfileInformation";

type User = {
  _id: string
  username: string
  nickname: string
  bio: string
	banner: string
  icon: string
	followers: string[]
	following: string[]
}

export default function ProfileComponent({user}: {user: User}) {
	return (
		<>
			<ProfileBanner image={user.banner} />
			<div className='flex items-center justify-between px-6 py-2'>
				<ProfileIcon icon={user.icon} />
				<ProfileButton username={user.username} />
			</div>
			<ProfileInformation nickname={user.nickname} username={user.username} bio={user.bio} />
			<ProfileFollows followers={user.followers.length} following={user.following.length} />
		</>
	)
}