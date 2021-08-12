import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import ImageUploader from 'components/ImageUploader';
import { Typography, Button, Image, PageHeader, Row, Col, Divider, Switch, Input } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import InputItem from 'components/InputFiled';
import useStyelTest from 'hooks/useStyleTest';
import UUploadUmage from './componets/UUploadUmage';
import UListImages from './componets/UListImages';
import UListItems from './componets/UListItems';
import UList2depItems from './componets/UList2depItems';
import UListBody from './componets/UListBody';
import { defaultImgBase64 } from 'utils';
const { TextArea } = Input;
const { Title } = Typography;

const StyleTestDetail = ({
	match: {
		params: { subscribeId },
	},
}) => {
	const { makeUserTestList, userTestList, subscribeInfo, assignMe, recommendItems, uploadRecommend } = useStyelTest();
	useEffect(() => {
		makeUserTestList({ subscribeId });
	}, []);

	useEffect(() => {
		setResultItemList(recommendItems.recommendItems || []);
		setTotalImage(recommendItems.imageUrl);
		setTotalDescription(recommendItems.description);
	}, [recommendItems]);

	useEffect(() => {
		setEditMode(subscribeInfo.recommended);
	}, [subscribeInfo]);

	let history = useHistory();

	const [editMode, setEditMode] = useState(false);
	const [totalImage, setTotalImage] = useState('');
	const [totalDescription, setTotalDescription] = useState('');
	const [resultItemList, setResultItemList] = useState();

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
							{subscribeInfo.recommendStarted ? (
								<>
									<div className="d-flex y-center mb30">
										<Title level={5} className="mr30 w-130">
											전체 이미지
										</Title>
										{editMode ? (
											<Image src={totalImage || defaultImgBase64} className={'upload-img'} alt="defaultProfile" />
										) : (
											<ImageUploader img={totalImage} setImg={setTotalImage} />
										)}
									</div>

									<div className="d-flex y-center mb30">
										<Title level={4} className="mr30 w-130">
											description
										</Title>
										{editMode ? (
											<div className="mb4">
												<TextArea className="text-style1" readOnly value={totalDescription || '내용 없음'} />
											</div>
										) : (
											<div className="w-250">
												<TextArea
													style={{ height: 200 }}
													value={totalDescription}
													onChange={(e) => {
														setTotalDescription(e.target.value);
													}}
												/>
											</div>
										)}
									</div>
									<Divider />

									<div className="pt20 pb20">
										<Title level={3}>총 {resultItemList.length}개 추천 아이템</Title>
									</div>

									<Divider />
									{resultItemList.map((result, index) => {
										return (
											<InputItem
												key={index + 'InputItem'}
												editMode={editMode}
												setResultItemList={setResultItemList}
												resultItemList={resultItemList}
												result={result}
												index={index}
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
																imageUrl: '',
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
													<Button
														type="default"
														size="large"
														onClick={() => {
															uploadRecommend({
																payload: {
																	imageUrl: totalImage,
																	description: totalDescription,
																	subscribeId,
																	id: recommendItems.id,
																	items: resultItemList.map((i) => {
																		return { ...i };
																	}),
																},
															});
															setEditMode(true);
														}}
													>
														임시 저장
													</Button>
												</div>

												<Button
													type="primary"
													size="large"
													onClick={() => {
														uploadRecommend({
															payload: {
																imageUrl: totalImage,
																description: totalDescription,
																id: recommendItems.id,
																subscribeId,
																completed: true,
																items: resultItemList.map((i) => {
																	return { ...i };
																}),
															},
														});
														setEditMode(true);
													}}
												>
													작성 완료
												</Button>
											</div>
										</>
									)}
								</>
							) : (
								<div className="d-flex">
									<Title level={5} className="mr30">
										나에게 할당
									</Title>
									<Switch checked={subscribeInfo.recommendStarted} onChange={() => assignMe(subscribeInfo.id)} />
								</div>
							)}
						</div>
					</Col>
				</Row>
			</div>
		</div>
	);
};

export default StyleTestDetail;
