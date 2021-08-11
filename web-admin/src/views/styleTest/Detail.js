import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import ImageUploader from 'components/ImageUploader';
import { Typography, Button, Image, PageHeader, Row, Col, Divider, Popconfirm, message, Switch } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { v4 as uuidv4 } from 'uuid';
import InputItem from 'components/InputFiled';
import useStyelTest from 'hooks/useStyleTest';
import UUploadUmage from './componets/UUploadUmage';
import UListImages from './componets/UListImages';
import UListItems from './componets/UListItems';
import UList2depItems from './componets/UList2depItems';
import UListBody from './componets/UListBody';

const { Title } = Typography;

const StyleTestDetail = ({
	match: {
		params: { subscribeId },
	},
}) => {
	const { makeUserTestList, userTestList, subscribeInfo, assignMe } = useStyelTest();
	useEffect(() => {
		makeUserTestList({ subscribeId });
	}, []);
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

	return (
		<div className="pb90">
			<PageHeader className="site-page-header" onBack={() => history.goBack()} title="목록으로" />
			<div className="pl20 pr20">
				<Row>
					<Col span={12}>
						<UUploadUmage item={userTestList.U_UPLOAD_IMAGE} />
						<UListImages item={userTestList.U_LIST_IMAGES} />
						<UListItems item={userTestList.U_LIST_ITEMS} />
						<UList2depItems item={userTestList.U_LIST_2DEP_ITEMS} />
						<UListBody item={userTestList.U_LIST_BODY} />
					</Col>

					<Col span={12}>
						<div className="pl30 pr30">
							<div className="d-flex">
								<Title level={5} className="mr30">
									나에게 할당
								</Title>
								<Switch checked={subscribeInfo.recommendStarted} onChange={() => assignMe(subscribeInfo.id)} />
							</div>
							{subscribeInfo.recommendStarted && (
								<>
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
										<Title level={3}>총 {resultItemList.length}개 추천 아이템</Title>
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
												<Button type="default" size="large" onClick={() => setEditMode(false)}>
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

												<Button type="primary" size="large" onClick={() => setEditMode(true)}>
													작성 완료
												</Button>
											</div>
										</>
									)}
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
