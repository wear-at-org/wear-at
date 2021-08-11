import React, { useEffect } from 'react';
import { message } from 'antd';
import ProForm, { ProFormText } from '@ant-design/pro-form';
import { CoffeeOutlined, MailOutlined } from '@ant-design/icons';
import logo from 'assets/img/logo.png';
import { useHistory } from 'react-router-dom';
import api from 'api';
import Cookies from 'universal-cookie';
import { loginProcess } from 'store/userinfo-store';
import store from 'store';

const Login = () => {
	const { dispatch } = store;
	let history = useHistory();

	const getUserFromCookie = () => {
		const cookies = new Cookies();
		return cookies.get('_watu');
	};

	const login = async (email, password) => {
		try {
			await api.post('auth/sign-in', {
				email,
				password,
			});

			const user = getUserFromCookie();
			if (!user) {
				throw new Error("user cookie doesn't exist");
			}

			message.success('로그인 성공');

			dispatch(
				loginProcess({
					info: {
						id: user.id,
						nickname: user.nickname,
						email: email,
						prividerType: 'web',
						profileImage: user.profile_image,
					},
					loginStatus: 'login',
				}),
			);

			history.push('/styleTest');
		} catch (e) {
			message.error(e.response && e.response.data ? e.response.data.message : e.message);
		}
	};

	return (
		<div className="admin-login">
			<ProForm
				onFinish={(values) => {
					login(values.email, values.password);
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
					name="email"
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
					name="password"
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
