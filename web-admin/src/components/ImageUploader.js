import React, { useState, useRef } from 'react';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';

const ImageUploader = ({ img, setImg }) => {
	const inputRef = useRef(null);
	const [loading, setLoading] = useState(false);

	const uploadImage = async (e) => {
		setLoading(true);
		let reader = new FileReader();
		let file = e.target.files[0];
		if (file) {
			reader.onloadend = () => {
				setImg(reader.result);
				setLoading(false);
			};
			reader.readAsDataURL(file);
		}
	};

	const UploadButton = () => (
		<>
			{loading ? <LoadingOutlined /> : <PlusOutlined />}
			<div style={{ marginTop: 8 }}>Upload</div>
		</>
	);

	return (
		<div className="upload-wrap">
			<div
				className="upload-container"
				onMouseUpCapture={(e) => inputRef.current.click()}
			>
				{img ? (
					<img className={'upload-img'} src={img} alt="defaultProfile" />
				) : (
					<UploadButton />
				)}
			</div>
			<input
				className="file-input"
				type="file"
				name="docx"
				ref={inputRef}
				onChange={uploadImage}
			/>
		</div>
	);
};

export default ImageUploader;
