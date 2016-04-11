AdminConfig = {
    name: 'EazyTrucker Management',
    collections:
    {
        Trucks: {
            tableColumns: [
                { label: 'Photo', name: 'photo',template: 'photoTemplate' },
                { label: 'Name', name: 'name' },
                { label: 'Load Type', name: 'loadType' }

            ],
            color: 'red'
        },
        CloudspiderTags:{
            tableColumns: [
                { label: 'Title', name: 'title' }
            ],
            color: 'green',
            showEditColumn: false
        },
        GoodTypes:{
            tableColumns: [
                { label: 'Name', name: 'name' },
                { label: 'Load Type', name: 'loadType' },
                { label: 'Group', name: 'group' }
            ],
            color: 'yellow'
        },
        TruckAuthorizations:{
            tableColumns:[
                {label:'Name',name:'name'}
            ]
        }

    }
};
