import Image, { StaticImageData } from 'next/image'
import Link from 'next/link'

export default function Icon({
  username,
  icon,
}: {
  username: string
  icon: StaticImageData | string
}) {
  return (
    <Link href={`/${username}`} className="hover:opacity-80">
      {typeof icon === 'string' ? (
        <figure className="w-12 h-12 rounded-full aspect-square">
          <img
            src={icon}
            alt="Profile Picture"
            className="w-full h-full bg-cover rounded-full"
          ></img>
        </figure>
      ) : (
        <figure className="w-12 h-12 rounded-full aspect-square">
          <Image
            src={icon}
            alt="Profile Picture"
            className="w-full h-full bg-cover rounded-full"
            width={12}
            height={12}
          ></Image>
        </figure>
      )}
    </Link>
  )
}
