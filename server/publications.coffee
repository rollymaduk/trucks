###Meteor.FilterCollections.publish(Trucks,{
  name:"truckSearchPublish"
})###

Meteor.publish('trucks',(qry={},selector={})->
    Trucks.find(qry,selector)
)

Meteor.publish('goodTypes',(qry={},selector={})->
    GoodTypes.find(qry,selector)
)

Meteor.publish('truckAuthorizations',(qry={},selector={})->
  TruckAuthorizations.find(qry,selector)
)