export default function ProfileBanner({ image }: { image: string }) {
  return (
    <figure className="h-40 w-full bg-cover bg-no-repeat bg-center border-b-2 border-black">
      <img
        src={image}
        alt="Profile Banner Picture"
        className="h-full w-full bg-cover bg-no-repeat bg-center"
      />
    </figure>
  )
}
