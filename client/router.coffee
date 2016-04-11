AccountsTemplates.configure({
  defaultLayout: 'loginLayout',
  forbidClientAccountCreation:true
});

AccountsTemplates.configureRoute('signIn', {
  name: 'signin',
  path: '/',
  redirect: '/admin',
  template:"myLogin"
});

Router.route('batchGoodsManage', {
  path: AdminDashboard.path('GoodTypes/batchAddGoods'),
  controller: 'AdminController',
  onAfterAction:()->
    Session.set('admin_title', 'GoodTypes Batch Manage')
    return
});
Router.route('batchTruckManage', {
  path: AdminDashboard.path('Trucks/batchAddTrucks'),
  controller: 'AdminController',
  onAfterAction:()->
    Session.set('admin_title', 'Truck Batch Insert')
    return
});
###
Router.route('/',()->
  this.render('home')
  return
)
###

Router.onBeforeAction ()->
  loadUploadcare()
  @next()
  return

return