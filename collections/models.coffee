@Trucks=new Meteor.Collection('trucks')
@GoodTypes=new Meteor.Collection('goodTypes')
@TruckAuthorizations=new Meteor.Collection('truckAuthorizations')
@Schemas={}
Schemas.truckModel=new SimpleSchema
  name:
    type:String
  photo:
    type:String
    optional:true
    autoform:
      type:'uploadCare'
      'uc_options':
        'data-multiple':false
      options:
        classStyle:'uploader-green-button'
  loadType:
    type:String
    allowedValues:["boxed","non-boxed","liquid"]
    autoform:
      options:"allowed"


Schemas.goodTypeModel=new SimpleSchema
  name:
    type:String
  group:
    type:[String]
    optional:true
    autoform:
      type:"tagsTypeahead"
  loadType:
    type:String
    allowedValues:["boxed","non-boxed","liquid"]
    autoform:
      options:"allowed"

Schemas.truckAuthModel=new SimpleSchema
  name:
    type:String

Schemas.truckListModel=new SimpleSchema
  trucks:
    type:[Schemas.truckModel]

Schemas.goodTypeListModel=new SimpleSchema
  goods:
    type:[Schemas.goodTypeModel]

Trucks.attachSchema(Schemas.truckModel)
GoodTypes.attachSchema(Schemas.goodTypeModel)
TruckAuthorizations.attachSchema(Schemas.truckAuthModel)
###CloudspiderTags.attachSchema(Schemas.tagModel)###
return
