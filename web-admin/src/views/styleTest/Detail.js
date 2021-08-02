import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import ImageUploader from 'components/ImageUploader';
import { defaultImgBase64 } from 'utils';
import {
	Typography,
	Button,
	Image,
	PageHeader,
	Row,
	Col,
	Divider,
	Popconfirm,
	message,
} from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { v4 as uuidv4 } from 'uuid';
import InputItem from 'components/InputFiled';
const { Title } = Typography;

const StyleTestDetail = ({
	match: {
		params: { id },
	},
}) => {
	let history = useHistory();
	const [editMode, setEditMode] = useState(false);
	const [totalImage, setTotalImage] = useState('');
	const [resultItemList, setResultItemList] = useState([
		{
			id: uuidv4(),
			imageUrl: '',
			brand: '',
			title: '',
			price: '',
			linkUrl: '',
		},
	]);
	const imgList1 = [
		'https://cdn.pixabay.com/photo/2021/07/29/20/23/mountains-6508015_960_720.jpg',
		'https://cdn.pixabay.com/photo/2021/07/31/12/26/plane-6511878_960_720.jpg',
	];

	const imgList2 = [
		'https://cdn.pixabay.com/photo/2021/07/29/20/23/mountains-6508015_960_720.jpg',
		'https://cdn.pixabay.com/photo/2021/07/31/12/26/plane-6511878_960_720.jpg',
		'https://cdn.pixabay.com/photo/2021/07/29/21/03/cereals-6508088_960_720.jpg',
		'https://cdn.pixabay.com/photo/2014/05/03/00/56/summerfield-336672_960_720.jpg',
		'https://cdn.pixabay.com/photo/2014/12/16/22/25/woman-570883_960_720.jpg',
		'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_960_720.jpg',
		'https://cdn.pixabay.com/photo/2014/04/14/20/11/pink-324175_960_720.jpg',
		'https://cdn.pixabay.com/photo/2011/03/16/16/13/tree-5378_960_720.jpg',
		'https://cdn.pixabay.com/photo/2015/07/05/10/18/tree-832079_960_720.jpg',
		'https://cdn.pixabay.com/photo/2015/03/26/09/47/sky-690293_960_720.jpg',
	];
	return (
		<div className="pb90">
			<PageHeader
				className="site-page-header"
				onBack={() => history.goBack()}
				title="목록으로"
			/>
			<div className="pl20 pr20">
				<Row>
					<Col span={12}>
						<div className="mb20">
							<Image src={imgList1[0]} alt={'img'} />
						</div>

						<Divider />
						<div className="mb30">
							<Title level={4}>회원 이미지</Title>
							<Row>
								{imgList1.map((i) => {
									return (
										<Col span={4} className="mr10" key={uuidv4()}>
											<Image
												width={100}
												height={100}
												src={i}
												fallback={defaultImgBase64}
											/>
										</Col>
									);
								})}
							</Row>
						</div>
						<Divider />
						<div className="mb30">
							<Title level={4}>선호 스타일</Title>
							<Row>
								{imgList2.map((i) => {
									return (
										<Col span={4} className="mr10" key={uuidv4()}>
											<Image
												width={100}
												height={100}
												src={i}
												fallback={defaultImgBase64}
											/>
										</Col>
									);
								})}
							</Row>
						</div>
						<Divider />
						<div className="d-flex x-center mt50 mb50 pr99">
							<div className="need-style-container">
								<span className="bold">여행지에서 </span>입을 옷이 필요해요
							</div>
						</div>
						<Divider />
						<div className="d-flex y-center">
							<div className="w-250 mr30">
								<Title level={4} className="mr30">
									아우터
								</Title>
							</div>

							<div className="">
								<Title level={4} className="mr30">
									가격보다는 옷에 더 신경 써주세요.
								</Title>
							</div>
						</div>

						<div className="d-flex y-center">
							<div className="w-250 mr30">
								<Title level={4} className="mr30">
									탑
								</Title>
							</div>

							<div className="">
								<Title level={4} className="mr30">
									저렴한 옷 위주로 추천받을게요.
								</Title>
							</div>
						</div>

						<div className="d-flex y-center">
							<div className="w-250 mr30">
								<Title level={4} className="mr30">
									바텀
								</Title>
							</div>

							<div className="">
								<Title level={4} className="mr30">
									저렴한 옷 위주로 추천받을게요.
								</Title>
							</div>
						</div>

						<div className="d-flex y-center">
							<div className="w-250 mr30">
								<Title level={4} className="mr30">
									원피스
								</Title>
							</div>

							<div className="">
								<Title level={4} className="mr30">
									이건 추천 안받을게요
								</Title>
							</div>
						</div>

						<div className="d-flex y-center">
							<div className="w-250 mr30">
								<Title level={4} className="mr30">
									드러내고 싶은 곳
								</Title>
							</div>

							<div className="">
								<Title level={4} className="mr30">
									팔 어깨 가슴골 배 등 상체 엉덩이 하체
								</Title>
							</div>
						</div>

						<div className="d-flex y-center">
							<div className="w-250 mr30">
								<Title level={4} className="mr30">
									가리고 싶은 곳
								</Title>
							</div>

							<div className="">
								<Title level={4} className="mr30">
									-
								</Title>
							</div>
						</div>

						<Divider />
					</Col>

					<Col span={12}>
						<div className="pl30 pr30">
							<div className="d-flex y-center">
								<Title level={5} className="mr30">
									전체 이미지
								</Title>
								{editMode ? (
									<Image src={totalImage} />
								) : (
									<div className="">
										<ImageUploader img={totalImage} setImg={setTotalImage} />
									</div>
								)}
							</div>
							<Divider />

							<div className="pt20 pb20">
								<Title level={3}>
									총 {resultItemList.length}개 추천 아이템
								</Title>
							</div>

							<Divider />
							{resultItemList.map((result) => {
								return (
									<InputItem
										key={result.id}
										editMode={editMode}
										setResultItemList={setResultItemList}
										resultItemList={resultItemList}
										result={result}
									/>
								);
							})}

							{editMode ? (
								<div className="d-flex mb50">
									<div className="mr30">
										<Button
											type="default"
											size="large"
											onClick={() => setEditMode(false)}
										>
											수정
										</Button>
									</div>
									<Popconfirm
										title="삭제 하시겠습니까?"
										onConfirm={() => message.success('삭제 되었습니다')}
										okText="확인"
										cancelText="취소"
									>
										<Button danger size="large">
											삭제
										</Button>
									</Popconfirm>
								</div>
							) : (
								<>
									<div className="mb50">
										<Button
											type="default"
											icon={<PlusOutlined />}
											size={'large'}
											shape="circle"
											onClick={() => {
												setResultItemList([
													...resultItemList,
													{
														id: uuidv4(),
														img: '',
														brand: '',
														title: '',
														price: '',
														url: '',
													},
												]);
											}}
										/>
									</div>
									<div className="d-flex mb50">
										<div className="mr30">
											<Button type="default" size="large">
												임시 저장
											</Button>
										</div>

										<Button
											type="primary"
											size="large"
											onClick={() => setEditMode(true)}
										>
											작성 완료
										</Button>
									</div>
								</>
							)}
						</div>
					</Col>
				</Row>
			</div>
		</div>
	);
};

export default StyleTestDetail;
