export default function ProfileFollows({
  followers,
  following,
}: {
  followers: number
  following: number
}) {
  return (
    <div className="ml-6 flex items-center justify-start gap-4">
      <p>
        <span className="font-bold">{followers}</span> Followers
      </p>
      <p>
        <span className="font-bold">{following}</span> Following
      </p>
    </div>
  )
}
