import type { ReactElement } from "react";
import { useEffect, useRef } from "react";
import { Button } from "./Button";
import { handleFileChange } from "../helperFunctions/handleFileChange";
import { moderateImage } from "../helperFunctions/rekognitionService";
import { removePhoto } from "../helperFunctions/removePhoto";
import type { PhotoEntry } from "../helperFunctions/types";

interface Props {
	photos: Array<PhotoEntry>;
	setPhotos: (updater: (previous: Array<PhotoEntry>) => Array<PhotoEntry>) => void;
}

export const UploadPhotos = ({ photos, setPhotos }: Props): ReactElement => {
	const fileInputRef = useRef<HTMLInputElement>(null);
	const processingRef = useRef<Set<string>>(new Set());

	useEffect(() => {
		const scanning = photos.filter(
			(p) => p.moderationStatus === "scanning" && !processingRef.current.has(p.url),
		);
		for (const photo of scanning) {
			processingRef.current.add(photo.url);
			void moderateImage(photo.file).then((result) => {
				setPhotos((prev) =>
					prev.map((p) =>
						p.url === photo.url
							? {
									...p,
									moderationStatus: result.safe ? "safe" : "flagged",
									moderationLabel: result.safe ? undefined : result.label,
								}
							: p,
					),
				);
			});
		}
	}, [photos, setPhotos]);

	return (
		<div className="flex flex-col gap-2">
			<div className="flex items-center gap-2">
				<span className="text-sm font-medium text-slate-700">Photos</span>
				<span className="rounded bg-slate-100 px-1.5 py-0.5 text-[10px] font-medium text-slate-400 tracking-wide">
					AWS Rekognition
				</span>
			</div>
			{photos.length > 0 && (
				<div className="flex flex-wrap gap-2">
					{photos.map(({ url, file, moderationStatus, moderationLabel }, index) => (
						<div key={url} className="group relative">
							<img
								alt={file.name}
								className={`h-20 w-20 rounded-lg object-cover transition-opacity ${
									moderationStatus === "flagged" ? "opacity-40" : "opacity-100"
								}`}
								src={url}
							/>

							{/* Scanning overlay */}
							{moderationStatus === "scanning" && (
								<div className="absolute inset-0 flex flex-col items-center justify-center rounded-lg bg-black/55">
									<div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
									<span className="mt-1 text-[9px] font-medium text-white">Scanning…</span>
								</div>
							)}

							{/* Flagged overlay */}
							{moderationStatus === "flagged" && (
								<div className="absolute inset-0 flex flex-col items-center justify-center rounded-lg bg-red-700/80">
									<span className="text-base leading-none text-white">⚠</span>
									<span className="mt-0.5 px-1 text-center text-[8px] font-semibold uppercase tracking-wide text-red-100">
										{moderationLabel}
									</span>
									<button
										aria-label="Remove flagged photo"
										className="mt-1 rounded bg-red-900/60 px-1.5 py-0.5 text-[8px] text-white hover:bg-red-900"
										type="button"
										onClick={() => { removePhoto(index, setPhotos); }}
									>
										Remove
									</button>
								</div>
							)}

							{/* Safe — show remove button on hover */}
							{moderationStatus === "safe" && (
								<Button
									aria-label={`Remove ${file.name}`}
									className="absolute right-1 top-1 hidden h-5 w-5 !rounded-full !p-0 items-center justify-center group-hover:flex"
									color="primary"
									size="sm"
									type="button"
									onClick={() => { removePhoto(index, setPhotos); }}
								>
									×
								</Button>
							)}
						</div>
					))}
				</div>
			)}
			<Button
				className="w-fit border-dashed"
				color="secondary"
				size="md"
				type="button"
				onClick={() => { fileInputRef.current?.click(); }}
			>
				+ Add photos
			</Button>
			<input
				ref={fileInputRef}
				multiple
				accept="image/*"
				className="hidden"
				type="file"
				onChange={(event) => {
					handleFileChange(
						event.target.files,
						setPhotos,
						() => { if (fileInputRef.current) fileInputRef.current.value = ""; },
					);
				}}
			/>
		</div>
	);
};
