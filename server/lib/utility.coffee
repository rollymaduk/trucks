@ServerUtility={
  getStatusOfUrlUpload:(token)->
    progress="progress"
    result={status:progress}
    result= HTTP.get("#{Meteor.settings.public.uploadcare.RESTUpload.from_url}status/",params:{token:token}) while result.status is progress
    result.data.uuid

  uploadImageWithUrl:(url,callback)->
    params={pub_key:Meteor.settings.public.uploadcare.key,store:"auto",source_url:url}
    HTTP.get(Meteor.settings.public.uploadcare.RESTUpload.from_url,params:params,(err,res)->
      token=res?.data?.token
      if token
        _res=ServerUtility.getStatusOfUrlUpload(token)
        console.log _res
        callback.call @,null,_res
      else
        callback.call @,err.response,null
    )

  syncUploadImageWithUrl:(url)->
    syncFunc=Meteor.wrapAsync(ServerUtility.uploadImageWithUrl)
    res=syncFunc(url)
    res


  loadTruckInitData:()->
   tobeLoaded= _.map(truckData,(data)->
        exists=Trucks.findOne({name:data.name})
        unless exists
          url=_.clone(data.photo)
          photoid=ServerUtility.syncUploadImageWithUrl(url)
          data.photo="https://ucarecdn.com/#{photoid}/"
          data
      )
   tobeLoaded=_.compact(tobeLoaded)
   if tobeLoaded.length
    Trucks.batchInsert(_.compact(tobeLoaded))

  loadGoodTypesInitData:()->
    tobeLoaded=_.map(goodsTypeData,(data)->
      exists=GoodTypes.findOne({name:data.name})
      unless exists
        TagsUtil.findOrCreate(data.group[0])
        data
    )

    tobeLoaded=_.compact(tobeLoaded)
    if tobeLoaded.length
      GoodTypes.batchInsert(_.compact(tobeLoaded))

}