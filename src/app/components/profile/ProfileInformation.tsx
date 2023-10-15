export default function ProfileInformation({
  nickname,
  username,
  bio,
}: {
  nickname: string
  username: string
  bio: string
}) {
  return (
    <>
      <h1 className="font-bold ml-4 text-2xl">{nickname}</h1>
      <h2 className="font-light text-gray-600 text-medium ml-5">@{username}</h2>
      <p className="break-words leading-5 w-full text-base font-light px-4 py-1.5">
        {bio}
      </p>
    </>
  )
}
