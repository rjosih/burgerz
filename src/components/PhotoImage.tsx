import type { ImgHTMLAttributes, ReactElement } from "react";
import type { Photo } from "../mocks/restaurants/types";

interface Props extends Omit<
	ImgHTMLAttributes<HTMLImageElement>,
	"src" | "srcSet" | "alt" | "loading" | "decoding"
> {
	photo: Photo;
	sizes: string;
	priority?: boolean;
	figureClassName?: string;
}

// Visualize S3
const toSource = (storageKey: string): string =>
	storageKey.includes("://") ? storageKey : `/${storageKey}`;

export const PhotoImage = ({
	photo,
	sizes,
	priority = false,
	className,
	figureClassName,
	...rest
}: Props): ReactElement => {
	const { thumbnail, medium, large } = photo.renditions;

	const img = (
		<img
			alt={photo.isDecorative ? "" : photo.altText}
			className={className}
			decoding="async"
			fetchPriority={priority ? "high" : "auto"}
			loading={priority ? "eager" : "lazy"}
			sizes={sizes}
			src={toSource(medium)}
			srcSet={`${toSource(thumbnail)} 400w, ${toSource(medium)} 800w, ${toSource(large)} 1200w`}
			{...rest}
		/>
	);

	if (!photo.caption) return img;

	return (
		<figure className={figureClassName}>
			{img}
			<figcaption className="mt-1 text-xs text-slate-500">
				{photo.caption}
			</figcaption>
		</figure>
	);
};
