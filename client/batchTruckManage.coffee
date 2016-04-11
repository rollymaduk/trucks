###Template.batchTruckManage.helpers
  truckList:->
    unless Router.current().params.hash
      {trucks:Trucks.find().fetch()}###

AutoForm.hooks
  batchTruckForm:
    onSubmit:(ins,upd,curr)->
      that=@
      Meteor.call 'addTrucks',ins.trucks,(err,res)->
        if res then Router.go(AdminDashboard.path('Trucks')) else console.log err
        that.done()
      false
,true

AutoForm.debug()


