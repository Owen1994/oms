const parseMenuData = (array) => {
    if(array.length < 1) {
        return array;
    }
    array = array.filter((v, i)=>{
        return v.url !== "/"
    });
    let position = -1
    for (let i = 0;i < array.length; i++) {
        if(array[i].url === '/console/') {
            position = i;
            break;
        }
    }

    if (position !== -1) {
        const tempObj = array.splice(position, 1);
        array.unshift(tempObj[0]);
    }
    return array
}

export default parseMenuData;
