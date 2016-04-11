unless Meteor.settings.public.useClusterVars
  Cluster.connect("mongodb://localhost:27017/discovery")
  Cluster.register('eazytruckerAdmin')

Meteor.methods(
  getTrucks:(qry)->
    Trucks.find(qry).fetch()

  uploadImageWithUrl:(url)->
    try
      check(@userId,String)
      ServerUtility.syncUploadImageWithUrl(url)
    catch e
      throw new Meteor.Error e.index,e.message

  setUpTruckInitData:()->
    try
      check(@userId,String)
      ServerUtility.loadTruckInitData()
    catch e
      throw new Meteor.Error e.index,e.message

  setUpGoodTypesInitData:()->
    try
      check(@userId,String)
      ServerUtility.loadGoodTypesInitData()
    catch e
      throw new Meteor.Error e.index,e.message

  addTrucks:(trucks)->
    try
      check(trucks,[Object])
      if @userId
        Trucks.batchInsert(trucks)
      else
        new Meteor.Error("1001","Access denied!")
    catch err
      throw new Meteor.Error(err.index,err.message)

  addGoodTypes:(goods)->
    try
      check(goods,[Object])
      if @userId
        GoodTypes.batchInsert(goods)
      else
        new Meteor.Error("1001","Access denied!")
    catch err
      throw new Meteor.Error(err.index,err.message)

)





