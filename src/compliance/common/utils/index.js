export const getPlatformOrSite = (arrayData) => {
    let result = []
    let platform = [];
    let site = [];
    let platformSensitive = [];
    for(var key in arrayData){
        var sensitiveLabel = arrayData[key].sensitiveLayer.label;

        for(var _key in arrayData[key].sensitiveLayer.platformSite){
            var item = arrayData[key].sensitiveLayer.platformSite[_key];
            platform.push(item.platform.label);
            platformSensitive.push({
                [item.platform.label]: sensitiveLabel
            });

            for(var __key in item.site){
                var _item = item.site[__key];
                result.push({
                    site: _item.label,
                    [item.platform.label]: sensitiveLabel,

                });
                site.push(_item.label);
            }
        }

    }

    
    return {
        platform: platform,
        site: Array.from(new Set(site)),
    };
}