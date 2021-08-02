import React from 'react';
import { Route, Switch } from 'react-router-dom';
import FindIdPassword from 'views/findIdPassword';
import Introservice from 'views/introservice';
import Login from 'views/login';
import Main from 'views/main';
import Mypage from 'views/mypage';
import NotFound from 'views/notFound';
import Signup from 'views/signup';
import ProvideAuth from './ProvideAuth';
import SnsLogin from 'views/login/SnsLogin';
import Styletest from 'views/styletest/index';
import SignupSuccess from 'views/signup/signupSuccess';
import StyleTestList from 'views/mypage/StyleTestList';
import ChangePassword from 'views/changePassword';
import StyleTipList from 'views/styleTip';
import StyleTipDetail from 'views/styleTip/detail';
import StyleTestIntro from 'views/styletest/intro';
import CompleteStyleTest from 'views/styletest/CompleteStyleTest';
import TestUpload from 'views/test';
import Mroute from 'views/mypage/Mroute';
import StyleTestDetail from 'views/mypage/StyleTestDetail';
import ScrollToTop from './ScrollTopRoute';
import PrivacyPolicy from 'views/privacy/privacyPolicy';
import TermsofService from 'views/privacy/termsofService';
import FindEmailSucess from 'views/findIdPassword/FindEmailSucess';
import FindPasswordSucess from 'views/findIdPassword/FindPasswordSucess';

export default function routers() {
  return (
    <>
      <ScrollToTop />
      <Switch>
        <Route path="/" exact component={Main} />
        <Route path="/login" exact component={Login} />
        <Route path="/signup" exact component={Signup} />
        <Route path="/intro" exact component={Introservice} />
        <Route path="/styletest" exact component={Styletest} />
        <Route path="/styleTestList" exact component={StyleTestList} />
        <Route path="/styleTestList/detail/:id" component={StyleTestDetail} />
        <Route path="/changePassword" exact component={ChangePassword} />
        <Route path="/styleTip" exact component={StyleTipList} />
        <Route path="/styleTip/detail" exact component={StyleTipDetail} />
        <Route path="/styleTestIntro" exact component={StyleTestIntro} />
        <Route path="/completeStyleTest" exact component={CompleteStyleTest} />
        <Route path="/login" exact component={Login} />
        <Route path="/signup" exact component={Signup} />
        <Route path="/intro" exact component={Introservice} />
        <Route path="/findIdPassword" exact component={FindIdPassword} />
        <Route path="/findEmailSucess" exact component={FindEmailSucess} />
        <Route path="/findPasswordSucess" exact component={FindPasswordSucess} />
        <Route path="/sns-login" exact component={SnsLogin} />
        <Route path="/upload-test" exact component={TestUpload} />
        <Route path="/mroute" exact component={Mroute} />
        <ProvideAuth path="/mypage">
          <Mypage />
        </ProvideAuth>
        <Route path="/success" component={SignupSuccess} />
        <Route path="/privacyPolicy" component={PrivacyPolicy} />
        <Route path="/termsofService" component={TermsofService} />
        <Route path="*" component={NotFound} />
      </Switch>
    </>
  );
}
