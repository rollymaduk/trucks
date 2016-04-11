###Template.batchTruckManage.helpers
  truckList:->
    unless Router.current().params.hash
      {trucks:Trucks.find().fetch()}###

AutoForm.hooks
  batchGoodsForm:
    onSubmit:(ins,upd,curr)->
      that=@
      Meteor.call 'addGoodTypes',ins.goods,(err,res)->
        if res then Router.go(AdminDashboard.path('GoodTypes')) else console.log err
        that.done()
      false
,true

AutoForm.debug()


