
const getarr = (test = 0) => {
    const mockData = [];
    for (let i = test + 0; i < test + 20; i++) {
        mockData.push({
            // id: "weijie" +  i.toString() ,
            title: `content${i + 1}`,
            description: `description of content${i + 1}`,
        });
    }
    return mockData;
};

export default getarr;
