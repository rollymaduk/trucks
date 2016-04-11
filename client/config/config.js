Meteor.startup(function(){
    AdminDashboard.addCollectionItem(function (collection, path) {
        if (collection === 'Trucks') {
            return {
                title: 'Batch Insert',
                url: path + '/batchAddTrucks'
            };
        }

    });
    AdminDashboard.addCollectionItem(function (collection, path) {
        if (collection === 'GoodTypes') {
            return {
                title: 'Batch Insert',
                url: path + '/batchAddGoods'
            };
        }

    });

    /*window.TruckFilter = new Meteor.FilterCollections(Trucks,{
        template:"batchTruckManage",
        name:"truckSearchPublish",
        pager: {
            options: [5, 10, 15, 25, 50],
            itemsPerPage: 5,
            currentPage: 1,
            showPages: 5
        }

    });*/

});
