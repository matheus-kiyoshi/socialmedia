import { StaticImageData } from "next/image";
import Icon from "../Icon";

export function PostIcon({image}: {image: string | StaticImageData}) {
	return <Icon icon={image} />
}
