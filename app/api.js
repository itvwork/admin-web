//let url='http://192.168.26.86/3dplay/public/'
//let url='http://192.168.26.86/laravel/public/'
let url='http://localhost:8099/api/';

export default {
     imgurl:'http://localhost:8099/images/',
     login:url+'login',//登录 admin_name admin_password
     caseList:url+'case/index',
     caseAdd:url+'case/add',
     caseDetail:url+'case/detail',
     caseEdit:url+'case/updata',
     caseSortAdd:url+'caseSort/add',
     caseSort:url+'caseSort/index',
     caseSortDetail:url+'caseSort/detail',
     caseSortUpdate:url+'caseSort/update',
     caseSortDel:url+'caseSort/del',
     file:url+'file',
     uploads:url+'file/uploads'
}
