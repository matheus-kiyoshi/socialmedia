import Image, { StaticImageData } from 'next/image'

export const ProfileIcon = ({ icon }: { icon: StaticImageData | string }) => {
  return (
    <div className="hover:opacity-80">
      {typeof icon === 'string' ? (
        <figure className="w-20 h-20 rounded-full aspect-square p-[2px] border-2 border-black">
          <img
            src={icon}
            alt="Profile Picture"
            className="w-full h-full bg-cover rounded-full"
          ></img>
        </figure>
      ) : (
        <figure className="w-20 h-20 rounded-full aspect-square p-[2px] border-2 border-black">
          <Image
            src={icon}
            alt="Profile Picture"
            className="w-full h-full bg-cover rounded-full"
            width={20}
            height={20}
          ></Image>
        </figure>
      )}
    </div>
  )
}
