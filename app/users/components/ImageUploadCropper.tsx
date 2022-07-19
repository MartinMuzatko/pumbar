import { Button, Slider } from '@mantine/core'
import { Dropzone, IMAGE_MIME_TYPE } from '@mantine/dropzone'
import { useRef, useState } from 'react'
import AvatarEditor, { AvatarEditorProps } from 'react-avatar-editor'
import { getAntiCSRFToken } from 'blitz'
import axios from 'axios'
import { File as UploadFile, Prisma } from '@prisma/client'
import Trans from 'app/core/components/Trans'
import SaveButton from 'app/core/components/SaveButton'

const clamp = (min: number, max: number) => (num: number) => Math.min(Math.max(num, min), max)
const scaleClamp = clamp(0.15, 4)

interface ImageUploadCropperProps extends React.HTMLAttributes<HTMLDivElement> {
	onSave?: (event: Event & { file: UploadFile }) => void
	extraFields?: Pick<
		Prisma.FileCreateArgs['data'],
		'eventLogo' | 'eventPicture' | 'author' | 'avatar'
	>
	editorProps?: Partial<AvatarEditorProps>
	filename?: string
	file?: File | null
}

async function createFileFromUrl(url: string) {
	let response = await fetch(url)
	let data = await response.blob()
	return new File([data], 'test.jpg', {
		type: 'image/jpeg',
	})
}

const ImageUploadCropper = ({
	extraFields,
	editorProps,
	onSave,
	...props
}: ImageUploadCropperProps) => {
	const [image, setImage] = useState<File | null>(props?.file || null)
	const [scale, setScale] = useState(1)
	const [rotation, setRotation] = useState(0)
	const [saving, setSaving] = useState(false)
	const setZoom: React.WheelEventHandler<HTMLDivElement> = (e) =>
		setScale(scaleClamp(scale + scale * ~e.deltaY * 0.001))
	const zoomAreaRef = useRef<HTMLDivElement>(null)
	const editorRef = useRef<AvatarEditor>(null)
	zoomAreaRef.current?.addEventListener('wheel', (event) => event.preventDefault())

	const save = () => {
		setSaving(true)
		const canvas = editorRef.current?.getImage()
		canvas?.toBlob(async (blob) => {
			const form = new FormData()
			{ extraFields && form.append('extraFields', JSON.stringify(extraFields)) }
			form.append('file', blob!, props?.filename || image?.name)
			const { data: file } = await axios.post<any, { data: UploadFile }>('/api/upload', form, {
				headers: {
					'anti-csrf': getAntiCSRFToken(),
				},
			})
			onSave?.({ ...new Event('Save'), file })
			setSaving(false)
		})
	}
	return (
		<div {...props}>
			<Dropzone
				onDrop={(files) => files[0] && setImage(files[0])}
				maxSize={3 * 1024 ** 2}
				accept={IMAGE_MIME_TYPE}
				multiple={false}
			>
				{(status) => <div>
					<Trans>Lade ein Bild hoch oder zieh es rein</Trans>
				</div>}
			</Dropzone>

			{image && (
				<div onWheel={setZoom} ref={zoomAreaRef}>
					<div className="flex justify-center cursor-grab p-4 items-center">
						<AvatarEditor
							className="bg-white dark:bg-black rounded shadow"
							ref={editorRef}
							image={image}
							scale={scale}
							rotate={rotation}
							borderRadius={255}
							// height={256}
							// width={256}
							{...editorProps}
						/>
					</div>
					<Slider
						min={-180}
						max={180}
						value={rotation}
						onChange={setRotation}
						labelAlwaysOn
						label={(value) => `${value} °`}
						marks={[
							{ value: -180, label: -180 },
							{ value: -135, label: -135 },
							{ value: -90, label: -90 },
							{ value: -45, label: -45 },
							{ value: 0, label: 0 },
							{ value: 45, label: 45 },
							{ value: 90, label: 90 },
							{ value: 135, label: 135 },
							{ value: 180, label: 180 },
						]}
					/>
					<SaveButton loading={saving} className="mt-8" onClick={save}>
						<Trans>Speichern</Trans>
					</SaveButton>
				</div>
			)}
		</div>
	)
}

export default ImageUploadCropper
