import React from 'react';
import { message } from 'antd';
import ProForm, { ProFormText } from '@ant-design/pro-form';
import { CoffeeOutlined, MailOutlined } from '@ant-design/icons';
import logo from 'assets/img/logo.png';
import { useHistory } from 'react-router-dom';

const waitTime = (time = 100) => {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve(true);
		}, time);
	});
};

const Login = () => {
	let history = useHistory();
	return (
		<div className="admin-login">
			<ProForm
				onFinish={async () => {
					await waitTime(1000);
					message.success('로그인 성공');
					history.push('/styleTest');
				}}
				submitter={{
					searchConfig: {
						submitText: '로그인',
					},
					render: (_, dom) => dom.pop(),
					submitButtonProps: {
						size: 'large',
						style: {
							width: '100%',
						},
					},
				}}
			>
				<h1
					style={{
						textAlign: 'center',
					}}
				>
					<img
						style={{
							height: '44px',
							marginRight: 16,
						}}
						alt="logo"
						src={logo}
					/>
				</h1>
				<div
					style={{
						marginTop: 12,
						textAlign: 'center',
						marginBottom: 40,
					}}
				>
					한 손으로 전문 스타일리스트의 <br />
					퍼스널 스타일링을 받아보세요
				</div>
				<ProFormText
					fieldProps={{
						size: 'large',
						prefix: <MailOutlined />,
					}}
					placeholder="아이디"
					rules={[
						{
							required: true,
							message: '아이디를 입력해주세요.',
						},
					]}
				/>
				<ProFormText.Password
					fieldProps={{
						size: 'large',
						prefix: <CoffeeOutlined />,
					}}
					captchaProps={{
						size: 'large',
					}}
					rules={[
						{
							required: true,
							message: '비밀번호를 입력해주세요.',
						},
					]}
					placeholder="비밀번호를 입력해주세요."
				/>
			</ProForm>
		</div>
	);
};

export default Login;
