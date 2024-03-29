import ImageUploader from './ImageUploader';
import React from 'react';
import { Typography, Input, Button, Divider, Image } from 'antd';
import { MinusOutlined } from '@ant-design/icons';
import { numberWithCommas } from 'utils';
const { TextArea } = Input;
const { Title } = Typography;
const InputItem = ({ editMode, setResultItemList, resultItemList, result, index }) => {
	const setImg = (imageUrl) => {
		const filterList = resultItemList.map((i, ii) => {
			if (ii === index) {
				return { ...i, imageUrl };
			} else {
				return i;
			}
		});
		setResultItemList(filterList);
	};
	if (!editMode)
		return (
			<div className="pt30 mb20">
				<div className="d-flex y-center mb10">
					<Title level={4} className="mr30 w-130">
						이미지
					</Title>
					<div className="w-250">
						<ImageUploader img={result.imageUrl} setImg={setImg} />
					</div>
				</div>
				<div className="d-flex y-center mb10">
					<Title level={4} className="mr30 w-130">
						브랜드
					</Title>
					<div className="w-250">
						<Input
							allowClear
							value={result.brand}
							onChange={(e) => {
								const filterList = resultItemList.map((i, ii) => {
									if (ii === index) {
										return { ...i, brand: e.target.value };
									} else {
										return i;
									}
								});
								setResultItemList(filterList);
							}}
						/>
					</div>
				</div>
				<div className="d-flex y-center mb10">
					<Title level={4} className="mr30 w-130">
						상품명
					</Title>
					<div className="w-250">
						<Input
							allowClear
							value={result.title}
							onChange={(e) => {
								const filterList = resultItemList.map((i, ii) => {
									if (ii === index) {
										return { ...i, title: e.target.value };
									} else {
										return i;
									}
								});
								setResultItemList(filterList);
							}}
						/>
					</div>
				</div>
				<div className="d-flex y-center mb10">
					<Title level={4} className="mr30 w-130">
						가격
					</Title>
					<div className="w-250">
						<Input
							allowClear
							value={result.price}
							onChange={(e) => {
								const filterList = resultItemList.map((i, ii) => {
									if (ii === index) {
										return { ...i, price: e.target.value };
									} else {
										return i;
									}
								});
								setResultItemList(filterList);
							}}
						/>
					</div>
				</div>
				<div className="d-flex y-center mb30">
					<Title level={4} className="mr30 w-130">
						URL
					</Title>
					<div className="w-250">
						<Input
							allowClear
							value={result.linkUrl}
							onChange={(e) => {
								const filterList = resultItemList.map((i, ii) => {
									if (ii === index) {
										return { ...i, linkUrl: e.target.value };
									} else {
										return i;
									}
								});
								setResultItemList(filterList);
							}}
						/>
					</div>
				</div>
				<div className="d-flex y-center mb30">
					<Title level={4} className="mr30 w-130">
						description
					</Title>
					<div className="w-250">
						<TextArea
							style={{ height: 200 }}
							value={result.description}
							onChange={(e) => {
								const filterList = resultItemList.map((i, ii) => {
									if (ii === index) {
										return { ...i, description: e.target.value };
									} else {
										return i;
									}
								});
								setResultItemList(filterList);
							}}
						/>
					</div>
				</div>

				<Button
					className="mb30"
					type="default"
					icon={<MinusOutlined />}
					size={'large'}
					shape="circle"
					onClick={() => {
						setResultItemList(resultItemList.filter((i) => i.index !== result.index));
					}}
				/>
				<Divider />
			</div>
		);

	return (
		<div className="detail-item">
			<div className="left-img">
				<Image src={result.imageUrl} alt={result.imageUrl} />
			</div>

			<div className="right-info">
				<div className="mb0">
					<h5>{result.brand}</h5>
				</div>

				<div className="mb4">
					<h4>{result.title}</h4>
				</div>

				<div className="price-value mb16">
					<h5 className="small color-blue">₩{numberWithCommas(result.price)}</h5>
				</div>

				<a href={result.linkUrl} target="_blank" rel="noreferrer" className="info-price mb20">
					<div className="btn-style2 middle center type-white">
						<p className="btn-font color-black333 bold">바로 구매하기</p>
					</div>
				</a>

				<div className="mb4">
					<TextArea className="text-style1" readOnly value={result.description} />
				</div>
			</div>
		</div>
	);
};

export default InputItem;
