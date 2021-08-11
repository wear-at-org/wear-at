import { Image, Typography, Row, Col, Divider } from 'antd';
import React from 'react';
import { defaultImgBase64 } from 'utils';
import { v4 as uuidv4 } from 'uuid';
const { Title } = Typography;
const UUploadUmage = ({ item }) => {
	console.log(item);
	if (item)
		return (
			<>
				<div className="mb20">
					<Image
						src={item.answer[0] ? item.answer[0].answer : defaultImgBase64}
						alt={'img'}
						fallback={defaultImgBase64}
					/>
				</div>

				<Divider />
				<div className="mb30">
					<Title level={4}>{item.title}</Title>
					<Row>
						{item.answer.map((i) => {
							return (
								<Col span={4} className="mr10" key={uuidv4()}>
									<Image width={100} height={100} src={i.answer} fallback={defaultImgBase64} />
								</Col>
							);
						})}

						{item.answer.length === 0 ? (
							<div>
								<Image width={100} height={100} src={defaultImgBase64} fallback={defaultImgBase64} />
							</div>
						) : null}
					</Row>
				</div>
				<Divider />
			</>
		);

	return null;
};

export default UUploadUmage;
