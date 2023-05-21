async function sterilizeUsersData(arr) {
  if (arr) {
    const newArr = [];
    arr.map((obj) => {
      const newCont = {
        _id: obj?._id,
        
        name: obj?.name,
        email: obj?.email,
        role: obj?.role,
        username: obj?.username,
        createdAt: obj?.createdAt,
        "User Status": obj?.user_status
      };
      newArr.push(newCont);
    });
    return newArr;
  }
}

module.exports = sterilizeUsersData;
