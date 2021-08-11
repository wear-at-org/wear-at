import React, { useState, useRef } from 'react';
import { LoadingOutlined, PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';
import { Image } from 'antd';
import api from 'api';

const ImageUploader = ({ img, setImg }) => {
	const inputRef = useRef(null);
	const [loading, setLoading] = useState(false);

	const uploadImage = async (event) => {
		setLoading(true);
		const formData = new FormData();
		Array.from(event.target.files).forEach((f) => formData.append(`files`, f));

		try {
			const {
				data: { urls },
			} = await api.post('storage/upload', formData, {
				headers: {
					'Content-Type': `multipart/form-data`,
				},
			});
			await setImg(urls[0]);
			setLoading(false);
		} catch (e) {
			setLoading(false);
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
			{img ? (
				<div
					className="x-btn-container"
					onClick={() => {
						setImg('');
					}}
				>
					<MinusCircleOutlined style={{ fontSize: '30px', color: 'red' }} />
				</div>
			) : (
				<input className="file-input" type="file" name="docx" ref={inputRef} onChange={uploadImage} />
			)}
			<div
				className={`upload-container ${!!img && 'active'}`}
				onMouseUpCapture={(e) => (img ? null : inputRef.current.click())}
			>
				{img ? (
					<div className="mr30">
						<Image className={'upload-img'} src={img} alt="defaultProfile" />
					</div>
				) : (
					<UploadButton />
				)}
			</div>
		</div>
	);
};

export default ImageUploader;
