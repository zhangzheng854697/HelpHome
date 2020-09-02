const url_prefix = '/HelpHome'
// 意见反馈
const HandlerZy = url_prefix+'/BackManage/Handler/HandlerZy.ashx';
const upload_json = url_prefix+'/Handler/upload_json.ashx?dir=image';
const HandlerLogin = url_prefix+'/Handler/HandlerLogin.ashx';
const HandlerLoginIserror = url_prefix+'/Handler/HandlerLoginIserror.ashx';
const HandlerLogout = url_prefix+'/Handler/HandlerLogout.ashx';
const HandlerFeedback = url_prefix+'/BackManage/Handler/HandlerFeedback.ashx';
const HandlerSchoolCG = url_prefix+'/BackManage/Handler/HandlerSchoolCG.ashx';
const HandlerDaoChu = url_prefix+'/BackManage/Handler/HandlerDaoChu.ashx';
//


export default{
	url_prefix,
	HandlerZy,
	upload_json,
	HandlerFeedback,
	HandlerLogin,
	HandlerLoginIserror,
	HandlerLogout,
	HandlerSchoolCG,
	HandlerDaoChu
}