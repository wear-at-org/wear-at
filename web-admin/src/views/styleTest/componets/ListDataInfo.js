import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { Typography } from 'antd';
const { Title } = Typography;

export const columns = [
	{
		title: '사용자 첨부 이미지',
		dataIndex: 'subscribeAnswers',
		render: (_, item) => {
			return (
				<Link to={`styleTest/detail/${item.id}`}>
					<div className="img-container">
						{item.subscribeAnswers.map((item, index) => {
							if (item.queryId > 6)
								return (
									<img
										key={uuidv4()}
										className="list-img-size"
										src={item.answer}
										alt="img"
									/>
								);
						})}
					</div>
				</Link>
			);
		},
	},
	{
		title: '생성 날짜 및 닉네임',
		dataIndex: 'createAt',
		render: (_, item) => {
			return (
				<Link
					to={`styleTest/detail/${item.id}`}
					style={{
						display: 'flex',
					}}
				>
					<div className="mr20">
						<Title level={5}>{item.user.nickname}</Title>
					</div>
					<div className="mr20">
						<Title level={5}>
							{dayjs(item.updateAt).format('YYYY/MM/DD HH:mm')}
						</Title>
					</div>
				</Link>
			);
		},
	},
];
