import Image, { StaticImageData } from "next/image";

export default function Icon({icon}: {icon: StaticImageData | string}) {
	return (
		typeof icon == 'string' ? (
			<figure className="w-12 h-12 rounded-full aspect-square">
				<img src={icon} alt="Profile Picture" className="w-full h-full bg-cover rounded-full"></img>
			</figure>
		) : (
			<figure className="w-12 h-12 rounded-full aspect-square">
				<Image src={icon} alt="Profile Picture" className="w-full h-full bg-cover rounded-full" width={12} height={12}></Image>
			</figure>
		)
	)
}
